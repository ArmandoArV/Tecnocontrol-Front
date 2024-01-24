import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import "./MapComponent.css";
import InfoItem from "../LabelComponent/LabelComponent";
import { APIKey } from "../../Constants";

const MapComponent = ({ markers, selectedMarker: initialSelectedMarker }) => {
  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [zoom, setZoom] = useState(2);

  const mapStyles = {
    height: "50em",
    width: "100%",
  };

  const defaultCenter = {
    lat: 28.82207070809929,
    lng: -70.58498958450707,
  };

  const onLoad = (map) => {
    setMap(map);
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  useEffect(() => {
    // Initialize selectedMarker with the provided initialSelectedMarker
    setSelectedMarker(initialSelectedMarker);
  }, [initialSelectedMarker]);

  const MapInfoWindow = ({ selectedMarker }) => (
    <div className="infoWindow">
      <h2>{selectedMarker.name}</h2>
      <InfoItem label="Marca de vehículo" value={selectedMarker.marca} />
      <InfoItem label="Modelo de vehículo" value={selectedMarker.modelo} />
      <InfoItem label="Placas de vehículo" value={selectedMarker.placas} />
      <InfoItem label="Serie de vehículo" value={selectedMarker.serie} />
      <InfoItem label="Latitud" value={selectedMarker.latitude} />
      <InfoItem label="Longitud" value={selectedMarker.longitude} />
    </div>
  );

  return (
    <LoadScript googleMapsApiKey={APIKey}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={zoom}
        center={defaultCenter}
        onLoad={onLoad}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.latitude, lng: marker.longitude }}
            onClick={() => handleMarkerClick(marker)}
            label={{
              text: marker.name,
              color: "#ffffff",
              fontWeight: "bold",
              fontSize: "14px",
              background: "#3498db",
              padding: "8px",
              borderRadius: "5px",
            }}
          />
        ))}
        {console.log("SelectedMarkerrrrr:", selectedMarker)}
        {selectedMarker && (
          <InfoWindow
            position={{
              lat: selectedMarker.latitude,
              lng: selectedMarker.longitude,
            }}
            onCloseClick={() => setSelectedMarker(null)}
            visible={true}
          >
            <MapInfoWindow selectedMarker={selectedMarker} />
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
