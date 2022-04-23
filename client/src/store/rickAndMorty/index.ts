import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../configs/api";

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  locations: {
    name: string;
    url: string;
  };
  image: string;
}

export interface RickAndMortySliceState {
  characters: Character[];
  character: Character | null;
  status: string | null;
}
const initialState: RickAndMortySliceState = {
  characters: [],
  character: null,
  status: null,
};

export const getCharacters = createAsyncThunk(
  "rickAndMorty/characters",
  async () => {
    const response = await api.get("rick-and-morty/characters");
    const { data } = response;

    return data as Character[];
  }
);

export const getCharacter = createAsyncThunk(
  "rickAndMorty/character",
  async (id: number) => {
    const response = await api.get(
      `https://rickandmortyapi.com/api/character/${id}`,
      {
        withCredentials: true,
      }
    );

    const { data } = response;
    return data as Character;
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
    [getCharacter.pending as any]: (state: RickAndMortySliceState) => {
      state.status = "loading";
    },
    [getCharacter.fulfilled as any]: (
      state: RickAndMortySliceState,
      action: PayloadAction<Character>
    ) => {
      state.character = action.payload;
      state.status = "success";
    },
    [getCharacter.rejected as any]: (state: RickAndMortySliceState) => {
      state.status = "failed";
    },
  },
});

// export const {} = RickAndMortSlice.actions;

export default RickAndMortSlice.reducer;
