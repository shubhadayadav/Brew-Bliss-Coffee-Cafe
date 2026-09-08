const mongoose=require("mongoose");

const reservationSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        
    },
    telNumber:{
        type:Number,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    }
},{timestamps:true});


export const Reservation=mongoose.model("Reservation",reservationSchema);