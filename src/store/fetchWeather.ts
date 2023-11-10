import { createAsyncThunk } from '@reduxjs/toolkit';
import { ExtendedForecastData, WeatherData } from '../api/types';
import { fetchExtendedForecastData, fetchWeatherData, fetchCoordsCity } from '../api/weather';
import { getNextSevenDays } from '../utils/dateUtils';
import { kelvinToCelcius } from '../utils/unitConversion';
import { setIsError, setIsInitial, setIsLoading } from './reducers/appReducer';


export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city: string | { lat: number; lng: number }, { dispatch, rejectWithValue }) => {
    console.log(city instanceof String)
    console.log( city instanceof Object)
    dispatch(setIsLoading(true));
    let crds, res: Array<any>;
    if (city instanceof Object === false) {
      crds = await Promise.all([fetchCoordsCity(city)])
      res = await Promise.all([fetchWeatherData(crds[0]), fetchExtendedForecastData(city.toString(), crds[0].lat, crds[0].lng)]);
       try {      
      console.log(res[0])
      if (res[0].cod === 200) {
        dispatch(setIsInitial(false));
        dispatch(setIsError(false));
        return res;
      } else { 
        dispatch(setIsError(true));
      }
    } catch { 
      dispatch(setIsLoading(false));
      dispatch(setIsError(false));
      return rejectWithValue('Error');      
    }
    } else {
      let res;
      console.log(city)
      if(typeof city==='object' && city.lat && city.lng)
        res = await Promise.all([fetchWeatherData(city), fetchExtendedForecastData(city.toString(), city?.lat, city?.lng)]);
      try {
        if (res) { 
          dispatch(setIsLoading(false));
        if (res[0].cod === 200) {
        dispatch(setIsInitial(false));
        dispatch(setIsError(false));
        return res;
      } else { 
        dispatch(setIsError(true));
        }
        }
      } catch { 
      dispatch(setIsLoading(false));
      dispatch(setIsError(false));
      return rejectWithValue('Error');      
    }      
    }
  }
);

export const transformWeatherData = (
  res: any
): {  weather: WeatherData;forecast: ExtendedForecastData[];}| null => {
  console.log(res, res === undefined)  
  if (res === undefined) {
      return null;
  } else
  { 
  const weather = res[0] as WeatherData;  
  const forecast: ExtendedForecastData[] = [];
  weather.weather = res[0].weather[0];
  weather.main = {
    ...weather.main,
    temp: kelvinToCelcius(weather.main.temp),
    feels_like: kelvinToCelcius(weather.main.feels_like),
    temp_max: kelvinToCelcius(weather.main.temp_max),
    temp_min: kelvinToCelcius(weather.main.temp_min),
  };
  weather.wind.speed = Math.round(weather.wind.speed * 3.6);

  const next7Days = getNextSevenDays();

  res[1].daily.forEach((i: any, index: number) => {
    forecast.push({
      day: next7Days[index],
      temp: {
        temp_max: kelvinToCelcius(i.temp.max),
        temp_min: kelvinToCelcius(i.temp.min),
      },
      weather: {
        id: i.weather[0].id,
        main: i.weather[0].main,
      },
    });
  });

  return {
    weather,
    forecast,
  };  
  }  
};


