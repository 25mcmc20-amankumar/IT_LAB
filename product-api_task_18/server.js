const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

require("./config/db");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});