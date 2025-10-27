"use client";
import HeaderTop from '@/components/HeaderTop';
import Navbar from '@/components/NavBar';
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Footer from '@/components/footer';

const Man = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [likedProducts, setLikedProducts] = useState([]);
    const [titleIndex, setTitleIndex] = useState(0);
    const titles = ["Masculine Essence", "Strength & Elegance", "Timeless Luxury"];

    useEffect(() => {
        const interval = setInterval(() => {
            setTitleIndex(prev => (prev + 1) % titles.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("http://localhost:7007/api/products");
                const manProducts = res.data.products.filter(
                    p => p.category === "Man" && !p.isNew
                );
                setProducts(manProducts);
            } catch (err) {
                console.error("Erreur récupération produits:", err);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);

    useEffect(() => {
        const storedLikes = localStorage.getItem("likedProducts");
        if (storedLikes) {
            setLikedProducts(JSON.parse(storedLikes));
        }
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
            quantity: qty
        };

        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingItem = existingCart.find(item => item._id === cartItem._id);

        let updatedCart;
        if (existingItem) {
            updatedCart = existingCart.map(item =>
                item._id === cartItem._id
                    ? { ...item, quantity: item.quantity + qty }
                    : item
            );
        } else {
            updatedCart = [...existingCart, cartItem];
        }

        localStorage.setItem("cart", JSON.stringify(updatedCart));
        window.dispatchEvent(new Event("cartUpdated"));
    };

    const goToProductDetails = (id) => {
        router.push(`/products/${id}`);
    };

    return (
        <div>
            <HeaderTop />
            <Navbar />

            {/* Section Hero */}
            <section
                className="relative h-screen flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: "url('/images/shopMan.jpeg')" }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative text-center text-white px-6"
                >
                    <motion.h1 className="text-4xl md:text-6xl font-bold mb-4">
                        Embrace the <span className="text-[#e3ac28]">{titles[titleIndex]}</span>
                    </motion.h1>
                    <motion.p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto text-gray-200">
                        Discover our exclusive men’s fragrance collection — where strength,
                        elegance, and timeless luxury blend into every note.
                    </motion.p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            document.getElementById("manProducts").scrollIntoView({ behavior: "smooth" });
                        }}
                        className="bg-[#e3ac28] text-white font-semibold px-6 py-3 rounded-lg hover:bg-yellow-500 transition"
                    >
                        Discover the Collection
                    </motion.button>
                </motion.div>
            </section>

            {/* Section Produits */}
            <section id="manProducts" className="py-16 px-6 md:px-16">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
                    Men’s Collection
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map(product => {
                        const hasDiscount = product.discount > 0;
                        const discountedPrice = hasDiscount
                            ? (product.price * (100 - product.discount)) / 100
                            : product.price;

                        const isLiked = likedProducts.includes(product._id);

                        return (
                            <motion.div
                                key={product._id}
                                className="relative bg-white rounded-lg shadow-lg overflow-hidden group cursor-pointer"
                                whileHover={{ scale: 1.02 }}
                            >
                                {hasDiscount && (
                                    <div className="absolute top-2 left-2 bg-[#e3ac28] text-white text-xs font-bold px-2 py-1 rounded z-10">
                                        -{product.discount}%
                                    </div>
                                )}

                                <div
                                    className="relative"
                                    onClick={() => goToProductDetails(product._id)}
                                >
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="w-full h-64 object-cover transition duration-500 group-hover:opacity-0"
                                    />
                                    {product.hoverImage && (
                                        <img
                                            src={product.hoverImage}
                                            alt={product.name}
                                            className="w-full h-64 object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition duration-500"
                                        />
                                    )}
                                </div>

                                <div className="p-4 flex flex-col gap-2">
                                    <h3
                                        className="font-semibold text-gray-800 hover:text-[#e3ac28] transition"
                                        onClick={() => goToProductDetails(product._id)}
                                    >
                                        {product.name}
                                    </h3>

                                    {hasDiscount ? (
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-400 line-through">${product.price.toFixed(2)}</span>
                                            <span className="text-[#e3ac28] font-bold">${discountedPrice.toFixed(2)}</span>
                                        </div>
                                    ) : (
                                        <span className="text-gray-800 font-bold">${product.price.toFixed(2)}</span>
                                    )}

                                    <div className="flex justify-between mt-2">
                                        <button
                                            onClick={() => handleLike(product._id)}
                                            className={`p-2 rounded-full border border-gray-300 hover:bg-[#e3ac28] hover:text-white transition ${isLiked ? "bg-[#e3ac28] text-white" : ""}`}
                                        >
                                            <FiHeart />
                                        </button>

                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            className="flex items-center gap-1 bg-[#e3ac28] text-white px-3 py-2 rounded hover:bg-yellow-500 transition"
                                        >
                                            <FiShoppingCart /> Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>
            <Footer/>
        </div>
    );
};

export default Man;
