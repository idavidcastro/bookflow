import { supabase } from "@/lib/supabaseClient";

export const uploadPhotoToStorage = async (file: File, userId: string) => {
  const filePath = `users/${userId}/${file.name}`;
  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(filePath, file);

  if (error) {
    throw new Error(`Error al subir la foto: ${error.message}`);
  }

  const { data: publicUrlData } = supabase.storage
    .from("avatars")
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
};

export const updateUserWithPhotoUrl = async (
  userId: string,
  photoUrl: string
) => {
  const { data, error } = await supabase
    .from("users")
    .update({ photo: photoUrl })
    .eq("id", userId);

  if (error) {
    throw new Error(`Error al actualizar al usuario: ${error.message}`);
  }

  return data;
};
