export interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export interface OrderItem {
  dish: Dish;
  quantity: number;
}

export interface Order {
  items: OrderItem[];
  total: number;
}
