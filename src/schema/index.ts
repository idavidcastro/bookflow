import * as z from "zod";

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Por favor ingrese una dirección de correo válida",
  }),
  name: z.string().min(1, {
    message: "Por favor, ingrese su nombre",
  }),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres",
  }),
  confirmPassword: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Por favor ingrese una dirección de correo válida",
  }),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres",
  }),
});
