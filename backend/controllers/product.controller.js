import Product from "../models/product.model.js";
import { connectDB } from "../connectDB.js";
import dotenv from "dotenv";

dotenv.config();
connectDB();

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log("Error in getProducts controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getSpecificProduct = async (req, res) => {
  try {
    const { name } = req.params;
    const specificProduct = await Product.findOne({ name: name });
    console.log(specificProduct);
    res.status(200).json({ success: true, specificProduct });
  } catch (error) {
    console.log("Error in getSpecificProduct controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getProductsBasedOnCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const productsBasedOnCategory = await Product.find({ AgeGroup: category });
    console.log(productsBasedOnCategory);
    res.status(200).json({
      success: true,
      productsBasedOnCategory,
    });
  } catch (error) {
    console.log(
      "Error in getProductsBasedOnCategory controller",
      error.message
    );
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
