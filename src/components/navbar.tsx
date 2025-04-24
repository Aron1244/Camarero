"use client";

import { Badge } from "@/components/ui/badge"


interface Category {
  id: string;
  name: string;
}

interface NavbarProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function Navbar({
  categories,
  selectedCategory,
  onSelectCategory,
}: NavbarProps) {
  return (
    <nav className="sticky top-0 z-10 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <h1 className="text-xl font-bold text-center mb-2">Camarero</h1>
        <div className="flex justify-between items-center">
          {categories.map((category) => (
            <Badge
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "ghost"}
              onClick={() => onSelectCategory(category.id)}
              className="flex-1 mx-1"
            >
              {category.name}
            </Badge>
          ))}
        </div>
      </div>
    </nav>
  );
}
