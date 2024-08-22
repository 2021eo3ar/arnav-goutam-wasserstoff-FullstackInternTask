import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// Access the environment variables
const API_URL = import.meta.env.VITE_WEATHER_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

// Async thunk to fetch weather data based on user's current location
export const fetchCurrentLocationWeather = createAsyncThunk(
  'weather/fetchCurrentLocationWeather',
  async ({ lat, lon }, thunkAPI) => {
    const state = thunkAPI.getState().weather;
    const unit = state.unit;
    try {
      const response = await axios.get(
        `${API_URL}/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
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
    const state = thunkAPI.getState().weather;
    const unit = state.unit;
    try {
      const response = await axios.get(
        `${API_URL}/weather?q=${cityName}&units=${unit}&appid=${API_KEY}`
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
    const state = thunkAPI.getState().weather;
    const unit = state.unit;
    try {
      const response = await axios.get(
        `${API_URL}/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
      );
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
  unit: 'metric', // 'metric' for Celsius, 'imperial' for Fahrenheit
  loading: false,
  error: null,
};

// Weather slice
const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    // Reducer to toggle temperature unit
    toggleUnit: (state) => {
      state.unit = state.unit === 'metric' ? 'imperial' : 'metric';
    },
  },
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

export const { toggleUnit } = weatherSlice.actions;

export default weatherSlice.reducer;
