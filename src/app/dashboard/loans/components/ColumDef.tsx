import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Images } from "lucide-react";
import { Transaction } from "@/models/transaction";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/lib/supabaseClient";

const fetchBookDetails = async (bookId: number) => {
  try {
    const { data, error } = await supabase
      .from("books")
      .select("title, photo")
      .eq("id", bookId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data; // Esto debería devolver { name, photo }
  } catch (error: any) {
    console.error(
      "Error consultando los datos de los libros:",
      error.message || error
    );
    return null;
  }
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "photo",
    header: "",
    cell: ({ row }: any) => {
      const [isOpen, setIsOpen] = useState(false);
      const [bookDetails, setBookDetails] = useState<{
        photo: string;
      } | null>(null);

      useEffect(() => {
        const bookId = row.getValue("book_id");
        fetchBookDetails(bookId).then((details) => setBookDetails(details));
      }, [row]);

      return (
        <>
          <div className="flex justify-center items-center">
            {bookDetails?.photo ? (
              <img
                src={bookDetails.photo}
                alt="Book photo"
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
                src={bookDetails?.photo || ""}
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
    accessorKey: "book_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Libro
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const [bookName, setBookName] = useState<string | null>(null);

      useEffect(() => {
        const bookId = row.getValue("book_id") as number; // Asegúrate de que es un número
        fetchBookDetails(bookId).then((details) => {
          if (details) {
            setBookName(details.title); // Usamos el nombre del libro
          }
        });
      }, [row]);

      return <div>{bookName || "Cargando..."}</div>; // Mostrar el nombre del libro
    },
  },

  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "due_date",
    header: "Fecha para entregar",
    cell: ({ row }) => <div>{row.getValue("due_date")}</div>,
  },
  {
    accessorKey: "borrowed_at",
    header: "Fecha de la transacción",
    cell: ({ row }) => <div>{row.getValue("borrowed_at")}</div>,
  },
  {
    accessorKey: "returned_at",
    header: "Fecha de devolución",
    cell: ({ row }) => <div>{row.getValue("returned_at")}</div>,
  },
];
