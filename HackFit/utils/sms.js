const twilio=require("twilio");
 const client=twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);



const sendSms=async(messageBody,recipientPhoneNumber)=>{
try {
    
    // const message = await client.messages.create({
    //     body: messageBody,
    //     from: process.env.PHONE_NUMBER,  // Twilio phone number
    //     to: "+919747859313" // Recipient's phone number
    // });

    // res.status(200).json({message:"sms send to your mobile number"});
    console.log("message send to phone number");
} catch (error) {
    console.log(error);
}
}
module.exports={sendSms};