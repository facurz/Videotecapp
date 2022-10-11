import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/auth/authSlice';
import  moviesSlice  from './slices/movies/moviesSlice';
import uiSlice from './slices/ui/uiSlice';

export const store = configureStore({
    reducer:{
        auth: authSlice,
        movies: moviesSlice,
        ui: uiSlice,
    } 
})