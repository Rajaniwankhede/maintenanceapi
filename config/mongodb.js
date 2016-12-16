var MongoClient = require("mongodb").MongoClient;
var _ = require("lodash");

var assert = require("assert");

var url = 'mongodb://localhost:27017/test_user';

module.exports = function(callback) {
    console.log("here");
    MongoClient.connect(url, function(err, db) {
        if (err) return callback(err, db);
        else {
            db.collection('users').createIndex({
                email: 1
            }, { unique: true }, function(err, result) {
                if (err) return callback(err, result);
                else {
                    callback(err, db);
                }
            })
        };
    })
}