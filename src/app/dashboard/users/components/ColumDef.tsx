import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Trash2, UserRound } from "lucide-react";
import { deleteBook } from "@/lib/books";
import { User } from "@/models/user";
import DialogEditUser from "./DialogEditUser";
import { deleteUser } from "@/lib/users";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "photo",
    header: "Foto",
    cell: ({ row }) => {
      const photoUrl = row.getValue("photo") as string;

      return (
        <div className="flex justify-center items-center">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt="User avatar"
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="h-10 w-10 flex items-center justify-center bg-gray-200 rounded-full text-gray-600">
              <UserRound size={20} />
            </div>
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "last_name",
    header: "Apellido",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("last_name")}</div>
    ),
  },

  {
    accessorKey: "email",
    header: "Correo",
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "password",
    header: "Contraseña",
    cell: ({ row }) => <div>{row.getValue("password")}</div>,
  },
  {
    accessorKey: "role",
    header: "Rol",
    cell: ({ row }) => <div>{row.getValue("role")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-right">Opciones</div>,
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex justify-end space-x-2">
          <DialogEditUser user={user} />
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={() => deleteUser(user.id)}
          >
            <Trash2 className="h-4 w-4 text-redCustom" />
            <span className="sr-only">Eliminar</span>
          </Button>
        </div>
      );
    },
  },
];
