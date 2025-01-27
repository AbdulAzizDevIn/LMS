import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CourseTab from "./CourseTab";

const EditCourse = () => {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-5 ">
        <h1 className="font-bold text-xl">
          Add detail information regarding course
        </h1>
        <Link to="lecture">
          <Button className="hover:bg-gray-800 hover:text-white transition-all duration-300" variant="outline">
            Go to lectures page
          </Button>
        </Link>
      </div>
      <CourseTab/>
    </div>
  );
};

export default EditCourse;
