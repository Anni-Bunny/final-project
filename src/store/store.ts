import { configureStore } from '@reduxjs/toolkit';
import { cartSlice } from './slices/cartSlice';
import { userSlice } from './slices/userSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Uses localStorage by default
import { combineReducers } from 'redux';

// Set up the persist configuration
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart', 'user'], // Persist cart and user slices
};

// Combine reducers
const rootReducer = combineReducers({
    cart: cartSlice.reducer,
    user: userSlice.reducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer
export const store = configureStore({
    reducer: persistedReducer,
});

// Create persistor for the app
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
