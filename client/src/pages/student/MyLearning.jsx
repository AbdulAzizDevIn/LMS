import { useLoadUserQuery } from "@/features/api/authApi";
import Course from "./Course";
import { CourseSkeleton } from "./Courses";

const MyLearning = () => {
 
  const {data,isLoading} = useLoadUserQuery();
  const myLearning = data?.user.enrolledCourses || [];
  
  return (
    <div className="max-w-4xl mx-auto my-24 px-4 md:px-0">
      <h1 className="font-bold text-2xl">MY LEARNING</h1>
      <div className="my-5">
        {isLoading ? (
          <CourseSkeleton />
        ) : myLearning.length === 0 ? (
          <p>You are not enrolled in any course.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {myLearning.map((course, index) => (
              <Course key={index} course={course}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;
