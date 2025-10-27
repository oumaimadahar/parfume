const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        default: 0
    },
    category: {
        type: String
    },
    imageUrl: {
        type: String
    }, // URL vers l'image du produit
    hoverImage: {
        type: String,
        default: "" // optionnel
    },

    // 🆕 Nouveau
    isNew: {
        type: Boolean,
        default: false
    }, // pour les nouveautés
    discount: {
        type: Number,
        default: 0
    },   // pour les promotions (en %)

},
    { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
