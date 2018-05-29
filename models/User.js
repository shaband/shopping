const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bycrpt = require("bcrypt");

const user = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: Number }
  },
  { toJSON: { virtuals: true } }
);
// user.virtual('members', {
//     ref: 'Person', // The model to use
//     localField: 'name', // Find people where `localField`
//     foreignField: 'band', // is equal to `foreignField`
//     // If `justOne` is true, 'members' will be a single doc as opposed to
//     // an array. `justOne` is false by default.
//     justOne: false
// });
user.virtual("orders", {
  ref: "Order",
  localField: "_id",
  foreignField: "user",
  justOne: false
});

user.methods.Hash = password => {
  return bycrpt.hashSync(password, bycrpt.genSaltSync(10));
};
user.methods.checkPassword = password => {
  return bycrpt.compareSync(password, this.password);
};
module.exports = mongoose.model("User", user);
