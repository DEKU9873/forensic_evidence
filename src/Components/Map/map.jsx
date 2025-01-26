import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { v4 as uuidv4 } from "uuid";
import "leaflet/dist/leaflet.css";

const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const Map = () => {
  const [position, setPosition] = useState([33.252450, 44.386643]);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isRemoving, setIsRemoving] = useState(false);
  const mapRef = useRef(null);

  const FlyToRegion = ({ coords }) => {
    // const map = useMap();
    // if (coords) {
    //   map.flyTo(coords, 13);
    // }
    return null;
  };

  const MapEvents = () => {
    const map = useMap();
    mapRef.current = map;

    useEffect(() => {
      const handleClick = (event) => {
        if (isRemoving) {
          setIsRemoving(false);
          return;
        }

        const { lat, lng } = event.latlng;
        setPosition([lat, lng]);

        const newMarker = {
          position: [lat, lng],
          name: `علامة ${markers.length + 1}`,
          id: uuidv4(),
        };
        
        setMarkers(prev => [...prev, newMarker]);
        setSelectedMarker(newMarker);
      };

      map.on("click", handleClick);
      return () => map.off("click", handleClick);
    }, [markers, isRemoving]);

    return null;
  };

  const removeMarker = (markerId, e) => {
    e.stopPropagation();
    setIsRemoving(true);
    setSelectedMarker(null);
    setMarkers(prev => prev.filter(marker => marker.id !== markerId));
  };

  const handleMarkerClick = (marker) => {
    if (!isRemoving) {
      setPosition(marker.position);
      setSelectedMarker(marker);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">خريطة العراق</h1>
      <div className="w-full h-[70vh] rounded-lg shadow-lg overflow-hidden mb-4">
        <MapContainer
          center={position}
          zoom={14}
          className="w-full h-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={marker.position}
              icon={customIcon}
              eventHandlers={{
                click: () => handleMarkerClick(marker),
              }}
            >
              <Popup>
                <div dir="rtl" className="flex flex-col items-center">
                  <p className="mb-2">{marker.name}</p>
                  <p className="mb-2">الإحداثيات: {marker.position.join(", ")}</p>
                  <button
                    onClick={(e) => removeMarker(marker.id, e)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    حذف العلامة
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
          <MapEvents />
          <FlyToRegion coords={position} />
        </MapContainer>
      </div>
      
      <div dir="rtl" className="w-full max-w-md bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold mb-2">معلومات العلامة المحددة:</h2>
        {selectedMarker ? (
          <div>
            <p className="mb-1">{selectedMarker.name}</p>
            <p>خط العرض: {selectedMarker.position[0].toFixed(6)}</p>
            <p>خط الطول: {selectedMarker.position[1].toFixed(6)}</p>
          </div>
        ) : (
          <p>لم يتم تحديد أي علامة</p>
        )}
      </div>
    </div>
  );
};

export default Map;