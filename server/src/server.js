require("dotenv").config();

const express = require("express");
const cors = require("cors");

const employeeRoutes = require("./routes/employeeRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/employees", employeeRoutes);
const authRoutes = require("./routes/authRoutes");

app.use("/auth", authRoutes);

app.listen(5000, () => {
  console.log("Server Running");
});
