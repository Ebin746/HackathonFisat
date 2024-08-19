const router=require("express").Router();
const animalSchema=require("../models/animal");

router.post('/',async (req,res,next)=>{
    try {
        const {lat,lng,animal,description}=req.body;
       console.log(description)
        const report=new animalSchema({lat,lng,animal,description});

        await report.save();
        res.status(400).json(report);

    } catch (error) {
        next(error);
    }
})

router.get("/",async(req,res,next)=>{
    try {
        const allReports=await animalSchema.find();

        res.status(400).json(allReports)
    } catch (error) {
        next(error);
    }
})




module.exports=router