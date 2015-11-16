var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var seqlz = require('../models/index');
var User = seqlz.User;
var Tweet = seqlz.Tweet;

router.get('/', function (req, res) {
  var tweets = Tweet.findAll({include : [User]})
  .then(function (tweets) {
    var data = tweets.map(function (tweet) {
      // console.log(tweet.User.);
      return tweet.dataValues;
    });
      res.render( 'index', {
      title: 'Twitter.js',
      tweets: data
    });

  });
  // console.log(tweets);
});

function getTweet (req, res){
  var tweets = tweetBank.find(req.params);
  res.render('index', { tweets: tweets });
}

function getTweet (req, res){
  // console.log(req.params);
  var tweets = User.findOne({where: {name: req.params.name}})
  .then(function (user) {
      return user.getTweets();
  })
  .then(function (tweets) {
    res.render('index', {tweets: tweets });
  });
  
}


router.get('/users/:name', getTweet);
router.get('/users/:name/tweets/:id', getTweet);


// note: this is not very REST-ful. We will talk about REST in the future.
router.post('/submit', function(req, res) {
  var name = req.body.name;
  var text = req.body.text;
  tweetBank.add(name, text);
  res.redirect('/');
});

module.exports = router;
