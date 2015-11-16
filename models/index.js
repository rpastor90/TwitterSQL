var Sequelize = require('sequelize');
// create an instance of a database connection
// which abstractly represents our app's mysql database
var twitterjsDB = new Sequelize('twitterjs', 'root', null, {
    dialect: "mysql",
    port:    3306,
});

var Tweet = require('./tweet')(twitterjsDB);
var User = require('./user')(twitterjsDB);
// var User = twitterjsDB.define('User',{name: twitterjsDB.STRING});

// adds a UserId foreign key to the `Tweet` table
User.hasMany(Tweet);
Tweet.belongsTo(User);

// open the connection to our database
twitterjsDB
  .authenticate()
  .catch(function(err) {
    console.log('Unable to connect to the database:', err);
  })
  .then(function() {
    console.log('Connection has been established successfully.');
  });


module.exports = {
    User: User,
    Tweet: Tweet
};

// User.findOne().then(function (user) {
//     return user.getTweets();
// })
// .then(function (tweets) {
//   console.log(tweets);
//     JSON.stringify(tweets); // another way of just logging the plain old values
// });

// User.findOne().then(function (user) {
//     console.log(user.dataValues);
// });