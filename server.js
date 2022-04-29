// ทำหน้าที่ระบุตัว modules ที่เกี่ยวข้องกับระบบ

//import packages มาใช้งาน
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
// import route blog
const blogroute = require('./routes/blog')

const authRoute = require('./routes/auth')

// for database
const mongoose = require("mongoose")

// การตั้งค่าระบบ --> สร้างไฟล์ .env เป็นส่วนของการตั้งค่าสภาพแวดล้อมของระบบ
require("dotenv").config()

// สร้าง web server ด้วย express
const app = express()

// connect cloud database (ทำก่อน middleware)
// ประกอบด้วย connection string (uri) และ option
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:false
})
.then(()=>console.log("เชื่อมต่อเรียบร้อย")) // เมื่อเชื่อมต่อสำเร็จ
.catch((err)=>console.log(err)) // เมื่อเชื่อมต่อล้มเหลว

// เรียกใช้ตัวที่ require มา
// middleware(use) ใช้งานเกี่ยวกับการตั้งค่าให้ express
// ใช้ server เป็นตัวที่ให้บริการ Rest API (res json กลับไปที่ฝั่ง client)
app.use(express.json())
app.use(cors())
// ดัก req
app.use(morgan("dev"))

// route ตอบกลับเวลาสั่ง run server
// เมื่อระบุ /api และ /blog จะ res.data ใน blog.js
app.use('/api',blogroute)

app.use('/api',authRoute)


// PORT ให้ระบุ กรณีที่ไม่ได้กำหนดใน .env
// เมื่อสั่ง run ให้แสดงข้อความใน console
const port = process.env.PORT || 8080
app.listen(port,()=>console.log(`start server in port ${port}`))
