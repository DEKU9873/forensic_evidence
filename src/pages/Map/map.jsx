import React, { useState, useRef, useEffect } from "react";
import {
  LayersControl,
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import {
  Map as MapIcon,
  Maximize2,
  Minimize2,
  Clock,
  MapPin,
} from "lucide-react";
import "leaflet/dist/leaflet.css";
import IncidentsHook from "../../hook/CriminalEffects/Incidents-hook";
import ImagesHook from "../../hook/CriminalEffects/images-hook";
import baseURL from "../../Api/baseURL";

const createCustomIcon = (color) => {
  const size = 42;
  const markerColor = color && color.trim() ? color : "#3b82f6";

  const svgTemplate = `<svg width="${size}" height="${size}" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <filter id="shadow" x="-20%" y="0%" width="140%" height="140%">
      <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#000" flood-opacity="0.3" />
    </filter>
    <path d="M24 0C14.4774 0 6.75 7.72744 6.75 17.25C6.75 30.1876 24 48 24 48C24 48 41.25 30.1876 41.25 17.25C41.25 7.72744 33.5226 0 24 0ZM24 23.25C20.6874 23.25 18 20.5626 18 17.25C18 13.9374 20.6874 11.25 24 11.25C27.3126 11.25 30 13.9374 30 17.25C30 20.5626 27.3126 23.25 24 23.25Z" fill="${markerColor}" filter="url(#shadow)"/>
    <circle cx="24" cy="17.25" r="8" fill="white" opacity="0.3"/>
  </svg>`;

  return new L.DivIcon({
    html: svgTemplate,
    className: "custom-pin-icon",
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
};

const RecenterButton = ({ position }) => {
  const map = useMap();

  const handleRecenter = () => {
    map.flyTo(position, 12, {
      animate: true,
      duration: 1.5,
    });
  };

  return (
    <button
      onClick={handleRecenter}
      className="p-2 bg-white text-blue-600 rounded-full shadow-lg hover:bg-blue-50 transition absolute z-[1000] top-4 right-4 border border-gray-200"
    >
      <MapPin size={20} />
    </button>
  );
};

const Map = () => {
  const { BaseLayer } = LayersControl;
  const [position, setPosition] = useState([33.335821, 44.383414]);
  const [markers, setMarkers] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const mapContainerRef = useRef(null);
  const detailsRef = useRef(null);

  const [incidents] = IncidentsHook();
  const [images] = ImagesHook(selectedIncident?.uuid, selectedIncident); // استرجاع الصور الخاصة بالحادث
  console.log(selectedIncident?.uuid);
  console.log(images); // طباعة الصور للتحقق من القيم

  useEffect(() => {
    if (incidents && incidents.data) {
      const newMarkers = incidents.data
        .map((incident) => {
          const lat = parseFloat(incident.latitude);
          const lng = parseFloat(incident.longitude);

          if (isNaN(lat) || isNaN(lng)) return null;

          return {
            id: incident.id,
            uuid: incident.uuid,
            position: [lat, lng],
            name: incident.typeAccident,
            description: incident.accident_description,
            color: incident.color || "#3b82f6",
            date: incident.accident_date,
            time: incident.inspection_time,
            lat: incident.latitude,
            long: incident.longitude,
          };
        })
        .filter(Boolean);

      setMarkers(newMarkers);
    }
  }, [incidents]);

  useEffect(() => {
    if (selectedIncident && detailsRef.current) {
      setTimeout(() => {
        detailsRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }
  }, [selectedIncident]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      mapContainerRef.current.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  const handleMarkerClick = (incident) => {
    setSelectedIncident(incident);
  };

  return (
    <div
      className="flex flex-col items-center justify-start min-h-screen p-4 md:p-6 bg-gray-50"
      dir="rtl"
    >
      <div className="flex items-center gap-3 mb-6 bg-white p-4 rounded-xl shadow-md w-full max-w-5xl">
        <MapIcon className="w-8 h-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-800">خريطة الحوادث</h1>
      </div>

      <div className="w-full max-w-5xl">
        <div
          ref={mapContainerRef}
          className="map-container w-full h-[70vh] mb-6 shadow-xl rounded-xl overflow-hidden border-4 border-white relative"
        >
          <MapContainer
            center={position}
            zoom={12}
            className="w-full h-full"
            attributionControl={false}
            zoomControl={false}
          >
            <RecenterButton position={position} />

            <LayersControl position="bottomright">
              <BaseLayer checked name="خريطة الشوارع">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              </BaseLayer>
              <BaseLayer name="خرائط جوجل">
                <TileLayer url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" />
              </BaseLayer>
              <BaseLayer name="قمر صناعي">
                <TileLayer url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}" />
              </BaseLayer>
            </LayersControl>

            {markers.map((marker) => (
              <Marker
                key={marker.id}
                position={marker.position}
                icon={createCustomIcon(marker.color)}
                eventHandlers={{
                  click: () => handleMarkerClick(marker),
                }}
              ></Marker>
            ))}
          </MapContainer>

          {/* زر ملء الشاشة  */}
          <div className="absolute top-4 left-4 z-[1000]">
            <button
              onClick={toggleFullscreen}
              className="flex items-center gap-2 bg-white text-blue-600 px-3 py-2 rounded-lg shadow-lg hover:bg-blue-50 transition border border-gray-200"
              title={isFullscreen ? "إغلاق ملء الشاشة" : "عرض بملء الشاشة"}
            >
              {isFullscreen ? (
                <>
                  <Minimize2 size={18} />
                  <span className="text-sm font-medium">إغلاق ملء الشاشة</span>
                </>
              ) : (
                <>
                  <Maximize2 size={18} />
                  <span className="text-sm font-medium">عرض بملء الشاشة</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* عرض تفاصيل الحادث  */}
        {selectedIncident ? (
          <div
            ref={detailsRef}
            id="incident-details"
            className="bg-white rounded-xl shadow-lg p-6 mb-6 border-r-4 transform transition-all duration-300 ease-in-out"
            style={{ borderRightColor: selectedIncident.color }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-2xl font-bold">
                {selectedIncident.name || "حادث"}
              </h3>
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: selectedIncident.color }}
              ></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-600" />
                <span className="text-md text-blue-500">
                  {selectedIncident.long || "موقع غير معروف"}
                </span>
                <span className="text-md">,</span>
                <span className="text-md text-blue-500">
                  {selectedIncident.lat || "موقع غير معروف"}
                </span>
              </div>

              {selectedIncident.time && (
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-600" />
                  <span className="text-md text-blue-500">
                    {selectedIncident.time && `${selectedIncident.time}`}
                  </span>
                </div>
              )}
            </div>

            {selectedIncident.description ? (
              <div className="mt-3 text-md text-gray-700 border-t pt-3">
                <p>{selectedIncident.description}</p>
              </div>
            ) : (
              <div className="mt-3 text-md text-gray-500 border-t pt-3 italic">
                <p>لا يوجد وصف متاح لهذا الحادث</p>
              </div>
            )}

            {/* عرض الصور المتعلقة بالحادث */}
            {images && images.length > 0 && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                {images?.map((image, index) => (
                  <div key={index} className="w-full h-auto">
                    <img
                      src={`http://192.168.100.201:8000${image?.image}`}
                      alt={`صورة الحادث ${index + 1}`}
                      className="w-[200px] h-[200px] rounded-lg shadow-md"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 text-center text-gray-500">
            <p>انقر على أحد العلامات في الخريطة لعرض تفاصيل الحادث</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Map;
