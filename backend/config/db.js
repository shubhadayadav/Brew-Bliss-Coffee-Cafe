const mongoose=require("mongoose")


const connectDB= async()=>{
    try{
      await mongoose.connect(process.env.MONGO_URI)
      console.log(" MongoDB Connected successfully");

    }catch (error)
    {
console.log(" Not connected ", error.message);

    }
}

module.exports=connectDB