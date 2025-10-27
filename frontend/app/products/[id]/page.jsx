
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { motion } from "framer-motion";
import HeaderTop from "@/components/HeaderTop";
import Navbar from "@/components/NavBar";
import Footer from '@/components/footer';

export default function ProductDetail() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id;

    const [product, setProduct] = useState(null);
    const [user, setUser] = useState(null);
    const [likedProducts, setLikedProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (!id) return;
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:7007/api/products/${id}`);
                setProduct(res.data.product);
            } catch (err) {
                console.error("Error fetching product:", err);
            }
        };
        fetchProduct();
    }, [id]);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));

        const storedLikes = localStorage.getItem("likedProducts");
        if (storedLikes) setLikedProducts(JSON.parse(storedLikes));
    }, []);

    const handleLike = async (id) => {
    if (!user) {
        localStorage.setItem(
            "redirectAfterLogin",
            JSON.stringify({ path: router.asPath, action: "like", productId: id })
        );
        router.push("/auth");
        return;
    }

    setLikedProducts(prev => {
        const updatedLikes = prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id];
        localStorage.setItem("likedProducts", JSON.stringify(updatedLikes));
        setTimeout(() => {
            window.dispatchEvent(new Event("likesUpdated"));
        }, 0);
        return updatedLikes;
    });

    try {
        const token = localStorage.getItem("token");
        await axios.post(`http://localhost:7007/api/likes/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
    } catch (err) {
        console.error(err);
    }
};

    const handleQuantityChange = (type) => {
        setQuantity(prev => {
            if (!product) return prev;
            if (type === "increase") return Math.min(prev + 1, product.stock || Infinity);
            return Math.max(1, prev - 1);
        });
    };

    const handleAddToCart = (product, qty = 1) => {
        if (!user) {
            router.push("/auth");
            return;
        }

        const cartItem = {
            _id: product._id,
            name: product.name,
            price: product.price,
            discount: product.discount || 0,
            imageUrl: product.imageUrl,
            quantity: qty,
        };

        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingItem = existingCart.find(item => item._id === cartItem._id);

        let updatedCart;
        if (existingItem) {
            updatedCart = existingCart.map(item =>
                item._id === cartItem._id
                    ? { ...item, quantity: Math.min(item.quantity + qty, product.stock || Infinity) }
                    : item
            );
        } else {
            updatedCart = [...existingCart, cartItem];
        }

        localStorage.setItem("cart", JSON.stringify(updatedCart));
        window.dispatchEvent(new Event("cartUpdated"));
    };

    const handleOrderNow = () => {
    if (!user) {
        router.push("/auth");
        return;
    }

    // Vérifier si le produit est déjà dans le panier
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const inCart = existingCart.some(item => item._id === product._id);

    if (!inCart) {
        alert("Please add the product to your cart before proceeding to order.");
        return;
    }

    // Produit direct pour checkout
    const directProduct = {
        _id: product._id,
        name: product.name,
        price: product.price,
        discount: product.discount || 0,
        imageUrl: product.imageUrl,
        quantity: quantity,
    };

    localStorage.setItem("directProduct", JSON.stringify(directProduct));
    window.dispatchEvent(new Event("directProductUpdated"));

    router.push("/checkout");
};



    if (!product)
        return (
            <div>
                <HeaderTop />
                <Navbar />
                <p className="text-center py-20">Loading product details…</p>
            </div>
        );

    const hasDiscount = product.discount > 0;
    const discountedPrice = hasDiscount ? (product.price * (100 - product.discount)) / 100 : product.price;
    const isLiked = likedProducts.includes(product._id);

    return (
        <div>
            <HeaderTop />
            <Navbar />
            <div className="min-h-screen bg-white px-6 md:px-16 py-12">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
                    <div className="flex-1 relative group">
                        <motion.img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-[500px] object-cover rounded-lg transition duration-500 group-hover:opacity-0"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        />
                        {product.hoverImage && (
                            <img
                                src={product.hoverImage}
                                alt={product.name}
                                className="w-full h-[500px] object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition duration-500 rounded-lg"
                            />
                        )}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 flex flex-col gap-6"
                    >
                        <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>

                        {product.description && (
                            <div>
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">Description</h3>
                                <p className="text-black leading-relaxed text-justify">{product.description}</p>
                            </div>
                        )}

                        {product.category && (
                            <p className="text-lg text-gray-700 font-medium">
                                Category: <span className="text-black">{product.category}</span>
                            </p>
                        )}

                        {hasDiscount ? (
                            <div className="flex items-center gap-4">
                                <span className="text-gray-400 line-through text-lg">${product.price.toFixed(2)}</span>
                                <span className="text-[#e3ac28] font-bold text-3xl">${discountedPrice.toFixed(2)}</span>
                            </div>
                        ) : (
                            <span className="text-gray-800 font-bold text-3xl">${product.price.toFixed(2)}</span>
                        )}

                        <div className="mt-4">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Quantity</h3>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => handleQuantityChange("decrease")}
                                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-lg font-bold hover:bg-gray-300 disabled:opacity-50"
                                    disabled={quantity <= 1}
                                >
                                    -
                                </button>
                                <span className="text-xl font-semibold">{quantity}</span>
                                <button
                                    onClick={() => handleQuantityChange("increase")}
                                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-lg font-bold hover:bg-gray-300 disabled:opacity-50"
                                    disabled={quantity >= (product.stock || Infinity)}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 mt-4">
                            <button
                                onClick={() => handleLike(product._id)}
                                className={`p-3 rounded-full border border-gray-300 transition hover:bg-[#e3ac28] hover:text-white ${isLiked ? "bg-[#e3ac28] text-white" : ""}`}
                            >
                                <FiHeart size={24} />
                            </button>

                            <button
                                onClick={() => handleAddToCart(product, quantity)}
                                className="flex items-center gap-2 bg-[#e3ac28] text-white px-6 py-3 rounded-lg hover:bg-yellow-500 transition"
                            >
                                <FiShoppingCart size={20} /> Add to Cart
                            </button>

                            <button
                                onClick={handleOrderNow}
                                className="flex items-center gap-2 bg-white text-[#e3ac28] px-6 py-3 rounded-lg border border-[#e3ac28] hover:bg-yellow-500 hover:text-white transition"
                            >
                                Order Now
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

