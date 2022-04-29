// ออกแบบโครงสร้างในการจัดเก็บข้อมูล

// ชื่อบทความ (title), เนื้อหาบทความ (content), ผู้เขียน (author), slug (url)
// time stamp : วัน/เดือน/ปี/เวลา
// slug -> url:install postman -> url:instal-postman

const mongoose = require("mongoose")

// สร้าง field
const blogSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:{},
        required:true
    },
    author:{
        type:String,
        default:"Admin"
    },
    slug:{
        type:String,
        lowercase:true,
        unique:true
    }
},{timestamps:true}) // จัดเก็บช่วงเวลาในการบันทึก

module.exports = mongoose.model("Blogs",blogSchema)