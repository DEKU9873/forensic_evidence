import React, { useState, useRef, useEffect } from "react";
import { LayersControl } from "react-leaflet";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { v4 as uuidv4 } from "uuid";
import {
  Map as MapIcon,
  Trash2,
  Info,
  ZoomIn,
  Maximize2,
  Minimize2,
} from "lucide-react";
import "leaflet/dist/leaflet.css";

import { GiPistolGun } from "react-icons/gi"
import { GiSuicide } from "react-icons/gi"
import { GiDeathSkull } from "react-icons/gi"
import { FaPeopleRobbery } from "react-icons/fa6"
import { GiTakeMyMoney } from "react-icons/gi"
import { HiFire } from "react-icons/hi"
import { GiMineExplosion } from "react-icons/gi"


const baghdadMarkers = [
  {
    id: "1",
    position: [33.3152, 44.3661],
    name: "جريمة قتل",
    description: "حادثة قتل وقعت في هذا الموقع، والجهات الأمنية تحقق في ملابساتها.",
    icon: GiPistolGun,
    color: "#ff4c4c",
  },
  {
    id: "2",
    position: [33.3089, 44.3705],
    name: "انتحار",
    description: "تم الإبلاغ عن حالة انتحار في هذا الموقع، والسلطات تحقق في الأسباب المحتملة.",
    icon: GiSuicide,
    color: "#ffff54",
  },
  {
    id: "3",
    position: [33.3147, 44.4404],
    name: "وفاة",
    description: "تم العثور على شخص متوفى في ظروف غامضة، والتحقيقات جارية.",
    icon: GiDeathSkull,
    color: "#d0c0c0",
  },
  {
    id: "4",
    position: [33.3356, 44.3959],
    name: "سرقة",
    description: "عملية سرقة وقعت في هذا الموقع، وتم اتخاذ الإجراءات القانونية.",
    icon: GiTakeMyMoney,
    color: "#578dff",
  },
  {
    id: "5",
    position: [33.3449, 44.4009],
    name: "سرقة بالإكراه",
    description: "حادثة سرقة تحت التهديد وقعت هنا، والشرطة تتابع التحقيق.",
    icon: GiTakeMyMoney,
    color: "#40b07b",
  },
  {
    id: "6",
    position: [33.3298, 44.3947],
    name: "حريق",
    description: "اندلاع حريق في هذا الموقع، وتمت السيطرة عليه من قبل فرق الإطفاء.",
    icon: HiFire,
    color: "#ffe840",
  },
  {
    id: "7",
    position: [33.3298, 44.4047],
    name: "انفجار إرهابي",
    description: "انفجار وقع في هذا المكان، والجهات المختصة تعمل على كشف ملابساته.",
    icon: GiMineExplosion,
    color: "#792da4",
  },
];


const createCustomIcon = (IconComponent, color) => {
  const svgTemplate = `
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 0C12.0645 0 5.625 6.43953 5.625 14.375C5.625 25.1563 20 40 20 40C20 40 34.375 25.1563 34.375 14.375C34.375 6.43953 27.9355 0 20 0ZM20 19.375C17.2395 19.375 15 17.1355 15 14.375C15 11.6145 17.2395 9.375 20 9.375C22.7605 9.375 25 11.6145 25 14.375C25 17.1355 22.7605 19.375 20 19.375Z" fill="${color}"/>
    </svg>
  `;

  return new L.DivIcon({
    html: svgTemplate,
    className: "custom-pin-icon",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });
};

const Map = () => {
  const { BaseLayer } = LayersControl;

  const [position, setPosition] = useState([33.335821, 44.383414]);
  const [markers, setMarkers] = useState(baghdadMarkers);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const infoSectionRef = useRef(null);

  const handleMarkerClick = (marker) => {
    setIsRemoving(false);
    setPosition(marker.position);
    setSelectedMarker(marker);
    setTimeout(scrollToInfo, 100);
  };

  const scrollToInfo = () => {
    if (infoSectionRef.current) {
      infoSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (mapContainerRef.current.requestFullscreen) {
        mapContainerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const MapEvents = () => {
    const map = useMap();
    mapRef.current = map;

    useEffect(() => {
      const handleClick = (event) => {
        // if (isRemoving) {
        //   setIsRemoving(false);
        //   return;
        // }

        // const { lat, lng } = event.latlng;
        // setPosition([lat, lng]);

        // const newMarker = {
        //   position: [lat, lng],
        //   name: `علامة ${markers.length + 1}`,
        //   id: uuidv4(),
        //   icon: FaTree,
        //   color: "#999999",
        //   description: "علامة جديدة",
        // };

        // setMarkers((prev) => [...prev, newMarker]);
        // setSelectedMarker(newMarker);
        // setTimeout(scrollToInfo, 100);
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

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <style>
        {`
          .leaflet-control-attribution {
            display: none !important;
          }

          .map-container {
            position: relative;
            border-radius: 1rem;
            overflow: hidden;
          }

          .map-container:fullscreen {
            padding: 0;
            border-radius: 0;
          }

          .map-controls {
            position: fixed;
            top: 1rem;
            right: 1rem;
            z-index: 1000;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }

          .map-container:not(:fullscreen) .map-controls {
            position: absolute;
          }

          .info-section {
            scroll-margin-top: 2rem;
          }

          .custom-pin-icon {
            background: none;
            border: none;
          }

          @media (min-width: 768px) {
            .info-section {
              scroll-margin-top: 4rem;
            }
          }

          :fullscreen .map-controls button {
            background-color: rgba(59, 130, 246, 0.9);
          }

          :fullscreen .map-controls button:hover {
            background-color: rgba(37, 99, 235, 1);
          }
        `}
      </style>

      <div className="flex items-center gap-2 mb-6">
        <MapIcon className="w-8 h-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-800">الخرائط</h1>
      </div>

      <div className="w-[900px]">
        <div
          ref={mapContainerRef}
          className="map-container w-full h-[70vh] mb-6 shadow-lg"
        >
          <MapContainer
            center={position}
            zoom={12}
            className="w-full h-full"
            attributionControl={false}
          >
            <LayersControl position="bottomright">
              <BaseLayer checked name="OpenStreetMap">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              </BaseLayer>
              <BaseLayer name="Google Maps">
                <TileLayer url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" />
              </BaseLayer>
              <BaseLayer name="Google Satellite">
                <TileLayer url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}" />
              </BaseLayer>
            </LayersControl>

            {markers.map((marker) => (
              <Marker
                key={marker.id}
                position={marker.position}
                icon={createCustomIcon(marker.icon, marker.color)}
                eventHandlers={{
                  click: () => handleMarkerClick(marker),
                }}
              />
            ))}
            <MapEvents />
          </MapContainer>
          <div className="map-controls">
            <button
              onClick={toggleFullscreen}
              className="p-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition"
              title={isFullscreen ? "إنهاء ملء الشاشة" : "ملء الشاشة"}
            >
              {isFullscreen ? <Minimize2 size={24} /> : <Maximize2 size={24} />}
            </button>
          </div>
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
                <div className="flex items-center gap-2 mb-2">
                  <div style={{ color: "black" }}>
                    {React.createElement(selectedMarker.icon, { size: 24 })}
                  </div>
                  <p className="text-lg font-semibold text-blue-800">
                    {selectedMarker.name}
                  </p>
                </div>
                <p className="text-gray-600 mb-3">
                  {selectedMarker.description}
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

              <div className="flex justify-center items-center gap-4">
                <a
                  href={`https://www.google.com/maps?q=${selectedMarker.position[0]},${selectedMarker.position[1]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
                >
                  <MapIcon className="w-5 h-5" />
                  عرض في Google Maps
                </a>

                {/* <button
                  onClick={(e) => removeMarker(selectedMarker.id, e)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
                >
                  <Trash2 className="w-5 h-5" />
                  حذف العلامة
                </button> */}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>لم يتم تحديد أي علامة</p>
              <p className="text-sm mt-2">
                انقر على الخريطة لإضافة علامة جديدة
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Map;
