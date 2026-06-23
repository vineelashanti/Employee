"use client";

import { useState } from "react";
import { createEmployee } from "@/services/employeeService";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

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
      const result = await createEmployee(
        formData
      );

      if (result.error) {
        alert(result.error);
        return;
      }

      alert("Employee Added Successfully");

      setFormData({
        name: "",
        email: "",
        contact_number: "",
        image: "👨",
      });

      setErrors({});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-6">
          Add Employee
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
  className="w-full border rounded-lg p-3"
                name="name"
                placeholder="Employee Name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <input
  className="w-full border rounded-lg p-3"
                name="email"
                placeholder="Employee Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
  className="w-full border rounded-lg p-3"
                type="text"
                placeholder="Contact Number"
                value={
                  formData.contact_number
                }
                maxLength={10}
                onChange={(e) => {
                  const value =
                    e.target.value.replace(
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
                <p className="text-red-500 text-sm mt-1">
                  {errors.contact}
                </p>
              )}
            </div>

            <div>
              <select
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full border rounded-md h-10 px-3"
              >
                <option value="👨">
                  Male 👨
                </option>
                <option value="👩">
                  Female 👩
                </option>
              </select>
            </div>
          </div>

          <button
  type="submit"
  className="bg-blue-600 text-white px-6 py-3 rounded-lg"
>
            Add Employee
          </button>
        </form>
      </CardContent>
    </Card>
  );
}