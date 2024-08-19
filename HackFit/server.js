require('dotenv').config();
const express=require("express");
const databaseConnection = require("./DB/database");
const app=express();
const path=require("path")
const userRouter=require("./routers/users");
const notifyRouter=require("./routers/notify");
const animalRouter=require("./routers/animal");
app.use(express.json())
console.log(__dirname)
app.use(express.static(path.join(__dirname, 'public')));
app.use("/user",userRouter);
app.use("/notify",notifyRouter)
app.use("/animals",animalRouter)
app.listen(3000,()=>{
    console.log("server started on the Port",3000)
    databaseConnection()
})