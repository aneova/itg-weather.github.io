import _ from 'lodash';


const baseUrl = 'https://api.openweathermap.org/data/2.5';
const REACT_APP_WEATHER_API_KEY = '0d8073261d9e188f1f6bf1b082a805ec'
export const fetchWeatherData = async (city: string | { lat: number; lng: number }) => {
  let url = `${baseUrl}/weather?q=${city}&appid=${REACT_APP_WEATHER_API_KEY}`;
  if (typeof city === 'object') {
    console.log(city)
    url = `${baseUrl}/weather?lat=${city.lat}&lon=${city.lng}&appid=${REACT_APP_WEATHER_API_KEY}`;
  }
  try {
    return await (await fetch(url)).json();
} catch (e) {
    console.log('Error occurred', e);
  } 
};

export const fetchExtendedForecastData = async (city: string ,  lat: number, lng: number ) => {
  console.log(lat, lng)  
    let url = `${baseUrl}/onecall?lat=${lat}&lon=${lng}&appid=${REACT_APP_WEATHER_API_KEY}`;
      return await (await fetch(url)).json();
    
};


export const fetchCoordsCity = async (city: string| any) => {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${REACT_APP_WEATHER_API_KEY}`
  let res = await (await fetch(url)).json();
  let r = {};  
  let coords = { lat: res[0].lat, lng: res[0].lon }
  
  return coords;  
};

function _isEmpty(res: any): any {
  throw new Error('Function not implemented.');
}
