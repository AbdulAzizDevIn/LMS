import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  useEditLectureMutation,
  useGetLectureByIdQuery,
  useRemoveLectureMutation,
} from "@/features/api/courseApi";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const MEDIA_API = "http://localhost:8000/api/v1/media";

const LectureTab = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);
  const params = useParams();
  const { courseId, lectureId } = params;

  // this for get lecture
  const { data: lectureData, isLoading: lectureLoading } =
    useGetLectureByIdQuery(lectureId);

  const lecture = lectureData?.lecture;
  useEffect(() => {
    if (lecture) {
      setLectureTitle(lecture.lectureTitle);
      setIsFree(lecture.isPreviewFree);
      setUploadVideoInfo({
        videoUrl: lecture.videoUrl,
        publicId: lecture.publicId,
      });
    }
  }, [lecture]);

  // this for editing lecture
  const [editLecture, { data, isLoading, error, isSuccess }] =
    useEditLectureMutation();

  // this for removing lecture
  const [
    removeLecture,
    { isLoading: removeLoading, data: removeData, isSuccess: removeSuccess },
  ] = useRemoveLectureMutation();

  const editLectureHandler = async () => {
    await editLecture({
      lectureTitle: lectureTitle,
      isPreviewFree: isFree,
      videoInfo: uploadVideoInfo,
      courseId,
      lectureId,
    });
  };

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("lectureId", lectureId);
      setMediaProgress(true);
      try {
        const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / total));
          },
        });
        if (res.data.success) {
          setUploadVideoInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.public_id,
          });
          setBtnDisable(false);
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Video Upload Failed");
      } finally {
        setMediaProgress(false);
      }
    }
  };

  const removeLectureHandler = async () => {
    await removeLecture(lectureId);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
    }
    if (error) {
      toast.error(data.message);
    }
  }, [isSuccess, error]);

  useEffect(() => {
    if (removeSuccess) {
      toast.success(removeData.message || "Lecture removed successfully");
    }
  }, [removeSuccess]);
  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>
            Make changes and click save when done
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button
            disabled={removeLoading}
            onClick={removeLectureHandler}
            variant="destructive"
          >
            {removeLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </>
            ) : (
              <>Remove Lecture</>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Ex. Introduction to Java"
          />
        </div>
        <div className="my-5">
          <Label>
            Video <span className="text-red-700">*</span>
          </Label>
          <Input
            type="file"
            accept="video/*"
            onChange={fileChangeHandler}
            className="w-fit"
          />
        </div>
        <div className="flex items-center space-x-2 my-5">
          <Switch id="" />
          <Label>Is this video FREE?</Label>
        </div>

        {!uploadVideoInfo ? (
          <Loader2 className="h-8 w-8 animate-spin" />
        ) : (
          <video autoPlay muted controls>
            <source src={uploadVideoInfo?.videoUrl} type="video/mp4" />
            <source src={uploadVideoInfo?.videoUrl} type="video/webm" />
            <source src={uploadVideoInfo?.videoUrl} type="video/ogg" />
          </video>
        )}

        {mediaProgress && (
          <div className="my-4">
            <Progress value={uploadProgress} />
            <p>{uploadProgress}%</p>
          </div>
        )}

        <div className="mt-4">
          <Button disabled={btnDisable} onClick={editLectureHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </>
            ) : (
              <>Update Lecture</>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
