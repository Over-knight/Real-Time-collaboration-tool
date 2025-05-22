import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import http from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
// import morgan from "morgan";


import authRoutes from "./routes/authRoute";

const app = express();
const PORT = process.env.PORT || 6000;

//middlewares
app.use(helmet());                                         // secure headers
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" })); // enable CORS
app.use(express.json({ limit: "10kb" }));


app.use("/api/auth",authRoutes);


app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Not Found" });
});


app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server Error" });
});


const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("MONGO_URI is not defined in .env");
  process.exit(1);
}

;(async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    } as mongoose.ConnectOptions);

    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
})();
