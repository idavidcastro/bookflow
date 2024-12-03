import { BookmarkCheck, BookOpen, NotepadText } from "lucide-react";
import { ImBooks } from "react-icons/im";

export const userRoutes = [
  {
    title: "Libros",
    to: "/dashboard/books",
    icon: <BookOpen />,
  },
  {
    title: "Mis transacciones",
    to: "/dashboard/loans",
    icon: <BookmarkCheck />,
  },
];
