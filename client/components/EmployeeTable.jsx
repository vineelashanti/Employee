"use client";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function EmployeeTable({
  employees,
  onDelete,
  onEdit,
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <h2 className="text-2xl font-semibold mb-4">
          Employee List
        </h2>

        <Table className="w-full border-collapse">
          <TableHeader className="bg-slate-100">
            <TableRow>
              <TableHead className="p-4 text-left">Image</TableHead>
              <TableHead className="p-4 text-left">Name</TableHead>
              <TableHead className="p-4 text-left">Email</TableHead>
              <TableHead className="p-4 text-left">Contact</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {(Array.isArray(employees)
              ? employees
              : []
            ).map((employee) => (
              <TableRow
                key={employee.id}
                className="border-b hover:bg-slate-50"
              >
                <TableCell>
                  <span className="text-2xl">
                    {employee.image}
                  </span>
                </TableCell>

                <TableCell>
                  {employee.name}
                </TableCell>

                <TableCell>
                  {employee.email}
                </TableCell>

                <TableCell>
                  {
                    employee.contact_number
                  }
                </TableCell>

                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        onEdit(employee)
                      }
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </Button>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() =>
                        onDelete(
                          employee.id
                        )
                      }
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}