const express = require("express");
const cors = require("cors");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
} 

const { connectDB } = require("./config/db");
const User = require("./models/User");
const Note = require("./models/Note");
const { sequelize } = require("./config/db");

// ✅ ADD ROUTES HERE
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");

const app = express();

// Middlewares
// app.use(cors());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());

// Connect Database
connectDB();

// Sync Models (CREATE TABLES)
sequelize.sync({ alter: true })
    .then(() => console.log("Database synced 🚀"))
    .catch((err) => console.log(err));

// ✅ ADD ROUTE MIDDLEWARE HERE (IMPORTANT)
app.use("/api/auth", authRoutes); 
app.use("/api/notes", noteRoutes);   

// Test Route
app.get("/", (req, res) => {
res.send("Secure Notes API is running 🚀");
});

// Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});

