// ทำหน้าติดต่อกับฐานข้อมูล และดำเนินการกับฐานข้อมูล
// route รับ req --> controller --> database
// controller ทำการสร้างฟังก์ชันจัดการกับฐานข้อมูล เช่น ติดต่อ, เพิ่ม, ลบ, แก้ไข
// รอรับ req จาก route

// import slugify
const slugify = require("slugify")
// import model
const Blogs = require("../models/blogs")
// import uuid
const { v4: uuidv4 } = require('uuid');

// ฟังก์ชันบันทึกข้อมูล เก็บเป็น object ลงใน req.body
// รับเอา req ที่ต้องมา เก็บลงใน data และ res กลับไป
exports.create=(req,res)=>{
    // destructuring ค่าออกมา *ต้องตั้งชื่อให้เหมือนกัน
    const {title,content,author} = req.body
    // สร้าง slug ให้มีค่าเหมือนกับ title เอาไว้กำหนด url ของบทความ
    let slug = slugify(title) // ระบุ เป็น let เนื่องจากค่ามีการเปลี่ยนแปลง

    // ตรวจสอบ slug เป็นค่าว่าง
    if(!slug) slug = uuidv4();

    // ตรวจสอบความถูกต้องด้วย switch case
    switch(true){
        case !title:
            return res.status(400).json({error:"กรุณาป้อนชื่อบทความ"})
            break;
        case !content:
            return res.status(400).json({error:"กรุณาป้อนเนื้อหาบทความ"})
            break;
    }
    // บันทึกข้อมูล
    Blogs.create({title,content,author,slug},(err,blog)=>{
        if(err){
            res.status(400).json({error:"ชื่อบทความซ้ำ"})
        }
        res.json(blog)
    })
}

// สร้างฟังก์ชันในการดึงข้อมูลบทความทั้งหมด
// โดยอาศัย model ที่เชื่อมกับตัวฐานข้อมูล คือ medel Blogs
// ใช้ method find() ซึ่งเป็นคำสั่งใน mongoDB แบบไม่กำหนดเงื่อนไข เพื่อดึงข้อมูลทั้งหมด
// เก็บข้อมูลที่ดึงมาไว้ใน blogs และ res ตอบกลับไปแบบ json object
exports.getAllblogs=(req,res)=>{
    Blogs.find({}).exec((err,blogs)=>{
        res.json(blogs)
    })
}

// ฟังก์ชันดึงบทความอ้างอิงตาม slug
exports.singleBlog=(req,res)=>{
    const {slug} = req.params
    Blogs.findOne({slug}).exec((err,blog)=>{
        res.json(blog)
    })
}

// ฟังก์ชัน remove
exports.remove=(req,res)=>{
    const {slug} = req.params
    Blogs.findOneAndRemove({slug}).exec((err,blog)=>{
        if(err) console.log(err)
        res.json({
            message:"ลบบทความเรียบร้อย"
        })
    })
}

exports.update=(req,res)=>{
    const {slug} = req.params
    // ต้องส่ง title, content, author มาด้วยเพื่อ update
    // destructuring ค่าที่ส่งมา
    const {title,content,author} = req.body
    Blogs.findOneAndUpdate({slug},{title,content,author},{new:true}).exec((err,blog)=>{
        if(err) console.log(err)
        res.json(blog) // res blog ที่ update รูปแบบ json
    })
}