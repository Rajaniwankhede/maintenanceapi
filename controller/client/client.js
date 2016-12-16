var jwt = require("jsonwebtoken");
var bcrypt = require('bcryptjs');
var password = require("../../helper/password.js");
var ObjectId = require('mongodb').ObjectID;
var sendMail = require('../../helper/sendMail.js');
var send_sms = require('../../helper/send_sms.js');
var clientValidator = require('../../validator/client/client.js');

module.exports = function (db) {
  return {
    addclient: function (req, res) {
      req.checkBody(clientValidator);
      if (!req.validateAndRespond()) return;
      var userData = req.body.client;

      password.hashPassword(userData.password, function (_password) {
        console.log(_password);
        var _token = userData.email + userData.password;
        userData.token = jwt.sign(_token, (new Date()).toString());
        userData.password = _password;
        ///OTP///
        var speakeasy = require('speakeasy');
        var secret = speakeasy.generateSecret({ length: 20 });

        var otp = speakeasy.totp({
          secret: secret.base32,
          encoding: 'base32'
        });
        userData.otp = otp;
        ///
        db.collection('client').insert(userData, function (err, result) {
          console.log(err);
          if (err) {
            return res.send({
              err: true,
              error: err
            });
          }
          else {
            sendMail.Send_Email(userData.email, 'user Registration successfully', 'email_body_forgot', userData).then(function (data) {
              res.send({
                err: false,
                result: data
              });
            });
            console.log("email send");
          }
        });
      });
    },
    //end of addclient
    getclient: function (req, res) {
      req.checkParams('id', 'id must exist').notEmpty();
      if (!req.validateAndRespond()) return;
      var id = req.params.id;
      db.collection('client').findOne({ _id: new ObjectId(id) }, { password: 0, _id: 0 }, function (err, result) {
        if (result === null) {
          return res.send({
            err: true,
            error: "user not found with given id"
          });
        } else {
          res.send({
            err: false,
            result: {
              user: result
            }
          });
        }
      });
    },
    //end of getclient
    clientLogin: function (req, res) {
      req.checkBody({
        'user.password': {
          notEmpty: true
        },
        'user.email': {
          notEmpty: true
        }
      });
      if (!req.validateAndRespond()) return;
      var email = req.body.user.email;
      db.collection('client').findOne({ email: email }, function (err, user) {
        if (user === null) {
          return res.send({
            err: true,
            error: ["email doesn't exist"]
          });
        }
        else {
          bcrypt.compare(req.body.user.password, user.password, function (err, result) {
            console.log("Bcrypt returns: " + result);
            if (err) {
              res.status(501).json({
                err: false,
                error: ["Server error"]
              });
            } else {
              if (result) {
                console.log(result);
                res.json({
                  err: false,
                  result: { token: user.token }
                });
              } else {
                res.status(401).json({
                  err: true,
                  error: ["Invalid email/password combination"]
                });
              }
            }
          });
        }
      });
    },
    //end of clientLogin
    clientupdate: function (req, res) {
      req.checkParams('id', 'id must exist').notEmpty();
      if (!req.validateAndRespond()) return;
      var id = req.params.id;

      db.collection('client').findOne({ _id: new ObjectId(id) }, { password: 0 }, function (err, result) {
        if (result == null) {
          return res.send({
            err: true,
            error: "No client found with given id"
          });
        } else {
          var clientData = req.body.client;
          var datenow = new Date();
          clientData.updatedOn = datenow;
          console.log(clientData);
          // db.collection('client').insert({ _id: id }, { $set: { "password": _password } }, function (err, result) {
          db.collection('client').update({ _id: new ObjectId(id) }, { $set: clientData }, function (err, result) {
            if (err) {
              return res.send({
                err: true,
                error: err
              });
            } else {
              return res.send({
                err: false,
                result: result
              });
            }
          });
        }
      });
    },
    //end of clientupdate
    clientActivate: function (req, res) {
      if (!req.validateAndRespond()) return;
      var id = req.params.id;
      var otp = req.body.otp;
      db.collection('client').findOne({ _id: new ObjectId(id), otp: otp }, function (err, result) {
        if (result == null) {
          return res.send({
            err: true,
            error: "Invalid OTP Presented.Please try again"
          });
        } else {

          db.collection('client').update({ _id: new ObjectId(id) }, { $set: { "status": "active" } }, function (err, result) {
            if (err) {
              return res.send({
                err: true,
                error: err
              });
            } else {
              return res.send({
                err: false,
                result: result
              });
            }
          });
        }
      });
    },
    inactiveAccount: function (req, res) {
            req.checkParams('id', 'id must exist').notEmpty();
            if (!req.validateAndRespond()) return;
            var id = req.params.id;

            db.collection('client').findOne({ _id: new ObjectId(id) }, { password: 0 }, function (err, result) {
                if (result == null) {
                    return res.send({
                        err: true,
                        error: "No client found with the provided Id"
                    });
                } else {
                    db.collection('client').update({ _id: new ObjectId(id) }, { $set: { "status": "inactive" } }, function (err, result) {
                        if (err) {
                            return res.send({
                                err: true,
                                error: err
                            });
                        } else {
                            return res.send({
                                err: false,
                                result: result
                            });
                        }
                    });
                }
            });

        }
  };
};
