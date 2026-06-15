const API_URL = "http://localhost:5000/employees";

export const createEmployee = async (employee) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });

  return response.json();
};

export const getEmployees = async () => {
  const response = await fetch(API_URL);

  return response.json();
};

export const deleteEmployee = async (id) => {
  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: "DELETE",
    }
  );

  return response.json();
};

export const updateEmployee = async (id, data) => {
  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return response.json();
};