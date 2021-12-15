import { configureStore, ThunkAction, Action, getDefaultMiddleware } from "@reduxjs/toolkit";
// import { wheaterAPI } from "../modules/mainApplication/services/weatherApi";
import gameReducer from "../modules/mainApplication/slices/gameSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer
  }
});