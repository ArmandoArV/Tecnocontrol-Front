import "./App.css";
import React, { useEffect, useCallback, useState } from "react";
import { apiURL, token } from "./Constants";
import MapComponent from "./Components/MapComponent/MapComponent";
import CardComponent from "./Components/CardComponent/CardComponent";

function App() {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const fetchUnidades = useCallback(async () => {
    try {
      const response = await fetch(`${apiURL}/unidades`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Unidades Data:", data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }, []);

  const fetchEventos = useCallback(async () => {
    try {
      const responseEventos = await fetch(`${apiURL}/eventos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      });

      if (!responseEventos.ok) {
        throw new Error("Network response was not ok");
      }

      const eventosData = await responseEventos.json();
      console.log("Eventos Data:", eventosData);

      const responseUnidades = await fetch(`${apiURL}/unidades`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      });

      if (!responseUnidades.ok) {
        throw new Error("Network response was not ok");
      }

      const unidadesData = await responseUnidades.json();
      console.log("Unidades Data:", unidadesData);
      console.log("Marca Data:", unidadesData[0].marca);

      const newMarkers = eventosData.map((event) => {
        const unidad = unidadesData.find((u) => u.idGps === event.Unidad_idGps);
        return {
          latitude: parseFloat(event.latitud),
          longitude: parseFloat(event.longitud),
          name: unidad ? event.name_device : "Unknown Device",
          marca: unidad ? unidad.marca : "Unknown Brand",
          modelo: unidad ? unidad.modelo : "Unknown Model",
          placas: unidad ? unidad.placas : "Unknown Plates",
          serie: unidad ? unidad.serie : "Unknown Series",
        };
      });

      console.log("New Markers:", newMarkers);

      setMarkers(newMarkers);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }, []);

  useEffect(() => {
    fetchEventos();
    fetchUnidades();
  }, [fetchEventos, fetchUnidades]);

  const handleCardClick = (marker) => {
    setSelectedMarker(marker);
  };

  useEffect(() => {
    console.log("Markers:", markers);
  }, [markers]);

  return (
    <div className="container">
      <div className="topContainer">a</div>
      <div className="middleContainer">b</div>
      <div className="bottomContainer">
        <div className="lefContainer">
          {markers.map((marker, index) => (
            <CardComponent
              key={index}
              vehicleName={marker.name}
              placas={marker.placas}
              onClick={() => handleCardClick(marker)}
            />
          ))}
        </div>
        <div className="rightContainer">
          <MapComponent markers={markers} selectedMarker={selectedMarker} />
        </div>
      </div>
    </div>
  );
}

export default App;
