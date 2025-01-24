import React from 'react'
import GoogleMapReact from 'google-map-react'
import { Paper, Rating, Typography, useMediaQuery } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';


function Map({ setCoordinates, setBounds, coordinates, places,setChildClicked }) {
  const isDesktop = useMediaQuery('(min-width:600px)')

  return (
    <div style={{ height: '85vh', width: '100%', }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true }}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng })
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.map((place, i) => (
          <div
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'translate(-50%, -50%)' }}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {!isDesktop ? (
              <LocationOnOutlinedIcon color='primary' fontSize='large' />
            ) : (
              <Paper variant='sub' elevation={3} style={{ padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100px', }}>
                <Typography className='text' variant='subtitle2' gutterBottom>
                  {place.name}
                </Typography>
                <img
                  className='photo'
                  style={{ cursor: 'pointer', }}
                  src={
                    place.photo
                      ? place.photo.images.large.url
                      : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
                  }
                  alt={place.name} />
                <Rating size="small" value={Number(place.rating)} readOnly />
              </Paper>
            )}

          </div>
        ))}
      </GoogleMapReact>
    </div>
  )
}

export default Map