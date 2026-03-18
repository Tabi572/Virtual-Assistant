import dotenv from "dotenv";
import express from "express";
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";

dotenv.config()
const app = express()

const PORT = process.env.PORT || 8000
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)
// app.get("/", (req, res) => {
//   res.send("API is running successfully 🚀");
// });

app.listen(PORT,()=>{ 
    connectDb()
    console.log(`Server running on PORT ${PORT}`);
})