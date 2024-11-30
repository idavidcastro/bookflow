export interface Transaction {
  id: number;
  userId: number;
  bookId: number;
  status: string;
  dueDate: string;
  borrowedAt: string;
  returnedAt: string;
}
