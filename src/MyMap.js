import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import L from 'leaflet';

var greenIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// import * as parkData from "./data/skateboard-parks.json";

// import "./app.css";

const MyMap = (props) =>
    <Map center={[props.latitude, props.longitude]} zoom={12}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker
            key={1}
            position={[props.latitude, props.longitude]}
            icon={greenIcon} />

        {props.markers.features.map(park => (
            <Marker
                key={park.properties.PARK_ID}
                position={[
                    park.geometry.coordinates[1],
                    park.geometry.coordinates[0]
                ]}
            />
        ))}
    </Map>

export default MyMap;
