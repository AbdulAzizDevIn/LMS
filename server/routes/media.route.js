import express from "express";
import upload from "../utils/multer.js";
import { deleteMediaFromCloudinary, deleteVideoFromCloudinary, uploadMedia } from "../utils/cloudinary.js";
import { Lecture } from "../models/lecture.model.js";

const router = express.Router();

router.route("/upload-video").post(upload.single("file"), async (req, res) => {
  try {
    const { lectureId } = req.body;
    console.log(lectureId);
    
    const videoFile = req.file;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found",
      });
    }
    let result;
    if (videoFile) {
      if (lecture.publicId) {
        await deleteVideoFromCloudinary(lecture.publicId);
      }
      result = await uploadMedia(videoFile.path);
    }

    res.status(200).json({
      success: true,
      message: "File uploaded successfully.",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to upload file",
    });
  }
});

export default router;
