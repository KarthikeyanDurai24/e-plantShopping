// Import configureStore from Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';
// Import the cart reducer
import cartReducer from './CartSlice';

// Configure the Redux store
const store = configureStore({
    reducer: {
        cart: cartReducer, // Cart slice managed by cartReducer
    },
});

// Export the store for use in the app
export default store;
