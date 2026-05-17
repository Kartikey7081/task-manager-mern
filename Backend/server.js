const app =require("./src/app")



require('dotenv').config()
const connectTODB=require('./src/config/database')
connectTODB();


app.listen(3000,()=>{
    console.log("server is running on 3000");
})

