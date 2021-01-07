export const getAthleteRoutes = async (token, id) => {
  const url = `https://www.strava.com/api/v3/athletes/${id}/routes`;

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    contentType: "application/json",
  };
  let response = await fetch(url, options);
  console.log(
    "🚀 ~ file: stravaApi.js ~ line 12 ~ getAthleteRoutes ~ response",
    response
  );
  let data = await response.json();
  console.log(
    "🚀 ~ file: stravaApi.js ~ line 14 ~ getAthleteRoutes ~ data",
    data
  );
  return data;
};

export const getAthleteProfile = async (token) => {
  const url = `https://www.strava.com/api/v3/athlete`;

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    contentType: "application/json",
  };
  let response = await fetch(url, options);
  let data = await response.json();
  return data;
};
