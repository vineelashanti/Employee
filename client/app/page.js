"use client";
<div className="bg-red-500 text-white text-4xl p-10">TAILWIND TEST</div>;
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import EmployeeForm from "@/components/EmployeeForm";
import EmployeeTable from "@/components/EmployeeTable";
import EditEmployeeDialog from "@/components/EditEmployeeDialog";
import { Button } from "@/components/ui/button";

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
    <main className="min-h-screen bg-slate-100">
      <div className="max-w-6xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Employee Management System</h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <EmployeeForm />
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <EmployeeTable
            employees={employees}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </div>

        <EditEmployeeDialog
          employee={selectedEmployee}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          onSave={handleUpdate}
        />
      </div>
    </main>
  );
}
