var jwt = require("jsonwebtoken");
var bcrypt = require('bcryptjs');
var password = require("../helper/password.js");
var ObjectId = require('mongodb').ObjectID;
var sendMail = require('../helper/sendMail.js');
//var send_sms = require('../helper/send_sms.js');
var machineValidator = require('../validator/machine.js');

module.exports = function (db) {
  return {
    addmachine: function (req, res) {
      req.checkBody(machineValidator);
      if (!req.validateAndRespond()) return;
      var machineData = req.body.machine;

      password.hashPassword(machineData.password, function (_password) {
        console.log(_password);
        var _token = machineData.email + machineData.password;
        machineData.token = jwt.sign(_token, (new Date()).toString());
        machineData.password = _password;
        ///OTP///
        var speakeasy = require('speakeasy');
        var secret = speakeasy.generateSecret({ length: 20 });

        var otp = speakeasy.totp({
          secret: secret.base32,
          encoding: 'base32'
        });
        machineData.otp = otp;
        ///
        db.collection('machine').insert(machineData, function (err, result) {
          console.log(err);
          if (err) {
            return res.send({
              err: true,
              error: err
            });
          }
          else {
            res.send({
              err: false,
              result: result
            });
          }
        });
      });
    },
    //end of addmachine
    getmachine: function (req, res) {
      req.checkParams('id', 'id must exist').notEmpty();
      if (!req.validateAndRespond()) return;
      var id = req.params.id;
      db.collection('machine').findOne({ _id: new ObjectId(id) }, { password: 0, _id: 0 }, function (err, result) {
        if (result === null) {
          return res.send({
            err: true,
            error: "machine not found with given id"
          });
        } else {
          res.send({
            err: false,
            result: {
              machine: result
            }
          });
        }
      });
    },

  getallmachine:function(req,res)
    {
     
      db.collection('machine').find();
    
    },
    updatemachine: function (req, res) {
      req.checkParams('id', 'id must exist').notEmpty();
      if (!req.validateAndRespond()) return;
      var id = req.params.id;

      db.collection('machine').findOne({ _id: new ObjectId(id) }, { password: 0 }, function (err, result) {
        if (result == null) {
          return res.send({
            err: true,
            error: "No client found with given id"
          });
        } else {
          var machineData = req.body.machine;
          var datenow = new Date();
          machineData.updatedOn = datenow;
          db.collection('machine').update({ _id: new ObjectId(id) }, { $set: machineData }, function (err, result) {
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
    deletemachine: function (req, res) {
      req.checkParams('id', 'id must exist').notEmpty();
      if (!req.validateAndRespond()) return;
      var id = req.params.id;

      var machine = req.body.machine;
      db.collection('machine').remove({ _id: new ObjectId(id) }, function (err, result) {
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
  };
};
