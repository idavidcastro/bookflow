"use client";
import React, { useState } from "react";
import CardWrapper from "./components/CardWrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schema";
import { z } from "zod";
import { supabase } from "@/lib/supabaseClient"; // Importar el cliente de Supabase
import { useRouter } from "next/navigation"; // Importar useRouter para redirección

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Inicializar el hook de Next.js para redirigir

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setLoading(true);
    setError(null);

    const { email, password } = data;

    // Intentamos autenticar al usuario con Supabase
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.log("Error de autenticación:", error.message); // Muestra el error si ocurre
      setError(error.message); // Muestra el error en la interfaz
    } else {
      console.log("Usuario autenticado:", authData);

      // Obtener información adicional del usuario
      const { user } = authData; // El objeto 'user' contiene los detalles del usuario autenticado

      // Si el perfil del usuario tiene información adicional (nombre, rol, etc.)
      const userData = {
        email: user?.email,
        name: user?.user_metadata?.full_name, // Nombre completo, si está disponible en los metadatos
        role: user?.user_metadata?.role, // Rol, si está disponible en los metadatos
        // Cualquier otro dato que tengas en los metadatos del usuario
      };

      console.log("Información del usuario autenticado:", userData);

      // Redirige al dashboard si la autenticación es exitosa
      router.push("/dashboard");
    }

    setLoading(false);
  };

  return (
    <CardWrapper
      label="Ingresa a tu cuenta de BookFlow"
      title="Iniciar sesión"
      backButtonHref="/auth/register"
      backButtonLabel="No tienes una cuenta? Regístrate aquí"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="usuario@gmail.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="******" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Iniciar sesión"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
