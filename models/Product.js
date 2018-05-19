const mongoose= require('mongoose');
const Schema =mongoose.Schema;

const schema =new Schema({
    image:{type:String, required:true},
    title:{type:String, required:true},
    desctiption:{type:String, required:true},
    price:{type:Number, required:true},
    //created_at:{type:Date,default: new Date('Y-m-d H:i:s')}
});
module.exports=mongoose.model('Product',schema);