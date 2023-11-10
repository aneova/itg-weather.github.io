import React from 'react';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer/Footer';
import Forecast from '../components/Forecast/Forecast';
import Header from '../components/Header/Header';
import Search from '../components/Search/Search';
import Error from '../pages/error';
import Spinner from '../components/ui/Spinner/Spinner';
import CurrentWeather from '../components/CurrentWeather/CurrentWeather';
import { AppStore } from '../store/store';
import './home.css'

const Home = () => {
  const { loading, isError } = useSelector((state: AppStore) => ({
    loading: state.app.isLoading,
    isError: state.app.IsError
  } 
  ));  
  return (
    <>
      {loading && <Spinner />}
      <div>
        <Header />
          <Search />
        {isError ? <>
          <Error /></>
          :
          <><CurrentWeather /><Forecast /><Footer /></>}
      </div>      
    </>
  );
};

export default Home;
