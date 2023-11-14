const mongoose = require('mongoose');
const todoschema = new mongoose.Schema(
    {
        description: 
        {
            type:String,
            required:true
        },
        category: 
        {
            type:String,
            required:true
        },
        duedate: 
        {
            type:String,
            required:false
        }
    }

);
const tododata = mongoose.model('tododata',todoschema);
module.exports = tododata;