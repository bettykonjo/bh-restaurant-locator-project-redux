import React, {useState, useContext} from "react";
import LocationContext from "../../context/LocationContext";
import { useNavigate } from "react-router-dom";
import ListCard from "./ListCard";
import styled from "styled-components";
const ListWrapper = styled.div`  
  border: 1px solid #666;
  width:40%;
  height:80vh;
  flex-wrap:wrap; 
  /* margin: 3rem auto;  */
  overflow-y: scroll; 
   `;

const List = () => {

  //navigate to different page with Router useNavigate
  const navigate = useNavigate(); 

  // have locations(restaurants array) available to us in the list component
  const { restaurants } = useContext(LocationContext);


    return (
      <ListWrapper>
        {/* <h3>Restaurants</h3> */}
        <div >
            {restaurants?.map((restaurant) => (
                <ListCard  
                name={restaurant.name} 
                description={restaurant.description} 
                rating={restaurant.rating}
                phone={restaurant.phone} 
                address={restaurant.address}
                location_id={restaurant.location_id}
                />
            ))}

        </div>
      </ListWrapper>
    );
  };
    
export default List;
