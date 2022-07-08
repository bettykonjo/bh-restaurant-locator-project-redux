import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  loading: true,
  error: false,
  location: 'Denver, CO',
  coords: [],
  results: [],
  active: null,
};

export const getResults = createAsyncThunk(
  'search/getResults',
  async (location) => {
    const geoRes = await fetch(
      `https://geocode.maps.co/search?q=${location}`,
    );
    const [{ lat, lon }] = await geoRes.json();

    const yelpRes = await fetch(
      `https://bwreact-yelp-backend.herokuapp.com/api/search?term=restaurants&limit=10&radius=5000&lat=${lat}&lon=${lon}`,
    );
    const searchResults = await yelpRes.json();
    return searchResults;
  },
);

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setLocation(state, { payload }) {
      state.location = payload;
    },
    setActive(state, { payload }) {
      state.active = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getResults.pending, (state) => {
        state.loading = true;
        state.results = [];
        state.coords = [];
      })
      .addCase(
        getResults.fulfilled,
        (state, { payload: { lat, lon, businesses } }) => {
          state.loading = false;
          state.error = false;
          state.coords = [lat, lon];
          state.results = businesses;
        },
      )
      .addCase(getResults.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { setLocation, setActive } = searchSlice.actions;

export default searchSlice.reducer;
