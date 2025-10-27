const express = require("express");
const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUsers,
  deleteUserByAdmin
} = require("../controllers/UserAuth.js");

const { protectedRoute, verifyAdmin } = require("../middlewares/authMiddleware.js");

const router = express.Router();

// ✅ Routes publiques
router.post("/register", registerUser);
router.post("/login", loginUser);

// ✅ Routes protégées
router.get("/profile", protectedRoute, (req, res) => {
  res.json({ message: "Profile fetched successfully", user: req.user });
});
router.put("/update", protectedRoute, updateUser);
router.delete("/delete", protectedRoute, deleteUser);

// ✅ Route admin
router.get("/admin/all-users", protectedRoute, verifyAdmin, getAllUsers);
// Route admin pour supprimer un utilisateur par ID
router.delete("/admin/delete-user/:id", protectedRoute, verifyAdmin, deleteUserByAdmin);


module.exports = router;
