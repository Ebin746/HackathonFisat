// Store wildfire data
let disasters = [];

// Fetch ongoing wildfires
const fetchWildfires = async () => {
  const apiUrl =
    "https://eonet.gsfc.nasa.gov/api/v3/events?category=wildfires&days=4&status=open";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    disasters = data.events.map((event) => ({
      title: event.title,
      coordinates: event.geometry[0].coordinates,
    }));
    console.log("Ongoing wildfires from the last day:", disasters);
  } catch (error) {
    console.error("Error fetching wildfires:", error);
  }
};

// Load GeoJSON data
const ForestPloting = async () => {
  try {
    const res = await fetch("forest.geojson");
    const data = await res.json();
    L.geoJSON(data, {
      style: {
        color: "green",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.5,
      },
      onEachFeature: (feature, layer) => {
        layer.bindPopup(
          `<b>Name:</b> ${feature.properties.name}<br>
             <b>Protected Area:</b> ${
               feature.properties.protect_class || "Unknown"
             }<br>
             <b>Type:</b> ${feature.properties.boundary}`
        );
      },
    }).addTo(map);
  } catch (error) {
    console.log("Error loading GeoJSON data:", error);
  }
};

// Fetch weather data
const fetchWeatherData = async (lat, lng) => {
  const apiKey = "57053c3bb033a6291a6fab1a52cdac22";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return {
      temp: data.main.temp,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      precipitation: data.rain ? data.rain["1h"] : 0,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};

// Check weather conditions
const checkConditions = (weatherData) => {
  const { temp, humidity, windSpeed, precipitation } = weatherData;
  console.log(weatherData);
  return (
    temp > 35 ||
    temp < 10 ||
    humidity > 90 ||
    humidity < 30 ||
    precipitation > 50 ||
    windSpeed > 15
  );
};

// Monitor sanctuaries
const monitorSanctuaries = async (sanctuary) => {
  // const weatherData = await fetchWeatherData(sanctuary.lat, sanctuary.lng);
  // if (weatherData) {
  //   const isUnfavorable = checkConditions(weatherData);
  let isUnfavorable = true;
  if (isUnfavorable) {
      weatherThreats=sanctuary
    console.log(`${sanctuary.name} is experiencing unfavorable conditions.`);
  } else {
    console.log(`${sanctuary.name} has favorable conditions.`);
  }
};
//};

// Check wildfire proximity to sanctuaries
const checkWildfireProximity = (wildfireData, sanctuaries) => {
  wildfireData.forEach((wildfire) => {
    sanctuaries.forEach((sanctuary) => {
      const distance = haversineDistance(
        wildfire.coordinates[1], // wildfire latitude
        wildfire.coordinates[0], // wildfire longitude
        sanctuary.lat,
        sanctuary.lng
      );
      if (distance <= sanctuary.radius) {
        naturalDisasterThreats=sanctuary;
        console.log("naturalDisasterThreats",Object.keys(naturalDisasterThreats).length)
        // console.log(
        //   `Wildfire '${wildfire.title}' is near '${sanctuary.name}' sanctuary.`
        // );
      // } else {
      //   console.log(
      //     "There is no wildFire arround any WLS within a radius arround you"
      //   );
      }
    });
  });
};

//userLocationMarking
let userMarker = null;
const userLocationMarking = (latitude, longitude) => {
  if (userMarker) {
    userMarker.setLatLng([latitude, longitude]);
  } else {
    userMarker = L.marker([latitude, longitude]).addTo(map);
  }
};
//check the movements and alerts
const afterMovementNearBySanctuaries=async (userLat,userLng)=>{
  console.log("moved")
  const userLoc={userLat,userLng}
  const radius = 20;
  console.log("userlocation", userLoc);
  await cummunityMarked();
  await nearAlerts(userLat, userLng);
  console.log("UserMarkedThreats",Object.keys(userMarkedThreats).length);
 
  const nearbySanctuariesOnly = sanctuaryData.filter((san) => {
    const distance = haversineDistance(userLat, userLng, san.lat, san.lng);
    return distance <= radius;
  });

  console.log(
    "Nearby sanctuaries within the specified radius:",
    nearbySanctuariesOnly
  );

  for (const sanctuary of nearbySanctuariesOnly) {
    await monitorSanctuaries(sanctuary);
  }
  console.log("naturalDisasterThreats",Object.keys(weatherThreats).length)
  await fetchWildfires();
//for Testing WildFire on Australia
  //checkWildfireProximity(disasters, sanctuaryData); 
   checkWildfireProximity(disasters, nearbySanctuariesOnly);
  console.log("naturalDisasterThreats",Object.keys(naturalDisasterThreats).length)

  postThreats(userMarkedThreats,naturalDisasterThreats,weatherThreats);
}
// Find nearby sanctuaries and user location
let preLat,preLng=null;
let count=1;
const nearBySanctuaries = async () => {
  if (!navigator.geolocation) {
    alert("no GPS");
  }
  try {
    const userLoc = await new Promise((resolve, reject) => {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          userLocationMarking(latitude, longitude);

          let distance=haversineDistance(latitude,longitude,preLat,preLng);
          if(distance<250||count===1){
            afterMovementNearBySanctuaries(latitude,longitude)
            count=-1
          }
   
          console.log("user update from nav", latitude, longitude);
          resolve({ latitude, longitude });
        },
        (error) => {
          console.log(error);
          reject(error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000,
        }
      );
    });

  
  } catch (error) {
    console.error("Error finding nearby sanctuaries:", error);
  }
};


nearBySanctuaries();
ForestPloting();
