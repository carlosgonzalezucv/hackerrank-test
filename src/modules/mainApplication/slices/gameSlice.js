import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const cities = ["Caracas", "Buenos Aires", "Madrid", "Bogota", "Barcelona"];

const initialState = {
  username: "this is a test",
  userguess: 0,
  selectedCity: "London",
  currentTemperature: 0,
  numCorrectAttemps: 0,
  umbral: 5,
  loading: false,
  userAttemps: [],
  userWon: false
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.username = action.payload;
    },
    setUserGuess: (state, action) => {
      state.userguess = action.payload;
    },
    setSelectedCity: (state, action) => {
      state.selectedCity = action.payload;
    },
    incrementFailedAttemps: (state) => {
      state.numFailedAttemps += 1;
    },
    resetFailedAttemps: (state) => {
      state.numFailedAttemps = 0;
    },
    registerUserAttemp: (state, action) => {
      let { city, userGuess, actualTemp, isRight } = action.payload;
      if(state.userAttemps >= 5) return;
      state.userAttemps.push({
        city,
        userGuess,
        actualTemp,
        isRight,
      });
      state.numCorrectAttemps = state.userAttemps.filter(e => e.isRight).length;
    },
    putAnotherCity: (state) => {
      let aux = cities.filter((city) => {
        let wasTaken = state.userAttemps.find((e) => e.city === city);
        return !wasTaken;
      });
      state.selectedCity = aux[0];
    },
  },
});

export const selectUsername = (state) => state.game.username;
export const selectUserguess = (state) => state.game.userguess;
export const selectCity = (state) => state.game.selectedCity;
export const selectUserAttemps = (state) => state.game.userAttemps;
export const selectCorrectUserAttemps = (state) => state.game.numCorrectAttemps;

export const {
  incrementFailedAttemps,
  resetFailedAttemps,
  setSelectedCity,
  setUserGuess,
  setUserName,
  registerUserAttemp,
  putAnotherCity,
} = gameSlice.actions;

export default gameSlice.reducer;
