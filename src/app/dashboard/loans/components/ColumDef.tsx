import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Trash2, UserRound } from "lucide-react";
import { deleteBook } from "@/lib/books";
import { User } from "@/models/user";
// import DialogEditLoans from "./DialogEditLoan";
import { deleteUser } from "@/lib/users";
import { Transaction } from "@/models/transaction";
// import DialogEditLoan from "./DialogEditLoan";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "bookId",
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
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("bookId")}</div>
    ),
  },

  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "dueDate",
    header: "Fecha para entregar",
    cell: ({ row }) => <div>{row.getValue("dueDate")}</div>,
  },
  {
    accessorKey: "borrowedAt",
    header: "Fecha de la transacción",
    cell: ({ row }) => <div>{row.getValue("borrowedAt")}</div>,
  },
  {
    accessorKey: "returnedAt",
    header: "Fecha de devolución",
    cell: ({ row }) => <div>{row.getValue("returnedAt")}</div>,
  },
  //   {
  //     id: "actions",
  //     enableHiding: false,
  //     header: () => <div className="text-right">Opciones</div>,
  //     cell: ({ row }) => {
  //       const user = row.original;

  //       return (
  //         <div className="flex justify-end space-x-2">
  //           <DialogEditLoan user={user} />
  //           <Button
  //             variant="ghost"
  //             className="h-8 w-8 p-0"
  //             onClick={() => deleteUser(user.id)}
  //           >
  //             <Trash2 className="h-4 w-4 text-redCustom" />
  //             <span className="sr-only">Eliminar</span>
  //           </Button>
  //         </div>
  //       );
  //     },
  //   },
];
