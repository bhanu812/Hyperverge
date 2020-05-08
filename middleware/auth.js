const jwt =require("jsonwebtoken");

module.exports=function auth(req, res, next) {

  try {
    const token=req.header("x-auth-token");
    if (!token) return res.status(401).send("Access denied. No token provided");
    const decoded=jwt.verify(token, "secretkey");
    const role=decoded.role;
    const id=decoded.id;  
    if(id!='admin123') return res.status(401).send({
        success: false, Response: {}, message: "unauthorized"
      })
    if(role!='admin') return res.status(401).send({
        success: false, Response: {}, message: "unauthorized"
      })
    
    next();
} catch (ex) {
    res.status(400).send(ex);
  }
};
