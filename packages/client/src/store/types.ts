export type Order = {
  id: number | null;
  userId: number;
  companyId: number | null;
  statusId: number;
  createdAt: string;
  completedAt: string | null;
  shopId: number;
  price: number;
  itemList: OrderItem[];
};

export type OrderItem = {
  product: Product;
  quantity: number;
};

export type Product = {
  id: number | null;
  name: string;
  description: string;
  countryId: number;
  manufacturerId: number;
  initialPrice: number;
  discount: number;
  imgUrl: string;
};

export type Company = {
  id: number | null;
  name: string;
  KPP: string;
  INN: string;
  address: string;
};

export type Country = {
  id: number | null;
  name: string;
};

export type Manufacturer = {
  id: number | null;
  name: string;
};

export type OrderStatus = {
  id: number | null;
  name: string;
};

export type Shop = {
  id: number | null;
  address: string;
  workingHours: JSON;
  phone: string;
};

export type User = {
  id: number | null;
  login: string;
  password: string;
  worker: boolean;
  firstName: string;
  lastName: string;
  middleName: string;
  birthday: string;
  email: string;
  phone: string;
  personalDiscount: number;
};

export type APIResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };
