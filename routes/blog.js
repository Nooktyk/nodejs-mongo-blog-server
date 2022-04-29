// เกี่ยวข้องกับการจัดการเส้นทาง
// รอรับ req จากผู้ใช้ตามเส้นทางที่ระบุ แล้วส่งไปที่ controller

// import express
const express = require("express")
// สร้าง router
const router = express.Router()
// import blogController
const {create,getAllblogs,singleBlog,remove,update} = require("../controllers/blogController")

// const { requireLogin } = require("../controllers/authController")

// router method post ใช้ในการบันทึกข้อมูล
router.post('/create',create)
// ในการดึงข้อมูลจะใช้ method get ให้เข้าไปที่ /blogs (บทความทั้งหมด) และเรียกใช้ฟังก์ชัน
// getAllblogs ใน blogController
router.get('/blogs', getAllblogs)
// slug
router.get('/blog/:slug',singleBlog)
// ลบข้อมูล
router.delete('/blog/:slug',remove)
// update
router.put('/blog/:slug',update)

module.exports = router