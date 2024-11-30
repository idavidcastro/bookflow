"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { User } from "@/models/user";
import { Contact, Edit, Mail, UserRound } from "lucide-react";
import { updateUser } from "@/lib/users";

interface Props {
  user: User;
}

export default function DialogEditUser({ user }: Props) {
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, setValue, watch } = useForm<User>({
    defaultValues: user,
  });

  const handleSave = (data: User) => {
    updateUser(user.id, data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <Edit className="h-4 w-4 text-primary" />{" "}
          <span className="sr-only">Editar</span>{" "}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Actualizar usuario</DialogTitle>
          <DialogDescription>
            A continuación se muestran los datos del usuario seleccionado. Haga
            clic en actualizar cuando haya terminado.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleSave)}>
          <div className="grid grid-cols-2 gap-6 py-6">
            <div className="flex flex-col space-y-2.5">
              <Label htmlFor="name">Nombre</Label>
              <div className="relative">
                <UserRound
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-primary"
                  size={18}
                />
                <Input
                  id="name"
                  className="pl-8"
                  placeholder="Ingrese el nombre"
                  {...register("name")}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2.5">
              <Label htmlFor="last_name">Apellido</Label>
              <div className="relative">
                <UserRound
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-primary"
                  size={18}
                />
                <Input
                  id="name"
                  className="pl-8"
                  placeholder="Ingrese el nombre"
                  {...register("last_name")}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2.5">
              <Label htmlFor="email">Correo</Label>
              <div className="relative">
                <Mail
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-primary"
                  size={18}
                />
                <Input
                  id="email"
                  className="pl-8"
                  placeholder="Ingrese el correo"
                  {...register("email")}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2.5">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Mail
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-primary"
                  size={18}
                />
                <Input
                  id="password"
                  className="pl-8"
                  placeholder="Ingrese el correo"
                  {...register("password")}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2.5">
              <Label htmlFor="genre">Género</Label>
              <Select
                defaultValue={user.role}
                onValueChange={(value) => {
                  setValue("role", value);
                }}
              >
                <SelectTrigger>
                  <Contact className="text-primary" size={18} />
                  <SelectValue placeholder="Seleccione un género" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="w-full">
            <Button type="submit" variant="primary">
              Actualizar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
