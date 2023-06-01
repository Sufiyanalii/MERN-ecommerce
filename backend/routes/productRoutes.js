import express from "express";
import expressAsyncHandler from "express-async-handler";

import { isAuth, isAdmin } from "../middlewares/auth.js";
import { createProduct, createReview, deleteProduct, getAllProducts, getCatagories, getProductAsPerSlug, getProductById, pagination, SearchProcut, updateProduct } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/",getAllProducts );
productRouter.get("/search",SearchProcut);
productRouter.post("/",isAuth,isAdmin,createProduct);
productRouter.put("/:id",isAuth,isAdmin,updateProduct);
productRouter.delete("/:id",isAuth,isAdmin,deleteProduct);
productRouter.post("/:id/reviews",isAuth,createReview);
productRouter.get("/admin",isAuth,isAdmin, pagination);
productRouter.get("/categories",getCatagories);
productRouter.get("/slug/:slug",getProductAsPerSlug );
productRouter.get("/:id",getProductById );

export default productRouter;
