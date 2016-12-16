

var express = require("express");
var app = express();


require("./config/express.js")(app);
require("./config/mongodb.js")(function(err, db){ 
//require("./config/tingodb.js")(function(err, db){
  if(err) throw err;
   require("./routes/admin.js")(db,app);
   require("./routes/client.js")(db,app);
   require("./routes/index.js")(db, app);
  app.listen(3100);
  console.log("Application listening on port 3100");
});

module.exports = app;
