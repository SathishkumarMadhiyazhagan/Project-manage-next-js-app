import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productList from '../data/productList.json'
export const fetchAllProduct = createAsyncThunk('fetchAllProducts', async (apiUrl) => {
    const response = await fetch(apiUrl);
    return await response.json();
} )

const productSlice = createSlice({
    name: "product slice",
    initialState: {
        data: [],
        fetchStatus: ''
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProduct.fulfilled, (state, action) => {
                state.data = action.payload
                state.fetchStatus = 'success'
            })
            .addCase(fetchAllProduct.pending, (state) => {
                state.fetchStatus = 'loading'
            })
            .addCase(fetchAllProduct.rejected, (state) => {
                state.data = productList.products
                state.fetchStatus = 'error'
            })
    }
})

export default productSlice;