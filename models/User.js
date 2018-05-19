const mongoose =require('mongoose');
const Schema =mongoose.Schema;
const bycrpt= require('bcrypt');
const passportLocalMongoose = require('passport-local-mongoose');



const user=new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    phone:{type:Number},
});



user.methods.Hash= (password)=>{
return bycrpt.hashSync(password,bycrpt.genSaltSync(10));
};
user.methods.checkPassword=(password)=>{
    return bycrpt.compareSync(password,this.password);
}
module.exports=mongoose.model('User',user);