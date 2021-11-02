import React from "react";
import { useShoppingCart } from "use-shopping-cart";

export default function CartSummary() {
  const { formattedTotalPrice, cartCount } = useShoppingCart()
  return (
    <nav onClick={toggleModal} className="md:ml-auto flex flex-wrap items-center text-base justify-center">
        <span className="ml-3">{formattedTotalPrice} ({cartCount})</span>
    </nav>
    );
}