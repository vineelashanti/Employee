const verifyToken = require("../middleware/authMiddleware");

const express = require("express");

const router = express.Router();

const {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

router.get("/", verifyToken, getEmployees);

router.post("/", verifyToken, createEmployee);

router.put("/:id", verifyToken, updateEmployee);

router.delete("/:id", verifyToken, deleteEmployee);
module.exports = router;
