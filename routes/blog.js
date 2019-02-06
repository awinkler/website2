const express         = require('express'),
      router          = express.Router({ mergeParams: true }),
      Comment         = require('../models/comment'),
      Email           = require('../models/email');

// BLOG SHOW ROUTE
router.get('/:id', (req, res) => {

  // get current post with id
  var p = res.locals.posts.find(obj => {
    return obj.id() === req.params.id;
  });

  // show newest posts first
  Comment.find({post: p.id()}).sort([['_id', -1]]).exec(function(err, c) {
    if (err) {
      console.log(err);
    } else {
      res.render('post', {post : p, comments: c});
    }
  })
});


// COMMENT CREATE ROUTE
router.post('/:id/comments', (req,res) => {

  // save comment to database with that blog id
  Comment.create(req.body.comment, function(err, comment) {
    if (err) {
      console.log(err);
    } else {
      // add ID of blog post to comment
      comment.post = req.params.id;
      comment.save(function(err, comment) {
        req.flash("success", "Thanks for commenting.");
        res.redirect('/blog/'+ req.params.id + '#comments');
      })
    }
  })  
});


// EMAIL Subscribe ROUTE
router.post('/subscribe', (req,res) => {

  // save comment to database with that blog id
  Email.create(req.body.email, function(err, comment) {
    if (err) {
      req.flash("error", "Something went wrong in subscription.");
      console.log(err);
    } else {
      req.flash("success", "You successfully subscribed.");
      res.redirect('/#sec-blog');
    }
  })  
});


module.exports = router;