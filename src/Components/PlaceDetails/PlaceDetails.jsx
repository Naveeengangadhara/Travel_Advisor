import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Rating, Typography } from '@mui/material'


function PlaceDetails({ place, selected, refProp }) {
  if (selected) {
    refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return (
    <>
      <Card elevation={6}>
        <CardMedia
          style={{ height: 350 }}
          image={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
          title={place.name}
        />


        <CardContent>
          <Typography gutterBottom variant='h5'>{place.name}</Typography>
          <Box display={'flex'} justifyContent={'space-between'}>
            {/* <Typography variant='subtitle1'>Rating</Typography> */}
            <Rating value={Number(place.rating)} readOnly />
            <Typography variant='subtitle1'>out of {place.num_reviews} reviews</Typography>
          </Box>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Typography variant='subtitle1'>Price</Typography>
            <Typography variant='subtitle1'>{place.price_level}</Typography>
          </Box>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Typography variant='subtitle1'>Ranking</Typography>
            <Typography variant='subtitle1'>{place.ranking}</Typography>
          </Box>

          {place?.cuisine?.map(({ name }, index) => {
            const colors = [
              'rgba(255, 87, 51, 0.5)',   // Light red
              'rgba(33, 150, 243, 0.5)',  // Light blue
              'rgba(76, 175, 80, 0.5)',   // Light green
              'rgba(156, 39, 176, 0.5)',  // Light purple
              'rgba(255, 235, 59, 0.5)',  // Light yellow
              'rgba(244, 67, 54, 0.5)',   // Light orange
              'rgba(63, 81, 181, 0.5)',   // Light indigo
              'rgba(0, 188, 212, 0.5)',   // Light cyan
              'rgba(139, 195, 74, 0.5)',  // Light lime
              'rgba(255, 152, 0, 0.5)',   // Light amber
            ];
            const color = colors[index % colors.length]; 

            return (
              <Chip
                key={name}
                size="small"
                label={name}
                style={{
                  margin: '5px',
                  backgroundColor: color,
                  color: '#fff', 
                  fontWeight: 'bold',
                }}
              />
            );
          })}

          {place.address && (
            <Typography gutterBottom variant='subtitle1' color='textSecondary' style={{ display: 'flex', justifyContent: "space-between", alignItems: 'center' }}>
              <LocationOnIcon />
              {place.address}
            </Typography>
          )}
          {place.phone && (
            <Typography gutterBottom variant='subtitle1' color='textSecondary' style={{ display: 'flex', justifyContent: "space-between", alignItems: 'center' }}>
              <PhoneIcon />
              {place.phone}
            </Typography>
          )}
          <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button size='small' color='primary' onClick={() => window.open(place.web_url, '_blank')} variant='contained'>Trip Advisor</Button>
            <Button size='small' color='primary' onClick={() => window.open(place.website, '_blank')} variant='contained'>Website</Button>
          </CardActions>
        </CardContent>

      </Card>
    </>
  )
}

export default PlaceDetails