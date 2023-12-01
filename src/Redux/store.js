import { createSlice,configureStore } from "@reduxjs/toolkit";



const productSlice=createSlice({
    name:'products',
    initialState:{
        items:[]
    },
    reducers:{
        fetchProducts:(state,action)=>{
            state.items=action.payload
        },
        addProduct:(state,action)=>{
            state.items.push(action.payload)
        },
        removeProduct:(state,action)=>{
            state.items=state.items.filter((eachItem)=>eachItem.id!==action.payload)


        },
    }
})


export const {fetchProducts,addProduct,removeProduct}=productSlice.actions


const store=configureStore({

    reducer:{
        products:productSlice.reducer
    }

})


export default store