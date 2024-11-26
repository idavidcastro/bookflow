import { DataTableBooks, Payment } from "./components/DataTableBooks";

const otherData: Payment[] = [
  {
    id: "a1b2c3",
    amount: 500,
    status: "pending",
    email: "john.doe@example.com",
  },
  {
    id: "d4e5f6",
    amount: 150,
    status: "failed",
    email: "jane.doe@example.com",
  },
];

export default function Books() {
  return (
    <div className="m-4 border rounded-md p-4">
      <h2 className="text-4xl font-roboto font-semibold pb-4">Libros</h2>
      <hr />
      <DataTableBooks data={otherData} />
    </div>
  );
}

// export const columns: ColumnDef<Payment>[] = [
//   {
//     accessorKey: "status",
//     header: "Status",
//   },
//   {
//     accessorKey: "email",
//     header: "Email",
//   },
//   {
//     accessorKey: "amount",
//     header: "Amount",
//   },
// ];

// type Payment = {
//   id: string;
//   amount: number;
//   status: "pending" | "processing" | "success" | "failed";
//   email: string;
// };

// export const data: Payment[] = [
//   {
//     id: "728ed52f",
//     amount: 100,
//     status: "pending",
//     email: "m@example.com",
//   },
//   {
//     id: "489e1d42",
//     amount: 125,
//     status: "processing",
//     email: "example@gmail.com",
//   },
//   // ...
// ];
