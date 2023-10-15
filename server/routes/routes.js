const {Router} = require('express')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Member = require('../models/member');
const Organization = require('../models/organization');
const member = require('../models/member');
const organization = require('../models/organization');

const router = Router()

//MEMBER REGISTRATION
router.post('/register', async (req, res) => {
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let email = req.body.email
    let password = req.body.password
    let userType = req.body.userType


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
        password:hashedPassword,
        userType:userType,
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

//READ Member

router.get('/viewmember', async (req, res) => {
  try {
    const member = await Member.find({});
    res.send(member);
  } catch (error) {
    res.status(400).send(error);
  }

}  );

//UPDATE Member

router.patch('/member/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const body = req.body;
    const updateMember = await Member.findByIdAndUpdate(_id,body,{new:true});
    if(!updateMember)
    {
      return res.status(404).send;
    }
    return res.status(200).send(updateMember);
   
  } catch (error) {
    res.status(400).send(error);
  }

});

//DELETE Member
router.delete('/member/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const deleteMember = await Member.findByIdAndDelete(_id);
    if(!deleteMember)
    {
     return res.status(404).send();
    }
    
    res.status(201).send(
      {
        "status" : true,
        "message" : "student deleted"
      }
    );
   
  } catch (error) {
    res.status(400).send(error);
  }

});


// MEMBER LOGIN
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

//MEMBER LOGOUT
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
  let email = req.body.email
  let password = req.body.password
  let about = req.body.about
  let orgHistory = req.body.orgHistory
  let mission = req.body.mission
  let vision = req.body.vision
  let coreValues = req.body.coreValues
  let userType = req.body.userType

 

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const record = await Organization.findOne({ email:email });

  if (record) {
      return res.status(400).send({
        message: "Email is already registered",
      });
    } else {

  const organization = new Organization({
      orgName:orgName,
      orgType:orgType,
      email:email,
      password:hashedPassword,
      about:about,
      orgHistory:orgHistory,
      mission:mission,
      vision:vision,
      coreValues:coreValues,
      userType:userType,

    
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

});

//READ Organization

router.get('/vieworganization', async (req, res) => {
  try {
    const organization = await Organization.find({});
    res.send(organization);
  } catch (error) {
    res.status(400).send(error);
  }

}  );

//UPDATE Organization

router.patch('/organization/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const body = req.body;
    const updateOrganization = await Organization.findByIdAndUpdate(_id,body,{new:true});
    if(!updateOrganization)
    {
      return res.status(404).send;
    }
    return res.status(200).send(updateOrganization);
   
  } catch (error) {
    res.status(400).send(error);
  }

});

//DELETE Member
router.delete('/organization/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const deleteOrganization = await Organization.findByIdAndDelete(_id);
    if(!deleteOrganization)
    {
     return res.status(404).send();
    }
    
    res.status(201).send(
      {
        "status" : true,
        "message" : "organization deleted"
      }
    );
   
  } catch (error) {
    res.status(400).send(error);
  }

});

module.exports = router


//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(req.body.password, salt);
//   const record = await User.findOne({ email: req.body.email });
