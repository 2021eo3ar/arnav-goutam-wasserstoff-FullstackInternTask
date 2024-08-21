import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// Access the environment variable
const API_URL = import.meta.env.VITE_WEATHER_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY; 
console.log("the api key are", API_KEY, API_URL)

// Async thunk to fetch weather data based on user's current location
export const fetchCurrentLocationWeather = createAsyncThunk(
  'weather/fetchCurrentLocationWeather',
  async ({ lat, lon }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to fetch weather data based on user search (city name)
export const fetchCityWeather = createAsyncThunk(
  'weather/fetchCityWeather',
  async (cityName, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to fetch 5-day forecast based on city coordinates
export const fetchFiveDayForecast = createAsyncThunk(
  'weather/fetchFiveDayForecast',
  async ({ lat, lon }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      console.log(response.data)
      return response.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Initial state for the weather slice
const initialState = {
  currentLocationWeather: null,
  cityWeather: null,
  fiveDayForecast: null,
  loading: false,
  error: null,
};

// Weather slice
const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch current location weather
      .addCase(fetchCurrentLocationWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentLocationWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.currentLocationWeather = action.payload;
      })
      .addCase(fetchCurrentLocationWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch city weather
      .addCase(fetchCityWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCityWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.cityWeather = action.payload;
      })
      .addCase(fetchCityWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch 5-day forecast
      .addCase(fetchFiveDayForecast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFiveDayForecast.fulfilled, (state, action) => {
        state.loading = false;
        state.fiveDayForecast = action.payload;
      })
      .addCase(fetchFiveDayForecast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default weatherSlice.reducer;
