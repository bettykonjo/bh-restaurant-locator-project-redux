import React, {useState, useContext} from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
// importing Context (location context)
import LocationContext from "../../context/LocationContext";
import { Autocomplete, Data } from "@react-google-maps/api";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import usePlacesAutocomplete from "use-places-autocomplete";

const HeaderWrapper = styled.header`
  align-items:flex-start;
  background-color:grey;
  color: #fefefe;
  display: block;
  justify-content: space-between;
  align-content: start;
  h1 {
    margin: 1rem 0;
    text-align:start;

  }
  search-box{
    border-radius:1px solid black;
  }
  input{
    font-size:18px;
    width:773px;
    height:50%;
    background-color: white;
    color:black;
    float: left;
  }
  .inputC:hover{
    cursor: pointer; 
  }
  button{
    background-color:blue;
    color:white;
    float: left;
  }
  `;

const Header = () => {

  // consuming or using location context 
  const { setLocationSearch } = useContext(LocationContext)
  const [locationName, setLocationName] = useState('')
  
  const handleSelect =(address) => {
    setValue(address, false);
    setLocationName(address);
    setLocationSearch(address);
    clearSuggestions(); 
  }

  const handleInput = (e) => {
    setLocationName(e.target.value);
    setValue(e.target.value); 
  }

  const { ready, value, suggestions:{status,data}, setValue, clearSuggestions,} = usePlacesAutocomplete({
    // setting lat and lng of so when we search we get locations near this area 
    // within a radius of 500 km 
    requestOptions:{
      location: {lat: () => 36.7394421 , lng: () => -119.7848307},
      radius: 200 * 1000, 
    },
  });
  
  return (
    < HeaderWrapper>
      <h1>Location Search {locationName}:</h1>
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder='Search for location'
          className="inputC"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" && 
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
            ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </ HeaderWrapper>
  );
};
export default Header;
