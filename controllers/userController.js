var user = require('../models/user')
var User = user.User
var agent = user.agent
var account = user.account
var lob = user.lob
var policy =user.policy
var carrier =user.carrier
var csv = require('csvtojson')
const response  = require('../routes/userRoute')

const importfile = async (req , res) => {
    try {
         var userdata = []
         var agentdata = []
         var accountdata = []
         var lobdata = []
         var policydata = []
         var carrierdata = []

        csv()
        .fromFile(req.file.path)
        .then(async (response) => {
            // console.log(response)
            for(var x =0 ; x< response.length ; x++){
                userdata.push({
                    user:response[x].userType,
                    email:response[x].email,
                    adress:response[x].address,
                    gender:response[x].gender,
                    
                })
                agentdata.push({
                    agent:response[x].agent,
                    
                    
                })
                accountdata.push({
                    User_account:response[x].userType,
                    account_name:response[x].account_name,
                    account_type:response[x].account_type,
                    
                })
                lobdata.push({
                    LOB:response[x].dob,
                    city:response[x].city,
                    phone:response[x].phone,
                    
                })
                policydata.push({
                    Policy:response[x].policy_type,
                    policy_mode:response[x].policy_mode,
                    policy_number:response[x].policy_number,
                    
                })
                carrierdata.push({
                    carrier:response[x].producer,
                   
                    
                })
            }
            // console.log(userdata)
            User.insertMany(userdata)
            agent.insertMany(agentdata)
            policy.insertMany(policydata)
            account.insertMany(accountdata)
            lob.insertMany(lobdata)
            carrier.insertMany(carrierdata)   
         })
        
       
        res.send({status : 200 , success : true , msg:"running"})

    } catch(error) {
        res.send({status : 400 , success : false , msg:"error"})
    }
}

module.exports = {
    importfile
}
