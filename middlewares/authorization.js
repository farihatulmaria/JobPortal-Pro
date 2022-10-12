module.exports.authorization = (...role)=>{
    return (req,res,next)=>{
        const userRole = req?.user?.role;
        if(!role.includes(userRole)){
            res.status(400).json({
                status:'You shall not pass',
                error:"You can't have access to look",
            })
        }
        next()
    }
}