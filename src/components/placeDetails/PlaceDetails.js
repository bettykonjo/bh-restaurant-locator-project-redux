import React, {useContext} from "react";
// importing Context (location context)
import LocationContext from "../../context/LocationContext";
import { Route, useParams, useNavigate } from 'react-router'; 
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import LanguageIcon from '@material-ui/icons/Language';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import styled from "styled-components";
import Rating from '@mui/material/Rating';
import '../../App.css';
import ExploreIcon from '@material-ui/icons/Explore';


const RestaurantCard = styled.div`
border: 1px solid lightgray;
border-radius: 1rem;
padding: 1rem;
background-color: white; 
display: flex; 
width: 90%; 
margin: 2rem auto;
justify-content: space-around; 


a{
    color: blue;
    text-decoration: underline; 
}
a:hover{
    cursor: pointer;
    color: pink;
    text-decoration: none;
}
.back-home{
    color: blue; 
}
.back-home:hover{
    cursor: pointer; 
    color: pink; 
}
.icon{
    color: light-gray; 
}
img{
    width:500px;
    height:350px; 
    margin: 1rem;
}
img-wrapper{
    width: 50%;
}
.details-info{
    text-align: left !important; 
}
h5.open{
    color: green; 
}
h5.closed{
    color: red; 
}
.open{
    color: green;
}
.closed{
    color: orange; 
}
textarea{
    border: none; 
    overflow-y: scroll;
}
`

const PlaceDetails = () =>{

    let isOpen = 'OPEN'; 
    const { id: restId } = useParams();
    const { restaurants } = useContext(LocationContext); 

    //navigate to different page with Router useNavigate
    const navigate = useNavigate(); 
    
    // return the object of the restaurant who's id matches with the param id (eg.place-details/819237)
    const restaurant =  restaurants.find(({location_id}) =>  location_id == restId ); 
    // is restaurant open 
    ( !restaurant.is_closed )?( isOpen = 'OPEN'):( isOpen = 'CLOSED');

    const onGoHome = () =>{
        navigate('/');
    }

    return(
        <div className="details-page">
            <RestaurantCard>
                <div className="img-wrapper">
                    <img src={restaurant.photo?.images.large.url} alt='Picture for Restaurant Not Available'/>
                </div>
                <div className="details-info">
                    <div className='back-home' onClick={onGoHome}>
                        <p><span className="icon"><ArrowBackIcon/></span>back to home</p>
                    </div>
                    <h3>{restaurant.name}</h3>
                    <div className={(isOpen=='OPEN')? 'open':'closed'} >
                        <h5>CURRENTLY {isOpen}</h5>
                    </div>
                    <Rating name="read-only" value={restaurant.rating} readOnly />
                    <hr/>
                    <p><span className="icon"><LocationOnIcon viewBox="0 0 25 25"/></span>{restaurant.address}</p>
                    <p><span className="icon"><PhoneIcon/></span>{restaurant.phone}</p>
                    <a><span className="icon"><LanguageIcon/></span>{restaurant.website}</a>
                    <hr/>
                    <p>Description:</p>
                    <textarea rows="8" cols="50">{restaurant?.description}</textarea>

                </div>
            </RestaurantCard>        
        </div>

    );

}
export default PlaceDetails;