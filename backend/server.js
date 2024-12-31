import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/user.route.js";
import productRoutes from "./routes/product.route.js";
import orderRoutes from "./routes/order.route.js";
import { connectDB } from "./connectDB.js";
import membershipRoutes from "./routes/membership.route.js";

dotenv.config();

const app = express();
app.use(express.json());

// CORS Configuration for allowing credentials
const corsOptions = {
  origin: '*', // Allow the specific origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow credentials (cookies, authorization headers)
};

app.use(cors(corsOptions));

app.use("/api/auth/", authRoutes);
app.use("/api/", productRoutes);
app.use("/api/membership", membershipRoutes);	

app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  connectDB();
  console.log(`server connected on port ${PORT}`);
});
