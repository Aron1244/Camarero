"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Dish } from "@/types/types";
import { Badge } from "@/components/ui/badge";

interface DishCardProps {
  dish: Dish;
  onAddToOrder: () => void;
}

export default function DishCard({ dish, onAddToOrder }: DishCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card className="overflow-hidden">
        <div
          className="relative h-40 w-full flex items-center justify-center bg-gray-100 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <img
            src={dish.image}
            alt={dish.name}
            className="max-h-full max-w-full object-contain"
          />
        </div>
        <CardContent className="p-4">
          <div className="items-start">
            <div>
              <h3 className="font-bold">{dish.name}</h3>
            </div>
            <span className="font-bold">{dish.price.toFixed(2)} €</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-end">
          <Badge size="sm" onClick={onAddToOrder}>
            <span className="mr-1">+</span>
            Añadir
          </Badge>
        </CardFooter>
      </Card>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Fondo translúcido */}
          <div className="absolute inset-0 bg-opacity-50 backdrop-blur-sm z-0"></div>

          {/* Contenido del modal */}
          <div className="relative w-90 bg-white rounded-lg shadow-lg p-6 max-w-md z-10">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              {dish.name}
            </h3>
            <p className="text-gray-600 mb-6">{dish.description}</p>
            <button
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
              onClick={() => setIsModalOpen(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
