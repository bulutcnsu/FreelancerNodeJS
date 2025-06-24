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

 /*postModel.create({title:"Bakery", description:" Como saphire to do", image:"/4564765839342re.jpeg"})
 .then(()=> console.log("creataing was successfull"))
 .catch((err)=> console.log(" cannot create object", err));*/


module.exports = postModel;