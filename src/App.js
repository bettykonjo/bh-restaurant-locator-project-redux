import { useState, useEffect } from 'react';
import './App.css';
import LocationContext from './context/LocationContext';
import {Routes,Route} from 'react-router-dom';
import Home from './components/Home/home';
import PlaceDetails from './components/placeDetails/PlaceDetails'
import Layout from './pages/Layout';
import NotFound from './pages/NotFound';
import {getRestaurantData} from "./components/api/api-key";
import { getCoordinates, getLocation} from './components/api/getCoords';
import axios from 'axios'; 


function App() {

  const [locations, setLocations] = useState('Fresno,CA');
  const [places, setPlaces] = useState ([]);
  const [coordinates, setCoordinates] = useState({lat:"36.7394421" , long:"-119.7848307" });
  const [status, setStatus] = useState(null); 
  const [userLocation, setUserLocation] = useState(null);
  const [userCoords, setUserCoords] = useState(null)
 
///////////////////////////getting user location ////////////////////////////////
  useEffect(() => {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported.');
      return;
    }
    else{
      navigator.geolocation.getCurrentPosition(successHandler, errorHandler);      
    }
  }, [])

  const successHandler = position => {
    const { latitude, longitude } = position.coords;
    setUserCoords({lat:latitude, lng:longitude});
    getLocation({lat: latitude, lng:longitude})
    .then((data) => {
      setUserLocation(data); 
    }); 
  };

  const errorHandler = error => console.error(error.message);
////////////////////////////////////////////////////////////////////////////////////
 
  useEffect(() =>{
    console.log("Locations",locations)
      getCoordinates(locations)
        .then((results)=>{

          getRestaurantData({ lat: results.data[0].lat , long: results.data[0].lon })
          .then((data) =>{
            setPlaces(data);
          }); 
          setCoordinates({ lat: results.data[0].lat , long: results.data[0].lon }); 
      });

      console.log(`USERS LOCATION:${userLocation} USERS COORDS:${userCoords}`);

  }, [locations]);


  return (
    <div className="App">
      
    { ( status === null)?
      <LocationContext.Provider 
        value={{
          locations:locations,
          restaurants: places,
          coordinates: coordinates,
          userCoords,
          setLocationSearch:(searchLocation) => {
              setLocations(searchLocation);
          },
          setLocationOfUser: () => {
              setLocations(userLocation); 
          },
        }}
      >
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>} />
            <Route path="place-details/:id" element={<PlaceDetails/>} />
            <Route path="*" element={<NotFound />} />
          </Route>          
        </Routes>

      </LocationContext.Provider> :
      <div>
        <h3>{status}</h3>  
      </div>      
    }

    </div>
  );
}

export default App;
