import BuyCourseButton from "@/components/BuyCourseButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";

const CourseDetails = () => {
  const purchasecourse = false;
  return (
    <div className="mt-20 space-y-5">
      <div className="bg-[#2D2F31] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl ">Course Title</h1>
          <p className="text-base md:text-lg">Course subtitle</p>
          <p>
            Created By{" "}
            <span className="text-[#C0C4FC] underline italic">Aziz</span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last Updated 11-11-2024</p>
          </div>
          <p>Student enrolled: 10</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
            malesuada, nisl nec fermentum ultrices, metus nunc ultricies nunc,
            eget fermentum velit metus a nunc. Nulla facilisi. Donec nec
            scelerisque nunc. Nullam nec nunc nec nunc ultricies nunc, eget
          </p>
          <Card>
            <CardHeader>
              <CardTitle className="font-bold text-xl md:text-2xl">
                Course Content
              </CardTitle>
              <CardDescription>4 lecture</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[1, 2, 3].map((lecture, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm">
                  <span>
                    {true ? <PlayCircle size={16} /> : <Lock size={16} />}
                  </span>
                  <p>Lecture Title</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-video mb-4">Video</div>
              <h1>Lecture Title</h1>
              <Separator className="my-2" />
              <h1 className="text-lg md:text-xl font-semibold">Course Price</h1>
            </CardContent>
            <CardFooter className="flex justify-center p-4">
              {
                purchasecourse ? (
                    <Button className="w-full">Continue Course</Button>
                ):(
                    <BuyCourseButton />
                )
              }
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
