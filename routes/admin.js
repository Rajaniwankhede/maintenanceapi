module.exports = function (db, app) {
    var authentication = require('../helper/token_auth.js')(db, 'admin');

    var admin = require('../controller/admin/admin.js')(db);
    app.post('/admin', admin.addadmin);
    app.get('/admin/:id', admin.getadmin);
    app.put('/admin/:id', admin.updateadmin);
    app.delete('/admin/:id', admin.deleteadmin);
    app.post('/admin/login', admin.adminLogin);
    app.post('/admin/:id/forgotpassword/email', admin.forgotpassword);
    app.post('/admin/:id/Changepassword', admin.ChangePassword);
    app.post('/admin/:id/activate', admin.adminActivate);
    app.post('/admin/:id/inactive', admin.inactiveAccount);
    app.post('/admin/:id/logout', admin.adminlogout);

    var shop = require('../controller/admin/shop.js')(db);
    app.post('/shop/:id', shop.addshop);
    app.get('/shop/:id', shop.getshop);
    app.put('/shop/:id', shop.updateshop);
    app.delete('/shop/:id', shop.deleteshop);

};