const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
}, { timestamps: true });

// Assure qu'un utilisateur ne peut liker un produit qu'une seule fois
likeSchema.index({ user: 1, product: 1 }, { unique: true });

module.exports = mongoose.model("Like", likeSchema);
