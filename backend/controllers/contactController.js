const ContactMessage = require("../models/ContactMessage");

const createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newMessage = new ContactMessage({ name, email, message });
    await newMessage.save();

    return res.status(201).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
// Lire tous les messages
const getMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ date: -1 }); // Les plus récents en premier
    return res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

// Supprimer un message par son ID
const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await ContactMessage.findById(id);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    await message.deleteOne();

    return res.status(200).json({ success: true, message: "Message deleted successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createMessage, getMessages, deleteMessage };
