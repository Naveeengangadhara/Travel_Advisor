import React, { use, useEffect, useState } from "react";
import Header from "./Components/Header/Header"
import List from "./Components/List/List"
import Map from "./Components/Map/Map"
import { CssBaseline, Grid2 } from "@mui/material";
import { getPlaceData } from "./api";

const App = () => {
    const [places, setPlaces] = useState([]);
    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState(null);
    const [childClicked, setChildClicked] = React.useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState('restaurants')
    const [rating, setRating] = useState('all');
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [autocomplete, setAutocomplete] = React.useState(null);

    const onLoad = (autoC) => setAutocomplete(autoC);
    const onPlaceChanged = () => {
        const lat = autocomplete.getPlace().geometry?.location.lat();
        const lng = autocomplete.getPlace().geometry?.location.lng();
        setCoordinates({ lat, lng });
    }

    useEffect(async ()  => {
       await navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoordinates({ lat: latitude, lng: longitude })
        });
    }, []);

    useEffect(() => {
        const filteredPlaces = places.filter((place) => place.rating > rating);
        setFilteredPlaces(filteredPlaces);
    }, [rating]);

    useEffect(() => {
        if (bounds?.sw && bounds?.ne) {
            setIsLoading(true);
            getPlaceData(type, bounds?.sw, bounds?.ne).then((data) => {
                setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
                setFilteredPlaces([]);
                setIsLoading(false);
            });
        }
    }, [type, bounds]);
   

    return (
        <>
            <CssBaseline />
            <Header setCoordinates={setCoordinates} onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
            <Grid2 container spacing={3} mt={2}>
                <Grid2 item xs={12} md={4} style={{ width: '40%' }}>
                    <List
                        places={filteredPlaces.length ? filteredPlaces : places}
                        childClicked={childClicked}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                    />
                </Grid2>
                <Grid2 item xs={8} sm={8} md={8} lg={8} style={{ width: '58%' }}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        setChildClicked={setChildClicked}
                    />
                </Grid2>
            </Grid2>
        </>
    );
}
export default App;