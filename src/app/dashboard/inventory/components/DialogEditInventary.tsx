"use client";
import { format } from "date-fns";
import { CalendarIcon, Edit } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState, useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  BookOpen,
  User,
  FileText,
  Hash,
  Languages,
  Building2,
  BookCopy,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useForm } from "react-hook-form";
import { Book } from "../../../../models/book";
import { updateBook } from "@/lib/books";

interface Genre {
  id: number;
  name: string;
}

interface Props {
  book: Book;
}

export default function DialogEditInventory({ book }: Props) {
  const [open, setOpen] = useState(false);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [date, setDate] = useState<Date>();

  const { register, handleSubmit, setValue, watch } = useForm<Book>({
    defaultValues: book,
  });

  async function fetchGenres() {
    const { data, error } = await supabase.from("genres").select("id, name");

    if (error) {
      console.error("Error fetching genres:", error);
    } else {
      setGenres(data || []);
    }
  }
  useEffect(() => {
    fetchGenres();
  }, []);

  const handleSave = (data: Book) => {
    updateBook(book.id, data);
    setOpen(false);
    fetchGenres();
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
          <DialogTitle>Actualizar libro</DialogTitle>
          <DialogDescription>
            A continuación se muestran los datos del libro seleccionado. Haga
            clic en actualizar cuando haya terminado.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleSave)}>
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
                  {...register("title")}
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
                  {...register("author")}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2.5">
              <Label htmlFor="genre">Género</Label>
              <Select
                defaultValue={book.genre_id.toString()}
                onValueChange={(value) => {
                  setValue("genre_id", value);
                }}
              >
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
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="text-primary" />
                    {book.published_date ? (
                      format(book.published_date, "dd MMM, yyyy")
                    ) : (
                      <span>Selecciona una fecha</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(selectedDate) => {
                      setDate(selectedDate);

                      const formattedDate = selectedDate
                        ? format(selectedDate, "dd MMM yyyy")
                        : "";

                      setValue("published_date", formattedDate);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
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
                  {...register("description")}
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
                  {...register("isbn")}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2.5">
              <Label htmlFor="pages">Páginas</Label>
              <Input
                id="pages"
                type="number"
                placeholder="Número de páginas"
                {...register("pages")}
              />
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
                  {...register("language")}
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
                  {...register("publisher")}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2.5">
              <Label htmlFor="available">Estado </Label>
              <Switch
                id="available"
                checked={watch("available") || book.available}
                onCheckedChange={(checked) => setValue("available", checked)}
              />
            </div>

            <div className="flex flex-col space-y-2.5">
              <Label htmlFor="units">En Stock</Label>
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
                  {...register("available_count")}
                />
              </div>
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
