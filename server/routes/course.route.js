import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import {
  createCourse,
  editCourse,
  getCourseById,
  getCreatorCourses,
  getPublishedCourses,
  searchCourse,
  togglePublishCourse,
} from "../controllers/course.controller.js";
import { createLecture, editLecture, getCourseLecture, getLectureById, removeLecture } from "../controllers/lecture.controller.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.route("/").post(isAuthenticated, createCourse);
router.route("/search").get(searchCourse);
router.route("/published-courses").get(getPublishedCourses);
router.route("/").get(isAuthenticated, getCreatorCourses);
router.route("/:courseId").put(isAuthenticated,upload.single("courseThumbnail") ,editCourse);
router.route("/:courseId").get(isAuthenticated,getCourseById);


//lecture routes
router.route("/:courseId/lecture").post(isAuthenticated,createLecture);
router.route("/:courseId/lecture").get(isAuthenticated,getCourseLecture);
router.route("/:courseId/lecture/:lectureId").put(isAuthenticated,editLecture);
router.route("/lecture/:lectureId").delete(isAuthenticated,removeLecture);
router.route("/lecture/:lectureId").get(isAuthenticated,getLectureById);


//toggle publish course
router.route("/:courseId").patch(isAuthenticated, togglePublishCourse);

export default router;
