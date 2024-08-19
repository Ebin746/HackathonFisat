const mongoose=require("mongoose");

const databaseConnection=async()=>{
try {
    let base=await mongoose.connect("mongodb://localhost:27017/hackathon");
    console.log("The data base connected");
} catch (error) {
    console.log(error);
}

}

module.exports=databaseConnection;