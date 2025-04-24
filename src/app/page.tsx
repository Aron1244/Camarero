"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";

import OrderSummary from "@/components/order-summary";
import type { Dish, Order, OrderItem } from "@/types/types";
import Footer from "@/components/footer";
import DishCard from "@/components/dish-card";


// Datos de ejemplo
const sampleDishes: Dish[] = [
  {
    id: 1,
    name: "Patatas Bravas",
    description: "Patatas fritas con salsa brava y alioli",
    price: 5.5,
    category: "entradas",
    image: "/platos/patatas.jpg",
  },
  {
    id: 2,
    name: "Croquetas de Jamón",
    description: "Croquetas caseras de jamón ibérico",
    price: 6.0,
    category: "entradas",
    image: "/platos/croquetas.jpg",
  },
  {
    id: 3,
    name: "Ensalada César",
    description: "Lechuga, pollo, queso parmesano, picatostes y salsa césar",
    price: 8.5,
    category: "entradas",
    image: "/platos/ensalada.jpg",
  },
  {
    id: 4,
    name: "Agua Mineral",
    description: "Botella de agua mineral 500ml",
    price: 2.0,
    category: "bebidas",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 5,
    name: "Refresco",
    description: "Coca-Cola, Fanta, Sprite (330ml)",
    price: 2.5,
    category: "bebidas",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 6,
    name: "Cerveza",
    description: "Caña de cerveza (330ml)",
    price: 3.0,
    category: "bebidas",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 7,
    name: "Paella Valenciana",
    description: "Arroz, pollo, conejo, judías verdes y garrofón",
    price: 15.0,
    category: "platos",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 8,
    name: "Entrecot a la Parrilla",
    description: "Entrecot de ternera a la parrilla con patatas y verduras",
    price: 18.5,
    category: "platos",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 9,
    name: "Lubina al Horno",
    description: "Lubina al horno con patatas y verduras",
    price: 16.0,
    category: "platos",
    image: "/placeholder.svg?height=100&width=100",
  },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("entradas");
  const [order, setOrder] = useState<Order>({ items: [], total: 0 });
  const [showOrder, setShowOrder] = useState<boolean>(false);

  const categories = [
    { id: "entradas", name: "Entradas" },
    { id: "bebidas", name: "Bebidas" },
    { id: "platos", name: "Platos" },
  ];

  const filteredDishes = sampleDishes.filter(
    (dish) => dish.category === selectedCategory
  );

  const addToOrder = (dish: Dish) => {
    const existingItem = order.items.find((item) => item.dish.id === dish.id);

    let newItems: OrderItem[];

    if (existingItem) {
      newItems = order.items.map((item) =>
        item.dish.id === dish.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newItems = [...order.items, { dish, quantity: 1 }];
    }

    const newTotal = newItems.reduce(
      (sum, item) => sum + item.dish.price * item.quantity,
      0
    );

    setOrder({ items: newItems, total: newTotal });
  };

  const removeFromOrder = (dishId: number) => {
    const existingItem = order.items.find((item) => item.dish.id === dishId);

    if (!existingItem) return;

    let newItems: OrderItem[];

    if (existingItem.quantity > 1) {
      newItems = order.items.map((item) =>
        item.dish.id === dishId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    } else {
      newItems = order.items.filter((item) => item.dish.id !== dishId);
    }

    const newTotal = newItems.reduce(
      (sum, item) => sum + item.dish.price * item.quantity,
      0
    );

    setOrder({ items: newItems, total: newTotal });
  };

  const sendOrder = () => {
    // Aquí iría la lógica para enviar la comanda a la cocina
    alert("Comanda enviada a la cocina");
    setOrder({ items: [], total: 0 });
    setShowOrder(false);
  };

  return (
    <main className="flex min-h-screen flex-col pb-16">
      <Navbar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <div className="flex-1 p-4 container mx-auto">
        <h2 className="text-xl font-bold mb-4">
          {categories.find((cat) => cat.id === selectedCategory)?.name}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDishes.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              onAddToOrder={() => addToOrder(dish)}
            />
          ))}
        </div>
      </div>

      <Footer
        orderCount={order.items.reduce((sum, item) => sum + item.quantity, 0)}
        onOrderClick={() => setShowOrder(!showOrder)}
      />

      {showOrder && (
        <OrderSummary
          order={order}
          onClose={() => setShowOrder(false)}
          onSendOrder={sendOrder}
          onAddItem={addToOrder}
          onRemoveItem={removeFromOrder}
        />
      )}
    </main>
  );
}
