import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { MdOutlineDelete } from "react-icons/md";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    // Retrieve cart items
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
  }, []);

  // Handle Increment
  const handleIncrement = useCallback((id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity ? item.quantity + 1 : 2 }
          : item
      )
    );
  }, []);

  // Handle Decrement
  const handleDecrement = useCallback((id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  }, []);

  // Handle Delete
  const handleDelete = useCallback((id) => {
    const confirmed = window.confirm('Are you sure you want to delete this item?');
    if (confirmed) {
      const updatedCart = cartItems.filter(item => item.id !== id);
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  }, [cartItems]);

  // Handle checkbox toggle
  const handleCheckboxToggle = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter(itemId => itemId !== id)
        : [...prevSelected, id]
    );
  };

  // Memoize the subtotal calculation to avoid unnecessary recalculations
  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      if (selectedItems.includes(item.id)) {
        return total + item.price * (item.quantity || 1);
      }
      return total;
    }, 0);
  }, [cartItems, selectedItems]);

  const deliveryAndHandling = 0;
  const total = subtotal + deliveryAndHandling;

  return (
    <div>
      <ul className="space-y-4 mb-4 px-4">
        {cartItems.map((item) => (
          <li key={item.id}>
            <div className="flex items-center space-x-5 rtl:space-x-reverse">
              <div className="flex-shrink-0 py-4">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleCheckboxToggle(item.id)}
                  className="mr-4 h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
              </div>
              <div className="flex-shrink-0 py-4">
                <img
                  className="w-16 h-16"
                  src={item.image ? item.image : './images/Men/Cargo.jpg'}
                  alt={`${item.name} image`}
                />
              </div>
              <div className="flex-1 px-12 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  {item.name}
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  LKR.{item.price}
                </p>
              </div>
              <div className="inline-flex px-4 items-center text-base font-semibold text-gray-900 dark:text-white">
                <form className="max-w-xs mx-auto">
                  <div className="relative flex items-center">
                    <button
                      type="button"
                      onClick={() => handleDecrement(item.id)}
                      className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                    >
                      <svg
                        className="w-2.5 h-2.5 text-gray-900 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <input
                      type="text"
                      className="flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
                      value={item.quantity || 1} // Default quantity to 1
                      readOnly
                    />
                    <button
                      type="button"
                      onClick={() => handleIncrement(item.id)}
                      className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                    >
                      <svg
                        className="w-2.5 h-2.5 text-gray-900 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
              <div className="inline-flex px-4 items-center text-base font-semibold text-gray-900 dark:text-white">
                LKR.{item.price * (item.quantity || 1)} {/* Display total price */}
              </div>
              <div className="inline-flex px-0 items-center text-base font-semibold text-gray-900 dark:text-white">
                <button onClick={() => handleDelete(item.id)}>
                  <MdOutlineDelete />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Calculation */}
      <div className="calculation mt-6">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700 px-4">
          <li className="py-3 sm:pb-6 pt-6">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  Sub-total
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                LKR.{subtotal}
              </div>
            </div>
          </li>
          <li className="py-3 sm:pb-4 pt-4">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  Delivery and Handling
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                LKR.{deliveryAndHandling}
              </div>
            </div>
          </li>
          <li className="py-3 sm:pb-4 pt-4">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  Total
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                LKR.{total}
              </div>
            </div>
          </li>
          <button
            type="button"
            className="text-white bg-orange-500 hover:bg-orange-600 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Checkout
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Cart;
