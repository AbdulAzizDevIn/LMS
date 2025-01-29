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
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import { useState } from "react";

const LectureTab = () => {
  const [title, setTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDiable, setBtnDiable] = useState(true);

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file",file);
      setMediaProgress(true)
      try {
        
      } catch (error) {
        
      }
    }
  };

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
          <Button variant="destructive">Remove Lecture</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <Label>Title</Label>
          <Input type="text" placeholder="Ex. Introduction to Java" />
        </div>
        <div className="my-5">
          <Label>
            Video <span className="text-red-700">*</span>
          </Label>
          <Input type="file" accept="video/*" className="w-fit" />
        </div>
        <div className="flex items-center space-x-2 my-5">
          <Switch id="" />
          <Label>Is this video FREE?</Label>
        </div>
        <div className="mt-4">
          <Button>Update Lecture</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
