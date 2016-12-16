module.exports = function (db, app) {
    var authentication = require('../helper/token_auth.js')(db, 'client');

    var client = require('../controller/client/client.js')(db);
    app.get('/client/:id', client.getclient);
    app.post('/client', client.addclient);
    app.post('/client/login', client.clientLogin);
    app.put('/client/:id', client.clientupdate);
    app.post('/client/:id/activate', client.clientActivate);
    app.post('/client/:id/inactive', client.inactiveAccount);

    var issue = require('../controller/client/issue.js')(db);
    app.post('/issue/:id', issue.addissue);
    app.get('/issue/:id', issue.getissue);
    app.put('/issue/:id', issue.updateissue);
};