import { Book } from "@/app/dashboard/inventory/model/book";
import { supabase } from "./supabaseClient";

export const addBook = async (bookData: Book) => {
  try {
    const { data: genreData, error: genreError } = await supabase
      .from("genres")
      .select("id")
      .eq("id", bookData.genre_id)
      .single();

    if (genreError || !genreData) {
      alert("Error: El género especificado no existe.");
      return;
    }

    const { data: existingBook, error: isbnError } = await supabase
      .from("books")
      .select("id")
      .eq("isbn", bookData.isbn);

    if (existingBook && existingBook.length > 0) {
      alert("Error: El ISBN ya está registrado.");
      return;
    }

    console.log("Género válido y ISBN único. Insertando el libro...");
    const { data, error } = await supabase.from("books").insert([bookData]);

    if (error) {
      alert(`Error al crear el libro: ${error.message}`);
      return;
    }

    alert("¡Libro creado exitosamente!");

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      alert(`Error inesperado: ${error.message}`);
    } else {
      alert("Error inesperado");
    }
    throw error;
  }
};

export const getBooks = async () => {
  const { data, error } = await supabase.from("books").select("*");
  if (error) throw new Error(error.message);
  return data;
};

export const updateBook = async (bookId: number, bookData: Book) => {
  try {
    const { data, error } = await supabase
      .from("books")
      .update(bookData)
      .eq("id", bookId);

    if (error) {
      alert(`Error: ${error.message}`);
      throw new Error(error.message);
    }

    alert("Libro actualizado exitosamente!");
    return data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      alert(`Hubo un error inesperado: ${err.message}`);
    } else {
      alert("Hubo un error inesperado.");
    }
    throw err;
  }
};

export const deleteBook = async (bookId: number) => {
  try {
    const { data, error } = await supabase
      .from("books")
      .delete()
      .eq("id", bookId);

    if (error) {
      const errorMessage = (error as { message: string }).message;
      alert(`Error al eliminar el libro: ${errorMessage}`);
      throw new Error(errorMessage);
    }

    alert(`Libro con ID: ${bookId} eliminado exitosamente.`);

    return data;
  } catch (error) {
    if (error instanceof Error) {
      alert(`Error al intentar eliminar el libro: ${error.message}`);
    } else {
      alert("Ha ocurrido un error inesperado.");
    }
    console.error(error);
  }
};
