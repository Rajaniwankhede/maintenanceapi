var jwt = require("jsonwebtoken");
var bcrypt = require('bcryptjs');
var password = require("../../helper/password.js");
var ObjectId = require('mongodb').ObjectID;
var sendMail = require('../../helper/sendMail.js');
var shopValidator = require('../../validator/admin/shop.js');
var guid = require("guid");

module.exports = function (db) {
    return {
        addshop: function (req, res) {
            req.checkBody(shopValidator);
            if (!req.validateAndRespond()) return;
            var shopData = req.body.shop;
            var id = req.params.id;
            var shop = req.body.shop;
            shop.id = guid.raw();
            shop.UpdatedOn = new Date();
            db.collection('admin').update({ _id: new ObjectId(id) }, { $push: { shop: shopData } }, function (err, result) {
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
        //end of addshop
        getshop: function (req, res) {
            var shopData = req.body.shop;
            var id = req.params.id;
            db.collection('admin').findOne({ _id: new ObjectId(id) }, { shop: 1, _id: 0 }, function (err, result) {
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
        //end of getshop
        updateshop: function (req, res) {
            req.checkBody(shopValidator);
            req.checkParams('id', 'id must exist').notEmpty();
            if (!req.validateAndRespond()) return;
            var id = req.params.id;
            var shop = req.body.shop;
            shop.UpdatedOn = new Date();

            db.collection('admin').update({ _id: new ObjectId(id) }, { $pull: { shop: { id: shop.id } } }, function (err, result) {
                if (err) {
                    return res.send({
                        err: true,
                        error: err
                    });
                } else {

                    db.collection('client').update({ _id: new ObjectId(id) }, { $push: { shop: shop } }, function (err, result) {
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
        //end of updateshop
        deleteshop: function (req, res) {
            req.checkParams('id', 'id must exist').notEmpty();
            if (!req.validateAndRespond()) return;
            var id = req.params.id;

            var shop = req.body.admin;
            db.collection('shop').remove({ _id: new ObjectId(id) }, function (err, result) {
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









