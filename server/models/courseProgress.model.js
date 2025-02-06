import mongoose from "mongoose";

const lectureProgress = new mongoose.Schema({
  lectureId: {
    type: String,
  },
  viewed: {
    type: Boolean,
  },
});

const courseProgress = new mongoose.Schema({
  userId: {
    type: String,
  },
  courseId: {
    type: String,
  },
  completed: {
    type: Boolean,
  },
  lectureProgress: [lectureProgress],
});

export const CourseProgress = mongoose.model("CourseProgress",courseProgress);
