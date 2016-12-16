module.exports = {
  "shopclient.name": { isString: true, notEmpty: false },
  "shopclient.email": { notEmpty: true, isEmail: true },
  "shopclient.mobile": { notEmpty: true, isString: true },
  "shopclient.machinedetails": { isString: true, notEmpty: false },
  "shopclient.companyname": { isString: true, notEmpty: false },
  "shopclient.url": { isString: true, notEmpty: false },
  
};



