const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fileUpload = require('express-fileupload');
const ObjectId = Schema.ObjectId;



const PostSchema = new Schema({
  title: {type:String,require:true},
  description :{type:String, require:true},
  image: {type:String, required:true}
});

const postModel = mongoose.model('Post', PostSchema);
module.exports = postModel;
