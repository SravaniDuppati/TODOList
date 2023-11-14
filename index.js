const express = require('express');
const PORT = 8083;
const path = require('path');
const mongoose = require('./config/mongoose');
const tododata = require('./models/schema');
const app = express();
app.use(express.static('assests'));
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.get('/',function(req,res){
    const list1 = tododata.find({}).exec();
    list1.then(data =>{
        res.render('todo',{'data':data});
    })
    .catch(err => console.log("Error in fetching data"));
});
app.get('/delete_data', function(req, res){
    var id = req.query;         // get the id from query
    var c = Object.keys(id).length;
    var array = [];
    for(let i=0; i < c ; i++){
        // finding and deleting tasks from the DB one by one using id
        array.push(tododata.findByIdAndDelete(Object.keys(id)[i]));
    }

    Promise.all(array).then(function(){
        return res.redirect('back');
    }).catch(function(err){
        console.log('error in deleting task', err);
        return res.redirect('back');
    });
});
app.post('/add_data', function(req,res){
    const task = new Promise((resolve,reject) =>{
        tododata.create({
            description:req.body.description,
            category:req.body.category,
            duedate:req.body.duedate ? req.body.duedate : '  No Deadline'
        }).then(newdata =>{
            console.log("*******   newdata   ******");
            resolve(newdata);
        }).catch( err => {
            console.log("error in creating data");
            reject(err);
        });
    });
        task.then(data =>{
            res.redirect('back');
        })
        .catch((err) =>{
            console.log("Error in creation");
        });
});
app.listen(PORT,function(err){
    if(err){
        console.log("Server is not Running");
        return;
    }
    console.log("Server is Running on the port : ",PORT);
});