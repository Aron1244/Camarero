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

// Arreglo inicial de platos
const initialDishes: Dish[] = [
  {
    id: 1,
    name: "Ensalada César",
    description: "Ensalada fresca con aderezo César y crutones.",
    price: 8.5,
    category: "entradas",
    image: "https://via.placeholder.com/150",
    status: "active",
  },
  {
    id: 2,
    name: "Jugo de Naranja",
    description: "Jugo natural recién exprimido.",
    price: 3.0,
    category: "bebidas",
    image: "https://via.placeholder.com/150",
    status: "active",
  },
  {
    id: 3,
    name: "Pasta Alfredo",
    description: "Pasta con salsa Alfredo cremosa.",
    price: 12.0,
    category: "platos",
    image: "https://via.placeholder.com/150",
    status: "inactive",
  },
];

export default function AdminDashboard() {
  const [dishes, setDishes] = useState<Dish[]>(initialDishes); // Usar el arreglo inicial
  const [newDish, setNewDish] = useState<Omit<Dish, "id">>({
    name: "",
    description: "",
    price: 0,
    category: "entradas",
    image: "",
    status: "active",
  });
  const [activeTab, setActiveTab] = useState<DishCategory>("entradas");
  const [imageInputType, setImageInputType] = useState<"upload" | "link">(
    "upload"
  );
  const [showAddDishForm, setShowAddDishForm] = useState<boolean>(false); // Controla la visibilidad del formulario

  const handleAddDish = () => {
    setDishes([...dishes, { ...newDish, id: Date.now() }]); // Agregar el nuevo plato al arreglo existente
    setActiveTab(newDish.category); // Cambiar la pestaña activa a la categoría del nuevo plato
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
      <div className="border rounded-lg shadow-sm bg-white text-gray-700">
        {/* Header */}
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold flex justify-between items-center">
            Panel de Administración
            <div>
              <button
                onClick={handleAddDish}
                disabled={!newDish.name || !newDish.image || newDish.price <= 0}
                className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 disabled:opacity-50"
              >
                + Nuevo Plato
              </button>
              <button
                onClick={() => setShowAddDishForm(!showAddDishForm)} // Alternar la visibilidad del formulario
                className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 mr-2"
              >
                {showAddDishForm ? (
                  "Ocultar Formulario"
                ) : (
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 9-7 7-7-7"
                    />
                  </svg>
                )}
              </button>
            </div>
          </h1>
        </div>

        {/* Formulario */}
        {showAddDishForm && (
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

              {/* Selector de tipo de imagen */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Tipo de imagen
                </label>
                <select
                  className="w-full p-2 border rounded"
                  value={imageInputType}
                  onChange={(e) =>
                    setImageInputType(e.target.value as "upload" | "link")
                  }
                >
                  <option value="upload">Subir a Cloudinary</option>
                  <option value="link">Ingresar URL</option>
                </select>
              </div>

              {/* Campo de imagen según el tipo seleccionado */}
              <div>
                <label className="block text-sm font-medium mb-1">Imagen</label>
                {imageInputType === "upload" ? (
                  <WidgetCloudinary
                    onSuccess={(result: any) =>
                      setNewDish({ ...newDish, image: result.info.secure_url })
                    }
                  />
                ) : (
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="https://ejemplo.com/imagen.jpg"
                    value={newDish.image}
                    onChange={(e) =>
                      setNewDish({ ...newDish, image: e.target.value })
                    }
                  />
                )}
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
        )}

        {/* Listado de platos */}
        <div className="p-4">
          <div className="h-[400px] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Mostrar platos por categoría */}
              {["entradas", "bebidas", "platos"].map((category) => (
                <div key={category}>
                  <h3 className="font-bold text-lg capitalize">{category}</h3>
                  <div>
                    <h4 className="font-semibold text-md">Activos</h4>
                    {dishes
                      .filter(
                        (dish) =>
                          dish.category === category && dish.status === "active"
                      )
                      .map((dish) => (
                        <div
                          key={dish.id}
                          className="border rounded-lg overflow-hidden mb-4"
                        >
                          <img
                            src={dish.image}
                            alt={dish.name}
                            className="w-full h-40 object-cover"
                          />
                          <div className="p-4">
                            <h3 className="font-bold">{dish.name}</h3>
                            <p className="text-sm text-gray-500">
                              {dish.description}
                            </p>
                            <span className="font-bold">
                              {dish.price.toFixed(2)} €
                            </span>
                            <button
                              onClick={() => toggleDishStatus(dish.id)}
                              className="p-2 mt-2"
                            >
                              <svg
                                className="w-6 h-6 text-black"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                                />
                                <path
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteDish(dish.id)}
                              className="p-2 mt-2"
                            >
                              <svg
                                className="w-6 h-6 text-black"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                  <div>
                    <h4 className="font-semibold text-md">Inactivos</h4>
                    {dishes
                      .filter(
                        (dish) =>
                          dish.category === category &&
                          dish.status === "inactive"
                      )
                      .map((dish) => (
                        <div
                          key={dish.id}
                          className="border rounded-lg overflow-hidden mb-4 opacity-70"
                        >
                          <img
                            src={dish.image}
                            alt={dish.name}
                            className="w-full h-40 object-cover"
                          />
                          <div className="p-4">
                            <h3 className="font-bold">{dish.name}</h3>
                            <p className="text-sm text-gray-500">
                              {dish.description}
                            </p>
                            <span className="font-bold">
                              {dish.price.toFixed(2)} €
                            </span>
                            <button
                              onClick={() => toggleDishStatus(dish.id)}
                              className="p-2 mt-2"
                            >
                              <svg
                                className="w-6 h-6 text-black"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteDish(dish.id)}
                              className="p-2 mt-2"
                            >
                              <svg
                                className="w-6 h-6 text-black"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
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
