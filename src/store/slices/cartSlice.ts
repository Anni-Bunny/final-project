import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {cart, cartItem} from "../../interfaces/cart";
import api from "../../classes/API";


const initialState: cart = {
    id: -1,
    userId: -1,
    products: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        loadUserCart: (state, action: PayloadAction<cart>) => action.payload,
        addProduct: (state, action: PayloadAction<cartItem>) => {
            state.products.push(action.payload)
            api.updateUserCart(state)

        },
        removeProduct: (state, action: PayloadAction<number>) => {
            state.products = state.products.filter(product => product.productId !== action.payload)
            api.updateUserCart(state)

        },
        incrementProduct: (state, action: PayloadAction<string>) => {
            state.products = state.products.map(product => {

                if (product.sku === action.payload)
                    product.quantity++

                return product
            })
            api.updateUserCart(state)

        },
        decrementProduct: (state, action: PayloadAction<string>) => {
            state.products = state.products.map(product => {

                if (product.sku === action.payload)
                    product.quantity--

                return product

            }).filter(product => product.quantity > 0)
            api.updateUserCart(state)
        },
        clearCart: () => initialState
    },
})

// Action creators are generated for each case reducer function
export const {
    loadUserCart,
    addProduct,
    removeProduct,
    incrementProduct,
    decrementProduct,
    clearCart
} = cartSlice.actions

export default cartSlice.reducer