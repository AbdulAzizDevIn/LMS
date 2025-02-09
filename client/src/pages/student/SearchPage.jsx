import { Skeleton } from "@/components/ui/skeleton";
import Filter from "./Filter";
import SearchResult from "./SearchResult";
import { useGetSearchCoursesQuery } from "@/features/api/courseApi";

const SearchPage = () => {
  const {data,isLoading} = useGetSearchCoursesQuery()
  
  const isEmpty = false;
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="my-6">
        <h1>result fro "html"</h1>
        <p>
          Showing results for{""}{" "}
          <span className="text-blue-800 font-bold italic">
            Frontend Developer
          </span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        <Filter />
        <div className="flex-1">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => <CourseSkeleton key={index} />)
          ) : isEmpty ? (
            <CourseNotFound />
          ) : (
            [1, 2, 3].map((course,index) => <SearchResult  key={index}/>)
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;


const CourseNotFound = () => {
  return <p>Course Not Found</p>;
};
const CourseSkeleton = () => {
    return (
      <div className="flex-1 flex flex-col md:flex-row justify-between border-b border-gray-300 py-4">
        <div className="h-32 w-full md:w-64">
          <Skeleton className="h-full w-full object-cover" />
        </div>
  
        <div className="flex flex-col gap-2 flex-1 px-4">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-1/3" />
          </div>
          <Skeleton className="h-6 w-20 mt-2" />
        </div>
  
        <div className="flex flex-col items-end justify-between mt-4 md:mt-0">
          <Skeleton className="h-6 w-12" />
        </div>
      </div>
    );
}