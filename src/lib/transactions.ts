// lib/transactions.ts
import { supabase } from "./supabaseClient";

export const borrowBook = async (
  userId: string,
  bookId: number,
  dueDate: string
) => {
  const { data, error } = await supabase
    .from("transactions")
    .insert([{ user_id: userId, book_id: bookId, due_date: dueDate }]);

  if (error) throw new Error(error.message);
  return data;
};

export const getUserTransactions = async (userId: string) => {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
  return data;
};

export const returnBook = async (transactionId: number) => {
  const { data, error } = await supabase
    .from("transactions")
    .update({ returned_at: new Date() })
    .eq("id", transactionId);

  if (error) throw new Error(error.message);
  return data;
};
