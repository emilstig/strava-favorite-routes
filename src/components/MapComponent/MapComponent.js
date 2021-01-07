/* global google */

import React, { useState, useEffect, useRef } from "react";

import theme from "./theme.json";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Polyline,
} from "react-google-maps";
import { MarkerWithLabel } from "react-google-maps/lib/components/addons/MarkerWithLabel";
const MapWithAMarker = withScriptjs(
  withGoogleMap(({ routes }) => {
    const google = window.google;
    const mapRef = useRef(null);

    // Fit bounds function
    const fitBounds = () => {
      const bounds = new window.google.maps.LatLngBounds();

      if (routes?.path?.length > 0) {
      }

      routes.forEach((route) =>
        route.path.forEach((position) => {
          console.log(
            "🚀 ~ file: MapComponent.js ~ line 27 ~ route.path.forEach ~ position",
            position
          );
          bounds.extend(new google.maps.LatLng(position));
        })
      );

      mapRef.current.fitBounds(bounds);
    };

    // Fit bounds on mount, and when the markers change
    useEffect(() => {
      fitBounds();
    }, [fitBounds]);

    return (
      <GoogleMap
        // defaultOptions={{ styles: theme }}
        defaultZoom={5}
        defaultCenter={routes[0].position}
        ref={mapRef}
      >
        {routes.map((route, index) => {
          return (
            <React.Fragment key={`map-${index}`}>
              {route.path && (
                <Polyline
                  path={route.path}
                  options={{ strokeColor: "#fc5200" }}
                />
              )}
              {route.position && (
                <MarkerWithLabel
                  position={route.position}
                  labelAnchor={new google.maps.Point(50, 0)}
                  labelStyle={{
                    backgroundColor: "#fc5200",
                    color: "#ffffff",
                    fontSize: "12px",
                    padding: "4px",
                  }}
                >
                  <div>{route.name}</div>
                </MarkerWithLabel>
              )}
            </React.Fragment>
          );
        })}
      </GoogleMap>
    );
  })
);

const MapComponent = ({ routes }) => {
  return (
    <MapWithAMarker
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBGPQpEpfRbUptvrbseWfonotLWz-AJmGQ&v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100%`, width: `100%` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      routes={routes}
    />
  );
};

export default MapComponent;
