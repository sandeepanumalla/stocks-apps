const express = require('express');
const app = new express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const { saveStocks } = require('./routes/saveStocks');
const cors = require("cors");
const stocks = require('./models/stocks');
require('dotenv').config();
const path = require('path');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(process.env.mongo)
.then(() =>console.log(`mongodb is connected successfully`))
.catch((err)=> console.log(err));


app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(cors());

/* app.use(`/api/users`,saveStocks);
 */


app.post(`/saveStocks`,(req,res)=>{
    const stock = new stocks(req.body)
    stock.save((err,success)=>{
        if(success){
            return res.status(200).json('stocks data saved successfully')
        }
        if(err){
            return res.json('error in saving stocks data');
        }
    })
    console.log(req.body);
})

app.post(`/delete/:id`,(req,res)=>{
    console.log("params",req.params.id);
    stocks.findByIdAndDelete(req.params.id).exec((err,success)=>{
        if(success){
            return res.json("deleted")
        }
        else if(err){
            return res.json('error while deleting')
        }
    })
})

app.get('/getStocks',(req,res)=>{
    stocks.find().exec((err,success)=>{
        if(!err){
           res.json(success);
        }
    })
})

if(process.env.NODE_ENV === 'production'){
    console.log("running production true");
      app.use(express.static(path.join(__dirname, '/client/build')));
      
      app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'client','build','index.html'));
      })
    
    }else{
      app.get("/", (req,res)=>{
        res.send("Api running");
      })
    }
    
    const port = process.env.PORT || 8000
        app.listen(port,()=>{
        console.log(`server is running on ${port}`);
})