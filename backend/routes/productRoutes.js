const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer.js"); // Multer Cloudinary
const {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  updatePromotion,
  updateNewStatus,
  getPromotions,
  getNewProducts,
  searchProducts,
  getProductByIdAdmin
} = require("../controllers/productController.js");
const { protectedRoute, verifyAdmin } = require("../middlewares/verifyAdmin.js");

// Routes publiques
router.get("/promotions", getPromotions);
router.get("/new", getNewProducts);
router.get("/", getAllProducts);
router.get("/search", searchProducts); // ✅ ajout ici
router.get("/:id", getProductById);

// Routes admin avec upload de plusieurs fichiers
router.get("/admin/:id", protectedRoute, verifyAdmin, getProductByIdAdmin);

router.post(
  "/",
  protectedRoute,
  verifyAdmin,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "hoverImage", maxCount: 1 }
  ]),
  addProduct
);

router.put(
  "/:id",
  protectedRoute,
  verifyAdmin,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "hoverImage", maxCount: 1 }
  ]),
  updateProduct
);

router.delete("/:id", protectedRoute, verifyAdmin, deleteProduct);
router.put("/:productId/promotion", protectedRoute, verifyAdmin, updatePromotion);
router.put("/:productId/new", protectedRoute, verifyAdmin, updateNewStatus);

module.exports = router;
