const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config()

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require("cors");
const port = process.env.PORT || 5000 ;



app.use(cors());
app.use(express.json());


// VAGmLhxWvJxEin5Z

// eduman-server
const uri = `mongodb+srv://${process.env.Database_user}:${process.env.Database_key}@cluster0.hmmbger.mongodb.net/?retryWrites=true&w=majority`;
// >>>>>>> 7427ac82bcf411c9bcdfa0830a33ce25e4070a69

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
// <<<<<<< HEAD

    const appliedInstructorCollection = client.db("eduman-server").collection('appliedInstructor')
    const appliedCoursesCollection = client.db("eduman-server").collection('appliedCourses')
    const usersCollection = client.db("eduman-server").collection("users");
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
    app.post("/users", async(req, res)=>{
         
            const user = req.body;
            console.log(user);
            const query = {email: user?.email}
            const alreadyExist = await usersCollection.findOne(query);
            console.log(alreadyExist);

            if(alreadyExist){
               return  res.send("Already Have an account")
            }
            const result = await usersCollection.insertOne(user)
            res.send(result)
    })
    app.get('/users', async(req, res)=>{
      const result = await usersCollection.find().toArray();
      res.send(result)
    })  
    app.put('/instructorReq/:email', async(req, res)=>{
      const email = req.params.email;
      const body = req.body;
      const query = {email: email}
      // const options = { upsert: true };
      const updateDoc = {
        $set: body,
      }
      const result = await usersCollection.updateOne(query, updateDoc)
      res.send(result)
    })
    app.delete('/delete/:id', async(req, res)=>{
      const id = req.params.id;
      console.log(id)
      const query = {email : id}
      const result = await usersCollection.deleteOne(query);
      res.send(result)
    })


    app.get("/login/:email", async(req, res)=>{

          const email = req.params.email;
          const query = {email: email};
          const result = await usersCollection.find(query).toArray()
          res.send(result)
    })


    app.get("/currentUser/:email", async(req, res)=>{

            const email = req.params.email;
            const query = {email: email};
            const result = await usersCollection.findOne(query)
            res.send(result)
    })

// >>>>>>> 7427ac82bcf411c9bcdfa0830a33ce25e4070a69

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