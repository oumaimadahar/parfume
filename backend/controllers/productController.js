const Product = require("../models/Product.js");
const cloudinary = require("../config/cloudinary.js");
const User = require("../models/user.js");
const sendEmail = require("../utils/sendEmail.js");

// ✅ Ajouter un produit avec image principale et hover
const addProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, isNew, discount } = req.body;

    let imageUrl = "";
    let hoverImage = "";

    // 🔹 Image principale
    if (req.files && req.files.image) {
      const result = await cloudinary.uploader.upload(req.files.image[0].path, {
        folder: "products",
      });
      imageUrl = result.secure_url;
    }

    // 🔹 Image hover
    if (req.files && req.files.hoverImage) {
      const result = await cloudinary.uploader.upload(req.files.hoverImage[0].path, {
        folder: "products",
      });
      hoverImage = result.secure_url;
    }

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      isNew,
      discount,
      imageUrl,
      hoverImage,
    });

    // 🔔 Envoyer email si nouveau produit
    if (isNew === "true" || isNew === true) {
      const users = await User.find({}, "email");
      const recipients = users.map(u => u.email);

      if (recipients.length > 0) {
        await sendEmail({
          to: recipients,
          subject: `🆕 Nouveau produit : ${name}`,
          text: `Découvrez notre nouveau produit "${name}" disponible dès maintenant !`,
          html: `<h2>Nouveau produit disponible 🎉</h2>
                 <p><strong>${name}</strong> vient d'être ajouté à notre collection.</p>
                 <p><a href="${process.env.FRONTEND_URL}/products/${product._id}">View Product</a></p>`,
        });
      }
    }

    res.status(201).json({ message: "✅ Product added successfully", product });
  } catch (err) {
    console.error("❌ Error adding product:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Récupérer tous les produits
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Récupérer un produit par ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Mettre à jour un produit (image principale + hover)
const updateProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Image principale
    if (req.files && req.files.image) {
      const result = await cloudinary.uploader.upload(req.files.image[0].path, {
        folder: "products",
      });
      product.imageUrl = result.secure_url;
    }

    // Image hover
    if (req.files && req.files.hoverImage) {
      const result = await cloudinary.uploader.upload(req.files.hoverImage[0].path, {
        folder: "products",
      });
      product.hoverImage = result.secure_url;
    }

    if (name) product.name = name;
    if (price) product.price = Number(price);
    if (stock) product.stock = Number(stock);

    await product.save();

    res.json({ message: "✅ Product updated successfully", product });
  } catch (err) {
    console.error("❌ Error updating product:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Supprimer un produit
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "✅ Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Mettre à jour une promotion et envoyer un email
const updatePromotion = async (req, res) => {
  try {
    const { productId } = req.params;
    const { discount } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.discount = discount;
    await product.save();

    if (discount > 0) {
      const users = await User.find({}, "email");
      const recipients = users.map(u => u.email);

      if (recipients.length > 0) {
        await sendEmail({
          to: recipients,
          subject: `🔥 Promotion sur ${product.name}`,
          text: `Profitez d'une réduction de ${discount}% sur le produit "${product.name}" !`,
          html: `<h2>🔥 Nouvelle promotion disponible !</h2>
                 <p>Le produit <strong>${product.name}</strong> est maintenant à <strong>- ${discount}%</strong>.</p>
                 <p><a href="${process.env.FRONTEND_URL}/products/${product._id}">Profiter de l’offre</a></p>`,
        });
      }
    }

    res.json({ message: "✅ Promotion updated", product });
  } catch (error) {
    console.error("❌ Error updating promotion:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Mettre à jour le statut nouveauté
const updateNewStatus = async (req, res) => {
  try {
    const { productId } = req.params;
    const { isNew } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.isNew = isNew;
    await product.save();

    res.json({ message: "✅ New status updated", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Récupérer tous les produits en promotion
const getPromotions = async (req, res) => {
  try {
    const products = await Product.find({ discount: { $gt: 0 } });
    res.json({ promotions: products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Récupérer toutes les nouveautés
const getNewProducts = async (req, res) => {
  try {
    const products = await Product.find({ isNew: true });
    res.json({ newProducts: products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ✅ Rechercher un produit (par nom, catégorie ou description)
const searchProducts = async (req, res) => {
  try {
    const { q } = req.query; // exemple : /api/products/search?q=dior

    if (!q || q.trim() === "") {
      return res.status(400).json({ message: "Veuillez entrer un terme de recherche." });
    }

    // Recherche insensible à la casse dans plusieurs champs
    const products = await Product.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
      ],
    });

    if (products.length === 0) {
      return res.status(404).json({ message: "Aucun produit trouvé." });
    }

    res.status(200).json({ results: products });
  } catch (err) {
    console.error("❌ Erreur lors de la recherche :", err);
    res.status(500).json({ message: err.message });
  }
};
// ✅ Récupérer un produit par ID (admin)
const getProductByIdAdmin = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ product });
  } catch (err) {
    console.error("❌ Error fetching product admin:", err);
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
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
  getProductByIdAdmin,
};
