const mongoose=require("mongoose");

function connectTODB(){
    try{
console.log("Connecting to DB...");

        mongoose.connect(process.env.MONGO_URI);
            console.log("✅ Database connected");

    }catch(error){
            console.log("❌ DB error:", error);

    }
    
}

module.exports=connectTODB