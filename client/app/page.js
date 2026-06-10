async function getEmployees() {
  const res = await fetch(
    "http://localhost:5000/employees",
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function Home() {
  const employees = await getEmployees();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Employee List</h1>

      {employees.map((emp) => (
        <div
          key={emp.id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{emp.name}</h3>
          <p>{emp.email}</p>
          <p>{emp.contact_number}</p>
        </div>
      ))}
    </div>
  );
}