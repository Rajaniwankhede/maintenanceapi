module.exports = {

    "admin.Name": { isString: true, notEmpty: false },
    "admin.mobile": { isString: true, notEmpty: false },
    "admin.designation": { isString: true, notEmpty: false },
    "admin.email": { notEmpty: true, isEmail: true },
    "admin.password": { notEmpty: true, isString: true },
    "admin.confirmpassword": { notEmpty: true, isString: true }


};



