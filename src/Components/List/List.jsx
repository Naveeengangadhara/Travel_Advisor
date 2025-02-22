import { CircularProgress, FormControl, Grid2, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import React, { createRef, useEffect, useState } from 'react'
import PlaceDetails from '../PlaceDetails/PlaceDetails'

function List({ places, childClicked, isLoading, type, setType, rating, setRating }) {

  const [elRefs, setElRefs] = useState([])
  useEffect(() => {
    const refs = Array(places?.length).fill().map((_, i) => elRefs[i] || createRef());
    setElRefs(refs);
  }, [places])
  console.log({ childClicked })
  return (
    <>
      <div>

        <Typography variant='h4'>
          Restaurants, Hotels, & Attractions around you
        </Typography>
        {isLoading ? (<div style={{ display: 'flex', justifyContent: 'center', alignItems: "center", height: '70vh' }}><CircularProgress size={'5rem'} /></div>) : (
          <>
            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <InputLabel id='type'>
                Type
              </InputLabel>
              <Select labelId='type' id='type' label='type' value={type} onChange={(e) => setType(e.target.value)}>
                <MenuItem value='restaurants'>
                  Restaurants
                </MenuItem>
                <MenuItem value='hotels'>
                  Hotels
                </MenuItem>
                <MenuItem value='attractions'>
                  Attractions
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <InputLabel id='rating'>
                Ratings
              </InputLabel>
              <Select labelId='rating' id='rating' label='rating' value={rating} onChange={(e) => setRating(e.target.value)}>
                <MenuItem value='all'>
                  All
                </MenuItem>
                <MenuItem value='3'>
                  Above 3.0
                </MenuItem>
                <MenuItem value='4'>
                  Above 4.0
                </MenuItem>
                <MenuItem value='4.5'>
                  Above 4.5
                </MenuItem>
              </Select>
            </FormControl>
            <Grid2 spacing={3} style={{ height: "70vh", overflow: "auto" }} sx={{ sm: 12, md: 12, lg: 12 }}>
              {places?.map((place, i) => (
                <Grid2 ref={elRefs[i]} key={i} xs={12}>
                  <PlaceDetails
                    place={place}
                    selected={Number(childClicked) === i}
                    refProp={elRefs[i]}
                  />
                </Grid2>
              ))}

            </Grid2>
          </>
        )}
      </div>
    </>
  )
}

export default List
