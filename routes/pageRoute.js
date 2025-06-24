const express = require('express');
const Router = require('router')
const router = express.Router();
const postController = require('../controller/postController');


router.get('/', (req, res) => {
  res.render('index');
})
router.get('/portfolio',postController.getAllPosts);

router.post('/portfolio',postController.createPost);
router.put('/portfolio/:id',postController.updatePost);
router.delete('/portfolio/:id',postController.deletePost);

router.get('/contact', (req, res) => {
  res.render('contact');
})


 router.route('/contact/sendMessage').post(postController.sendMessage);

router.get('/about', (req, res) => {
  res.render('about');
})

  module.exports = router;