const mongoose= require('mongoose');
const Schema= mongoose.Schema;

const schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  cart: { type: Object, require: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  payment_id: { type: String, required: true },
});

module.exports=mongoose.model('Order',schema);