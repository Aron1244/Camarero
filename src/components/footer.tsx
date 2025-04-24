"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface FooterProps {
  orderCount: number;
  onOrderClick: () => void;
}

export default function Footer({ orderCount, onOrderClick }: FooterProps) {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-sm z-10">
      <div className="container mx-auto px-4 py-3 flex justify-center">
        <Button onClick={onOrderClick} className="relative px-8">
          {/* Reemplazado icono de ShoppingBag con emoji */}
          <span className="mr-2">🛒</span>
          Comanda
          {orderCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
              {orderCount}
            </Badge>
          )}
        </Button>
      </div>
    </footer>
  );
}
