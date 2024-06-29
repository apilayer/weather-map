import * as React from "react";
import { useState } from "react";
import { useControl, Marker, MarkerProps, ControlPosition } from "react-map-gl";
import MapboxGeocoder, { GeocoderOptions } from "@mapbox/mapbox-gl-geocoder";

type GeocoderControlProps = Omit<
  GeocoderOptions,
  "accessToken" | "mapboxgl" | "marker"
> & {
  mapboxAccessToken: string;
  marker?: boolean | Omit<MarkerProps, "longitude" | "latitude">;
  position: ControlPosition;
  onLoading?: any;
  onResults?: any;
  onResult?: any;
  onError?: any;
  setPlace: (place: {
    query: string;
    longitude: number;
    latitude: number;
    zoom: number;
  }) => void;
};

const GeocoderControl: React.FC<GeocoderControlProps> = (props) => {
  const [marker, setMarker] = useState<React.ReactNode>(null);

  const geocoder = useControl<MapboxGeocoder>(
    () => {
      const ctrl = new MapboxGeocoder({
        ...props,
        marker: false,
        accessToken: props.mapboxAccessToken,
      });
      ctrl.on("loading", props.onLoading);
      ctrl.on("results", props.onResults);
      ctrl.on("result", (evt) => {
        props.onResult?.(evt);

        const { result } = evt;
        const location =
          result &&
          (result.center ||
            (result.geometry?.type === "Point" && result.geometry.coordinates));

        props.setPlace({
          query: result.text,
          longitude: location[0],
          latitude: location[1],
          zoom: 12,
        });

        if (location && props.marker) {
          setMarker(
            <Marker
              {...(props.marker as Omit<MarkerProps, "longitude" | "latitude">)}
              longitude={location[0]}
              latitude={location[1]}
            />
          );
        } else {
          setMarker(null);
        }
      });
      ctrl.on("error", props.onError);
      return ctrl;
    },
    {
      position: props.position,
    }
  );

  React.useEffect(() => {
    if (geocoder) {
      if (
        props.proximity !== undefined &&
        geocoder.getProximity() !== props.proximity
      ) {
        geocoder.setProximity(props.proximity);
      }
      if (
        props.render !== undefined &&
        geocoder.getRenderFunction() !== props.render
      ) {
        geocoder.setRenderFunction(props.render);
      }
      if (
        props.language !== undefined &&
        geocoder.getLanguage() !== props.language
      ) {
        geocoder.setLanguage(props.language);
      }
      if (props.zoom !== undefined && geocoder.getZoom() !== props.zoom) {
        geocoder.setZoom(props.zoom);
      }
      if (props.flyTo !== undefined && geocoder.getFlyTo() !== props.flyTo) {
        geocoder.setFlyTo(props.flyTo);
      }
      if (
        props.placeholder !== undefined &&
        geocoder.getPlaceholder() !== props.placeholder
      ) {
        geocoder.setPlaceholder(props.placeholder);
      }
      if (
        props.countries !== undefined &&
        geocoder.getCountries() !== props.countries
      ) {
        geocoder.setCountries(props.countries);
      }
      if (props.types !== undefined && geocoder.getTypes() !== props.types) {
        geocoder.setTypes(props.types);
      }
      if (
        props.minLength !== undefined &&
        geocoder.getMinLength() !== props.minLength
      ) {
        geocoder.setMinLength(props.minLength);
      }
      if (props.limit !== undefined && geocoder.getLimit() !== props.limit) {
        geocoder.setLimit(props.limit);
      }
      if (props.filter !== undefined && geocoder.getFilter() !== props.filter) {
        geocoder.setFilter(props.filter);
      }
      if (props.origin !== undefined && geocoder.getOrigin() !== props.origin) {
        geocoder.setOrigin(props.origin);
      }
    }
  }, [
    geocoder,
    props.proximity,
    props.render,
    props.language,
    props.zoom,
    props.flyTo,
    props.placeholder,
    props.countries,
    props.types,
    props.minLength,
    props.limit,
    props.filter,
    props.origin,
  ]);

  return <>{marker}</>;
};

const noop = () => {};

GeocoderControl.defaultProps = {
  marker: true,
  onLoading: noop,
  onResults: noop,
  onResult: noop,
  onError: noop,
};

export default GeocoderControl;
