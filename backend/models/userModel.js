import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type: String, required:true},
    email:{type: String, required:true, unique:true},
    password:{type: String, required:true},
    cartData:{type: Object,default:{}},

},{minimize:false})

// minimize: false
// Purpose: This option means that even if cartData is empty ({}), it will still be saved in the database.
// Default Behavior: If it were minimize: true, empty objects wouldn’t be saved at all.

const userModel = mongoose.model.user || mongoose.model('user', userSchema);

export default userModel;