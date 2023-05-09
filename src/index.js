const express = require('express')
const app = express()
const port = 3000
const { MongoClient, ServerApiVersion } = require("mongodb");

 
const uri = "mongodb://mongoadmin:secret@localhost:27017";
const client = new MongoClient(uri,  {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})

app.get('/', (req, res) => {
    const database = client.db("users");
    const users = database.collection("users");

    res.send(users.find().toArray())
})

async function run() {
     
    await client.connect();

    
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
}
run().catch(console.dir);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
