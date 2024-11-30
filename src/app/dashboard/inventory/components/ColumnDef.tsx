import { Button } from "@/components/ui/button";
import { Book } from "@/models/book";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Trash2 } from "lucide-react";
import DialogEditInventory from "./DialogEditInventary";
import { deleteBook } from "@/lib/books";

export const columns: ColumnDef<Book>[] = [
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
  // {
  //   accessorKey: "genre_id",
  //   header: "Género",
  //   cell: ({ row }) => (
  //     <div className="capitalize">{row.getValue("genre_id")}</div>
  //   ),
  // },
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
    header: "Disponible",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("available_count")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-right">Opciones</div>,
    cell: ({ row }) => {
      const book = row.original;

      return (
        <div className="flex justify-end space-x-2">
          <DialogEditInventory book={book} />
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={() => deleteBook(book.id)}
          >
            <Trash2 className="h-4 w-4 text-redCustom" />
            <span className="sr-only">Eliminar</span>
          </Button>
        </div>
      );
    },
  },
];
