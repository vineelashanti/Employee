const express = require("express");
const router = express.Router();

const prisma = require("../prismaClient");

router.get("/", async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();

    res.json(employees);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching employees" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, email, contact_number } = req.body;

    const employee = await prisma.employee.create({
      data: {
        name,
        email,
        contact_number,
      },
    });

    res.json(employee);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creating employee" });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await prisma.employee.update({
      where: {
        id: Number(id),
      },
      data: req.body,
    });

    res.json(employee);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error updating employee" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.employee.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      message: "Employee Deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error deleting employee" });
  }
});

module.exports = router;