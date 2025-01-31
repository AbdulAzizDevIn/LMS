import { response } from "express";
import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import { deleteVideoFromCloudinary } from "../utils/cloudinary.js";

export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;

    if (!lectureTitle || !courseId) {
      return res.status(400).json({
        message: `Lecture title is required`,
      });
    }

    const lecture = await Lecture.create({ lectureTitle });

    const course = await Course.findById(courseId);

    if (course) {
      course.lectures.push(lecture._id);
      await course.save();
    }

    return res.status(201).json({
      lecture,
      message: "Lecture created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create lecture",
    });
  }
};

export const getCourseLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate("lectures");
    if (!course) {
      res.status(404).json({
        message: "Course not found",
      });
    }
    return res.status(200).json({
      lectures: course.lectures,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get lecture",
    });
  }
};

export const editLecture = async (req, res) => {
  try {
    const { lectureTitle, isPreviewFree, videoInfo } = req.body;
    const { courseId, lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found!",
      });
    }
    //update lecture

    if (lectureTitle) {
      lecture.lectureTitle = lectureTitle;
    }

    if (videoInfo.videoUrl) {
      lecture.videoUrl = videoInfo.videoUrl;
    }

    if (videoInfo.publicId) {
      lecture.publicId = videoInfo.publicId;
    }
    if (isPreviewFree) {
      lecture.isPreviewFree = isPreviewFree;
    }

    await lecture.save();

    const course = await Course.findById(courseId);

    if (course && !course.lectures.includes(lecture._id)) {
      course.lectures.push(lectureId._id);
      await course.save();
    }
    return res.status(200).json({
      lecture,
      message: "Lecture edited successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to edit lecture",
    });
  }
};

export const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findByIdAndDelete(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found",
      });
    }
    //delete lecture from cloudinary

    if (lecture.publicId) {
      await deleteVideoFromCloudinary(lecture.publicId);
    }
    //remove lecture from course
    await Course.updateOne(
      { lectures: lectureId }, //find course that has the lecture
      {$pull:{lectures:lectureId}} //remove lecture from course
    );

    return res.status(200).json({
      message: "Lecture removed successfully",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to remove lecture",
    });
  }
};

export const getLectureById = async (req, res) => {
  try {
    const {lectureId} = req.params;
    const lecture = await Lecture.findById(lectureId);
    res.status(200).json({
      lecture,
      message: "Lecture fetched successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get lecture by id",
    });
  }
}
