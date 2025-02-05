import { Course } from "../models/course.model.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;
    if (!courseTitle || !category) {
      return res.status(400).json({
        message: "Course title and category is required.",
      });
    }
    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id,
    });
    return res.status(201).json({
      message: "Course created",
      course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create course",
    });
  }
};

export const getPublishedCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true }).populate({
      path: "creator",
      select: "name photoURL",
    });
    if (!courses) {
      return res.status(404).json({
        message: "No publish course found",
      });
    }
    return res.status(200).json({
      courses,
      message: "Published courses found",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get published courses",
    });
  }
};

export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.id;
    const courses = await Course.find({ creator: userId });
    if (!courses) {
      return res.status(404).json({
        courses: [],
        message: "Course not found",
      });
    }
    return res.status(200).json({
      courses,
      message: "Course found",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get course",
    });
  }
};

export const editCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
    } = req.body;
    const newThumbnail = req.file;

    let course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }
    let courseThumbnail;

    if (newThumbnail) {
      if (course.courseThumbnail) {
        const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
        await deleteMediaFromCloudinary(publicId); // delete old thumbnail
      }
      courseThumbnail = await uploadMedia(newThumbnail.path); //upload new thumbnail
    }

    const updateData = {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
      courseThumbnail: courseThumbnail?.secure_url,
    };
    course = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
    });
    return res.status(200).json({
      course,
      message: "Course update successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to edit course",
    });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);
    if (!course) {
      res.status(404).json({
        message: "Course not found",
      });
    }
    return res.status(200).json({
      message: "Get course successfully",
      course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get course by id",
    });
  }
};

// publish unpublished course logic

export const togglePublishCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const publish = req.query.publish; // true or false value

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }
    // update course publish status
    course.isPublished = publish === "true";
    await course.save();

    return res.status(200).json({
      message: `Course ${
        publish === "true" ? "Published" : "Unpublished"
      } successfully`,
      course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to update course",
    });
  }
};
