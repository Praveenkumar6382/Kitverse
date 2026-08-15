import jwt from 'jsonwebtoken';

const adminUser = async(req,res,next) =>{
  const token = req.header("Authorization").split(" ")[1];
  console.log(token)

  if(!token){
    return res.status(400).json({
      status:'failure',message:'Token not found'
    })
  }
try{

  const decoded = jwt.verify(token,'secret_key');
  req.user = decoded;
  if(req.user.role !== 'admin'){
     return res.status(403).json({
      status: "failure",
      message: "Access denied. Admin only.",
    });
  

  }
next();
  }catch(error){
          res.status(400).json({
            status:"failure",
            message:"Token is invalid"
        })

  }

}

export default adminUser;