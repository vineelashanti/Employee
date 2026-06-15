"use client";

import { useEffect, useState } from "react";

import EmployeeForm from "@/components/EmployeeForm";
import EmployeeTable from "@/components/EmployeeTable";
import EditEmployeeDialog from "@/components/EditEmployeeDialog";

import {
  getEmployees,
  deleteEmployee,
  updateEmployee,
} from "@/services/employeeService";
  

export default function Home() {
  const [employees, setEmployees] = useState([]);

  const [selectedEmployee, setSelectedEmployee] =
    useState(null);

  const [isEditOpen, setIsEditOpen] =
    useState(false);

  const loadEmployees = async () => {
    const data = await getEmployees();

    setEmployees(data);
  };

  useEffect(() => {
  const fetchData = async () => {
    await loadEmployees();
  };

  fetchData();
}, []);

  const handleDelete = async (id) => {
  await deleteEmployee(id);

  loadEmployees();
};

  const handleEdit = (employee) => {
  setSelectedEmployee(employee);
  setIsEditOpen(true);
};
 
  const handleUpdate = async (id, updatedData) => {
  await updateEmployee(id, updatedData);

  setIsEditOpen(false);

  loadEmployees();
};

  return (
    <main
  style={{
    maxWidth: "900px",
    margin: "20px auto",
    padding: "20px",
  }}
>
      <h1
  style={{
    textAlign: "center",
    marginBottom: "20px",
  }}
>
  Employee Management System
</h1>

      <EmployeeForm />

      <br />

      <EmployeeTable
  employees={employees}
  onDelete={handleDelete}
  onEdit={handleEdit}
/>

    <EditEmployeeDialog
  employee={selectedEmployee}
  isOpen={isEditOpen}
  onClose={() => setIsEditOpen(false)}
  onSave={handleUpdate}
/>
    </main>
  );
}