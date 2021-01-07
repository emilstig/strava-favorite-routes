import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Section from "../../components/UI/Layout/Section";
import Flex from "../../components/UI/Layout/Flex";
import MapComponent from "../../components/MapComponent/MapComponent";
// import Header from "../../components/Header/Header";
import decodePolyline from "decode-google-map-polyline";
import fonts from "../../assets/fonts/fonts";

import { getAthleteRoutes } from "../../helpers/stravaApi";

// Strava API
const stravaApi = {
  accessToken: process.env.REACT_APP_STRAVA_ACCESS_TOKEN,
  userId: process.env.REACT_APP_STRAVA_USER_ID,
  metaTitle: process.env.REACT_APP_META_TITLE,
  metaDescription: process.env.REACT_APP_META_DESCRIPTION,
};

const Wrapper = styled(Flex)`
  ${fonts}
  overflow: hidden;
  min-height: 100vh;
  min-height: -webkit-fill-available;
  color: ${({ theme }) => theme.colors.black};
  font-size: 18px;

  @media (min-width: ${(props) => props.theme.breakpoints[2]}) {
    font-size: 26px;
  }

  * {
    box-sizing: border-box;
  }
`;

const MapWrapper = styled(Section)`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;

  > div {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

function PageHome() {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    getAthleteRoutes(stravaApi.accessToken, stravaApi.userId).then((data) => {
      if (data?.length > 0) {
        const routes = data
          .filter((item) => item?.starred)
          .map((item) => {
            const { name, map } = item;
            const checked =
              name?.charAt(name.length - 1) === "✓" ? true : false;
            const path = map?.summary_polyline
              ? decodePolyline(map.summary_polyline)
              : null;
            const position = path?.length > 0 ? path[0] : null;
            return {
              name: checked ? name.substring(0, name.length - 1) : name,
              checked,
              path,
              position,
            };
          });
        setRoutes(routes);
      }
    });
  }, []);

  return (
    <Wrapper
      flexDirection="column"
      justifyContent={["flex-start", null, null, "flex-start"]}
      bg="background"
    >
      <Helmet>
        <title>{`${stravaApi.metaTitle}`}</title>
        <meta charSet="utf-8" />
        <meta name="description" content={stravaApi.metaDescription} />
      </Helmet>
      {/* <Header
        store={store}
        setStore={setStore}
        stravaAuthEndpoint={stravaAuthEndpoint}
      /> */}
      {/* <h1>Strava Adventure</h1>
{routes.map((route, index) => (
  <h3 key={`route-${index}`}>{route.name}</h3>
))} */}
      {routes?.length > 0 && (
        <MapWrapper>
          <div>
            <MapComponent routes={routes} />
          </div>
        </MapWrapper>
      )}
    </Wrapper>
  );
}

export default PageHome;
