//plot alredy marked areas
let data;
let animalData;
const feedBackContainer = document.querySelector(".description");
const feedBackDisplayFunction = (data) => {
  const feedbackDiv = document.createElement("div");
  feedbackDiv.classList.add("feedback-item");
  feedbackDiv.innerHTML = `
    <h3>Threat Detected</h3>
  
    <p><strong>Animal:</strong> ${data.animal}</p>
    <p><strong>Description:</strong> ${data.description.about}</p>
  `;

  feedBackContainer.appendChild(feedbackDiv);
};
const cummunityMarked = async () => {
  try {
    const response = await fetch("/animals");
    data = await response.json();
  } catch (error) {
    console.log(error);
    return;
  }
  data.forEach((item) => {
    var circle = L.circle([item.lat, item.lng], {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.3,
      radius: 500,
    }).addTo(map);

    circle.on("click", () => {
      L.popup()
        .setLatLng([item.lat, item.lng])
        .setContent(`${item.animal}`)
        .openOn(map);
      while (feedBackContainer.firstChild) {
        feedBackContainer.removeChild(feedBackContainer.firstChild);
      }
      feedBackDisplayFunction(item);

      console.log("clicked");
    });
  });
};

const nearAlerts = (userLat, userLng) => {
  data.map((alertAreas, i) => {
    const distance = haversineDistance(
      userLat,
      userLng,
      alertAreas.lat,
      alertAreas.lng
    );
    if (distance < RadiusThreshold) {
      const { lat, lng, animal, description } = alertAreas;
      userMarkedThreats[i] = { lat, lng, animal, description };
    }
  });
};
