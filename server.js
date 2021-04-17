const express=require("express");
const bodyparser=require("body-parser");
const mongoose=require("mongoose");

const app=express();

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(express.static("public"));

app.listen(3000,function(req,res){
    console.log("server listening");
});

mongoose.connect("mongodb://localhost:27017/behaviouralDB",{ useUnifiedTopology: true, useNewUrlParser: true });

const userSchema={
    Username: {
        type: String,
        required: true,
        unique: true
    },
    Name: {
        type: String,
        required: true,
    },
    Age: {
        type: Number,
        required: true,
    },
    ColorGameScore: Number,
    MemoryMatrixScroe: Number,
    SimonGameScore: Number,
    CardAndSeekScore: Number
};

const user = mongoose.model("Users",userSchema);
var uname=null;

app.get("/",function(req,res){
    res.sendFile(__dirname + '/login.html');
});

app.post("/index",function(req,res){
    uname = req.body.Uname;
    const name = req.body.Name;
    const age = req.body.Age;
    if(isNaN(age)){
        res.redirect("/");
    }
    console.log("called");
    user.find({Username: uname},function(err,founditem){
        console.log(founditem,err);
        if(founditem.length>0){ 
            res.redirect("/");   
        }
        else{
            const newuser = new user({
                Username: uname,
                Name: name,
                Age: age
            });
            newuser.save();
            res.sendFile(__dirname+'/index.html');
        }
    })
});

app.post("/generate",function(req,res){
    const received = req.body;
    user.findOneAndUpdate({Username: uname},{ColorGameScore: parseInt(received.score1), MemoryMatrixScroe: parseInt(received.score2), SimonGameScore: parseInt(received.score3), CardAndSeekScore: parseInt(received.score3)}, function(err){
        console.log(err);
    });

});

app.post("/report",function(req,res){
       res.sendFile(__dirname+"/report.html");
})

app.post("/:selectedGame",function(req,res){
    const Selected = req.params.selectedGame;
    console.log(Selected);
    res.sendFile(__dirname+'/'+Selected+'.html');
});

