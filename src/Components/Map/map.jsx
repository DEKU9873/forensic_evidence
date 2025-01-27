import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { v4 as uuidv4 } from "uuid";
import { Map as MapIcon, Trash2, Info } from "lucide-react";
import "leaflet/dist/leaflet.css";

const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const Map = () => {
  const [position, setPosition] = useState([33.335821, 44.383414]);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isRemoving, setIsRemoving] = useState(false);
  const mapRef = useRef(null);
  const infoSectionRef = useRef(null);

  const scrollToInfo = () => {
    if (infoSectionRef.current) {
      infoSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const FlyToRegion = ({ coords }) => {
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

        setMarkers((prev) => [...prev, newMarker]);
        setSelectedMarker(newMarker);
        setTimeout(scrollToInfo, 100); // بعد إضافة العلامة، قم بالتمرير
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
    setMarkers((prev) => prev.filter((marker) => marker.id !== markerId));
  };

  const handleMarkerClick = (marker) => {
    if (!isRemoving) {
      setPosition(marker.position);
      setSelectedMarker(marker);
      setTimeout(scrollToInfo, 100); // بعد اختيار العلامة، قم بالتمرير
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <style>
        {`
          .leaflet-control-attribution {
            position: relative;
            z-index: 10;
          }

          .leaflet-control-attribution:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: white;
            z-index: 999;
          }

          .map-container {
            position: relative;
            border-radius: 1rem;
            overflow: hidden;
          }

          .info-section {
            scroll-margin-top: 2rem;
          }

          @media (min-width: 768px) {
            .info-section {
              scroll-margin-top: 4rem;
            }
          }
        `}
      </style>

      <div className="flex items-center gap-2 mb-6">
        <MapIcon className="w-8 h-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-800">خريطة العراق</h1>
      </div>

      <div className="w-full max-w-6xl">
        <div className="map-container w-full h-[70vh] mb-6 shadow-lg">
          <MapContainer center={position} zoom={14} className="w-full h-full">
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
                  <div dir="rtl" className="flex flex-col items-center p-2">
                    <p className="text-lg font-semibold mb-2">{marker.name}</p>
                    <p className="text-sm text-gray-600 mb-3">
                      الإحداثيات: {marker.position.join(", ")}
                    </p>
                    <button
                      onClick={(e) => removeMarker(marker.id, e)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
                    >
                      <Trash2 className="w-4 h-4" />
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

        <div
          ref={infoSectionRef}
          className="info-section w-full bg-white rounded-xl shadow-lg p-6"
          dir="rtl"
        >
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-800">
              معلومات العلامة المحددة
            </h2>
          </div>

          {selectedMarker ? (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-lg font-semibold text-blue-800 mb-2">
                  {selectedMarker.name}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded-md shadow-sm">
                    <p className="text-sm text-gray-500">خط العرض</p>
                    <p className="font-mono text-blue-600">
                      {selectedMarker.position[0].toFixed(6)}
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-md shadow-sm">
                    <p className="text-sm text-gray-500">خط الطول</p>
                    <p className="font-mono text-blue-600">
                      {selectedMarker.position[1].toFixed(6)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <a
                  href={`https://www.google.com/maps?q=${selectedMarker.position[0]},${selectedMarker.position[1]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
                >
                  <MapIcon className="w-5 h-5" />
                  عرض في Google Maps
                </a>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>لم يتم تحديد أي علامة</p>
              <p className="text-sm mt-2">انقر على الخريطة لإضافة علامة جديدة</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Map;
