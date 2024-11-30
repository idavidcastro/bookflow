"use client";
import React, { useEffect, useState } from "react";
import { getUsers } from "@/lib/users";
import { User } from "@/models";
import { DataTableUser } from "../users/components/DataTableUsers";

export default function Inventory() {
  const [users, setUsers] = useState<User[]>([]);

  const fetchBooks = async () => {
    const usersData = await getUsers();
    setUsers(usersData);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="m-4 border rounded-md p-4">
      <h2 className="text-4xl font-roboto font-semibold pb-4">Usuarios</h2>
      <hr />
      <DataTableUser data={users} />
    </div>
  );
}
