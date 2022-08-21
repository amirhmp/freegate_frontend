import React from 'react';
import {Link} from "react-router-dom";
import {Box} from "@mui/material";

const NotFound = () => {
    return (
        <Box sx={{padding: 2}}>
            <h1>404 not found</h1>
            <Link to='/'>Back to Home</Link>
        </Box>
    );
};

export default NotFound;