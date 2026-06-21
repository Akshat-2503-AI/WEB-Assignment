const mongoose = require("mongoose");

    const connectDB = async () => {
        try {
            await mongoose.connect("mongodb+srv://akshatswn_db_user:135791@cluster0.zalkm2u.mongodb.net/?appName=Cluster0", {
            });
            console.log("MongoDB Connected Successfully");
        } catch (error) {
            console.log("MongoDB Connection Failed:", error.message);
            process.exit(1);
        }
    };

    module.exports = connectDB;
