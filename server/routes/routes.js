const {Router} = require('express')
const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Member = require('../models/member');
const Organization = require('../models/organization');
const Events = require('../models/events');
const MemForm = require('../models/membershipForm')
const ObjectId = mongoose.Types.ObjectId;


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
  let logo = req.body.logo
  let orgCode = req.body.orgCode

 

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
      logo: logo,
      orgCode: orgCode
  })

  const result = await organization.save();

  // //JWT 

  // const { _id } = await result.toJSON();

  // const token = jwt.sign({ _id: _id }, "secret");

  // res.cookie("jwt", token, {
  //   httpOnly: true,
  //   maxAge: 24 * 60 * 60 * 1000, // 1 day
  // });



  res.status(201).json({ orgID: result._id, message: 'Organization created successfully' });
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

//DELETE Org
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


router.patch('/customizeForm/:orgID', async (req, res) => {
  try {
    const orgID = req.params.orgID;
    const body = req.body;
    const updateMemForm = await MemForm.findOneAndUpdate({ orgID }, body, { new: true });

    if (!updateMemForm) {
      return res.status(404).send();
    }

    return res.status(200).send(updateMemForm);
  } catch (error) {
    res.status(400).send(error);
  }
});




router.post('/submitForm', async (req, res) => {
  let fullName = req.body.fullName
  let sex = req.body.sex
  let birthDate = req.body.birthDate
  let placceOfBirth = req.body.placceOfBirth
  let civilStatus = req.body.civilStatus
  let religion = req.body.religion
  let address = req.body.address
  let zip = req.body.zip
  let email = req.body.email
  let contactNum = req.body.contactNum
  let employmentDetails = req.body.employmentDetails




  try {
      // Create a new Member instance with checkbox data
      const newMembershipForm = new MemForm({
        fullName:fullName,
        sex:sex
      })

      // Save the new member to the database
      await newMembershipForm.save();

      res.status(201).json({ message: 'Or created successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/createForm', async (req, res) => {
  let orgID = req.body.orgID


  try {
      // Create a new Member instance with checkbox data
      const newMembershipForm = new MemForm({
        personalInfo: true,
        fullName: true,
        sex: false,
        birthDate: true,
        placceOfBirth : false,
        civilStatus: false,
        religion: false,
        address: false,
        zip: false,
        email: true,
        contactNum: false,
        employmentDetails: false,
        employer: false,
        jobTitle: false,
        employerAdd: false,
        

        orgID:orgID,
      })

      // Save the new member to the database
      await newMembershipForm.save();

      res.status(201).json({ message: 'Member created successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

//READ memform - mem side

router.get('/myMemForm/:id', async (req, res) => {
  try {
    const _id = req.params.id; 
    const memForm = await MemForm.findOne({ orgID: _id });
    res.send(memForm);
  } catch (error) {
    res.status(400).send(error);
  }
});

// READ memform - org side
router.get('/memForm', async (req, res) => {
  try{
    const cookie = req.cookies['jwt']
    const claims = jwt.verify(cookie,"secret")

    if(!claims){
      return res.status(401).send({
        message: "unauthenticated"
      })
    }

    const memForm = await MemForm.findOne({orgID:claims._id})
    const {...data} = await memForm.toJSON()

    res.send(data)

  }
  catch(err){
    return res.status(401).send({
      message:'not found'
    })
  }
});


//READ specific org
router.get('/thisOrg/:id', async (req, res) => {
  try {
    const orgId = req.params.id; // 
    const thisOrg = await Organization.findById(orgId);
    if (!thisOrg) {
      return res.status(404).send({ error: 'Organization not found' });
    }
    res.send(thisOrg);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

router.get('/thisOrg1/:orgCode', async (req, res) => {
  try {
    const orgCode = req.params.orgCode; 
    const organization = await Organization.findOne({ orgCode: orgCode });
    if (!organization) {
      return res.status(404).send({ error: 'Organization not found' });
    }
    res.send(organization);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});


//create event
router.post('/createEvent', async (req, res) => {
  let orgID = req.body.orgID;
  let orgName = req.body.orgName;
  let eventTitle = req.body.eventTitle;
  let eventDesc = req.body.eventDesc;
  let eventDate = req.body.eventDate;
  let eventTime = req.body.eventTime;
  let location = req.body.location;
  let meetingURL = req.body.meetingURL;
  let poster = req.body.poster;
  let programme = req.body.programme;
  let video = req.body.video;
  let eventSeats = req.body.eventSeats;
  let eventPrice = req.body.eventPrice;
  let eventPaymentDetails = req.body.eventPaymentDetails;

  try {
    const events = new Events({
      orgID: orgID,
      orgName: orgName,
      eventTitle: eventTitle,
      eventDesc: eventDesc,
      eventDate: eventDate,
      eventTime: eventTime,
      location: location,
      meetingURL: meetingURL,
      poster: poster,
      programme: programme,
      video: video,
      eventSeats: eventSeats,
      eventPrice: eventPrice,
      eventPaymentDetails: eventPaymentDetails
    });

    await events.save();
    res.status(201).json({ events});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//read events
router.get('/viewevent', async (req,res) => {
  try {
    const event = await Events.find({});
    res.send(event)
  } catch (error) {
    res.status(400).send(error)
  }
})

//update event
router.patch('/event/:id', async (req, res) => {
  try {
    const eventID = req.params.id;
    const body = req.body;
    const updateEvent = await Events.findByIdAndUpdate(eventID,body,{new:true});
    if(!updateEvent)
    {
      return res.status(404).send;
    }
    return res.status(200).send(updateEvent);
   
  } catch (error) {
    res.status(400).send(error);
  }
});

//delete event 
router.delete('/event/:id', async (req, res) => {
  try {
    const eventID = req.params.id;
    const deleteEvent = await Events.findByIdAndDelete(eventID);
    if(!deleteEvent)
    {
     return res.status(404).send();
    }
    
    res.status(201).send(
      {
        "status" : true,
        "message" : "event deleted"
      }
    );
  } catch (error) {
    res.status(400).send(error);
  }

});

//display events of an org
router.get('/events/:orgID', async (req, res) => {
  try{
    const orgID  = req.params.orgID;
    const orgEvent = await Events.find({ orgID: orgID });
    if (!orgEvent) {
    return res.status(404).send({ error: 'Organization not found' });
    }
    res.send(orgEvent);
    } catch (error) {
  res.status(500).send({ error: 'Internal Server Error' });
  }
})

module.exports = router


//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(req.body.password, salt);
//   const record = await User.findOne({ email: req.body.email });
