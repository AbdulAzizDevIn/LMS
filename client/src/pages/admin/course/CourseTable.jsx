import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCreatorCourseQuery } from "@/features/api/courseApi";
import { Edit } from "lucide-react";

import { useNavigate } from "react-router-dom";

const CourseTable = () => {
  const { data, isLoading } = useGetCreatorCourseQuery();
  const navigate = useNavigate();

  if (isLoading) return <h1>Loading</h1>;

  return (
    <div>
      <Button onClick={() => navigate("create")}>Create a new course</Button>
      <Table>
        <TableCaption>A list of your recent courses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.courses?.map((course) => (
            <TableRow key={course._id}>
              <TableCell className="font-medium">
                {course.courseTitle}
              </TableCell>
              <TableCell className="font-bold">
                {course?.coursePrice ? <> ₹ {course?.coursePrice} </> : "NA"}
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    course.isPublished
                      ? "bg-green-200 text-green-600"
                      : "bg-gray-200 text-gray-600"
                  }
                >
                  {course.isPublished ? "Published" : "Draft"}
                </Badge>{" "}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => navigate(`${course._id}`)}
                >
                  <Edit />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseTable;
