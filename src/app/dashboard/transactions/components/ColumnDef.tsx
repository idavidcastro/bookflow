import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Check, Images } from "lucide-react";
import { Transaction } from "@/models/transaction";
import { returnBook } from "@/lib/transactions";
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

    return data;
  } catch (error: any) {
    console.error("Error fetching book details:", error.message || error);
    return null;
  }
};

const fetchUserDetails = async (userId: number) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("name, last_name")
      .eq("id", userId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error: any) {
    console.error(
      "Error consultado los datos de los usuarios:",
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
                className="h-20 w-14 object-cover cursor-pointer min-w-[60px] min-h-[90px]"
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
    accessorKey: "user_id",
    header: "Usuario",
    cell: ({ row }) => {
      const [userName, setUserName] = useState<string | null>(null);
      const [lastName, setLastName] = useState<string | null>(null);

      useEffect(() => {
        const userId = row.getValue("user_id") as number;
        fetchUserDetails(userId).then((details) => {
          if (details) {
            setUserName(details.name);
            setLastName(details.last_name);
          }
        });
      }, [row]);

      return (
        <div>
          {userName && lastName ? `${userName} ${lastName}` : "Cargando..."}
        </div>
      );
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
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-right">Completar</div>,
    cell: ({ row }) => {
      const transaction = row.original;

      return (
        <div className="flex justify-end space-x-2">
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={() => returnBook(transaction.id)}
          >
            <Check className="h-4 w-4 text-greenCustom" />
            <span className="sr-only">Completar</span>
          </Button>
        </div>
      );
    },
  },
];
