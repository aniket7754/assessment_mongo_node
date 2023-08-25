const mongoose = require('mongoose')
const express = require('express');
const bodyParser = require('body-parser');
const port = 3000
const app = express()
const apps = express()
const bodyparser = require('body-parser')
userRoute = require('./routes/userRoute');
app.use('/',userRoute)



var url = 'mongodb://0.0.0.0/user';
mongoose.connect(url)
const conn = mongoose.connection


conn.once('open' ,() => {
    console.log("succefully connected to dataabse")
})

conn.on('error' ,() => {
    console.log('error')
})

app.use(bodyParser.json());
apps.use(bodyparser.urlencoded({extended : true}))

// api for inserting the data in  users collection

app.post('/api/insert', async (req, res) => {
    try {
        const { user, email , adress , gender } = req.body;
        const collection = conn.collection('users');
        await collection.insertOne({ user, email , adress , gender });
        res.status(201).json({ message: 'Data inserted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


// api for update the data in agent collection 

app.put('/api/update', async (req, res) => {
    try {
        const userId = (req.query.id).trim();
        console.log(userId,'l')
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid agent ID' });
        }

        const { agent } = req.body;

        const collection = conn.collection('agents');

        const result = await collection.updateOne(
            { _id:new mongoose.Types.ObjectId(String(userId)) }, 
            { $set: { agent} }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Agent not found' });
        }

        res.status(200).json({ message: 'Agent updated successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
});
const collection = conn.collection('user_accounts');

// api for deleting the from the user_accounts collection 

app.delete('/api/delete', (req, res) => {
    const itemId = (req.query.id).trim();
    console.log(itemId,"l")

    let objectId;
    try {
      objectId = new mongoose.Types.ObjectId(String(itemId));
    } catch (err) {
        console.log(err)
      return res.status(400).json({ message: 'Invalid user_acccount ID' });
    }

    collection.deleteOne({ _id: objectId }, (err, result) => {
      if (err) {
        console.error('Error deleting user_account:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'user_acoount data not found' });
      }

      res.json({ message: 'user_account document deleted successfully' });
    });
  });




app.listen(port , function(){
    console.log('app is running on port :',port)
})