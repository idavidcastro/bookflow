import { Book } from "@/models/book";
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
export const uploadBookPhotoToStorage = async (file: File, bookId: number) => {
  console.log("esa es la ", file);

  const filePath = `books/${bookId}/${file.name}`;
  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(filePath, file);

  if (error) {
    throw new Error(`Error al subir la imagen: ${error.message}`);
  }

  const { data: publicUrlData } = supabase.storage
    .from("avatars")
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
};

export const getBooks = async () => {
  const { data, error } = await supabase.from("books").select("*");
  if (error) throw new Error(error.message);
  return data;
};

export const getAvailableBooks = async (userId: string) => {
  // Obtenemos los IDs de los libros que están prestados por el usuario
  const { data: transactions, error: transactionError } = await supabase
    .from("transactions")
    .select("book_id")
    .eq("user_id", userId) // Filtra por el usuario actual
    .is("returned_at", null); // Solo los libros que no han sido devueltos

  if (transactionError) throw new Error(transactionError.message);

  // Extraemos solo los IDs de los libros prestados
  const borrowedBookIds = transactions.map(
    (transaction) => transaction.book_id
  );

  // Obtenemos los libros disponibles que no están en los libros prestados
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .eq("available", true)
    .gt("available_count", 0)
    .not("id", "in", `(${borrowedBookIds.join(",")})`); // Excluye los libros prestados

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
  const isConfirmed = window.confirm(
    `¿Estás seguro de que quieres eliminar este libro?`
  );

  if (!isConfirmed) {
    return;
  }

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

    alert(`Libro se ha eliminado exitosamente.`);
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
