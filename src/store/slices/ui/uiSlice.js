import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   menuOpen: false,
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setMenuOpen: (state, {payload})=>{
            state.menuOpen = payload;
            ;
        },
        
            
    }
})

export const { setMenuOpen } = uiSlice.actions;

export default uiSlice.reducer;