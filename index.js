const express = require("express")
const movieInfo = require("./model/movieDB")
const path = require('path');
const app = new express()

app.use(express.static(path.join(__dirname,'build')));



app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type ");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
})
app.get('/',async(req,res)=>{
    try{
        var result = await movieInfo.find()
        res.json(result)

    }
    catch(error){
        res.status(500).send(error)

    }
})

app.post('/api/add',(req,res)=>{
    try{
    let movie=new movieInfo(req.body)
    movie.save()
    res.send("Movie added")
    }
    catch(error){
        res.status(500).send(error)
    }
})

app.post('/api/update',async(req,res)=>{
    try{
    let result= await movieInfo.findByIdAndUpdate(req.body._id, req.body)
    // console.log()
    res.send("Updated")
    }
    catch(error){
        res.status(500).send(error)
    }
})

app.post('/api/delete',async(req,res)=>{
    try{
    await movieInfo.findByIdAndDelete(req.body._id)
    // console.log()
    res.send("Deleted")
    }
    catch(error){
        res.status(500).send(error)
    }
})


app.get('/*',function(req,res){
    res.sendFile(path.join(__dirname,'/build/index.html'))
});


app.listen(3002,()=>{
    console.log("server running")
})
