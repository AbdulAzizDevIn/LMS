import express from 'express';
import isAuthenticated from '../middleware/isAuthenticated.js';
import { createCheckoutSession, verifyPayment } from '../controllers/coursePurchase.controller.js';

const router = express.Router();

router.route("/checkout/create-checkout-session").post(isAuthenticated, createCheckoutSession);
router.route("/checkout/success").post(isAuthenticated, verifyPayment);

router.route("/").get();

export default router;
