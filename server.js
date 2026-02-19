const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

/* ======================
   MIDDLEWARE
====================== */
app.use(express.json());
app.use(express.static("public")); // serve website

/* ======================
   EMAIL SETUP
====================== */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* ======================
   BUY ROUTE
====================== */
app.post("/buy", async (req, res) => {
  const { product, price } = req.body;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // seller email
      subject: "🧾 New Grocery Order",
      html: `
        <h2>New Order Received</h2>
        <p><b>Product:</b> ${product}</p>
        <p><b>Price:</b> ₹${price}</p>
        <p><b>Time:</b> ${new Date().toLocaleString()}</p>
      `,
    });

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Email failed" });
  }
});

/* ======================
   START SERVER
====================== */
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
