let circle = null;
let userLocation = null;
let selectedLocations = null; // Initialize selectedLocations to null

// Define the ReportDetails class with a constructor


const reportForm = document.querySelector(".reportForm");
var map = L.map("map").setView([9.9312, 76.2673], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// Function to get the user's current location
const getLocation = () => {
  if (!navigator.geolocation) {
    console.log("Geolocation is not supported by your browser");
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      userLocation = { latitude, longitude };
      console.log("your location ", userLocation);
    },
    (error) => {
      console.log("Error getting location: ", error);
    }
  );
};

const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

function markpopup(e) {
  if (circle) {
    map.removeLayer(circle);
  }
  let latitude = e.latlng.lat;
  let longitude = e.latlng.lng;
  selectedLocations = { latitude, longitude };

  circle = L.circle([latitude, longitude], {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: 500,
  }).addTo(map);

  var popup = L.popup()
    .setLatLng(e.latlng)
    .setContent("You clicked here: " + e.latlng.toString())
    .openOn(map);

  if (userLocation) {
    const distance = getDistance(
      userLocation.latitude,
      userLocation.longitude,
      latitude,
      longitude
    );
    if (distance <= 2000) {
      alert("You are in danger!");
    }
  }
}

getLocation();

map.on("click", markpopup);

reportForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const animal = reportForm.querySelector('select[name="animal"]').value; // Assuming you changed to a dropdown
  const description = reportForm.querySelector(
    'textarea[name="description"]'
  ).value;
const user= localStorage.getItem('user');  // Retrieve userId from local storage
console.log(user);
  if (!user) {
    alert("User is not logged in.");
    return;
  }
  if (selectedLocations) {
    
    const reportData = {
      lat:selectedLocations.latitude,
      lng:selectedLocations.longitude,
      animal,
      description: {
        user:user.id ,
        about:description,
        userName:user.name
      }
    };

    try {
      const response = await fetch("/animals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...reportData }),
      });

      if (response) {
        console.log(response);
        console.log("Report sent successfully");
      } else {
        console.error("Failed to send report");
      }
    } catch (error) {
      console.log(error);
    }

    //

    //
    console.log(reportData);
  } else {
    console.log("Please select a location on the map.");
  }

  reportForm.reset();
});
