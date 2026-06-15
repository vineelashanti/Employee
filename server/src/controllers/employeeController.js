const employeeService = require("../services/employeeService");

const getEmployees = async (req, res) => {
  try {
    const employees =
      await employeeService.getAllEmployees();

    res.json(employees);
  } catch (error) {
    res.status(500).json({
      error: "Error fetching employees",
    });
  }
};

const createEmployee = async (req, res) => {
  try {
    const employee =
      await employeeService.createEmployee(req.body);

    res.status(201).json(employee);
  } catch (error) {

    if (error.code === "P2002") {
      return res.status(400).json({
        error: "Email already exists",
      });
    }

    res.status(500).json({
      error: "Error creating employee",
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const employee =
      await employeeService.updateEmployee(
        req.params.id,
        req.body
      );

    res.json(employee);
  } catch (error) {
    res.status(500).json({
      error: "Error updating employee",
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    await employeeService.deleteEmployee(
      req.params.id
    );

    res.json({
      message: "Employee deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error deleting employee",
    });
  }
};

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};