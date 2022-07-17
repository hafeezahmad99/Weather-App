// Forecast API Calls

const apiKey = "UHXoKLZeX5p2OA3TBD9RwkGDb8QdzdZ8";

// 1. First we need to make request to this endpoint "http://dataservice.accuweather.com/locations/v1/cities/search" in order to get city code.

const getCityData = async (city) => {
  const response = await fetch(
    `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}`
  );
  if (response.status !== 200) {
    throw new Error("Cannot Fetch City data");
  } else {
    // console.log(response);
    const data = await response.json();
    // console.log(data);
    return data[0];
  }
};

// 2. Now to get info about current conditions, we need to make request to this url "http://dataservice.accuweather.com/currentconditions/v1/{locationKey}"

const getCurrentConditions = async (locationKey) => {
  const response = await fetch(
    `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`
  );
  if (response.status !== 200) {
    throw new Error("Cannot Fetch Weather Current Conditions data");
  } else {
    // console.log("current conditions", response);
    const data = await response.json();
    // console.log(data);
    return data[0];
  }
};
