import { View } from "../models";
import {
  ArrowLeftRight,
  ChartNoAxesCombined,
  SquareLibrary,
  User,
} from "lucide-react";

export const adminRoutes: View[] = [
  {
    title: "Inventario",
    to: "/dashboard/inventory",
    icon: <SquareLibrary />,
  },
  {
    title: "Transacciones",
    to: "/dashboard/transactions",
    icon: <ArrowLeftRight />,
  },
  {
    title: "Usuarios",
    to: "/dashboard/users",
    icon: <User />,
  },
];
