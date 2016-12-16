var jwt = require("jsonwebtoken");
var bcrypt = require('bcryptjs');
var password = require("../../helper/password.js");
var ObjectId = require('mongodb').ObjectID;
var sendMail = require('../../helper/sendMail.js');
var send_sms = require('../../helper/send_sms.js');
var issueValidator = require('../../validator/client/issue.js');
var guid = require("guid");

module.exports = function (db) {
  return {
    addissue: function (req, res) {
      req.checkBody(issueValidator);
      if (!req.validateAndRespond()) return;
      var issueData = req.body.issue;
      var id = req.params.id;
      var issue = req.body.issue;
      issue.id = guid.raw();
      issue.UpdatedOn = new Date();
      db.collection('client').update({ _id: new ObjectId(id) }, { $push: { issue: issueData } }, function (err, result) {
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
    },
    //end of addissue
    getissue: function (req, res) {
      var issueData = req.body.issue;
      var id = req.params.id;
      db.collection('client').findOne({ _id: new ObjectId(id) }, { issue: 1, _id: 0 }, function (err, result) {
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
    },
    //end of getissue
    updateissue: function (req, res) {
      req.checkBody(issueValidator);
      req.checkParams('id', 'id must exist').notEmpty();
      if (!req.validateAndRespond()) return;
      var id = req.params.id;
      var issue = req.body.issue;
      issue.UpdatedOn = new Date();

      db.collection('client').update({ _id: new ObjectId(id) }, { $pull: { issue: { id: issue.id } } }, function (err, result) {
        if (err) {
          return res.send({
            err: true,
            error: err
          });
        } else {

          db.collection('client').update({ _id: new ObjectId(id) }, { $push: { issue: issue } }, function (err, result) {
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
  }
};

