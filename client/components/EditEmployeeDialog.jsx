"use client";

import { useState, useEffect } from "react";

export default function EditEmployeeDialog({
  employee,
  isOpen,
  onClose,
  onSave,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact_number: "",
    image: "",
  });

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    }
  }, [employee]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onSave(employee.id, formData);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "20%",
        left: "35%",
        background: "white",
        border: "1px solid black",
        padding: "20px",
        zIndex: 1000,
      }}
    >
      <h2>Edit Employee</h2>

      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
      />

      <br />
      <br />

      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
      />

      <br />
      <br />

      <input
        name="contact_number"
        value={formData.contact_number}
        onChange={handleChange}
      />

      <br />
      <br />

      <button onClick={handleSubmit}>
        Update
      </button>

      <button onClick={onClose}>
        Cancel
      </button>
    </div>
  );
}