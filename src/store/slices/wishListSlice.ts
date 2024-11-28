import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import api from "../../classes/API";
import {wishList, wishListItem} from "../../interfaces/wishList";


const initialState: wishList = {
    id: -1,
    userId: -1,
    products: []
}

export const wishListSlice = createSlice({
    name: 'wishList',
    initialState,
    reducers: {
        loadWishList: (state, action: PayloadAction<wishList>) => action.payload,
        addProduct: (state, action: PayloadAction<wishListItem>) => {
            state.products.push(action.payload)
            api.updateWishList(state)

        },
        removeProduct: (state, action: PayloadAction<number | string>) => {
            state.products = state.products.filter(product => product.productId !== action.payload)
            api.updateWishList(state)

        },
        clearWishList: () => initialState
    },
})

// Action creators are generated for each case reducer function
export const {
    loadWishList,
    addProduct,
    removeProduct,
    clearWishList,
} = wishListSlice.actions

export default wishListSlice.reducer