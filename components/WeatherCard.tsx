import React from "react";
import { format } from "timeago.js";
import {
  Droplet,
  Eye,
  Wind,
  Snow,
  SunLight,
  CloudSunny,
  Rain,
  Thunderstorm,
  HeavyRain,
  Fog,
} from "iconoir-react";

const WeatherIcon = ({
  temperature,
  description,
}: {
  temperature: number;
  description: string;
}) => {
  const iconSize = 48;
  const lowercaseDescription = description.toLowerCase();

  if (temperature <= 0 || lowercaseDescription.includes("snow")) {
    return (
      <Snow width={iconSize} height={iconSize} className="text-blue-300" />
    );
  } else if (
    lowercaseDescription.includes("rain") ||
    lowercaseDescription.includes("drizzle")
  ) {
    return (
      <Rain width={iconSize} height={iconSize} className="text-gray-400" />
    );
  } else if (
    lowercaseDescription.includes("storm") ||
    lowercaseDescription.includes("thunder")
  ) {
    return (
      <Thunderstorm
        width={iconSize}
        height={iconSize}
        className="text-yellow-500"
      />
    );
  } else if (lowercaseDescription.includes("cloud")) {
    return (
      <CloudSunny
        width={iconSize}
        height={iconSize}
        className="text-gray-500"
      />
    );
  } else if (lowercaseDescription.includes("clear") || temperature > 25) {
    return (
      <SunLight
        width={iconSize}
        height={iconSize}
        className="text-yellow-400"
      />
    );
  } else if (
    lowercaseDescription.includes("mist") ||
    lowercaseDescription.includes("fog")
  ) {
    return <Fog width={iconSize} height={iconSize} className="text-gray-400" />;
  } else if (lowercaseDescription.includes("heavy rain")) {
    return (
      <HeavyRain width={iconSize} height={iconSize} className="text-blue-600" />
    );
  } else {
    // Default icon for unknown conditions
    return (
      <CloudSunny
        width={iconSize}
        height={iconSize}
        className="text-gray-500"
      />
    );
  }
};

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

interface Props {
  data: WeatherData;
}

const WeatherCard: React.FC<Props> = ({ data }) => {
  const { location, current } = data;

  return (
    <div className="fixed md:top-[13px] md:right-[13px] bottom-0 md:bottom-auto w-full md:w-[400px] bg-white rounded-t-[10px] md:rounded-[10px] smooth-shadow overflow-hidden">
      {location ? (
        <>
          <div className="p-4 w-full">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {location.name}, {location.country}
            </div>
            <div className="flex items-center mr-5">
              <div className="flex-1">
                <p className="block text-4xl font-bold mt-4 leading-tight text-black">
                  {current.temperature}°C
                </p>
                <p className="text-gray-500 text-sm my-1">
                  Feels like {current.feelslike}°C
                </p>
                <p className="text-gray-500 text-sm my-1">
                  {current.weather_descriptions[0]},{" "}
                  {format(location.localtime)}
                </p>
              </div>
              <WeatherIcon
                temperature={current.temperature}
                description={current.weather_descriptions[0]}
              />
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 bg-[#F3F3F3]">
            <div className="flex items-center p-3 border-r border-t border-b mt-[-1px] border-gray-300">
              <Wind className="h-5 w-5 text-gray-500 mr-2" strokeWidth={1.8} />
              <p className="text-sm font-medium text-gray-800">
                {current.wind_speed} m/s {current.wind_dir}
              </p>
            </div>
            <div className="flex items-center p-3 border-r border-t border-b mt-[-1px] border-gray-300">
              <Droplet
                className="h-5 w-5 text-gray-500 mr-2 border-b"
                strokeWidth={1.8}
              />
              <p className="text-sm font-medium text-gray-800">
                {current.humidity}% humidity
              </p>
            </div>
            <div className="flex items-center p-3 border-r border-t border-b mt-[-1px] border-gray-300">
              <SunLight
                className="h-5 w-5 text-gray-500 mr-2"
                strokeWidth={1.8}
              />
              <p className="text-sm font-medium text-gray-800">
                UV Index: {current.uv_index}
              </p>
            </div>
            <div className="flex items-center p-3 border-r border-t border-b mt-[-1px] border-gray-300">
              <Eye className="h-5 w-5 text-gray-500 mr-2" strokeWidth={1.8} />
              <p className="text-sm font-medium text-gray-800">
                {current.visibility} km visibility
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="p-4 w-full">
          <div className="uppercase tracking-wide text-sm leading-[180%] text-zinc-600 font-semibold">
            No weather information available for this region, try searching some
            other place.
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
