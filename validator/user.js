module.exports = {
  "user.name": { isString: true, notEmpty: false },
  "user.gender": { notEmpty: true, isString: true },
  "user.email": { notEmpty: true, isEmail: true },
  "user.mobile": { notEmpty: true, isString: true },
  "user.address": { isString: true, notEmpty: false },
  "user.doj": { notEmpty: true, isDate: true },
  "user.selectdesignation": { isString: true, notEmpty: false },
  "user.password": { notEmpty: true, isString: true },
  "user.confirmpassword": { notEmpty: true, isString: true }
};



