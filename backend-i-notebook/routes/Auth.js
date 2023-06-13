const router = require('express').Router();
const Users = require("../models/Users");
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require("../middleware/Fetchuser")

const JWT_SECRET = 'satyamisagoodb$boy';

// route : 1 Create a User using: POST "/api/auth/createuser". No login required
router.post("/createuser",[
   body('name', 'Enter a valid name',).isLength({ min: 3 }),
   body('email', 'Enter a valid email').isEmail(),
   body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
 ], async(req, res) => {
  let success = false;
   // if i get error send a bad request
   const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
 // Check whether the user with this email exists already
 try{
let user = await Users.findOne({email:req.body.email})
  if(user){
   return res.status(400).json({success,errors:"sorry this email already exist"})
   }
   const salt = await bcrypt.genSalt(10)
   const secpass = await bcrypt.hash(req.body.password,salt)
     // Create a new user
     user = await Users.create({
      name: req.body.name,
      email: req.body.email,
      password: secpass
    })
    const data= {
      user:{
        id:user.id
      }
    }
    const  authToken = jwt.sign(data,JWT_SECRET)
    success = true;
    res.json({success,authToken})
  } catch(err){console.log(err.message)
    res.status(500).send("internel server problem some problem in *try^ in *auth.js^")
  }
   
})
// route : 2 Create a User using: POST "/api/auth/login". No login required
router.post("/login",[
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async(req, res) => {
 // if i get error send a bad request
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
   return res.status(400).json({ errors: errors.array() });
 }
const {email,password} = req.body;
try {
  let user =await Users.findOne({email})
  if(!user){
   let success=false;
    return res.status(420).json({error:"please try to login with correct email"});
  }
  const passwordComapare = await bcrypt.compare(password,user.password)
  if(!passwordComapare){
   let success=false;
    return res.status(404).json({success,error:"please try to login with correct password"});
  } 
  const data= {
    user:{
      id:user.id
    }
  }
  const  authToken = jwt.sign(data,JWT_SECRET)
  success=true;
  res.json({success,authToken})
} catch(err){console.log(err.message)
  res.status(500).send(" internel server problem some problem in *try^ in *auth.js^")
}

})
// route : 3 Create a User using: POST "/api/auth/getuser".login required
router.post("/getuser",fetchuser, async(req, res) => {
try {
userId = req.user.id 
const user = await Users.findById(userId).select("-password")
res.send(user)
} catch(err){console.log(err.message)
  res.status(500).send(" internel server problem some problem in *try^ in *auth.js^")
}

})
module.exports = router