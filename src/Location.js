import React from "react";
import { geolocated } from "react-geolocated";

import MyMap from './MyMap';
const markers = {
    "features": [
        {
            "type": "Feature",
            "properties": {
                "PARK_ID": 960,
                "NAME": "Danvik Center",
                "DESCRIPTIO": "Eat you some pancakes come thursday"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [18.109291, 59.312727]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "PARK_ID": 1219,
                "NAME": "Bun Meat Bun",
                "DESCRIPTIO": "Burgers"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [18.071043, 59.314195]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "PARK_ID": 1220,
                "NAME": "Korvmoj",
                "DESCRIPTIO": "Plan C"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [18.081043, 59.314195]
            }
        }
    ]
}

class Location extends React.Component {
    render() {
        return !this.props.isGeolocationAvailable ? (
            <div>Your browser does not support Geolocation</div>
        ) : !this.props.isGeolocationEnabled ? (
            <div>Geolocation is not enabled</div>
        ) : this.props.coords ? (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>latitude</td>
                            <td>{this.props.coords.latitude}</td>
                        </tr>
                        <tr>
                            <td>longitude</td>
                            <td>{this.props.coords.longitude}</td>
                        </tr>
                        <tr>
                            <td>altitude</td>
                            <td>{this.props.coords.altitude}</td>
                        </tr>
                        <tr>
                            <td>heading</td>
                            <td>{this.props.coords.heading}</td>
                        </tr>
                        <tr>
                            <td>speed</td>
                            <td>{this.props.coords.speed}</td>
                        </tr>
                    </tbody>
                </table>
                <MyMap markers={markers} latitude={this.props.coords.latitude} longitude={this.props.coords.longitude} />
            </div>
        ) : (
                        <div>Getting the location data&hellip; </div>
                    );
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Location);