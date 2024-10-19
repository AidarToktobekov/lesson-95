import { createSlice } from "@reduxjs/toolkit";
import { ICocktail } from "../../types";
import { createCocktails, deleteCocktails, fetchCocktail, fetchCocktails, publishCocktails } from "./cocktailsThunk";

interface CocktailState{
    coctails: ICocktail[];
    oneCocktail: ICocktail | null;
    loading: boolean;
}

const initialState: CocktailState = {
    coctails: [],
    oneCocktail: null,
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
            .addCase(createCocktails.pending, (state)=>{
                state.loading = true;
            })
            .addCase(createCocktails.fulfilled, (state)=>{
                state.loading = false;
            })
            .addCase(createCocktails.rejected, (state)=>{
                state.loading = false;
            })     
            .addCase(deleteCocktails.pending, (state)=>{
                state.loading = true;
            })
            .addCase(deleteCocktails.fulfilled, (state)=>{
                state.loading = false;
            })
            .addCase(deleteCocktails.rejected, (state)=>{
                state.loading = false;
            }) 
            .addCase(publishCocktails.pending, (state)=>{
                state.loading = true;
            })
            .addCase(publishCocktails.fulfilled, (state)=>{
                state.loading = false;
            })
            .addCase(publishCocktails.rejected, (state)=>{
                state.loading = false;
            }) 
            .addCase(fetchCocktail.pending, (state)=>{
                state.loading = true;
            })
            .addCase(fetchCocktail.fulfilled, (state, {payload: cocktail})=>{
                state.loading = false;
                state.oneCocktail = cocktail;
            })
            .addCase(fetchCocktail.rejected, (state)=>{
                state.loading = false;
            }) 
    },
    selectors: {
        selectCocktails: state=>state.coctails,
        selectCocktailsLoading: state=>state.loading,
        selectCocktail: state=>state.oneCocktail,
    },
});

export const cocktailsReducer = cocktailSlice.reducer;

export const {selectCocktails, selectCocktailsLoading, selectCocktail} = cocktailSlice.selectors;