import { configureStore } from "@reduxjs/toolkit";
import  {ProductApi} from "./ProductsApi"


export const store = configureStore({
    reducer:{
        [ProductApi.reducerPath]: ProductApi.reducer
    },
    middleware:(getAllMiddleware) => getAllMiddleware().concat(ProductApi.middleware)
})