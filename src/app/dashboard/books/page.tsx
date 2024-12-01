"use client";
import React, { useEffect, useState } from "react";
import { DataTableBooks } from "./components/DataTableBooks";
import { Book } from "@/models/book";
import { getAvailableBooks } from "@/lib/books";

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
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

  const fetchBooks = async () => {
    if (userId) {
      const booksData = await getAvailableBooks(userId);
      setBooks(booksData);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchBooks();
    }
  }, [userId]);

  return (
    <div className="m-4 border rounded-md p-4">
      <h2 className="text-4xl font-roboto font-semibold pb-4">
        Libros disponibles
      </h2>
      <hr />
      <DataTableBooks data={books} />
    </div>
  );
}
