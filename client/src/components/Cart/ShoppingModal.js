import React from "react";
import Modal from "react-modal";
import { useShoppingCart } from "use-shopping-cart";
import useCheckout from "../../utils/UseCheckout";
import CartItem from "../../utils/CartItem";

Modal.setAppElement("#root");

export default function CartModal({ isOpen, toggleModal }) {
    const { formattedTotalPrice, cartCount, cartDetails } = useShoppingCart()
    const handleCheckout = useCheckout()

    const cartItems = Object.keys(cartDetails).map(key => cartDetails[key])

    return (
        <Modal isOpen={isOpen} onRequestClose={toggleModal} contentLabel="Cart Modal" closeTimeoutMS={500}>
          <div className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800">
            <div className="bg-white rounded-lg w-80 sm:w-1/2 md:w-2/3 lg:w-1/2">
              <div className="flex flex-col items-start p-4 full m">
                <div className="flex items-center w-full mb-4">
                  <div className="text-gray-900 font-medium text-lg">
                    Cart Summary: {formattedTotalPrice} ({cartCount})
                  </div>
                </div>
                <hr />
                {cartItems.map(cartItem => (
                  <CartItem key={cartItem.id} cartItem={cartItem} />
                ))}
                <div className="ml-auto mt-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    style={{ marginRight: 4 }}
                    onClick={handleCheckout}
                  >
                    Checkout Now
                  </button>
                  <button className="bg-transparent hover:bg-gray-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={toggleModal}>
                    Still Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      );
}