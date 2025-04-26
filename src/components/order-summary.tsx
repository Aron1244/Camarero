"use client"

import type { Order, Dish } from "@/types/types"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scrollArea"

interface OrderSummaryProps {
  order: Order
  onClose: () => void
  onSendOrder: () => void
  onAddItem: (dish: Dish) => void
  onRemoveItem: (dishId: number) => void
}

export default function OrderSummary({ order, onClose, onSendOrder, onAddItem, onRemoveItem }: OrderSummaryProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[80vh] flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Comanda</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <span>✕</span>
          </Button>
        </div>

        <ScrollArea className="flex-1 p-4">
          {order.items.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No hay platos en la comanda</p>
          ) : (
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.dish.id} className="flex justify-between items-center">
                  <div className="flex-1">
                    <p className="font-medium">{item.dish.name}</p>
                    <p className="text-sm text-gray-500">{(item.dish.price * item.quantity).toFixed(2)} €</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onRemoveItem(item.dish.id)}
                    >
                      <span>-</span>
                    </Button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => onAddItem(item.dish)}>
                      <span>+</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <div className="p-4 border-t">
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold">Total:</span>
            <span className="font-bold">{order.total.toFixed(2)} €</span>
          </div>

          <button className="w-full" onClick={onSendOrder} disabled={order.items.length === 0}>
            <span className="mr-2">📤</span>
            Enviar a cocina
          </button>
        </div>
      </div>
    </div>
  )
}
