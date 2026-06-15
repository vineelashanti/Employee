"use client";

import { useState } from "react";
import { createEmployee } from "@/services/employeeService";
export default function EmployeeForm() {

  const [formData, setFormData] = useState({
  name: "",
  email: "",
  contact_number: "",
  image: "👨",
});

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
    const newErrors = {};

     if (!formData.name.trim()) {
        newErrors.name = "Name is required";
      }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
        newErrors.email = "Invalid email";
      }     

    if (
      formData.contact_number.length !== 10
    ) {
        newErrors.contact =
          "Contact number must be 10 digits";
      }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

  try {
    const result = await createEmployee(formData);

    if (result.error) {
      alert(result.error);
      return;
    }

    console.log(result);

    alert("Employee Added Successfully");

    setFormData({
      name: "",
      email: "",
      contact_number: "",
      image: "",
    });

  } catch (error) {
    console.log(error);
  }
};

  return (
    <form onSubmit={handleSubmit}>

      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />
      {errors.name && (
  <p>{errors.name}</p>
)}
      <br />

      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      {errors.email && (
  <p>{errors.email}</p>
)}

      <br />

      <input
  type="text"
  name="contact_number"
  placeholder="Contact Number"
  value={formData.contact_number}
  maxLength="10"
  onChange={(e) => {
    const value = e.target.value.replace(
      /\D/g,
      ""
    );

    setFormData({
      ...formData,
      contact_number: value,
    });
  }}
/>
      {errors.contact && (
  <p>{errors.contact}</p>
)}

      <br />

      <select
  name="image"
  value={formData.image}
  onChange={handleChange}
>
  <option value="👨">Male 👨</option>
  <option value="👩">Female 👩</option>
</select>

      <br />

      <button type="submit">
        Add Employee
      </button>

    </form>
  );
}