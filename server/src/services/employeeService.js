const prisma = require("../config/prismaClient");

const getAllEmployees = async () => {
  return await prisma.employee.findMany();
};

const createEmployee = async (data) => {
  return await prisma.employee.create({
    data,
  });
};

const updateEmployee = async (id, data) => {
  return await prisma.employee.update({
    where: {
      id: Number(id),
    },
    data,
  });
};

const deleteEmployee = async (id) => {
  return await prisma.employee.delete({
    where: {
      id: Number(id),
    },
  });
};

module.exports = {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};