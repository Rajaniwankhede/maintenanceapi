var jwt = require("jsonwebtoken");
var bcrypt = require('bcryptjs');
var password = require("../../helper/password.js");
var ObjectId = require('mongodb').ObjectID;
var sendMail = require('../../helper/sendMail.js');
var adminValidator = require('../../validator/admin/admin.js');

module.exports = function (db) {
    return {
        addadmin: function (req, res) {
            req.checkBody(adminValidator);
            if (!req.validateAndRespond()) return;
            var adminData = req.body.admin;

            password.hashPassword(adminData.password, function (_password) {
                console.log(_password);
                var _token = adminData.email + adminData.password;
                adminData.token = jwt.sign(_token, (new Date()).toString());
                adminData.password = _password;
                ///OTP///
                var speakeasy = require('speakeasy');
                var secret = speakeasy.generateSecret({ length: 20 });

                var otp = speakeasy.totp({
                    secret: secret.base32,
                    encoding: 'base32'
                });
                adminData.otp = otp;
                ///
                db.collection('admin').insert(adminData, function (err, result) {
                    console.log(err);
                    if (err) {
                        return res.send({
                            err: true,
                            error: err
                        });
                    }
                    else {
                        sendMail.Send_Email(adminData.email, 'admin Registration successfully', 'email_body_forgot', adminData).then(function (data) {
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
        //end of addadmin
        getadmin: function (req, res) {
            req.checkParams('id', 'id must exist').notEmpty();
            if (!req.validateAndRespond()) return;
            var id = req.params.id;
            db.collection('admin').findOne({ _id: new ObjectId(id) }, { password: 0, _id: 0 }, function (err, result) {
                if (result === null) {
                    return res.send({
                        err: true,
                        error: "admin not found with given id"
                    });
                } else {
                    res.send({
                        err: false,
                        result: {
                            admin: result
                        }
                    });
                }
            });
        },
        //end of getadmin
        updateadmin: function (req, res) {
            req.checkParams('id', 'id must exist').notEmpty();
            if (!req.validateAndRespond()) return;
            var id = req.params.id;

            db.collection('admin').findOne({ _id: new ObjectId(id) }, { password: 0 }, function (err, result) {
                if (result == null) {
                    return res.send({
                        err: true,
                        error: "No admin found with given id"
                    });
                } else {
                    var adminData = req.body.admin;
                    var datenow = new Date();
                    adminData.updatedOn = datenow;
                    db.collection('admin').update({ _id: new ObjectId(id) }, { $set: adminData }, function (err, result) {
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
        //end of adminupdate
        deleteadmin: function (req, res) {
            req.checkParams('id', 'id must exist').notEmpty();
            if (!req.validateAndRespond()) return;
            var id = req.params.id;

            var admin = req.body.admin;
            db.collection('admin').remove({ _id: new ObjectId(id) }, function (err, result) {
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
        //end of deleteadmin
        adminLogin: function (req, res) {
            req.checkBody({
                'admin.password': {
                    notEmpty: true
                },
                'admin.email': {
                    notEmpty: true
                }
            });
            if (!req.validateAndRespond()) return;
            var email = req.body.admin.email;
            db.collection('admin').findOne({ email: email }, function (err, admin) {
                if (admin === null) {
                    return res.send({
                        err: true,
                        error: ["email doesn't exist"]
                    });
                }
                else {
                    bcrypt.compare(req.body.admin.password, admin.password, function (err, result) {
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
                                    result: { token: admin.token, upin: admin.upin }
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
        //end of adminLogin
        adminlogout: function (req, res) {
            if (!req.validateAndRespond()) return;
            var id = req.params.id;
            var otp = req.body.otp;
            db.collection('admin').findOne({ _id: new ObjectId(id) }, function (err, result) {
                if (result == null) {
                    return res.send({
                        err: true,
                        error: "admin with given id not found"
                    });
                } else {
                    db.collection('admin').update({ _id: new ObjectId(id) }, { $unset: { "token": "" } }, function (err, result) {
                        if (err) {
                            return res.send({
                                err: true,
                                error: err
                            });
                        } else {
                            return res.send({
                                err: false,
                                result: "admin logged out successfully."
                            });
                        }
                    });
                }
            });
        },
        //end of logout
        forgotpassword: function (req, res) {
            if (!req.validateAndRespond()) return;
            var id = req.params.id;
            var adminData = req.body;
            ///OTP///
            var speakeasy = require('speakeasy');
            var secret = speakeasy.generateSecret({ length: 20 });

            var otp = speakeasy.totp({
                secret: secret.base32,
                encoding: 'base32'
            });
            adminData.otp = otp;
            ///
            db.collection('admin').update({ _id: new ObjectId(id) }, { $set: { "otp": otp } }, function (err, result) {
                if (err) {
                    return res.send({
                        err: true,
                        error: err
                    });
                } else {
                    sendMail.Send_Email(adminData.email, 'Forgot Password', 'email_body_forgot', adminData).then(function (data) {
                        res.send({
                            err: false,
                            result: data
                        });
                    });

                }
            });
        },
        //end of forgotpassword
        ChangePassword: function (req, res) {
            if (!req.validateAndRespond()) return;
            var id = req.params.id;
            var otp = req.body.otp;
            var Newpassword = req.body.password;
            var conf_password = req.body.confPassword;
            if (Newpassword !== conf_password) {
                return res.send({
                    err: true,
                    error: "Password and confirm password do not match."
                });
            }
            db.collection('admin').findOne({ _id: new ObjectId(id), otp: otp }, function (err, result) {
                if (result == null) {
                    return res.send({
                        err: true,
                        error: "Invalid OTP Presented.Please try again"
                    });
                } else {
                    password.hashPassword(Newpassword, function (_password) {
                        db.collection('admin').insert({ _id: id }, { $set: { "password": _password } }, function (err, result) {
                            db.collection('admin').update({ _id: id }, { $set: { "password": _password } }, function (err, result) {
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
                        });
                    });
                }
            });
        },
        //end of ChangePassword
        adminActivate: function (req, res) {
            if (!req.validateAndRespond()) return;
            var id = req.params.id;

            var otp = req.body.otp;
            db.collection('admin').findOne({ _id: new ObjectId(id), otp: otp }, function (err, result) {
                if (result == null) {
                    return res.send({
                        err: true,
                        error: "Invalid OTP Presented.Please try again"
                    });
                } else {

                    db.collection('admin').update({ _id: new ObjectId(id) }, { $set: { "status": "active" } }, function (err, result) {
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
        //end of active
        inactiveAccount: function (req, res) {
            req.checkParams('id', 'id must exist').notEmpty();
            if (!req.validateAndRespond()) return;
            var id = req.params.id;

            db.collection('admin').findOne({ _id: new ObjectId(id) }, { password: 0 }, function (err, result) {
                if (result == null) {
                    return res.send({
                        err: true,
                        error: "No admin found with the provided Id"
                    });
                } else {
                    db.collection('admin').update({ _id: new ObjectId(id) }, { $set: { "status": "inactive" } }, function (err, result) {
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
        adminlogout: function (req, res) {
            if (!req.validateAndRespond()) return;
            var id = req.params.id;
            var otp = req.body.otp;
            db.collection('admin').findOne({ _id: new ObjectId(id) }, function (err, result) {
                if (result == null) {
                    return res.send({
                        err: true,
                        error: "admin with given id not found"
                    });
                } else {
                    db.collection('admin').update({ _id: new ObjectId(id) }, { $unset: { "token": "" } }, function (err, result) {
                        if (err) {
                            return res.send({
                                err: true,
                                error: err
                            });
                        } else {
                            return res.send({
                                err: false,
                                result: "admin logged out successfully."
                            });
                        }
                    });
                }
            });
        }

    };

};











