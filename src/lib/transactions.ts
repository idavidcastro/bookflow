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

export const handleBorrow = async (bookId: number, userId: string) => {
  try {
    const { data, error } = await supabase.from("transactions").insert([
      {
        book_id: bookId,
        user_id: userId,
        due_date: new Date(new Date().setDate(new Date().getDate() + 7)), // Fecha de vencimiento a 7 días
      },
    ]);

    if (error) {
      throw new Error(error.message);
    }

    console.log("Transacción exitosa:", data);
    return data;
  } catch (error) {
    console.error("Error al prestar el libro:", error);
  }
};

export const getUserTransactions = async (userId: string) => {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId);

  if (error) throw new Error(error.message);

  return data;
};

export const getAllTransactions = async () => {
  const { data, error } = await supabase.from("transactions").select("*");

  if (error) throw new Error(error.message);

  return data;
};
export const returnBook = async (transactionId: number) => {
  const isConfirmed = window.confirm("¿Desea completar esta transacción?");

  if (!isConfirmed) {
    return;
  }

  const { data, error } = await supabase
    .from("transactions")
    .update({
      returned_at: new Date(),
      status: "Devuelto",
    })
    .eq("id", transactionId);

  if (error) {
    alert(`Error: ${error.message}`);
    return;
  }

  alert("El libro ha sido devuelto al stock.");
  return data;
};
