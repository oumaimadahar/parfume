const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

/**
 * Middleware pour protéger les routes.
 * Vérifie que le token JWT est présent et valide.
 * Si valide, ajoute l'utilisateur à req.user.
 */
const protectedRoute = async (req, res, next) => {
  try {
    // Récupère le token depuis l'en-tête Authorization (Bearer token)
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Vérifie et décode le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id).select("-password"); // Ne pas renvoyer le mot de passe
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Passe au prochain middleware ou à la route
    next();
  } catch (error) {
    console.error("❌ Auth error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = protectedRoute;
