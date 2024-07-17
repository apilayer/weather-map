# World Weather Map

An interactive web application that displays weather information for any region on a global map. Built with Next.js and [WeatherStack API](https://weatherstack.com/), it offers a seamless user experience for exploring weather conditions worldwide.

![World Weather Map Screenshot](/screenshot.png)

## Features

- 🗺️ Interactive global map interface
- 🔍 Search functionality for any region
- 🌡️ Real-time weather information display
- 📍 Automatic user location detection on first load
- 📱 Responsive design for various devices

## Installation

To set up the World Weather Map project locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/apilayer/weather-map.git
   ```

2. Navigate to the project directory:
   ```
   cd weather-map
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Create a `.env.local` file in the root directory and add your API keys:
   ```
    WEATHERSTACK_API_KEY=
    NEXT_PUBLIC_MAPBOX_API_KEY=
    NEXT_PUBLIC_IPSTACK_API_KEY=
   ```

5. Run the development server:
   ```
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. Upon loading, the app will attempt to detect your current location and show current weather.
2. Use the search input in the top left corner to look up weather for any region.
3. Type any place on the input and view its weather information.

## Technologies Used

- [Next.js](https://nextjs.org/)
- Weather data provided by [WeatherStack API](https://weatherstack.com/)
- IP information provided by [IpStack API](https://ipstack.com/)
- Map functionality powered by [MapBox](https://www.mapbox.com/)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.