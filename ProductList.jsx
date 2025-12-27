import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/CartSlice"; // Make sure this path matches your project structure
import "./ProductList.css"; // Optional: For styling product-grid

const plantsArray = [
  {
    name: "Aloe Vera",
    category: "Air Purifying",
    image: "https://example.com/aloe-vera.jpg",
    description: "Helps purify indoor air and is easy to maintain.",
    cost: 10,
  },
  {
    name: "Rose",
    category: "Aromatic Fragrant",
    image: "https://example.com/rose.jpg",
    description: "Fragrant flowering plant, perfect for gardens.",
    cost: 15,
  },
  {
    name: "Basil",
    category: "Insect Repellent",
    image: "https://example.com/basil.jpg",
    description: "Repels insects naturally and can be used in cooking.",
    cost: 8,
  },
  // Add more plant objects here
];

const ProductList = () => {
  const dispatch = useDispatch();

  // State to track which items are added to cart
  const [addedToCart, setAddedToCart] = useState({});

  const handleAddToCart = (plant) => {
    // Dispatch plant to global Redux store
    dispatch(addItem(plant));

    // Update local state to reflect that this plant was added
    setAddedToCart((prevState) => ({
      ...prevState,
      [plant.name]: true,
    }));
  };

  return (
    <div className="product-grid">
      {plantsArray.map((plant, index) => (
        <div key={index} className="product-card">
          <img src={plant.image} alt={plant.name} className="product-image" />
          <h3>{plant.name}</h3>
          <p>{plant.description}</p>
          <p>Price: ${plant.cost}</p>
          <button
            onClick={() => handleAddToCart(plant)}
            disabled={addedToCart[plant.name]}
          >
            {addedToCart[plant.name] ? "Added" : "Add to Cart"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
