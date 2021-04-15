const mongoose = require('mongoose')  //we're importing mongoose

const Schema = mongoose.Schema;        //creating schema variable which is and instance of the schema variable in mongoose 

const userSchema = new Schema({         // userschema is a new shecma with the parameters 
    email : {                        //we specify the attribute name 'username' followed by its proprities
        type : String,                  //like type being String, Date or Number for example 
        required: true,                 //  required : true means it's an obligatory attribute
        unique: true,                   //unique : true meaans it can't be duplicated in our database
        trim:true,                      // trim : true deletes the white space left or right 
        minlength:3                     //minlength: specifies the minimum length accepted
    },
    password : {
        type : String,
        required : true,
        trim: true,
        minlength : 6
    },
    fullName : {
        type: String,
        required : true,
        trim : true,
        minlength : 6
    },
    phoneNumber : {
        type: Number,
        required : true,
    },
    isAdmin : Boolean
},{
    timestamps: true                    //timestamps : true adds unique elements, maybe even the id 
})

const User = mongoose.model('User', userSchema)         //Creates a User which is an object in the data base following the userSchema

module.exports = User                           // this is necessary for some reason