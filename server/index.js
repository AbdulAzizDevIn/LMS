import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/coursePurchase.route.js";
import CourseProgressRoute from "./routes/courseProgress.route.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to the database
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "https://lms-ovvc.onrender.com",
    credentials: true,
  })
);

// API routes
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", CourseProgressRoute);

// Serve static files for deployment
app.use(express.static(path.join(__dirname, "..", "client", "dist")));


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "client", "dist", "index.html"));
  });
  ;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
