import { createSlice } from "@reduxjs/toolkit";
import { ICocktail } from "../../types";
import { fetchCocktails } from "./cocktailsThunk";

interface CocktailState{
    coctails: ICocktail[];
    loading: boolean;
}

const initialState: CocktailState = {
    coctails: [],
    loading: false,
}

export const cocktailSlice = createSlice({
    name: 'cocktails',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
            .addCase(fetchCocktails.pending, (state)=>{
                state.loading = true;
            })
            .addCase(fetchCocktails.fulfilled, (state, {payload: cocktails})=>{
                state.loading = false;
                state.coctails = cocktails;
            })
            .addCase(fetchCocktails.rejected, (state)=>{
                state.loading = false;
            })     
    },
    selectors: {
        selectCocktails: state=>state.coctails,
        selectCocktailsLoading: state=>state.loading,
    },
});

export const cocktailsReducer = cocktailSlice.reducer;

export const {selectCocktails, selectCocktailsLoading} = cocktailSlice.selectors;