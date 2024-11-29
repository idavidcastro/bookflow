"use client";
import React, { useState } from "react";
import CardWrapper from "./CardWrapper";
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
  const uploadPhotoToStorage = async (file: File, userId: string) => {
    const filePath = `${userId}/${file.name}`;
    const { data, error } = await supabase.storage
      .from("avatars") // Cambia esto por el nombre del bucket
      .upload(filePath, file);

    if (error) {
      throw new Error(`Error al subir la foto: ${error.message}`);
    }

    const { data: publicUrlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl; // URL pública de la imagen
  };
  const updateUserWithPhotoUrl = async (userId: string, photoUrl: string) => {
    const { data, error } = await supabase
      .from("users") // Cambia 'users' por el nombre de tu tabla
      .update({ photo: photoUrl })
      .eq("id", userId);

    if (error) {
      throw new Error(`Error al actualizar al usuario: ${error.message}`);
    }

    return data;
  };

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    try {
      setLoading(true);
      const { name, lastName, email, password } = data;

      // Paso 1: Crear el usuario en Supabase Authentication
      const { data: userData, error: userError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (userError || !userData.user) {
        throw new Error(userError?.message || "Error al crear el usuario");
      }

      const userId = userData.user.id; // ID del usuario creado

      // Paso 2: Subir la foto al Storage (si existe)
      let photoUrl = "";
      if (selectedImage) {
        photoUrl = await uploadPhotoToStorage(selectedImage, userId);
      }

      // Paso 3: Insertar los datos del usuario en la tabla `users`
      const { error: insertError } = await supabase
        .from("users") // Cambia por el nombre de tu tabla
        .insert({
          id: userId, // ID generado por Supabase Auth
          name,
          last_name: lastName,
          email,
          photo: photoUrl, // URL de la imagen subida
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
      title="Registro"
      backButtonHref="/auth/login"
      backButtonLabel="Ya tienes una cuenta? Inicia sesión aquí"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div
              className={`flex w-[100%] gap-4 p-4 rounded border border-neutral-200 flex-col items-center md:flex-row md:justify-between md:items-center`}
            >
              <div
                className={`flex  md:flex-[1] h-[fit-content] md:p-4 md:justify-between md:flex-row 
                        
            `}
              >
                {selectedImage ? (
                  <div className="md:max-w-[200px]">
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Selected"
                    />
                  </div>
                ) : (
                  <div className="inline-flex items-center justify-between">
                    <div className="p-3 bg-slate-200  justify-center items-center flex">
                      <BsImages size={56} />
                    </div>
                  </div>
                )}
              </div>
              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Button size="lg" type="button">
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
                        <label
                          htmlFor="fileInput"
                          className="bg-blue-500 hover:bg-blue-600 text-neutral-90  rounded-md cursor-pointer inline-flex items-center"
                        >
                          <BsPaperclip />
                          <span className="whitespace-nowrap">
                            choose your image
                          </span>
                        </label>
                      </Button>
                    </FormControl>
                    {/* <FormDescription>This is your public display email.</FormDescription> */}

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
