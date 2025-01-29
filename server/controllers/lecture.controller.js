import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";

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
        message:"Lecture created successfully"
    });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create lecture",
    });
  }
};

export const getCourseLecture = async (req,res) => {
  try {
    const {courseId} = req.params;
    const course = await Course.findById(courseId).populate("lectures");
    if(!course){
      res.status(404).json({
        message:"Course not found"
      })
    }
    return res.status(200).json({
      lectures:course.lectures,
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get lecture",
    });
  }
}

export const editLecture = async (req,res)=>{
  try {
    const {lectureTitle,isPreviewFree,videoInfo} = req.body;
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to edit lecture",
    });
  }
}
