const express = require("express");
const app = express();
// const dotenv = require("dotenv");
// dotenv.config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require("cors");
const port = process.env.PORT || 5000 ;



app.use(cors());
app.use(express.json());


// VAGmLhxWvJxEin5Z

// eduman-server
// ${process.env.Database_key}
// ${process.env.Database_user}



const uri = `mongodb+srv://eduman-server:VAGmLhxWvJxEin5Z@cluster0.hmmbger.mongodb.net/?retryWrites=true&w=majority`;

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

    const appliedInstructorCollection = client.db("eduman-server").collection('appliedInstructor')
    const appliedCoursesCollection = client.db("eduman-server").collection('appliedCourses')
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    app.post('/appliedInstructor', async(req, res)=>{
        const body = req.body;
        const result = await appliedInstructorCollection.insertOne(body)
        res.send(result)
      })
    app.post('/appliedCourses', async(req, res)=>{
        const body = req.body;
        const result = await appliedCoursesCollection.insertOne(body)
        res.send(result)
      })
    app.get('/requestCourses', async(req, res)=>{
        const result = await appliedCoursesCollection.find().toArray();
        res.send(result)
      })  
    app.get('/requestInstructor', async(req, res)=>{
        const result = await appliedInstructorCollection.find().toArray();
        res.send(result)
      })  
      

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