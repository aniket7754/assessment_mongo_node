const mongoose = require('mongoose')

var agentschema = new mongoose.Schema({

    agent:{
        type:String
    }, 
})

var agent = mongoose.model('agent' , agentschema)

var userschema = new mongoose.Schema({

    user:{
        type:String
    }, 
    email:{
        type:String
    },
    adress:{
        type:String
    },
    gender:{
        type:String
    }

})

var User= mongoose.model('User' , userschema)


var accountschema = new mongoose.Schema({

    User_account:{
        type:String
    }, 
    account_name:{
        type:String
    },
    account_type:{
        type:String
    }

})

var account = mongoose.model('User_account' , accountschema)


var LOBschema = new mongoose.Schema({

    LOB:{
        type:String
    }, 
    city:{
        type:String
    },
    phone:{
        type:String
    }

})

var lob = mongoose.model('LOB' , LOBschema)


var carrierschema = new mongoose.Schema({

    carrier:{
        type:String
    }, 

})

var carrier = mongoose.model('Carrier' , carrierschema)


var policyschema = new mongoose.Schema({

    Policy:{
        type:String
    }, 
    policy_mode:{
        type:Number
    },
    policy_number:{
        type:String
    },
   


})

var policy= mongoose.model('Policy' , policyschema)

module.exports ={
    agent,
    User,
    account,
    lob,
    carrier,
    policy
}