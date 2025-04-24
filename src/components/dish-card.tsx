"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Dish } from "@/types/types";
import { Badge } from "@/components/ui/badge";

interface DishCardProps {
  dish: Dish;
  onAddToOrder: () => void;
}

export default function DishCard({ dish, onAddToOrder }: DishCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-40 w-full flex items-center justify-center bg-gray-100">
        <img
          src={dish.image}
          alt={dish.name}
          className="max-h-full max-w-full object-contain" // Ajusta la imagen al contenedor
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold">{dish.name}</h3>
            <p className="text-sm text-gray-500">{dish.description}</p>
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
  );
}
