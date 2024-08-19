const mongoose=require("mongoose");
const animalSchema=mongoose.Schema({
lat:{type:Number,require:true},
lng:{type:Number,require:true},
animal:{type:String,require:true},
description:{users:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
about:{type:String},
userName:{type:String}
},
dislike:{type:Number},
like:{type:Number}

})

module.exports=mongoose.model('animals',animalSchema)