const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const blogroute = require('./routes/blog');
const authRoute = require('./routes/auth');

require("dotenv").config();

const app = express();

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:false
})
.then(()=>console.log("เชื่อมต่อเรียบร้อย")) 
.catch((err)=>console.log(err))

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use('/api',blogroute);
app.use('/api',authRoute);

const port = process.env.PORT || 8080;
app.listen(port,()=>console.log(`start server in port ${port}`));
