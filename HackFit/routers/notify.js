const router=require("express").Router();
const {sendSms}=require("../utils/sms");



router.post('/sms', (req, res) => {
  const { userMarkedThreats, naturalDisasterThreats, weatherThreats } = req.body;

  // Prepare SMS content
  const smsContent = `Alert! Threats detected:
  User Marked Threats: ${JSON.stringify(userMarkedThreats)}
  Natural Disasters: ${JSON.stringify(naturalDisasterThreats)}
  Weather Conditions: ${JSON.stringify(weatherThreats)}`;

  // Simulate sending SMS by logging to console
  console.log('Sending SMS with content:');
console.log(smsContent);


sendSms("There is reported dummy threat on your surroundings",);
  // Respond to the frontend
  res.status(200).send('SMS notification sent successfully');
});



module.exports=router;