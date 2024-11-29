"use client";
import React, { useState } from "react";
import CardWrapper from "./components/CardWrapper";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RegisterSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { supabase } from "@/lib/supabaseClient";
import { BsImages, BsPaperclip } from "react-icons/bs";
import { uploadPhotoToStorage } from "./services";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      photo: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    try {
      setLoading(true);
      const { name, lastName, email, password } = data;

      const { data: userData, error: userError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (userError || !userData.user) {
        throw new Error(userError?.message || "Error al crear el usuario");
      }

      const userId = userData.user.id;

      let photoUrl = "";
      if (selectedImage) {
        photoUrl = await uploadPhotoToStorage(selectedImage, userId);
      }

      const { error: insertError } = await supabase.from("users").insert({
        id: userId,
        name,
        last_name: lastName,
        email,
        password,
        photo: photoUrl,
        role: "admin",
      });

      if (insertError) {
        throw new Error(
          `Error al guardar los datos del usuario: ${insertError.message}`
        );
      }

      alert("Usuario registrado exitosamente");
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardWrapper
      label="Crear una cuenta"
      title="Registro - BookFlow"
      backButtonHref="/auth/login"
      backButtonLabel="Ya tienes una cuenta? Inicia sesión aquí"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center">
              <div className="flex">
                <label
                  htmlFor="fileInput"
                  className="flex items-center justify-center w-28 h-28 border-4 border-primary rounded-full overflow-hidden cursor-pointer"
                >
                  {selectedImage ? (
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="foto"
                      className="w-full h-full object-cover text-center"
                    />
                  ) : (
                    <span className="text-gray-500 font-medium text-center font-roboto">
                      + Foto
                    </span>
                  )}
                </label>
              </div>
              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input
                        type="file"
                        className="hidden"
                        id="fileInput"
                        accept="image/*"
                        onBlur={field.onBlur}
                        name={field.name}
                        onChange={(e) => {
                          field.onChange(e.target.files);
                          setSelectedImage(e.target.files?.[0] || null);
                        }}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Escriba su nombre" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Escriba su apellido" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirme su contraseña</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="******" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Registrarse"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
