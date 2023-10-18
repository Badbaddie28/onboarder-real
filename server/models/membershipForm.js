const mongoose = require('mongoose')

const membershipFormSchema = new mongoose.Schema ({
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

    currentEmployer:{
        type:Boolean
    },

    jobTitle:{
        type:Boolean
    },
    employerAddress:{
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