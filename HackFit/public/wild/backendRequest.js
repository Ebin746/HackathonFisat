const postThreats = async (
  userMarkedThreats,
  naturalDisasterThreats,
  weatherThreats
) => {
  if (
    Object.keys(userMarkedThreats).length !== 0 ||
    Object.keys(naturalDisasterThreats).length !== 0 ||
    Object.keys(weatherThreats).length !== 0
  ) {
    try {
      const response = await fetch('/notify/sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userMarkedThreats,
          naturalDisasterThreats,
          weatherThreats,
        }),
      });

      if (response.ok) {
        console.log('Threat notification sent to the backend.');
      } else {
        console.log('Failed to send threat notification.');
      }
    } catch (error) {
      console.error('Error sending threat notification:', error);
    }
  } else {
    console.log('There are no threats.');
  }
};
