const mongoose = require("mongoose");

require("dotenv").config()

const connectDb = async () => {
    try {
        await
            mongoose.connect(process.env.MONGO_URL)
        console.log('\x1b[42m%s\x1b[0m', "MongoDB Connected")
    } catch (error) {
        console.log('\x1b[41m%s\x1b[0m', "error at MongoDB Connected", error)
        process.exit(1)
    }
}

module.exports = connectDb;