"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import EmployeeForm from "@/components/EmployeeForm";
import EmployeeTable from "@/components/EmployeeTable";
import EditEmployeeDialog from "@/components/EditEmployeeDialog";

import {
  getEmployees,
  deleteEmployee,
  updateEmployee,
} from "@/services/employeeService";

export default function Home() {
  const router = useRouter();

  const [authorized, setAuthorized] = useState(false);
  const [employees, setEmployees] = useState([]);

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const loadEmployees = async () => {
    const data = await getEmployees();

    if (Array.isArray(data)) {
      setEmployees(data);
    } else {
      console.error("API returned:", data);
      setEmployees([]);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    setAuthorized(true);

    const fetchData = async () => {
      await loadEmployees();
    };

    fetchData();
  }, [router]);

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

  const handleLogout = () => {
    localStorage.removeItem("token");

    router.push("/login");
  };

  if (!authorized) {
    return <div>Loading...</div>;
  }

  return (
    <main
      style={{
        maxWidth: "900px",
        margin: "20px auto",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "10px",
        }}
      >
        <button onClick={handleLogout}>Logout</button>
      </div>

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
