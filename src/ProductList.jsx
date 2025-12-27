import React, { useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/CartSlice'; // Adjust path if needed
import './ProductList.css';
import CartItem from './CartItem';

function ProductList({ onHomeClick }) {
    const [showCart, setShowCart] = useState(false);
    const [showPlants, setShowPlants] = useState(false);
    const [addedToCart, setAddedToCart] = useState({}); // Track which products are added

    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    // Calculate total quantity for cart icon
    const totalCartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    const plantsArray = [
        // Your existing plantsArray here
    ];

    // Function to add plant to cart
    const handleAddToCart = (plant) => {
        dispatch(addItem(plant)); // Add plant to Redux cart
        setAddedToCart(prev => ({ ...prev, [plant.name]: true })); // Mark as added
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
            <div className="navbar">
                <div className="luxury">
                    <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="Logo" />
                    <a href="/" onClick={handleHomeClick} className="tag_home_link">
                        <h3>Paradise Nursery</h3>
                        <i>Where Green Meets Serenity</i>
                    </a>
                </div>
                <div className="ul">
                    <div>
                        <a href="#" onClick={handlePlantsClick}>Plants</a>
                    </div>
                    <div>
                        <a href="#" onClick={handleCartClick}>
                            <h1 className='cart'>🛒
                                {totalCartQuantity > 0 && (
                                    <span className="cart_quantity_count">{totalCartQuantity}</span>
                                )}
                            </h1>
                        </a>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category, index) =>
                        category.plants.map((plant, i) => (
                            <div key={`${index}-${i}`} className="product-card">
                                <img src={plant.image} alt={plant.name} className="product-image" />
                                <h3 className="product-title">{plant.name}</h3>
                                <p>{plant.description}</p>
                                <p className="product-price">{plant.cost}</p>
                                <button
                                    className={`product-button ${addedToCart[plant.name] ? 'added-to-cart' : ''}`}
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
