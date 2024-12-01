"use client";
import React, { useEffect, useState } from "react";
import { DataTableLoans } from "./components/DataTableLoans";
import { Transaction } from "@/models/transaction";
import { getUserTransactions } from "@/lib/transactions";

export default function Loans() {
  const [transaction, setTransaction] = useState<Transaction[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  const user = localStorage.getItem("user");
  useEffect(() => {
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserId(parsedUser.id);
    } else {
      console.error(
        "No se ha encontrado el objeto de usuario en localStorage."
      );
    }
  }, [user]);

  const fetchTransactions = async () => {
    if (userId) {
      const transactionData = await getUserTransactions(userId);
      setTransaction(transactionData);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [userId]);

  return (
    <div className="m-4 border rounded-md p-4">
      <h2 className="text-4xl font-roboto font-semibold pb-4">Mis préstamos</h2>
      <hr />
      <DataTableLoans data={transaction} />
    </div>
  );
}
