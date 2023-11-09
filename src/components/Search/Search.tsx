import React, {useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchWeather } from '../../store/fetchWeather';
import { fetchCities } from './../../api/placeSuggestion';
import { LocationButton, LocationIcon, SearchElement, SearchIcon} from './styled';
import { setIsInitial, setIsLoading, setIsError } from '../../store/reducers/appReducer';


const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');  

  const onSearchInputChanged = (e: any) => {
    console.log(e.target.value)
    setSearchTerm(e.target.value);
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
  return (
    <>
      <><SearchElement>
        <SearchIcon />
        <input value={searchTerm} onChange={onSearchInputChanged} placeholder="Search for location" /><LocationButton
          onClick={() => { showPosition(searchTerm); } }>
          <LocationIcon />
        </LocationButton>
      </SearchElement></></>
      );
};

export default Search;


