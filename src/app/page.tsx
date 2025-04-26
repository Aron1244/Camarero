"use client";

import { useEffect, useRef, useState } from "react";
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
    image:
      "https://tost.cl/cdn/shop/files/Disenosintitulo-2024-04-02T164739.838_1200x.png?v=1738742454",
  },
  {
    id: 5,
    name: "Refresco",
    description: "Coca-Cola, Fanta, Sprite (330ml)",
    price: 2.5,
    category: "bebidas",
    image:
      "https://150927483.v2.pressablecdn.com/wp-content/uploads/2025/01/wp-image-2044.png",
  },
  {
    id: 6,
    name: "Cerveza",
    description: "Caña de cerveza (330ml)",
    price: 3.0,
    category: "bebidas",
    image:
      "https://los-alpes.cl/wp-content/uploads/2022/04/920320091-600x600.jpg",
  },
  {
    id: 7,
    name: "Paella Valenciana",
    description: "Arroz, pollo, conejo, judías verdes y garrofón",
    price: 15.0,
    category: "platos",
    image:
      "https://www.hola.com/horizon/landscape/9e7aa7251e9f-stockfood00456742hirespaellavalencianawithgreenbeansspain.jpg",
  },
  {
    id: 8,
    name: "Entrecot a la Parrilla",
    description: "Entrecot de ternera a la parrilla con patatas y verduras",
    price: 18.5,
    category: "platos",
    image:
      "https://www.napoleon.com/sites/default/files/styles/large_banner_image_1200_by_560_/public/images/2018-11/grilled-ribeye-steaks.jpg?h=bde28bee&itok=tophiYpi",
  },
  {
    id: 9,
    name: "Lubina al Horno",
    description: "Lubina al horno con patatas y verduras",
    price: 16.0,
    category: "platos",
    image:
      "https://content-cocina.lecturas.com/medio/2019/02/06/paso_a_paso_para_realizar_lubina_al_horno_con_patatas_y_verduras_resultado_final_f4beb45e_800x800.jpg",
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

  const orderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        orderRef.current &&
        !orderRef.current.contains(event.target as Node)
      ) {
        setShowOrder(false);
      }
    };

    if (showOrder) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOrder]);

  return (
    <main className="flex min-h-screen flex-col pb-16 text-gray-700 bg-white">
      <Navbar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <div className="flex-1 p-4 container mx-auto bg-white">
        <h2 className="text-xl font-bold mb-4 text-gray-700">
          {categories.find((cat) => cat.id === selectedCategory)?.name}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
        <div ref={orderRef}>
          <OrderSummary
            order={order}
            onClose={() => setShowOrder(false)}
            onSendOrder={sendOrder}
            onAddItem={addToOrder}
            onRemoveItem={removeFromOrder}
          />
        </div>
      )}
    </main>
  );
}
