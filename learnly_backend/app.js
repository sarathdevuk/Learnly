import express from 'express';
import db from './config/dbConnect.js'

const app = express();




db();

const PORT = process.env.PORT || 5000


app.get("/" , (req,res) =>{
  res.send("hey")
} )

app.listen(PORT ,()=>{
  console.log(`Server Running on Port${PORT}`);
})

