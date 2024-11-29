"use client";
import { useState } from "react";
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
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Importar js-cookie

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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

    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

    if (authError) {
      console.log("Error de autenticación:", authError.message);
      setError(authError.message);
    } else if (authData?.user) {
      try {
        const userId = authData.user.id;

        const { data: user, error: userError } = await supabase
          .from("users")
          .select("id, name, last_name, email, photo, role")
          .eq("id", userId)
          .single();

        if (userError) throw new Error(userError.message);

        // Guardar en localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: user.id,
            name: user.name,
            lastName: user.last_name,
            email: user.email,
            photo: user.photo,
            role: user.role,
          })
        );

        Cookies.set(
          "user",
          JSON.stringify({
            id: user.id,
            name: user.name,
            lastName: user.last_name,
            email: user.email,
            photo: user.photo,
            role: user.role,
          }),
          { expires: 7 }
        );

        const cookie = JSON.parse(Cookies.get("user") || "{}");
        console.log("la cookie", cookie);

        router.push("/dashboard");
      } catch (fetchError) {
        console.error("Error al obtener los datos del usuario:", fetchError);
        setError("No se pudieron obtener los datos del usuario.");
      }
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
