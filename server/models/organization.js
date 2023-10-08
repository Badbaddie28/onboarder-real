const mongoose = require('mongoose')

const organizationSchema = new mongoose.Schema ({

    orgName:{
        type: String,
        required: true,
    
    },
    orgType:{
        type: String,
        required: true
    },
    orgEmail:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true
    },

    about:{
        type: String,
        required: true
    },
    orgHistory:{
        type: String,
        required: true
    },
    mission:{
        type: String,
    
    },
    vision:{
        type: String,
    },
    coreValues:{
        type: String,
    },
    userType:{
        type: String,
        default : "organization",
    }
   

})

module.exports = mongoose.model("Organization", organizationSchema)