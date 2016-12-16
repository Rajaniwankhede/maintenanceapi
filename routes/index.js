module.exports = function (db, app) {
  var authentication = require('../helper/token_auth.js')(db, 'users');

  var user = require('../controller/user.js')(db);
  app.get('/user/:id', user.getUser);
  app.post('/user', user.addUser);
  app.post('/user/login', user.userLogin);
  app.put('/user/:id', user.userupdate);
  app.post('/user/:id/logout', user.userlogout);
  app.post('/user/:id/forgotpassword/email', user.forgotpassword);
  app.post('/user/:id/Changepassword', user.ChangePassword);

  var machine = require('../controller/machine.js')(db);
  app.get('/machines', machine.getallmachine);
  app.post('/machine', machine.addmachine);
  app.get('/machine/:id', machine.getmachine);
  app.put('/machine/:id', machine.updatemachine);
  app.delete('/machine/:id', machine.deletemachine);

  var shopclient = require('../controller/shopclient.js')(db);
  app.post('/admin/shopclient/:email/:password', shopclient.addshopclient);
  app.get('/admin/shopclient/:email/:password', shopclient.getallshopclient);
  app.put('/admin/shopclient/:id/:email/:password', shopclient.updateshopclient);
  app.delete('/admin/shopclient/:id', shopclient.deleteshopclient);

};
