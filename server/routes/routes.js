const {Router} = require('express')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Member = require('../models/member');
const Organization = require('../models/organization');
const MemForm = require('../models/membershipForm')


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
  const organization = await Organization.findOne({email:req.body.email})

  if(!member){//if there is no member // A
      if (!organization){ // then check if there org // C
        return res.status(404).send({
          message:"User Not Found"
        })
      } // C 

      else if (!(await bcrypt.compare(req.body.password, organization.password))){ //if there is then
        return res.status(400).send ({// then this
          message:"Password is Incorrect"
        });
  }// A

  const token = jwt.sign({_id: organization._id, userType: organization.userType, orgName: organization.orgName},"secret") //but this if valid

  res.cookie("jwt", token,{
    httpOnly:true,
    maxAge:3*24*60*60*1000,
  })

  res.send({
    message:"success"
  });

  }

  else if(!(await bcrypt.compare(req.body.password, member.password))){ //but if there is, the check pass, if not valid // B
    return res.status(400).send ({// then this
      message:"Password is Incorrect"
    });
  } //B

  else {const token = jwt.sign({
    _id: member._id, 
    email: member.email,
    firstName: member.firstName,
    lastName: member.lastName,
    userType: member.userType
  
  },"secret") //but this if valid

  res.cookie("jwt", token,{
    httpOnly:true,
    maxAge:3*24*60*60*1000,
  })

  res.send({
    message:"success"
  })
}
});


      router.get('/current', async (req, res) => {
        try {
            const cookie = req.cookies['jwt'];
            const claims = jwt.verify(cookie, "secret");
    
            if (!claims) {
                return res.status(401).send({
                    message: "unauthenticated"
                });
            }
    
            let user;
            if (claims.userType === 'member') {
                user = await Member.findOne({ _id: claims._id });
            } else if (claims.userType === 'organization') {
                user = await Organization.findOne({ _id: claims._id });
            }
    
            if (!user) {
                return res.status(404).send({
                    message: "User not found"
                });
            }
    
            const { password, ...data } = await user.toJSON();
            res.send(data);
        } catch (err) {
            return res.status(401).send({
                message: 'unauthenticated'
            });
        }
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
  
    
router.get('/organization', async (req, res) => {
  try{
    const cookie = req.cookies['jwt']
    const claims = jwt.verify(cookie,"secret")

    if(!claims){
      return res.status(401).send({
        message: "unauthenticated"
      })
    }

    const organization = await Organization.findOne({_id:claims._id})
    const {password,...data} = await organization.toJSON()

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

router.post('/submitForm', async (req, res) => {
  let fullName = req.body.fullName
  let sex = req.body.sex

  try {
      // Create a new Member instance with checkbox data
      const newMembershipForm = new MemForm({
        fullName:fullName,
        sex:sex
      })

      // Save the new member to the database
      await newMembershipForm.save();

      res.status(201).json({ message: 'Member created successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router


//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(req.body.password, salt);
//   const record = await User.findOne({ email: req.body.email });
