import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import {
  getCourseProgress,
  markAsCompleted,
  markAsIncomplete,
  updateLectureProgress,
} from "../controllers/courseProgress.controller.js";

const router = express.Router();

router.route("/:courseId").get(isAuthenticated, getCourseProgress);
router.route("/:courseId/lecture/:lectureId/view").post(isAuthenticated, updateLectureProgress);
router.route("/:courseId/complete").post(isAuthenticated,markAsCompleted);
router.route("/:courseId/incomplete").post(isAuthenticated,markAsIncomplete);

export default router;