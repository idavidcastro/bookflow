"use client";
import React, { useEffect, useState } from "react";
import { DataTableBooks } from "./components/DataTableBooks";
import { Book } from "@/models/book";
import { addBook, deleteBook, getAvailableBooks, getBooks } from "@/lib/books";

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState({
    id: 0,
    title: "",
    author: "",
    genre: "",
    description: "",
    published_date: "",
    isbn: "",
    pages: 0,
    language: "",
    publisher: "",
    available: true,
    available_count: 0,
    total_count: 0,
  });

  const fetchBooks = async () => {
    const booksData = await getAvailableBooks();
    setBooks(booksData);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

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
