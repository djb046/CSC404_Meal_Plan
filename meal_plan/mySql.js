var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '18.216.36.10',
  port     : '3306',
  user     : 'root',
  password : 'team2mealplan'
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});

