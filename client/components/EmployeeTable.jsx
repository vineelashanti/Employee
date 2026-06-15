"use client";

export default function EmployeeTable({
  employees,
  onDelete,
  onEdit,
}){
  return (
    <table
  border="1"
  cellPadding="10"
  style={{
    width: "100%",
    marginTop: "20px",
  }}
>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Email</th>
          <th>Contact</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td>
              <span style={{ fontSize: "20px" }}>
  {employee.image}
</span>
            </td>

            <td>{employee.name}</td>

            <td>{employee.email}</td>

            <td>{employee.contact_number}</td>

            <td>
  <button
    onClick={() => onEdit(employee)}
  >
    Edit
  </button>

  <button
    onClick={() => onDelete(employee.id)}
  >
    Delete
  </button>
</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}