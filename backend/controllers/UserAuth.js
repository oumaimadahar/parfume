const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

// ==========================
// ✅ REGISTER
// ==========================
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, gender, email, password, phone, address, role } = req.body;

    if (!firstName || !lastName || !gender || !email || !password || !phone) {
      return res.status(400).json({
        message: "firstName, lastName, gender, email, password, and phone are required",
      });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const passHashed = await bcrypt.hash(password, 10);

    // ✅ Admin automatique si l'email correspond à celui du .env
    const isAdminAccount = email === process.env.ADMIN_EMAIL;

    const newUser = await User.create({
      firstName,
      lastName,
      gender,
      email,
      password: passHashed,
      phone,
      address,
      role: isAdminAccount ? "admin" : (role || "user"),
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        gender: newUser.gender,
        email: newUser.email,
        phone: newUser.phone,
        address: newUser.address,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("❌ Error during user registration:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ==========================
// ✅ LOGIN
// ==========================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" });

    const userExist = await User.findOne({ email });
    if (!userExist)
      return res.status(400).json({ message: "Invalid credentials" });

    const isPassMatch = await bcrypt.compare(password, userExist.password);
    if (!isPassMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // ✅ Ajout du rôle dans le token
    const token = jwt.sign(
      { id: userExist._id, role: userExist.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.EXPIRE_JWT }
    );

    const { password: _, ...userData } = userExist.toObject();

    res.json({
      message: "Login successful",
      token,
      user: userData,
    });
  } catch (error) {
    console.error("Error at login:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ==========================
// ✅ UPDATE USER
// ==========================
const updateUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const updates = req.body;

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    // ⚠️ Empêche un user normal de changer son rôle
    if (updates.role && req.user.role !== "admin") {
      delete updates.role;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ==========================
// ✅ DELETE USER
// ==========================
const deleteUser = async (req, res) => {
  try {
    const userId = req.user._id;
    await User.findByIdAndDelete(userId);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ==========================
// ✅ ADMIN - GET ALL USERS
// ==========================
const getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: admin only" });
    }

    const users = await User.find().select("-password");
    res.json({ message: "Users fetched successfully", users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// ==========================
// ✅ ADMIN - DELETE USER BY ID
// ==========================
const deleteUserByAdmin = async (req, res) => {
  try {
    const userId = req.params.id;

    // Empêcher l'admin de se supprimer lui-même
    if (userId === req.user._id.toString()) {
      return res.status(400).json({ message: "You cannot delete your own admin account!" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser, loginUser, updateUser, deleteUser, getAllUsers,deleteUserByAdmin };
