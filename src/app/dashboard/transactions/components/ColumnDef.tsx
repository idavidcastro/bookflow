import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Check } from "lucide-react";
import { deleteUser } from "@/lib/users";
import { Transaction } from "@/models/transaction";
import { returnBook } from "@/lib/transactions";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "user_id",
    header: "Usuario",
    cell: ({ row }) => <div>{row.getValue("user_id")}</div>,
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
    cell: ({ row }) => <div>{row.getValue("book_id")}</div>,
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
    header: () => <div className="text-right">Opciones</div>,
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
