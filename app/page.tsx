"use client";
import React, { useEffect, useState } from "react";
import Map, { ViewStateChangeEvent } from "react-map-gl";
import { motion, AnimatePresence } from "framer-motion";

import WeatherCard from "@/components/WeatherCard";
import GeocoderControl from "@/components/geocoder-control";
import { getWeather } from "./actions";
import ArrowComponent from "@/components/ArrowComponent";

const mapboxAPIKey = process.env.NEXT_PUBLIC_MAPBOX_API_KEY as string;

interface Place {
  longitude: number;
  latitude: number;
  zoom: number;
  query: string;
}

interface WeatherData {
  location: {
    name: string;
    country: string;
    localtime: string; // Assuming this is a date/time string
  };
  current: {
    temperature: number;
    feelslike: number;
    weather_descriptions: string[];
    wind_speed: number;
    wind_dir: string;
    humidity: number;
    uv_index: number;
    visibility: number;
  };
}

export default function App() {
  // default location
  const [place, setPlace] = useState<Place>({
    longitude: -122.4194,
    latitude: 37.7749,
    zoom: 12,
    query: "San Francisco, CA",
  });

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  // fetching current location of user
  useEffect(() => {
    let isMounted = true;
    const ipStackAPIKey = process.env.NEXT_PUBLIC_IPSTACK_API_KEY;

    const fetchUserLocation = async () => {
      try {
        const getIp = await fetch(
          `http://api.ipstack.com/check?access_key=${ipStackAPIKey}`
        );
        const data = await getIp.json();

        if (!isMounted) return;

        const position = {
          longitude: data.longitude,
          latitude: data.latitude,
          zoom: 12,
          query: data.region_name,
        };
        setPlace(position);
      } catch (error) {
        console.error("Error fetching user location:", error);
      }
    };

    fetchUserLocation();

    return () => {
      isMounted = false;
    };
  }, []);

  // fetching weather of newly entered region
  useEffect(() => {
    const fetchWeather = async () => {
      setIsVisible(false);

      if (place.query !== "San Francisco, CA") {
        try {
          const data = await getWeather(place.query);
          setWeatherData(data);
          console.log("Weather data:", data);

          const input = document.querySelector(
            ".mapboxgl-ctrl-geocoder--input"
          ) as HTMLInputElement;
          if (input) {
            input.value = data.location.name;
          }
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      }
    };

    fetchWeather();
  }, [place.query]);

  const handleMove = (evt: ViewStateChangeEvent) => {
    setPlace((prev) => ({
      ...prev,
      longitude: evt.viewState.longitude,
      latitude: evt.viewState.latitude,
      zoom: evt.viewState.zoom,
    }));
  };

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, [weatherData]);

  return (
    <>
      <Map
        {...place}
        onMove={handleMove}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={mapboxAPIKey}
      >
        <GeocoderControl
          mapboxAccessToken={mapboxAPIKey}
          setPlace={setPlace}
          position="top-left"
        />
      </Map>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key="weather-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }} // Adjust duration as needed
          >
            {weatherData && <WeatherCard data={weatherData} />}
          </motion.div>
        )}
      </AnimatePresence>
      <ArrowComponent />
    </>
  );
}
