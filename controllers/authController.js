const jwt = require("jsonwebtoken")
// const expressJWT = require("express-jwt");

exports.login=(req,res)=>{

    // ข้อมูลที่ส่งมาเพื่อเข้าสู่ระบบ
    const {username,password} = req.body
    // เทียบกับ password ในระบบ
    if(password === process.env.PASSWORD){
        const token = jwt.sign({username},process.env.JWT_SECRET,{expiresIn:'1d'})
        return res.json({token,username})
    }else{
        return res.status(400).json({error:"รหัสผ่านไม่ถูกต้อง!"})
    }
}

// กระบวนการตรวจสอบ token
// exports.requireLogin = expressJWT({
//     secret:process.env.JWT_SECRET,
//     algorithms:["HS256"],
//     userProperty:"auth"
// })