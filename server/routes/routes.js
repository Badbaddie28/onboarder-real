const {Router} = require('express')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Member = require('../models/member');
const Organization = require('../models/organization');

const router = Router()

//MEMBER REGISTRATION
router.post('/register', async (req, res) => {
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let email = req.body.email
    let password = req.body.password

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const record = await Member.findOne({ email:email });

    if (record) {
        return res.status(400).send({
          message: "Email is already registered",
        });
      } else {

    const member = new Member({
        firstName:firstName,
        lastName:lastName,
        email:email,
        password:hashedPassword
    })

    const result = await member.save();

    //JWT 

    const { _id } = await result.toJSON();

    const token = jwt.sign({ _id: _id }, "secret");

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.send({
        message: "success"
    })
}

});

router.post('/login', async (req, res) => {
  const member = await Member.findOne({email:req.body.email})
  if(!member){
    return res.status(404).send({
      message:"User Not Found"
    })
  }

  if(!(await bcrypt.compare(req.body.password, member.password))){
    return res.status(400).send ({
      message:"Password is Incorrect"
    });
  }

  const token = jwt.sign({_id: member._id},"secret")

  res.cookie("jwt", token,{
    httpOnly:true,
    maxAge:24*60*60*1000,
  })

  res.send({
    message:"success"
  })
});

router.get('/member', async (req, res) => {
    try{
      const cookie = req.cookies['jwt']
      const claims = jwt.verify(cookie,"secret")

      if(!claims){
        return res.status(401).send({
          message: "unauthenticated"
        })
      }

      const member = await Member.findOne({_id:claims._id})
      const {password,...data} = await member.toJSON()

      res.send(data)

    }
    catch(err){
      return res.status(401).send({
        message:'unauthenticated'
      })
    }
});

router.post('/logout', (req,res) =>{
  res.cookie("jwt", "", {maxAge:0})

  res.send({
    message:"success"
  });
});

//ORGANIZATION REGISTRATION
router.post('/orgRegister', async (req, res) => {
  let orgName = req.body.orgName
  let orgType = req.body.orgType
  let orgEmail = req.body.orgEmail
  let password = req.body.password
  let about = req.body.about
  let orgHistory = req.body.orgHistory
  let mission = req.body.mission
  let vision = req.body.vision
  let coreValues = req.body.coreValues
  let logo = req.body.logo

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const record = await Organization.findOne({ orgEmail:orgEmail });

  if (record) {
      return res.status(400).send({
        message: "Email is already registered",
      });
    } else {

  const organization = new Organization({
      orgName:orgName,
      orgType:orgType,
      orgEmail:orgEmail,
      password:hashedPassword,
      about:about,
      orgHistory:orgHistory,
      mission:mission,
      vision:vision,
      coreValues,
      logo:logo
  })

  const result = await organization.save();

  //JWT 

  const { _id } = await result.toJSON();

  const token = jwt.sign({ _id: _id }, "secret");

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });



  res.send({
      message: "success"
  })
}

})

module.exports = router


//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(req.body.password, salt);
//   const record = await User.findOne({ email: req.body.email });
