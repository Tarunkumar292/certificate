const mongoose = require("mongoose");

const internSchema = new mongoose.Schema({
    id:{
        type: Number,
        unique: true,
        required: true
    },
    name:{
        type:String,
        required:true
    },
    course_name:{
        type:String,
        required:true
    },
    joining_date:{
        type:Date,
        required:true
    }
})

const Intern = mongoose.model("intern", internSchema);

module.exports = Intern;