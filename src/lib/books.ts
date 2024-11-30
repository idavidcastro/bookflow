import { Book } from "@/app/dashboard/inventory/model/book";
import { supabase } from "./supabaseClient";

export const addBook = async (bookData: Book) => {
  const { data, error } = await supabase.from("books").insert([bookData]);

  if (error) throw new Error(error.message);
  return data;
};

export const getBooks = async () => {
  const { data, error } = await supabase.from("books").select("*");
  if (error) throw new Error(error.message);
  return data;
};

export const updateBook = async (bookId: number, bookData: Book) => {
  const { data, error } = await supabase
    .from("books")
    .update(bookData)
    .eq("id", bookId);

  if (error) throw new Error(error.message);
  return data;
};

export const deleteBook = async (bookId: number) => {
  const { data, error } = await supabase
    .from("books")
    .delete()
    .eq("id", bookId);

  if (error) throw new Error(error.message);
  return data;
};
