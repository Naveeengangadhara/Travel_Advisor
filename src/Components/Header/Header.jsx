import React from 'react';
import { AppBar, Box, InputBase, Toolbar, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete } from '@react-google-maps/api';

function Header({ onPlaceChanged, onLoad }) {

    return (
        <AppBar position="static">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', }}>
                <Typography variant="h5" sx={{ color: 'white', display: 'block' }}>
                    Travel Advisor
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: "center", gap: "50px" }}>
                    <Typography variant="h6" className="title">
                        Explore new places
                    </Typography>
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                        <div style={{ display: 'flex', alignItems: 'center', position: 'relative', backgroundColor: 'rgba(255, 255, 255, 0.15)', borderRadius: '4px', overflow: 'visible', }}>
                            <div className="searchIcon" style={{ position: 'absolute', left: '0px', top: '60%', transform: 'translateY(-50%)', padding: '5px', }}>
                                <SearchIcon style={{ cursor: 'pointer' }} />
                            </div>
                            <InputBase
                                placeholder="Search ..."
                                sx={{
                                    paddingLeft: '35px',
                                    color: 'inherit',
                                    width: '100%',
                                }}
                            />
                        </div>
                    </Autocomplete>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
