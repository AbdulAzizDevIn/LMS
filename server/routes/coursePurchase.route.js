import express from 'express';
import isAuthenticated from '../middleware/isAuthenticated.js';
import { createCheckoutSession, getAllPurchasedCourse, getCourseDetailsWithPurchaseStatus, verifyPayment } from '../controllers/coursePurchase.controller.js';

const router = express.Router();

router.route("/checkout/create-checkout-session").post(isAuthenticated, createCheckoutSession);
router.route("/checkout/success").post(isAuthenticated, verifyPayment);
router.route("/course/:courseId/detail-with-status").get(isAuthenticated,getCourseDetailsWithPurchaseStatus);

router.route("/").get(getAllPurchasedCourse);

export default router;
