import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js"
import courseRoute from "./routes/course.route.js"
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/coursePurchase.route.js";
import CourseProgressRoute from "./routes/courseProgress.route.js"
import path from "path";

dotenv.config({})

//call database
connectDB();
const app = express();

const PORT = process.env.PORT || 3000;

//for deployment
const dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin:"https://lms-ovvc.onrender.com",
    credentials:true
}))
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user",userRoute);
app.use("/api/v1/course",courseRoute);
app.use("/api/v1/purchase",purchaseRoute);
app.use("/api/v1/progress",CourseProgressRoute);

//for deployment
app.use(express.static(path.join(dirname,"/client/dist")));
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,"client","dist","index.html"))
})

app.listen(PORT,()=>{
    console.log(`Server listen ${PORT}`);
    
})