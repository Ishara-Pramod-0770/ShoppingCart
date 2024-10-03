import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import image from "./images/cover2.png";
import Cart from "./Cart";
import avatar from "./images/avatar.jpg";

import { IoCartSharp, IoWatch } from "react-icons/io5";
import { GiAmpleDress, GiLipstick } from "react-icons/gi";
import { BiSolidTv } from "react-icons/bi";
import { FaTshirt } from "react-icons/fa";

const ShoppingCart = () => {
  const [isRightDivVisible, setIsRightDivVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // open model
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Fetch all products 
    axios
      .get("http://localhost:5000/products") 
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data); // Initially show all products
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Handle category 
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    if (searchQuery.trim() === "") {
      const filtered =
        category === "All"
          ? products
          : products.filter((product) => product.category === category);
      setFilteredProducts(filtered);
    } else {
      const filtered = products.filter((product) => {
        const isInCategory =
          category === "All" || product.category === category;
        const matchesSearch = product.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        return matchesSearch;
      });

      setFilteredProducts(filtered);
    }
  };

  //Add to Cart
  const addToCart = (product) => {
    console.log("Adding to cart:", product);
    try {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const isProductInCart = cart.some((item) => item.id === product.id);
      if (!isProductInCart) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        toast.success(`${product.name} has been added to the cart!`);
      } else {
        toast.info(`${product.name} is already in the cart.`);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Failed to add product to cart.");
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filtered = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(query.toLowerCase());
      return matchesSearch;
    });

    setFilteredProducts(filtered);
  };


  return (
    <div className="split">
      <div className={`left ${isRightDivVisible ? "expanded" : ""}`}>
        {/* search and head */}
        <div className="head">
          {/* search */}
          <form className="search max-w-md">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-orange-500"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-orange-500 dark:focus:ring-orange-500 dark:focus:border-orange-500"
                placeholder="Search by product name"
                value={searchQuery} // Bind the search query state
                onChange={handleSearchChange} 
                required
              />
            </div>
          </form>
          <div className="flex">
            {/* cart button */}
            <button className="toggle-btn" onClick={toggleModal}>
              <IoCartSharp />
            </button>
            {/* avatar */}
            <img
              class="w-10 h-10 rounded-full ml-4"
              src={avatar}
              alt="Rounded avatar"
            />
          </div>
        </div>

        {/* banner */}
        <img
          src={image}
          className="main w-full h-auto rounded-lg"
          alt="image description"
        />

{/* categories */}
<div className="category-section">
          <div className="categories inline-flex" role="group">
            <button
              onClick={() => handleCategoryChange("Men's Fashion")}
              type="button"
              className={`inline-flex items-center bg-orange-100 hover:bg-orange-500  hover:text-amber-50 focus:outline-none  font-medium rounded-full text-sm px-5 py-3 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-orange-100 ${
                selectedCategory === "Men's Fashion" ? "bg-orange-500 text-amber-50" : "text-orange-500"
              }`}              
            >
              <div className="mr-4">
                <FaTshirt />
              </div>
              Men's Fashion
            </button>

            <button
              onClick={() => handleCategoryChange("Women's Fashion")}
              type="button"
              className={`inline-flex items-center bg-orange-100 hover:bg-orange-500  hover:text-amber-50 focus:outline-none  font-medium rounded-full text-sm px-5 py-3 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-orange-100 ${
                selectedCategory === "Women's Fashion" ? "bg-orange-500 text-amber-50" : "text-orange-500"
              }`}              
            >
              <div className="mr-4">
                <GiAmpleDress />
              </div>
              Women's Fashion
            </button>

            <button
              onClick={() => handleCategoryChange("Health & Beauty")}
              type="button"
              className={`inline-flex items-center bg-orange-100 hover:bg-orange-500  hover:text-amber-50 focus:outline-none  font-medium rounded-full text-sm px-5 py-3 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-orange-100 ${
                selectedCategory === "Health & Beauty" ? "bg-orange-500 text-amber-50" : "text-orange-500"
              }`}              
            >
              <div className="mr-4">
                <GiLipstick />
              </div>
              Health & Beauty
            </button>

            <button
              onClick={() => handleCategoryChange("Accessories")}
              type="button"
              className={`inline-flex items-center bg-orange-100 hover:bg-orange-500  hover:text-amber-50 focus:outline-none  font-medium rounded-full text-sm px-5 py-3 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-orange-100 ${
                selectedCategory === "Accessories" ? "bg-orange-500 text-amber-50" : "text-orange-500"
              }`}              
            >
              <div className="mr-4">
                <IoWatch />
              </div>
              Accessories
            </button>

            <button
              onClick={() => handleCategoryChange("Electronic Devices")}
              type="button"
              className={`inline-flex items-center bg-orange-100 hover:bg-orange-500  hover:text-amber-50 focus:outline-none  font-medium rounded-full text-sm px-5 py-3 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-orange-100 ${
                selectedCategory === "Electronic Devices" ? "bg-orange-500 text-amber-50" : "text-orange-500"
              }`}              
            >
              <div className="mr-4">
                <BiSolidTv />
              </div>
              Electronic Devices
            </button>

            <button
              onClick={() => handleCategoryChange("All")}
              type="button"
              className={`inline-flex items-center bg-orange-100 hover:bg-orange-500  hover:text-amber-50 focus:outline-none  font-medium rounded-full text-sm px-5 py-3 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-orange-100 ${
                selectedCategory === "All" ? "bg-orange-500 text-amber-50" : "text-orange-500"
              }`}              
            >
              All
            </button>
          </div>
        </div>

        {/* bottom section */}
        <div className="row w-full">
          {/* products display */}
          <div className="products grid grid-cols-4 gap-6 mt-7 ">
            {filteredProducts.map((product, index) => (
              <div
                key={index}
                className="product w-full max-w-md bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <a href="#">
                  <img
                    className="rounded-t-lg"
                    src={product.image}
                    alt="product image"
                  />
                </a>
                <div className="producttxt px-5 pb-5">
                  <a href="#">
                    <h5 className="text-base font-regular tracking-tight text-orange-500 dark:text-orange-500">
                      {product.name}
                    </h5>
                  </a>

                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-gray-900 dark:text-orange-500">
                      LKR.{product.price}
                    </span>
                    <button
                      onClick={() => addToCart(product)} 
                    >
                      <p className="add-cart">
                        <IoCartSharp />
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />

      <div>
        {isOpen && (
          <div
            id="static-modal"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed inset-0 z-50 flex justify-center items-center w-full h-full transition-opacity duration-300 ease-out"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              opacity: isOpen ? 1 : 0,
            }}
          >
            <div className="relative w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700 transition-transform transform duration-300 ease-out scale-100">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-orange-500">
                  Order List
                </h3>
                <button
                  onClick={toggleModal}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-orange-500"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* scrollable container */}
              <div className="p-6 overflow-y-auto max-h-[calc(100vh-10rem)]">
                <Cart />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
