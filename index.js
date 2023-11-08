const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000 ;


app.use(cors());
app.use(express.json());


app.get("/", async(req,res)=>{
     
          res.send("Eduman server is ready to gooo")
})

app.listen(port, ()=>{
          console.log(`Eduman is running on ${port}`);
})

//nnnnnnnnnnnnnnn