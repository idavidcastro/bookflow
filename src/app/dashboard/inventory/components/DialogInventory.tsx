"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { Switch } from "@/components/ui/switch";
import {
  BookOpen,
  User,
  BookType,
  FileText,
  Hash,
  Languages,
  Building2,
  BookCopy,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface Genre {
  id: number;
  name: string;
}

export default function DialogInventory() {
  const [open, setOpen] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    async function fetchGenres() {
      const { data, error } = await supabase.from("genres").select("id, name");

      if (error) {
        console.error("Error fetching genres:", error);
      } else {
        setGenres(data || []);
      }
    }

    fetchGenres();
  }, []);

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("switch", isAvailable);
    console.log("Libro guardado");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="primary">Nuevo +</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Libro</DialogTitle>
          <DialogDescription>
            Ingresa los detalles del libro aquí. Haz clic en guardar cuando
            hayas terminado.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSave}>
          <div className="grid grid-cols-2 gap-6 py-6">
            <div className="flex flex-col space-y-2.5">
              <Label htmlFor="title">Título</Label>
              <div className="relative">
                <BookOpen
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-primary"
                  size={18}
                />
                <Input
                  id="title"
                  className="pl-8"
                  placeholder="Ingrese el título"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2.5">
              <Label htmlFor="author">Autor</Label>
              <div className="relative">
                <User
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-primary"
                  size={18}
                />
                <Input
                  id="author"
                  className="pl-8"
                  placeholder="Ingrese el autor"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2.5">
              <Label htmlFor="genre">Género</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un género" />
                </SelectTrigger>
                <SelectContent>
                  {genres.map((genre) => (
                    <SelectItem key={genre.id} value={genre.id.toString()}>
                      {genre.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-2.5">
              <Label htmlFor="publicationDate">Fecha de publicación</Label>
              <DatePicker />
            </div>
            <div className="flex flex-col space-y-2.5 col-span-2">
              <Label htmlFor="description">Descripción</Label>
              <div className="relative">
                <FileText
                  className="absolute left-2 top-3 text-primary"
                  size={18}
                />
                <Textarea
                  id="description"
                  className="pl-8"
                  placeholder="Ingrese la descripción"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2.5">
              <Label htmlFor="isbn">ISBN</Label>
              <div className="relative">
                <Hash
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-primary"
                  size={18}
                />
                <Input
                  id="isbn"
                  className="pl-8"
                  placeholder="Ingrese el ISBN"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2.5">
              <Label htmlFor="pages">Páginas</Label>
              <Input id="pages" type="number" placeholder="Número de páginas" />
            </div>
            <div className="flex flex-col space-y-2.5">
              <Label htmlFor="language">Lenguaje</Label>
              <div className="relative">
                <Languages
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-primary"
                  size={18}
                />
                <Input
                  id="language"
                  className="pl-8"
                  placeholder="Ingrese el lenguaje"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2.5">
              <Label htmlFor="publisher">Editorial</Label>
              <div className="relative">
                <Building2
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-primary"
                  size={18}
                />
                <Input
                  id="publisher"
                  className="pl-8"
                  placeholder="Ingrese la editorial"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2.5">
              <Label htmlFor="available">Disponible</Label>
              <Switch
                id="available"
                checked={isAvailable}
                onCheckedChange={setIsAvailable}
              />
            </div>
            <div className="flex flex-col space-y-2.5">
              <Label htmlFor="units">Cantidad de unidades</Label>
              <div className="relative">
                <BookCopy
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-primary"
                  size={18}
                />
                <Input
                  id="units"
                  type="number"
                  className="pl-8"
                  placeholder="Ingrese la cantidad"
                />
              </div>
            </div>
          </div>
          <DialogFooter className="w-full">
            <Button type="submit" variant="primary">
              Guardar libro
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
