import axios from "axios";

export const getCoordinates = async (location) => {
    try{
        const results = await axios.get(`https://geocode.maps.co/search?q=${location}`);
        return results;
    } catch (error) {
        console.error(`Error: ${error}`)
    }
}


export const getLocation = async ({lat, lng}) => {
    try{
        const results = await axios.get(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}`);
        console.log(`TOWN and STATE:${results.data.address.town},${results.data.address.state}`);
        return (`${results.data.address.town},${results.data.address.state}`);  
    } catch (error) {
        console.error(`Error: ${error}`)
    }
}

