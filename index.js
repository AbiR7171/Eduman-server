const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require("cors");
const port = process.env.PORT || 5000 ;



app.use(cors());
app.use(express.json());


// VAGmLhxWvJxEin5Z

// eduman-server





const uri = `mongodb+srv://${process.env.Database_user}:${process.env.Database_key}@cluster0.hmmbger.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get("/", async(req,res)=>{
     
          res.send("Eduman server is ready to gooo")
})

app.listen(port, ()=>{
          console.log(`Eduman is running on ${port}`);
})