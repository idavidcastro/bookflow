"use client";
import React, { useEffect, useState } from "react";
import { DataTableInventory } from "./components/DataTableInventory";
import { Book } from "./model/book";
import { addBook, deleteBook, getBooks } from "@/lib/books";

export default function Inventory() {
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
    const booksData = await getBooks();
    setBooks(booksData);
  };

  const handleAddBook = async () => {
    await addBook(newBook);
    fetchBooks();
  };

  const handleDeleteBook = async (bookId: number) => {
    await deleteBook(bookId);
    fetchBooks();
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="m-4 border rounded-md p-4">
      <h2 className="text-4xl font-roboto font-semibold pb-4">Inventario</h2>
      <hr />
      <DataTableInventory data={books} />
    </div>
  );
}
