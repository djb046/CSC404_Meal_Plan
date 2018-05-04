var https = require('https');

var plan = function() {
   var data = {data: 'yayaya'};
    var opts = {
         host: 'mealplan.cf',
         path: '/alexa/mealPlan',
         port: 443,
         method: 'POST',
         headers: {
             "Content-Type": "application/json"
         }
     };

 var req = https.request(opts, res => {
     res.setEncoding('utf8');
     var returnData = "";
     res.on('data', chunk => {
         returnData += chunk;
     });
     res.on('end', () => {
         var string= JSON.stringify(returnData);
         
     });
 });
 var stringData = JSON.stringify(data);
 req.write(stringData);
 req.end();
 
};
plan();