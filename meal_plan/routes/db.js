var express = require('express');
var router = express.Router();
var mysql = require('mysql');


// router.post('/db', function(req, res, next) {
//     console.log("TEST");
// var newUserq = "INSERT INTO amazonAuth(id, name) VALUES ('test', 'test') ON DUPLICATE KEY UPDATE amazonAuth.name = amazonAuth.name";
// // connection.query('INSERT INTO amazonAuth WHERE NOT EXISTS (SELECT * FROM amazonAuth WHERE id = "test" LIMIT 1) VALUES (?)', "test", "test", function(err, result)
// connection.query(newUserq, function(err, result)
// {
// if(err) throw err
//   console.log("inserted user")
// });

//   });
  


var pool = mysql.createPool(
{
    host: 'ec2-18-216-36-10.us-east-2.compute.amazonaws.com',
    user: 'root',
    password: 'team2mealplan',
    database: 'mealplan'
}
);


// var connection = mysql.createConnection({
//     host: 'ec2-18-216-36-10.us-east-2.compute.amazonaws.com',
//     user: 'root',
//     password: 'team2mealplan',
//     database: 'mealplan' 
//     });
    
//     connection.connect();
    
//     connection.query('SELECT * FROM userData', function (err, rows, fields)
//     {
//     if (err) throw err
    
//     console.log('Test works')
//     });

//     app.get('/', function(req, res)
// {
//     connection.query('SELECT * FROM userData', function (err, rows, fields)
//     {
//     connection.end();
//         if (err) throw err
    
//     console.log('Test works')
//     });
// });

// app.get('/', function(req, res, next) {
//     connection.connect();
//     console.log("TEST");
// var newUserq = "INSERT INTO amazonAuth(id, name) VALUES ('test', 'test') ON DUPLICATE KEY UPDATE amazonAuth.name = amazonAuth.name";
// // connection.query('INSERT INTO amazonAuth WHERE NOT EXISTS (SELECT * FROM amazonAuth WHERE id = "test" LIMIT 1) VALUES (?)', "test", "test", function(err, result)
// connection.query(newUserq, function(err, result)
// {
// if(err) throw err
//   console.log("inserted user")
// });

//   });

exports.getConnection = function(callback) {
    pool.getConnection(function(err, conn) {
      if(err) {
        return callback(err);
      }
      callback(err, conn);
    });
  };
