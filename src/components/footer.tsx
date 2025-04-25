"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface FooterProps {
  orderCount: number;
  onOrderClick: () => void;
}

export default function Footer({ orderCount, onOrderClick }: FooterProps) {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-sm z-10 text-gray-700">
      <div className="container mx-auto px-4 py-3 flex justify-center text-gray-700">
        <Button onClick={onOrderClick} className="relative px-8">
          {/* Reemplazado icono de ShoppingBag con emoji */}
          <span className="mr-2 text-gray-700">
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
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
                d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
              />
            </svg>
          </span>
          Comanda
          {orderCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-gray-700">
              {orderCount}
            </Badge>
          )}
        </Button>
      </div>
    </footer>
  );
}
