const express = require("express")
const { create, getAllblogs, singleBlog, remove, update } = require("../controllers/blogController");

const router = express.Router();

//สร้าง
router.post('/create',create);

//ดึง blogs ทั้งหมด
router.get('/blogs', getAllblogs);

//ดึง blog เดียว
router.get('/blog/:slug',singleBlog);

//ลบ
router.delete('/blog/:slug',remove);

//แก้ไข
router.put('/blog/:slug',update);

module.exports = router;