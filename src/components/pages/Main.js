import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { geolocated } from 'react-geolocated';
import { ReactDOM } from 'react-dom';

const Main = ({ carModel, hazardRating, path, google, coords }) => {

    const { latitude, longitude } = coords;

    const [pos, setCoordinates] = useState ({
        lat: null,
        long: null
    })

    const { lat, long } = pos;

    const mapStyles = {
        width: '100%',
        height: '100%'
    };

    const onChange = e => 
        setCoordinates({ ...pos, [e.target.name]: e.target.value });


    const [marker, setMarker] = useState ({
        curr: {
            lat: latitude,
            long: longitude
        },
        dest: {
            lat: latitude,
            long: longitude
        }
    });

    const { curr, dest } = marker;

    const onSubmit = e => 
        setMarker({ ...marker, [e.target.name]: {lat: lat, long: long} })

    return(
        <div className='grid-ver'>
            <div className='grid-hor-f' style={{ paddingBottom : '2rem' }}>
                <div className='grid-ver-t'>
                    <div style={{ verticalAlign: 'top' }}>
                        <h1 className='text-primary' style={{ fontSize: '3rem', fontWeight: 'bolder' }}>Car Model</h1>
                        <body style={{ fontSize: '2rem' }}>{carModel}</body>
                    </div>
                    <div />
                </div>
                <div className='grid-hor-f-c'>
                    <div className='card-small' style={{ textAlign: 'right', paddingRight: '1rem' }}>
                        <label
                            htmlFor='name'
                            className='login-label'
                        >
                            Latitude
                        </label>
                        <input
                            type='text'
                            name='lat'
                            value={lat}
                            placeholder='e.g., 47.444'
                            onChange={onChange}
                            required
                            style={{ marginLeft: 'auto', textAlign: 'right', width: '70%' }}
                        />
                        <label
                            htmlFor='email'
                            className='login-label'
                            style={{ textAlign: 'right' }}
                        >
                            Longitude
                        </label>
                        <input
                            type='email'
                            name='long'
                            value={long}
                            placeholder='e.g., -122.176'
                            onChange={onChange}
                            required
                            style={{ marginLeft: 'auto', textAlign: 'right', width: '70%' }}
                        />
                        <form onSubmit={onSubmit}>
                            <a href='#'>
                                <input
                                type='submit'
                                value='Set Destination'
                                className='btn btn-primary btn-block'
                                style={{ marginLeft: 'auto', width: '8vw' }}
                                />
                            </a>
                        </form>
                    </div>
                    <div style={{ position: 'relative', width: '32rem', height: '25rem' }}>
                        <Map
                            google={google}
                            zoom={8}
                            style={mapStyles}
                            initialCenter={{ lat: latitude, lng: longitude }}
                            id='map'
                        />
                        <Marker
                            position={curr}
                            name={'curr'}
                            map={document.getElementById('map')}
                        />
                        <Marker 
                            position={dest}
                            name={'dest'}
                            map={document.getElementById('map')}
                        />
                    </div>
                </div>
            </div>
            <div className='grid-hor'>
                <div style={{ left: '-20rem' }}>
                    <h1 className='text-primary' style={{ fontSize: '3rem', fontWeight: 'bolder' }}>Hazard Rating</h1>
                    <body style={{ fontSize: '2rem' }}>{hazardRating}</body>
                </div>
                <div>
                    <h1 className='text-primary' style={{ fontSize: '3rem', fontWeight: 'bolder' }}>Shortest Path</h1>
                    <body>{path}</body>
                </div>
            </div>
        </div>
    );
}

Main.propTypes = {
    carModel: PropTypes.string.isRequired,
    hazardRating: PropTypes.number,
    path: PropTypes.string
};

Main.defaultProps = {
    carModel: 'Volkswagen Beetle',
    hazardRating: 0,
    path: ''
};


export default geolocated({
    positionOptions: {
        enableHighAccuracy: true
    },
    userDecisionTimeout: 5000
})(GoogleApiWrapper({
    apiKey: 'AIzaSyCdN-PaaKG8Bh5xOhQLpWmAuGNX_0e3b2g'
})(Main));