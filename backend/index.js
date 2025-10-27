const express = require("express");
const cors = require("cors");
const connectdata = require("./config/db.js");
const userRoutes = require("./routes/userAuthRroutes.js");
const productRoutes = require("./routes/productRoutes.js");
const cartRoutes = require("./routes/cartRoutes.js");
const likeRoutes = require("./routes/likeRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");
const paymentRoutes = require("./routes/paymentRoutes.js");
const contactRoutes = require("./routes/contactRoutes");



require("dotenv").config();

const app = express();
const port = process.env.EXPRESS_PORT ;

connectdata();
app.use(cors());
app.use(express.json());


// ✅ Routes
app.use("/api/auth", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api", contactRoutes); // ← contact route ajoutée


app.get("/", (req, res) => {
  res.send("<h1>HELLO POSTMAN</h1>");
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
app.use("/uploads", express.static("uploads"));
