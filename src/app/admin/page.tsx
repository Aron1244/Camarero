"use client";

import { useState } from "react";
import WidgetCloudinary from "@/components/widgetCloudinary";

type DishStatus = "active" | "inactive";
type DishCategory = "entradas" | "bebidas" | "platos";

interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  category: DishCategory;
  image: string;
  status: DishStatus;
}

export default function AdminDashboard() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [newDish, setNewDish] = useState<Omit<Dish, "id">>({
    name: "",
    description: "",
    price: 0,
    category: "entradas",
    image: "",
    status: "active",
  });
  const [activeTab, setActiveTab] = useState<DishCategory>("entradas");

  const handleAddDish = () => {
    setDishes([...dishes, { ...newDish, id: Date.now() }]);
    setNewDish({
      name: "",
      description: "",
      price: 0,
      category: "entradas",
      image: "",
      status: "active",
    });
  };

  const handleDeleteDish = (id: number) => {
    setDishes(dishes.filter((dish) => dish.id !== id));
  };

  const toggleDishStatus = (id: number) => {
    setDishes(
      dishes.map((dish) =>
        dish.id === id
          ? {
              ...dish,
              status: dish.status === "active" ? "inactive" : "active",
            }
          : dish
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="border rounded-lg shadow-sm">
        {/* Header */}
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold flex justify-between items-center">
            Panel de Administración
            <button
              onClick={handleAddDish}
              disabled={!newDish.name || !newDish.image || newDish.price <= 0}
              className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 disabled:opacity-50"
            >
              + Nuevo Plato
            </button>
          </h1>
        </div>

        {/* Tabs */}
        <div className="p-4 border-b">
          <div className="flex space-x-1">
            {(["entradas", "bebidas", "platos"] as DishCategory[]).map(
              (category) => (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`px-4 py-2 text-sm rounded-md ${
                    activeTab === category
                      ? "bg-gray-200 text-gray-900"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              )
            )}
          </div>
        </div>

        {/* Formulario */}
        <div className="p-4 border-b">
          <h3 className="font-semibold mb-4">Agregar Nuevo Item</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={newDish.name}
                onChange={(e) =>
                  setNewDish({ ...newDish, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Categoría
              </label>
              <select
                className="w-full p-2 border rounded"
                value={newDish.category}
                onChange={(e) =>
                  setNewDish({
                    ...newDish,
                    category: e.target.value as DishCategory,
                  })
                }
              >
                <option value="entradas">Entrada</option>
                <option value="bebidas">Bebida</option>
                <option value="platos">Plato Principal</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Precio</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={newDish.price}
                onChange={(e) =>
                  setNewDish({ ...newDish, price: Number(e.target.value) })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Imagen</label>
              <WidgetCloudinary
                onSuccess={(result: any) => {
                  setNewDish({
                    ...newDish,
                    image: result.info.secure_url,
                  });
                }}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Descripción
              </label>
              <textarea
                className="w-full p-2 border rounded"
                rows={3}
                value={newDish.description}
                onChange={(e) =>
                  setNewDish({ ...newDish, description: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* Listado de platos */}
        <div className="p-4">
          <div className="h-[400px] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dishes
                .filter((dish) => dish.category === activeTab)
                .map((dish) => (
                  <div
                    key={dish.id}
                    className={`border rounded-lg overflow-hidden ${
                      dish.status === "inactive" ? "opacity-70" : ""
                    }`}
                  >
                    {dish.status === "inactive" && (
                      <span className="absolute top-2 right-2 bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded">
                        Inactivo
                      </span>
                    )}
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold">{dish.name}</h3>
                          <p className="text-sm text-gray-500">
                            {dish.description}
                          </p>
                        </div>
                        <span className="font-bold">
                          {dish.price.toFixed(2)} €
                        </span>
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <button
                          onClick={() => toggleDishStatus(dish.id)}
                          className="p-2 hover:bg-gray-100 rounded"
                          title="Cambiar estado"
                        >
                          👁️
                        </button>
                        <button
                          onClick={() => handleDeleteDish(dish.id)}
                          className="p-2 hover:bg-red-100 text-red-600 rounded"
                          title="Eliminar"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
