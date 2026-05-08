export interface Receipt {
  id: string;
  store: string;
  category: string;
  amount: number;
  date: string;
  items: ReceiptItem[];
  returnDeadline: string | null;
  warrantyExpiry: string | null;
  imageUrl: string;
  aiExtracted: boolean;
  paymentMode: string;
  daysLeft: number | null;
}

export interface ReceiptItem {
  name: string;
  qty: number;
  price: number;
}

export interface Subscription {
  id: string;
  name: string;
  amount: number;
  cycle: string;
  renewsIn: number;
  status: string;
  logo: string;
}

export interface SpendingData {
  month?: string;
  day?: string;
  amount: number;
}

export interface Category {
  name: string;
  amount: number;
  percentage: number;
  color: string;
  emoji: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
  phone: string;
}
