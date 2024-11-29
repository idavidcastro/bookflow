import { supabase } from "./supabaseClient";

export const addBook = async (bookData: {
  title: string;
  author: string;
  genre: string;
  description: string;
  published_date: string;
  available_count: number;
  total_count: number;
}) => {
  const { data, error } = await supabase.from("books").insert([bookData]);

  if (error) throw new Error(error.message);
  return data;
};

export const getBooks = async () => {
  const { data, error } = await supabase.from("books").select("*");
  if (error) throw new Error(error.message);
  return data;
};

export const updateBook = async (
  bookId: number,
  bookData: {
    title?: string;
    author?: string;
    genre?: string;
    description?: string;
    published_date?: string;
    available_count?: number;
    total_count?: number;
  }
) => {
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
