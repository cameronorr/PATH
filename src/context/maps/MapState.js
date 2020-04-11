import React, { useReducer } from 'react';
import axios from 'axios';

import mapReducer from './mapReducer';
import MapContext from './mapContext';

const MapState = props => {

    // Get the hazard rating
    const getHazard = (curr, dest, carModel) => {

    }

    const getData = () => {

    }

    return (
        <MapContext.Provider 
            value={{
                getHazard,
                getData
            }}
        >
            {props.children}
        </MapContext.Provider>
    );
};

export default MapState;