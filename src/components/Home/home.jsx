import React from 'react';
import { Link } from 'react-router-dom';
import List from '../list/list';
import Map from '../map/Map';

import styled from "styled-components";
  
const HomeWrapper = styled.section`
  display:flex;
  /* justify-content: center; */
  align-items: center;
  border: 1px solid #666; 
  flex-direction:row;
  background-color:grey;   
  flex-wrap:wrap;
  padding-bottom:10px;
  /* justify-content:space-evenly; */
   `;

function Home() {
  return (
    <HomeWrapper >
      <Map/>
      <List />           
    </HomeWrapper>
  )
}

export default Home;