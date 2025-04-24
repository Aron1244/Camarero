"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Dish } from "@/types/types"
import { Badge } from "@/components/ui/badge"

interface DishCardProps {
  dish: Dish
  onAddToOrder: () => void
}

export default function DishCard({ dish, onAddToOrder }: DishCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-40 w-full">
        <Image src={dish.image || "/placeholder.svg"} alt={dish.name} fill className="object-cover" />
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
          {/* Reemplazado icono de Plus con texto + */}
          <span className="mr-1">+</span>
          Añadir
        </Badge>
      </CardFooter>
    </Card>
  )
}
