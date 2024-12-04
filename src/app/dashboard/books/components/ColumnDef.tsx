import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { handleBorrow } from "@/lib/transactions";
import { Book } from "@/models/book";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, BookmarkCheck, Images } from "lucide-react";
import { useState } from "react";

export const columns: ColumnDef<Book>[] = [
  {
    accessorKey: "photo",
    header: "",
    cell: ({ row }: any) => {
      const photoUrl = row.getValue("photo") as string;
      const [isOpen, setIsOpen] = useState(false);

      return (
        <>
          <div className="flex justify-center items-center">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt="User avatar"
                className="h-20 w-14 object-cover cursor-pointer"
                onClick={() => setIsOpen(true)}
              />
            ) : (
              <div className="h-20 w-14 flex items-center justify-center bg-blue-100 ">
                <Images size={20} className="text-primary" />
              </div>
            )}
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="w-96 h-auto sm:rounded-none">
              <DialogTitle>
                <p className="text-lg font-roboto">Imagen del libro</p>
              </DialogTitle>
              <img
                src={photoUrl}
                alt="Full size photo"
                className="w-full h-auto object-contain"
              />
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },

  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Título
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "author",
    header: "Autor",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("author")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Descripción",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "published_date",
    header: "Publicación",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("published_date")}</div>
    ),
  },
  {
    accessorKey: "isbn",
    header: "ISBN",
    cell: ({ row }) => <div className="capitalize">{row.getValue("isbn")}</div>,
  },
  {
    accessorKey: "pages",
    header: "Páginas",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("pages")}</div>
    ),
  },
  {
    accessorKey: "language",
    header: "Lenguaje",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("language")}</div>
    ),
  },
  {
    accessorKey: "publisher",
    header: "Editorial",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("publisher")}</div>
    ),
  },
  {
    accessorKey: "available",
    header: "Estado",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("available") ? "Disponible" : "No"}
      </div>
    ),
  },

  {
    accessorKey: "available_count",
    header: "Disponibles",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("available_count")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-right">Prestar</div>,
    cell: ({ row }) => {
      const book = row.original;

      const handleClick = () => {
        const user = localStorage.getItem("user");
        if (user) {
          const userId = JSON.parse(user).id;
          handleBorrow(book.id, userId);
        } else {
          console.error(
            "No se ha encontrado el objeto de usuario en localStorage."
          );
        }
      };

      return (
        <div className="flex justify-end space-x-2">
          <Button variant="ghost" className="h-8 w-8 p-0" onClick={handleClick}>
            <BookmarkCheck className="h-4 w-4 text-primary" />
            <span className="sr-only">Reservar</span>
          </Button>
        </div>
      );
    },
  },
];
