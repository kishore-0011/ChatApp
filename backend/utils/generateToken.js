import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie = (userId,res) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"15d"
    });
    
    res.cookie("jwt",token,{
        maxAge: 15*24*60*60*1000,
        httpOnly:true,//cookie cannot be accessed by client side script
        sameSite:"strict" //cookie will only be sent in a first-party context
    });
}

export default generateTokenAndSetCookie;