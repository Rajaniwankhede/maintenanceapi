var jwt = require("jsonwebtoken");
var bcrypt = require('bcryptjs');
var password = require("../helper/password.js");
var ObjectId = require('mongodb').ObjectID;
var sendMail = require('../helper/sendMail.js');
var shopclientValidator = require('../validator/shopclient.js');
var guid = require("guid");
var generators = require("../helper/generators.js");

module.exports = function (db) {
    return {
        addshopclient: function (req, res) {
            req.checkBody(shopclientValidator);
            if (!req.validateAndRespond()) return;
            var shopclientData = req.body.shopclient;
            var email = req.params.email;
            var password = req.params.password;
            var name = req.body.shopclient.name;
            var url = req.body.shopclient.url;
            console.log(name, url);
            shopclientData.status = "Active";

            try {
                shopclientData.code = generators.UniqueIdGenerator(name, url)
            } catch (e) {
                console.log(e);
                return res.send({
                    err: true,
                    error: "name and url  must be valid"
                });
            }
            db.collection('admin').findOne({ email: email }, function (err, admin) {
                if (admin === null) {
                    return res.send({
                        err: true,
                        error: ["email doesn't exist"]
                    });
                } else {
                    bcrypt.compare(password, admin.password, function (err, result) {
                        console.log("Bcrypt returns: " + result);
                        if (err) {
                            res.status(501).json({
                                err: false,
                                error: ["Server error"]
                            });
                        } else {
                            if (result) {
                                db.collection('shopclient').insertOne(shopclientData, function (err, result) {
                                    console.log(err);
                                    if (err) {
                                        return res.send({
                                            err: true,
                                            error: err
                                        });
                                    } else {

                                        res.send({
                                            err: false,
                                            result: result
                                        });

                                    }
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
        getallshopclient: function (req, res) {
            var email = req.params.email;
            var password = req.params.password;
            db.collection('admin').findOne({ email: email }, function (err, admin) {
                if (admin === null) {
                    return res.send({
                        err: true,
                        error: ["email doesn't exist"]
                    });
                } else {
                    bcrypt.compare(password, admin.password, function (err, result) {
                        console.log("Bcrypt returns: " + result);
                        if (err) {
                            res.status(501).json({
                                err: false,
                                error: ["Server error"]
                            });
                        }
                        db.collection('shopclient').find({}).toArray(function (err, result) {
                            if (result === null) {
                                return res.send({
                                    err: true,
                                    error: "shopclient not found with given id"
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
                    });
                }
            });
        },
        updateshopclient: function (req, res) {
            req.checkParams('id', 'id must exist').notEmpty();
            if (!req.validateAndRespond()) return;
            var id = req.params.id;
            var email = req.params.email;
            var password = req.params.password;
            db.collection('admin').findOne({ email: email }, function (err, admin) {
                if (admin === null) {
                    return res.send({
                        err: true,
                        error: ["email doesn't exist"]
                    });
                } else {
                    bcrypt.compare(password, admin.password, function (err, result) {
                        console.log("Bcrypt returns: " + result);
                        if (err) {
                            res.status(501).json({
                                err: false,
                                error: ["Server error"]
                            });
                        } else {
                            if (result) {
                                db.collection('shopclient').update({ _id: new ObjectId(id) }, { $set: shopclientData }, function (err, result) {
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
            //change
            db.collection('shopclient').findOne({ _id: new ObjectId(id) }, { password: 0 }, function (err, result) {
                if (result == null) {
                    return res.send({
                        err: true,
                        error: "No client found with given id"
                    });
                } else {
                    var shopclientData = req.body.shopclient;
                    var datenow = new Date();
                    shopclientData.updatedOn = datenow;
                    db.collection('shopclient').update({ _id: new ObjectId(id) }, { $set: shopclientData }, function (err, result) {
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
        deleteshopclient: function (req, res) {
            req.checkParams('id', 'id must exist').notEmpty();
            if (!req.validateAndRespond()) return;
            var id = req.params.id;
            db.collection('shopclient').remove({ _id: new ObjectId(id) }, function (err, result) {
                if (err) {
                    return res.send({
                        err: true,
                        error: "id must exist"
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









