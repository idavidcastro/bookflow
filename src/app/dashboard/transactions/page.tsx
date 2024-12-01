"use client";
import React, { useEffect, useState } from "react";
import { Transaction } from "@/models/transaction";
import { getAllTransactions, getUserTransactions } from "@/lib/transactions";
import { DataTableTransactions } from "./components/DataTableTransactions";

export default function Transactions() {
  const [transaction, setTransaction] = useState<Transaction[]>([]);

  const fetchTransactions = async () => {
    const transactionData = await getAllTransactions();
    setTransaction(transactionData);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="m-4 border rounded-md p-4">
      <h2 className="text-4xl font-roboto font-semibold pb-4">Transacciones</h2>
      <hr />
      <DataTableTransactions data={transaction} />
    </div>
  );
}
