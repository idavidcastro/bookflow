import { User } from "@/models/user";
import { supabase } from "./supabaseClient";

export const addUser = async (userData: User) => {
  try {
    const { data: existingUser, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("id", userData.id);

    if (existingUser && existingUser.length > 0) {
      alert("Error: El usuario ya está registrado.");
      return;
    }

    const { data, error } = await supabase.from("users").insert([userData]);

    if (error) {
      alert(`Error al crear el usuario: ${error.message}`);
      return;
    }

    alert("Usuario creado exitosamente!");

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

export const getUsers = async () => {
  const { data, error } = await supabase.from("users").select("*");
  if (error) throw new Error(error.message);
  return data;
};

export const updateUser = async (userId: number, userData: User) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .update(userData)
      .eq("id", userId);

    if (error) {
      alert(`Error: ${error.message}`);
      throw new Error(error.message);
    }

    alert("Usuario actualizado exitosamente!");
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

export const deleteUser = async (userId: number) => {
  const isConfirmed = window.confirm(
    `¿Estás seguro de que quieres eliminar este usuario?`
  );

  if (!isConfirmed) {
    return;
  }

  try {
    const { data, error } = await supabase
      .from("users")
      .delete()
      .eq("id", userId);

    if (error) {
      const errorMessage = (error as { message: string }).message;
      alert(`Error al eliminar el usuario: ${errorMessage}`);
      throw new Error(errorMessage);
    }

    alert(`El usuario se ha eliminado exitosamente.`);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      alert(`Error al intentar eliminar el usuario: ${error.message}`);
    } else {
      alert("Ha ocurrido un error inesperado.");
    }
    console.error(error);
  }
};
