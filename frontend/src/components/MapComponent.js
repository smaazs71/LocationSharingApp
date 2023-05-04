import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import 'leaflet/dist/leaflet.css';

import { useState } from 'react';

import L from 'leaflet';

const icon = L.icon({ iconUrl: "/images/marker-icon.png" });

// function getIcon(iconSize) {
//   return L.Icon({
//     iconUrl: require('../logo.svg'),
//    //  iconSize: iconSize,
//  iconSize: new L.Point(60, 75),

//   })
// }

const MapComponent = ({myData, otherUsersData}) => {

  const customIcon = new L.Icon({
    iconUrl: require('../logo.svg'),
    iconRetinaUrl: require('../logo.svg'),
    // iconAnchor: null,
    // popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(30, 45),
    className: 'leaflet-div-icon'
});

function getCoOrdinates(data){
  return [data.location.coordinates[1], data.location.coordinates[0]]
}

const marker = []

for( let key in otherUsersData ){
  marker.push(
    <Marker position={getCoOrdinates(otherUsersData[key])} icon={customIcon} >
  <Popup>
    {otherUsersData[key].location.coordinates}
    A pretty CSS3 popup. <br /> Easily customizable.
  </Popup>
</Marker>  
)
}

console.log('OtherUsersDatain Map comp: '+JSON.stringify(otherUsersData));

return (
    <d>
      <MapContainer center={getCoOrdinates(myData)} zoom={7} scrollWheelZoom={false} style={{ height: '100vh', width: '100wh' }}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    
    
    {marker}


    <Marker position={getCoOrdinates(myData)} icon={customIcon} >
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
        </MapContainer>
    </d>
  )
}

export default MapComponent