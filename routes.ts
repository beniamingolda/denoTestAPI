import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  addProduct,
  deleteProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
} from "./controllers/products.ts";

const router = new Router();

router.get("/api/product", getProducts)
  .get("/api/product/:id", getSingleProduct)
  .patch("/api/product/:id", updateProduct)
  .post("/api/product", addProduct)
  .delete("/api/product/:id", deleteProduct);

export default router;
