import { useCreateCheckoutSessionMutation } from "@/features/api/purchaseApi";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const BuyCourseButton = ({ courseId }) => {
  const [createCheckoutSession, { isLoading }] =
    useCreateCheckoutSessionMutation();

  const purchaseCourseHandler = async () => {
    const res = await createCheckoutSession({ courseId });
    console.log(res);
    const { orderId, amount, currency, key, course, user } = res.data;
    const options = {
      key: key,
      amount: amount,
      currency: currency,
      name: course?.courseTitle,
      description: "Course Purchase",
      image: course?.courseThumbnail,
      order_id: orderId,
      callback_url: "https://lms-ovvc.onrender.com/api/v1/purchase/checkout/success",
      prefill: {
        name: user?.name,
        email: user?.email,
      },
     
    };
    

    const razorpay = new window.Razorpay(options);

    razorpay.open();
  };

  return (
    <>
      <Button
        disabled={isLoading}
        onClick={purchaseCourseHandler}
        className="w-full"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </>
        ) : (
          "Buy Course"
        )}
      </Button>
    </>
  );
};

export default BuyCourseButton;
