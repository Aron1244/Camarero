"use client";

import { useState } from "react";

type DishCategory = "entradas" | "platos";

interface Dish {
  id: number;
  name: string;
  category: DishCategory;
  notes?: string; // Opcional: Añadir notas para la cocina
}

interface Order {
  id: number;
  tableNumber: number;
  dishes: Dish[];
}

export default function ComandasView() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      tableNumber: 5,
      dishes: [
        {
          id: 1,
          name: "Ensalada César",
          category: "entradas",
          notes: "Con menos sal",
        },
        {
          id: 2,
          name: "Bistec a la plancha",
          category: "platos",
          notes: "Poco hecho",
        },
        {
          id: 3,
          name: "Tarta de chocolate",
          category: "platos",
        },
      ],
    },
    {
      id: 2,
      tableNumber: 7,
      dishes: [
        {
          id: 4,
          name: "Sopa de verduras",
          category: "entradas",
          notes: "Sin picante",
        },
        {
          id: 5,
          name: "Pollo al curry",
          category: "platos",
          notes: "Extra especiado",
        },
      ],
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-700 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Comandas</h1>
      <div className="grid grid-cols-3 gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-300"
          >
            <div className="mb-4">
              <h2 className="text-xl font-bold">Mesa {order.tableNumber}</h2>
              <p className="text-sm text-gray-500">Orden #{order.id}</p>
            </div>

            {/* Entradas */}
            <div className="mb-4 p-4 border rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold">Entradas</h3>
              <ul className="list-inside space-y-1">
                {order.dishes
                  .filter((dish) => dish.category === "entradas")
                  .map((dish) => (
                    <li key={dish.id} className="text-lg">
                      {"\u2014"} {dish.name}
                      {dish.notes && (
                        <div className="text-sm text-gray-500 mt-1">
                          Anotaciones: {dish.notes}
                        </div>
                      )}
                    </li>
                  ))}
              </ul>
            </div>

            {/* Platos Principales */}
            <div className="p-4 mt-4 border rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold">Platos Principales</h3>
              <ul className="list-inside space-y-1">
                {order.dishes
                  .filter((dish) => dish.category === "platos")
                  .map((dish) => (
                    <li key={dish.id} className="text-lg">
                      {"\u2014"} {dish.name}
                      {dish.notes && (
                        <div className="text-sm text-gray-500 mt-1">
                          Anotaciones: {dish.notes}
                        </div>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
