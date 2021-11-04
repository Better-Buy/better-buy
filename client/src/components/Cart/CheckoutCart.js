import React from "react";
import { useShoppingCart } from "use-shopping-cart";
import useCheckout from "../utils/useCheckout";

export default function CheckoutCart() {
  const { cartCount } = useShoppingCart();
  const handleCheckOut = useCheckout();

  return (
    <button className="inline-flex items-center bg-green-700 border-0 py-1 px-3 focus:outline-none hover:bg-green-600 rounded text-white mt-4 md:mt-0"
    onClick={handleCheckOut}
    disabled={!cartCount}
    >
      Go To Checkout
      <svg
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="w-4 h-4 ml-2"
        viewBox="0 0 24 24"
      >
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
    </button>
  );
}