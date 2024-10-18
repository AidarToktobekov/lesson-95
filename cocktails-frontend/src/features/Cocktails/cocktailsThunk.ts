import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICocktail } from "../../types";
import axiosApi from "../../axiosApi";

export const fetchCocktails = createAsyncThunk<ICocktail[]>('coctails/fetchAll', async()=>{
    const {data: cocktails} = await axiosApi.get<ICocktail[]>('/cocktails');
    return cocktails; 
})