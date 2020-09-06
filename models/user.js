const mongoose=require('mongoose');
//setting up the uploading of file
const multer=require('multer');
const path=require('path');
const AVATAR_PATH=path.join('./uploads/users/avatars');

const userSchema= new mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required: true
        
    },
    name:{
        type: String,
        required:true
    },
    avatar:{
        type: String
    },


    about:{
        type: String


    },
    experience:{
        type:String
    },
    education:{
        type:String
    },
    licenses:{
        type:String
    },
    certifications:{
        type:String
    },
    skills:{
        type:String
    }
},
    
{
    timestamps:true
});
// set up for uploading files
let storage = multer.diskStorage({
    destination: function (req, file, cb ){
        //call back 
      cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) { //filename=avatar
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

  // static methods

  userSchema.statics.uploadedAvatar= multer({storage: storage}).single('avatar');
  userSchema.statics.avatarPath=AVATAR_PATH

 
const User=mongoose.model('User',userSchema);

module.exports=User;