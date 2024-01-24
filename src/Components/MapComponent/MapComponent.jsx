import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const MapComponent = ({ markers }) => {
  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [mapBounds, setMapBounds] = useState(null);

  const mapStyles = {
    height: "35em",
    width: "100%",
  };

  const defaultCenter = {
    lat: 0, // Initial latitude
    lng: 0, // Initial longitude
  };

  const onLoad = (map) => {
    setMap(map);
  };

  useEffect(() => {
    if (map) {
        const bounds = new window.google.maps.LatLngBounds();
        markers.forEach((marker) => {
          bounds.extend(new window.google.maps.LatLng(marker.latitude, marker.longitude));
        });
        setMapBounds(bounds);
    }
  }, [map,markers]);

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyD-KcFaPMb-MQGwntnZb7ufJPgVgKoHB_M" // Replace with your actual API key
    >
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={8}
        center={defaultCenter}
        onLoad={onLoad}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.latitude, lng: marker.longitude }}
            onClick={() => setSelectedMarker(marker)}
            label={{
                text: marker.name,
                color: "#ffffff", // Label text color
                fontWeight: "bold", // Label text fontWeight
                fontSize: "14px", // Label text fontSize
                background: "#3498db", // Label background color
                padding: "8px", // Label padding
                borderRadius: "5px", // Label border radius
              }}
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={{
              lat: selectedMarker.latitude,
              lng: selectedMarker.longitude,
            }}
            onCloseClick={() => setSelectedMarker(null)}
            visible={true}

          >
            <div>
              <h2>{selectedMarker.name}</h2>
              {/* Add any other information you want to display */}
            </div>
          </InfoWindow>
        )}

        
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
