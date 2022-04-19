import { configureStore } from "@reduxjs/toolkit";
import rickAndMortyReducer from "./rickAndMorty";

export default configureStore({
  reducer: { rickAndMorty: rickAndMortyReducer },
});
