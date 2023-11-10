import React, {useState } from 'react';
import { fetchWeather } from '../../store/fetchWeather';
import { fetchCities } from './../../api/placeSuggestion';
import { LocationButton, LocationIcon, SearchElement, SearchIcon} from './styled';
import { setIsInitial, setIsLoading, setIsError } from '../../store/reducers/appReducer';
import { useDispatch } from 'react-redux';


const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');  
  const [lat, setLat] = useState(0);  
  const [lon, setLon] = useState(0);  

  const onSearchInputChanged = (e: any) => {
    
    setSearchTerm(e.target.value);
  };
  const onLatChanged = (e: any) => {
    
    setLat(e.target.value);
  };
  const onLonChanged = (e: any) => {
    
    setLon(e.target.value);
  };
  const showPosition = (position: any) => {
    dispatch(
      fetchWeather(searchTerm)
    );
    dispatch(setIsInitial(false));
    dispatch(setIsLoading(false));

    fetchCities(searchTerm).then((res) => {
      console.log(res)
      if (res?.status!==200 && res?.statusText) {
        dispatch(setIsInitial(false));
        dispatch(setIsLoading(false));
        dispatch(setIsError(true));
      }
      return res;
    });
  };
  function showPositionByCoords(lat:number, lon: number) {     
    dispatch(
      fetchWeather({
        lat: lat,
        lng: lon
      }));
  };

    return (
    <>
      
      <><SearchElement>
        <SearchIcon />
        CITY: <input value={searchTerm} onChange={onSearchInputChanged} placeholder="Search for location" />
        
        <LocationButton
          onClick={() => { showPosition(searchTerm); } }>
          <LocationIcon />
        </LocationButton>
          
        <fieldset>
        <legend>Coordinates:</legend>
        <input value={lat} onChange={onLatChanged} placeholder="Search for lat" />
        &nbsp;&nbsp;&nbsp;
        <input value={lon} onChange={onLonChanged} placeholder="Search for lon" />
        <LocationButton
          onClick={() => { showPositionByCoords(lat, lon)} }>
          <LocationIcon />
          </LocationButton>
          </fieldset>       
      </SearchElement></></>
      );
};
    
  


export default Search;


