const mongoose = require('mongoose')
const Organization = require('../models/organization');




const membershipFormSchema = new mongoose.Schema ({

    orgID:{
        type: mongoose.Schema.ObjectId, 
        ref: "Organization"
    },

    personalInfo:{
        type: Boolean,
    },

    fullName:{
        type: Boolean,
    },

    sex:{
        type: Boolean,

    },
    
    birthDate:{
        type: Boolean,
    },

    civilStatus:{
        type: Boolean,
    },
    religion:{
        type: Boolean,
    },

    address:{
        type: Boolean,
    },
    
    zip:{
        type: Boolean,
    },

    email:{
        type: Boolean,
    },

    contactNum:{
        type: Boolean,
    },

    address:{
        type: Boolean,
    },
    
    zip:{
        type: Boolean,
    },

    tertiary:{
        university:{
            type:Boolean
        },
        degree:{
            type:Boolean
        },
        year:{
            type:Boolean
        }

        },
          
    Doctoral:{
        university:{
            type:Boolean
        },
        degree:{
            type:Boolean
        },
        year:{
            type:Boolean
        }
    },

    Doctoral:{
        university:{
            type:Boolean
        },
        degree:{
            type:Boolean
        },
        year:{
            type:Boolean
        }
    },

    employmentDetails:{
        type:Boolean
    },

    employer:{
        type:Boolean
    },

    jobTitle:{
        type:Boolean
    },
    employerAdd:{
        type:Boolean
    },

    firstMembership:{
        type:Boolean
    },
    secondMembership:{
        type:Boolean
    },
    thirdMembership:{
        type:Boolean
    },
    paymentDetails:{
        type:Boolean
    },








});

module.exports = mongoose.model("MemForm", membershipFormSchema)