"use client";
import React, { useEffect, useState } from "react";
import { DataTableInventory } from "./components/DataTableInventory";
import { Book } from "./model/book";
import { addBook, deleteBook, getBooks } from "@/lib/books";

export default function Inventory() {
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    published_date: "",
    available_count: 0,
    total_count: 0,
  });

  const fetchBooks = async () => {
    const booksData = await getBooks();
    setBooks(booksData);
  };

  const handleAddBook = async () => {
    await addBook(newBook);
    fetchBooks(); // Actualizar la lista de libros después de agregar uno
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
