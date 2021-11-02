import React from "react";
import toast from "react-hot-toast";
import { useShoppingCart } from "use-shopping-cart";

export default function RemoveFromCart({ product }) {
  const { removeItem, cartCount } = useShoppingCart();

  function handleRemoveItem() {
    removeItem(product.sku);
    toast.success(`${product.name} is removed to your cart!`)

  }

  return (
    <button 
      className="flex ml-2 text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
      onClick={handleRemoveItem}
      disabled={!cartCount}
    >
      Remove
    </button>
  );
}