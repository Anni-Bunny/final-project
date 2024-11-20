import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {cart, cartItem} from "../../interfaces/cart";


const initialState: cart = {
    id: 0,
    userId: 0,
    products: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<cartItem>) => {
            state.products.push(action.payload)
        },
        removeProduct: (state, action: PayloadAction<number>) => {
            state.products = state.products.filter(product => product.productId !== action.payload)
        },
        incrementProduct: (state, action: PayloadAction<number>) => {
            state.products = state.products.map(product => {

                if (product.productId === action.payload)
                    product.quantity++

                return product
            })
        },
        decrementProduct: (state, action: PayloadAction<number>) => {
            state.products = state.products.map(product => {

                if (product.productId === action.payload)
                    product.quantity--

                return product

            }).filter(product => product.quantity > 0)
        },
    },
})

// Action creators are generated for each case reducer function
export const {addProduct, removeProduct, incrementProduct, decrementProduct} = cartSlice.actions

export default cartSlice.reducer