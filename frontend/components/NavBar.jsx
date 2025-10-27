
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiHeart, FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { BiUser, BiLogOut } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { RiFolderLine } from "react-icons/ri";


const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [likedProducts, setLikedProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const router = useRouter();
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));

    const updateLikes = () => {
      const saved = localStorage.getItem("likedProducts");
      setLikedProducts(saved ? JSON.parse(saved) : []);
    };

    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.length);
    };

    updateLikes();
    updateCart();

    window.addEventListener("likesUpdated", updateLikes);
    window.addEventListener("cartUpdated", updateCart);

    return () => {
      window.removeEventListener("likesUpdated", updateLikes);
      window.removeEventListener("cartUpdated", updateCart);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?q=${search.trim()}`);
      setSearch("");
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setUserDropdown(false);
    router.push("/auth");
  };

  return (
    <nav className="bg-white border-b border-gray-200 relative">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* LOGO */}
        <div>
          <img src="/images/logo1.png" alt="Logo" width={150} height={50} />
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-10 items-center">
          <div className="flex w-fit gap-10 mx-auto font-medium py-4 lg:mr-25 text-black">
            <Link className="navbar_link relative" href="/">
              Home
            </Link>
            <Link className="navbar_link relative" href="/about">
              About
            </Link>
            <div className="relative">
              {/* Bouton Shop */}
              <button
                className="flex items-center gap-1 navbar_link relative"
                onClick={() => setIsOpen(!isOpen)}
              >
                Shop <FiChevronDown />
              </button>

              {/* Sous-menu */}
              {isOpen && (
                <div className="absolute top-full left-0 flex flex-col bg-[#ffffff13] shadow-lg rounded-md mt-2 min-w-[150px] z-50">
                  <Link
                    href="/shop/women"
                    className="block px-4 py-2 hover:text-[#e3ac28]"
                    onClick={() => setIsOpen(false)}
                  >
                    Women
                  </Link>
                  <Link
                    href="/shop/men"
                    className="block px-4 py-2 hover:text-[#e3ac28]"
                    onClick={() => setIsOpen(false)}
                  >
                    Men
                  </Link>
                  <Link
                    href="/shop/bakhoor"
                    className="block px-4 py-2 hover:text-[#e3ac28]"
                    onClick={() => setIsOpen(false)}
                  >
                    Bakhoor
                  </Link>
                  <Link
                    href="/shop/hair-perfumes"
                    className="block px-4 py-2 hover:text-[#e3ac28]"
                    onClick={() => setIsOpen(false)}
                  >
                    Hair Perfumes
                  </Link>
                  <Link
                    href="/shop/gift-sets"
                    className="block px-4 py-2 hover:text-[#e3ac28]"
                    onClick={() => setIsOpen(false)}
                  >
                    Gift Sets
                  </Link>
                </div>
              )}
            </div>



            <Link className="navbar_link relative" href="/contact">
              Contact
            </Link>
          </div>

          {/* Search + icons */}
          <div className="flex items-center gap-4">
            <form onSubmit={handleSearch} className="relative w-[250px]">
              <input
                type="text"
                placeholder="Enter product name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-black p-2 pl-4 pr-10 rounded-lg w-full"
              />
              <button type="submit">
                <BsSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black" size={20} />
              </button>
            </form>

            {/* User dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <BiUser className="text-2xl" />
                {user && <span className="text-sm">{user.firstName}</span>}
              </button>

              {userDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border shadow-lg rounded-lg py-2 z-50">
                  {user ? (
                    <>
                      <Link href="/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                        <BiUser /> Profile
                      </Link>
                      <Link href="/my-orders" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                        <RiFolderLine /> My Orders

                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        <BiLogOut /> Logout
                      </button>
                    </>
                  ) : (
                    <Link href="/auth" className="block px-4 py-2 hover:bg-gray-100">Login / Register</Link>
                  )}
                </div>
              )}
            </div>

            {/* Likes */}
            <Link href="/favoritesPage">
              <div className="relative cursor-pointer">
                <FiHeart className="text-2xl" />
                <span className="bg-[#e3ac28] rounded-full absolute -top-2 -right-2 w-[18px] h-[18px] text-white text-[12px] grid place-items-center">
                  {likedProducts.length}
                </span>
              </div>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <div className="relative cursor-pointer">
                <HiOutlineShoppingBag className="text-2xl" />
                <span className="bg-[#e3ac28] rounded-full absolute -top-2 -right-2 w-[18px] h-[18px] text-white text-[12px] grid place-items-center">
                  {cartCount}
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Burger menu */}
        <button className="lg:hidden text-2xl text-black" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden flex flex-col gap-4 px-6 py-4 bg-white shadow-md ">
          <Link className="hover:text-[#e3ac28]" onClick={() => setIsOpen(false)} href="/">Home</Link>
          <Link className="hover:text-[#e3ac28]" onClick={() => setIsOpen(false)} href="/about">About</Link>

          {/* Shop avec sous-menu mobile */}
          <div>
            <button
              onClick={() => setShopOpen(!shopOpen)}
              className="flex justify-between w-full items-center text-left hover:text-[#e3ac28]"
            >
              Shop <FiChevronDown className="ml-2" />
            </button>
            {shopOpen && (
              <div className="flex flex-col ml-4 mt-2 gap-2">
                <Link className="hover:text-[#e3ac28]" onClick={() => setIsOpen(false)} href="/shop/women">Women</Link>
                <Link className="hover:text-[#e3ac28]" onClick={() => setIsOpen(false)} href="/shop/men">Men</Link>
                <Link className="hover:text-[#e3ac28]" onClick={() => setIsOpen(false)} href="/shop/bakhoor">Bakhoor</Link>
                <Link className="hover:text-[#e3ac28]" onClick={() => setIsOpen(false)} href="/shop/hair-perfumes">Hair Perfumes</Link>
                <Link className="hover:text-[#e3ac28]" onClick={() => setIsOpen(false)} href="/shop/gift-sets">Gift Sets</Link>
              </div>
            )}
          </div>

          <Link className="hover:text-[#e3ac28]" onClick={() => setIsOpen(false)} href="/contact">Contact</Link>

          {/* Recherche mobile */}
          <form onSubmit={handleSearch} className="relative w-full mt-2">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-black p-2 pl-4 pr-10 rounded-lg w-full"
            />
            <button type="submit">
              <BsSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black" size={20} />
            </button>
          </form>



          {/* Icônes mobiles */}
          <div className="flex gap-4 mt-3 text-2xl">
            {/* User / Profile / My Orders / Logout */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <BiUser className="text-2xl" />
                {user && <span className="text-sm">{user.firstName}</span>}
              </button>

              {userDropdown && (
                <div className="absolute left-0 mt-2 w-48 bg-white border shadow-lg rounded-lg py-2 z-50">
                  {user ? (
                    <>
                      <Link href="/profile" className="flex items-center gap-2 px-4 py-2 text-[18px] hover:bg-gray-100">
                        <BiUser /> Profile
                      </Link>
                      <Link href="/my-orders" className="flex items-center gap-2 px-4 py-2 text-[18px] hover:bg-gray-100">
                        <RiFolderLine /> My Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full text-left px-4 py-2 text-[18px] hover:bg-gray-100"
                      >
                        <BiLogOut /> Logout
                      </button>
                    </>
                  ) : (
                    <Link href="/auth" className="block px-2 py-2 text-[14px] hover:bg-gray-100">Login / Register</Link>
                  )}
                </div>
              )}
            </div>

            {/* Likes */}
            <Link href="/favoritesPage" className="relative cursor-pointer">
              <FiHeart className="text-2xl" />
              <span className="bg-[#e3ac28] rounded-full absolute -top-2 -right-2 w-[18px] h-[18px] text-white text-[12px] grid place-items-center">
                {likedProducts.length}
              </span>
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative cursor-pointer">
              <HiOutlineShoppingBag className="text-2xl" />
              <span className="bg-[#e3ac28] rounded-full absolute -top-2 -right-2 w-[18px] h-[18px] text-white text-[12px] grid place-items-center">
                {cartCount}
              </span>
            </Link>
          </div>


        </div>
      )}
    </nav>
  );
};

export default NavBar;
