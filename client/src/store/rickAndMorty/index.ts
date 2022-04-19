import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Character {
  name: string;
}

interface RickAndMortySliceState {
  characters: Character[];
  status: string | null;
}
const initialState: RickAndMortySliceState = {
  characters: [],
  status: null,
};

export const getCharacters = createAsyncThunk(
  "rickAndMorty/characters",
  async () => {
    const response = await axios.get(
      "https://rickandmortyapi.com/api/character"
    );
    const { data } = response;

    return data.results as Character[];
  }
);

export const RickAndMortSlice = createSlice({
  name: "rickAndMorty",
  initialState,
  reducers: {},
  extraReducers: {
    [getCharacters.pending as any]: (state: RickAndMortySliceState) => {
      state.status = "loading";
    },
    [getCharacters.fulfilled as any]: (
      state: RickAndMortySliceState,
      action: PayloadAction<Character[]>
    ) => {
      state.characters = action.payload;
      state.status = "success";
    },
    [getCharacters.rejected as any]: (state: RickAndMortySliceState) => {
      state.status = "failed";
    },
  },
});

// export const {} = RickAndMortSlice.actions;

export default RickAndMortSlice.reducer;
