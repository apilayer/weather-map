"use server";

// using weatherstack API to get current weather of an area
export const getWeather = async (place: string) => {
  const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_API_KEY}&query=${place}`;
  const options = {
    method: "GET",
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

// getting user's ip and current location
const publicIp = require("react-public-ip");
export const getUserLocationFromIP = async () => {
  const ip = (await publicIp.v6()) || "";
  console.log(ip);
  const response = await fetch(`http://ip-api.com/json/${ip}`);
  const geo = await response.json();
  return geo;
};