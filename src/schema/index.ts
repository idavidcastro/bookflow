import * as z from "zod";
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const MAX_FILE_SIZE = 1024 * 1024 * 10;

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Por favor, ingrese su nombre",
  }),
  lastName: z.string().min(1, {
    message: "Por favor, ingrese su apellido",
  }),
  email: z.string().email({
    message: "Por favor ingrese una dirección de correo válida",
  }),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres",
  }),
  confirmPassword: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres",
  }),
  photo: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 10MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Por favor ingrese una dirección de correo válida",
  }),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres",
  }),
});
