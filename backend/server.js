import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/user.route.js";
import productRoutes from "./routes/product.route.js";
import { connectDB } from "./connectDB.js";

dotenv.config();

const app = express();
app.use(express.json());

// CORS Configuration for allowing credentials
const corsOptions = {
  origin: 'http://localhost:5175', // Allow the specific origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow credentials (cookies, authorization headers)
};

app.use(cors(corsOptions));

app.use("/api/auth/", authRoutes);
app.use("/api/", productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`server connected on port ${PORT}`);
});
