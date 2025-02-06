import Razorpay from "razorpay";
import crypto from "crypto";
import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay Order
export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.id;

    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    const user = await User.findById(userId).select("name email");

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found!" });
    }

    // Create purchase record
    const newPurchase = new CoursePurchase({
      courseId,
      userId,
      amount: course.coursePrice,
      status: "pending",
      paymentId: "",
    });
    await newPurchase.save();

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: course.coursePrice * 100,
      currency: "INR",
      receipt: `receipt_${newPurchase._id}`,
      payment_capture: 1,
      notes: {
        purchaseId: newPurchase._id.toString(),
        courseId,
        userId,
      },
    });
    if (!order) {
      return res.status(500).json({
        success: false,
        message: "Failed to create order",
      });
    }

    // Update purchase with order ID
    newPurchase.paymentId = order.id;
    await newPurchase.save();

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
      user,
      course: {
        id: course._id,
        courseTitle: course.courseTitle,
        courseThumbnail: course.courseThumbnail,
      },
    });
  } catch (error) {
    console.error("Payment error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating payment session",
    });
  }
};

// Verify Payment and Update Database
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    // Validate inputs
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid payment data" });
    }

    // Generate expected signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    // Validate signature
    if (expectedSignature !== razorpay_signature) {
      return res.status(401).json({
        success: false,
        message: "Signature not match",
      });
    }

    // Get purchase record
    const purchase = await CoursePurchase.findOne({
      paymentId: razorpay_order_id,
    })
      .populate("courseId")
      .populate("userId");

    if (!purchase) {
      return res
        .status(404)
        .json({ success: false, message: "Purchase record not found" });
    }

    // Update purchase status
    purchase.status = "success";
    purchase.razorpayPaymentId = razorpay_payment_id;
    await purchase.save({ validateBeforeSave: true });

    // Update course access
    await Promise.all([
      Lecture.updateMany(
        { _id: { $in: purchase.courseId.lectures } },
        { $set: { isPreviewFree: true } }
      ),
      User.findByIdAndUpdate(purchase.userId, {
        $addToSet: { enrolledCourses: purchase.courseId._id },
      }),
      Course.findByIdAndUpdate(purchase.courseId._id, {
        $addToSet: { enrolledStudents: purchase.userId },
      }),
    ]);

    res.redirect(
      `http://localhost:5173/course-progress/${purchase.courseId._id}`
    );
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};

export const getCourseDetailsWithPurchaseStatus = async (req,res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId)
      .populate({ path: "creator" })
      .populate({ path: "lectures" });

    const purchased = await CoursePurchase.findOne({userId, courseId});

    if(!course){
      return res.status(404).json({
        message:"Course Not Found!"
      })
    }

    return res.status(200).json({
      course,
      purchased: purchased ? true : false
    })
  } catch (error) {
    console.error( error);
    res.status(500).json({
      success: false,
      message: "Failed to get course and purchase status",
    });
  }
};

export const getAllPurchasedCourse = async (req,res) => {
  try {
    const purchasedCourses = await CoursePurchase.find({status:"success"}).populate("courseId");

    if(!purchasedCourses){
      return res.status(404).json({
        purchasedCourses:[],
        message:"purchased course not found"
      })
    }

    return res.status(200).json({
      purchasedCourses,
      message:"Get purchased course successfully"
    })
  } catch (error) {
    console.error( error);
    res.status(500).json({
      success: false,
      message: "Failed to get purchase course",
    });
  }
}
