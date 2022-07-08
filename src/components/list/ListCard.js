import React from 'react'
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Rating from '@mui/material/Rating';
const ListCardWrapper = styled.div`

 form{
  display:flex;
  align-self:flex-start;
  flex-direction:column;
  background-color:white;   
  border: 1px solid #666;
  /* border-radius: 5px;  */
  flex-wrap:wrap;  
 }

 form:hover{
   cursor:pointer;
   background-color:lightblue; 
   
 }

   `;
function ListCard({name, description, rating, phone, address,location_id}) {


  //navigate to different page with Router useNavigate
  const navigate = useNavigate(); 

  const onHandleClick = () => {
    navigate(`/place-details/${parseInt(location_id)}`);
  }


  return (
    <ListCardWrapper onClick={onHandleClick}>
        <form>
          <inputLabel>{name}</inputLabel>
          {/* <p>{rating}</p> */}
          <Rating name="read-only" value={rating} readOnly />
          <p>{phone}</p>
          <p>{address}</p>
          <p>{description}</p>
        </form>
    </ListCardWrapper>
  )
}

export default ListCard