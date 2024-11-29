import { supabase } from "./supabaseClient";

export const reserveBook = async (
  userId: string,
  bookId: number,
  expiresAt: string
) => {
  const { data, error } = await supabase
    .from("reservations")
    .insert([{ user_id: userId, book_id: bookId, expires_at: expiresAt }]);

  if (error) throw new Error(error.message);
  return data;
};

export const getUserReservations = async (userId: string) => {
  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
  return data;
};

export const cancelReservation = async (reservationId: number) => {
  const { data, error } = await supabase
    .from("reservations")
    .delete()
    .eq("id", reservationId);

  if (error) throw new Error(error.message);
  return data;
};
