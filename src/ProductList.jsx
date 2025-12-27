import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/CartSlice'; // Adjust path
import './ProductList.css';
import CartItem from './CartItem';

function ProductList({ onHomeClick }) {
    const [showCart, setShowCart] = useState(false);
    const [showPlants, setShowPlants] = useState(false);
    const [addedToCart, setAddedToCart] = useState({}); // Track added products

    const dispatch = useDispatch();

    const plantsArray = [
        // Your existing plantsArray here (with categories and plants)
    ];

    const handleAddToCart = (plant) => {
        dispatch(addItem(plant)); // Add plant to Redux cart
        setAddedToCart(prev => ({ ...prev, [plant.name]: true })); // Update local state
    };

    const handleHomeClick = (e) => {
        e.preventDefault();
        onHomeClick();
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowPlants(true);
        setShowCart(false);
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    return (
        <div>
            {/* Navbar */}
            <div className="navbar" style={{ backgroundColor: '#4CAF50', color: '#fff', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '20px' }}>
                <div className="luxury">
                    <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
                    <a href="/" onClick={handleHomeClick} style={{ color: 'white', textDecoration: 'none' }}>
                        <div>
                            <h3>Paradise Nursery</h3>
                            <i>Where Green Meets Serenity</i>
                        </div>
                    </a>
                </div>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <a href="#" onClick={handlePlantsClick} style={{ color: 'white', fontSize: '30px', textDecoration: 'none' }}>Plants</a>
                    <a href="#" onClick={handleCartClick} style={{ color: 'white', fontSize: '30px', textDecoration: 'none' }}>
                        <h1 className='cart'>🛒</h1>
                    </a>
                </div>
            </div>

            {/* Product Grid */}
            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category, index) =>
                        category.plants.map((plant, i) => (
                            <div key={`${index}-${i}`} className="product-card">
                                <img src={plant.image} alt={plant.name} className="product-image" />
                                <h3>{plant.name}</h3>
                                <p>{plant.description}</p>
                                <p>Price: {plant.cost}</p>
                                <button
                                    onClick={() => handleAddToCart(plant)}
                                    disabled={addedToCart[plant.name]}
                                >
                                    {addedToCart[plant.name] ? "Added" : "Add to Cart"}
                                </button>
                            </div>
                        ))
                    )}
                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;
