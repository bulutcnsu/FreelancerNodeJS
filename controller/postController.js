const fileUpload = require('express-fileupload');
const fs = require("fs");
const path = require('path');
const Post = require('../model/postModel');
const nodemailer = require("nodemailer");


exports.createPost = async (req, res) => { 
    let imageFile;
    let uploadPath;

   imageFile = req.files.image;
   uploadPath = path.join(__dirname +'/../'+'public/uploads/'  + imageFile.name) ;
   console.log("gelen dosya yolu", uploadPath);

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');}
  
   imageFile.mv(uploadPath, async function(err) {
    if (err){console.log(" The error was :",err) }
     // return res.status(500).send(err);

    const post = await new Post({
    title :req.body.title,
    description :req.body.description,
    image: '/uploads/'+imageFile.name
    })
   await post.save()
   .then(post => console.log("post created"), post)
   
})
   res.redirect('/portfolio');

}

exports.updatePost =  async (req, res) => {  

   const postId =  req.params.id;
   const post = await Post.findById(postId);
   console.log("bana gelen postId", post);
    
  post.overwrite({
    title: req.body.title,
    description :req.body.description,
    image: post.image
  })
  await post.save();
  res.redirect('/portfolio');

}
 exports.deletePost = async(req,res) => {
   const postId =  req.params.id;
   const post = await Post.findByIdAndDelete(postId);
   const deletedImage = __dirname +'/../'+'public/' + post.image;
   fs.unlinkSync(deletedImage);

   
   console.log("post deleted", post);
   res.redirect('/portfolio');

 }


exports.getAllPosts =  async (req, res) => { 
     const posts = await Post.find({});
   res.render('portfolio', {
      posts
   })
}

exports.sendMessage = async(req,res)=> {
  
  const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
        user: "",
        pass: "",
  },
  });
 
  try {
  await  transport.sendMail({
  sender: req.body.email,
  to : "cannsubulut@gmail.com",
  replyTo: req.body.email,
  subject: "Node Mailer Message",
  text: req.body.message+
   " "+ req.body.name + " " + req.body.phone

 })

  res.status(200).send("Mail sent successfully")
}
 catch (error) {
    console.error("Something went wrong:", error);
    res.status(400).send("Something went wrong.");
  }

}

 
