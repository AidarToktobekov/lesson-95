import { createAsyncThunk } from "@reduxjs/toolkit";
import { CocktailMutation, ICocktail } from "../../types";
import axiosApi from "../../axiosApi";
import { RootState } from "../../app/store";

export const fetchCocktails = createAsyncThunk<ICocktail[]>('coctails/fetchAll', async()=>{
    const {data: cocktails} = await axiosApi.get<ICocktail[]>('/cocktails');
    return cocktails; 
});

export const fetchCocktail = createAsyncThunk<ICocktail, string>('coctails/fetchOne', async(id)=>{
    const {data: cocktail} = await axiosApi.get<ICocktail>(`/cocktails/${id}`);
    return cocktail; 
});


export const createCocktails = createAsyncThunk<void, CocktailMutation, {state: RootState}>('cocktails/create', async(cocktailMutation, {getState})=>{
    const user = getState().users.user;
    const formData = new FormData();
    if (user) {    
      const keys = Object.keys(cocktailMutation) as (keyof CocktailMutation)[];
      keys.forEach((key) => {
        const value = cocktailMutation[key];
        if (value) {
            if(typeof value !== 'string'){
                if (Array.isArray(value)) {
                    formData.append(key, JSON.stringify(value));
                }else{
                    formData.append(key, value);
                }
            }else{
                formData.append(key, value);
                console.log(value);
            }
        }
      });
      await axiosApi.post<ICocktail>(`/cocktails`, formData);
    }
});

export const publishCocktails = createAsyncThunk<ICocktail, string>('cocktails/publish',  async (id) => {
    const { data: cocktail } = await axiosApi.patch<ICocktail>(`/cocktails/${id}/togglePublished`);
    return cocktail;
});
  
export const deleteCocktails = createAsyncThunk<ICocktail, string>('cocktails/delete',  async (id) => {
    const { data: cocktail } = await axiosApi.delete<ICocktail>(`/cocktails/${id}`);
    return cocktail;
});