"use client";

function Footer({ orderCount, onOrderClick }: { orderCount: number; onOrderClick: () => void }) {
  return (
    <footer className="fixed bottom-0 w-full bg-white shadow-md">
      <div className="container mx-auto flex justify-center items-center p-4 relative">
        <button
          className="relative px-8 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition duration-100"
          onClick={onOrderClick}
        >
          Ver pedido
          {orderCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {orderCount}
            </span>
          )}
        </button>
      </div>
    </footer>
  );
}

export default Footer;
