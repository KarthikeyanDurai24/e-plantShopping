import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/CartSlice"; // Adjust path as per your project
import "./ProductList.css"; // Optional: for styling

// Array of plant objects
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
  {
    name: "Lavender",
    category: "Medicinal",
    image: "https://example.com/lavender.jpg",
    description: "Calming fragrance and has medicinal properties.",
    cost: 12,
  },
  // Add more plants here as needed
];

const ProductList = () => {
  const dispatch = useDispatch();

  // State to track which plants are added to cart
  const [addedToCart, setAddedToCart] = useState({});

  // Function to handle adding plant to cart
  const handleAddToCart = (plant) => {
    // Dispatch the plant object to the global cart using Redux
    dispatch(addItem(plant));

    // Update local state to reflect product is added
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
