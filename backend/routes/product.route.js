import express from "express";
import { getProducts, getProductsBasedOnCategory, getSpecificProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/shop",getProducts);
router.get("/shop/:name",getSpecificProduct);
router.get("/product-category/:category",getProductsBasedOnCategory);

export default router;
