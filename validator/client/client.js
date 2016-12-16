module.exports = {
  "client.name": { isString: true, notEmpty: false },
  "client.email": { notEmpty: true, isEmail: true },
  "client.mobile": { notEmpty: true, isString: true },
  "client.machinedetails": { isString: true, notEmpty: false },
  "client.companyname": { isString: true, notEmpty: false },
  "client.model": { isString: true, notEmpty: false },
  "client.machineId": { isString: true, notEmpty: false },
  "client.issueDescription": { isString: true, notEmpty: false },
  "client.assignto": { isString: true, notEmpty: false },
  "client.assigndate": { notEmpty: true, isDate: true },
  "client.completiondate": { notEmpty: true, isDate: true },
  "client.costing": { notEmpty: true, isString: true }

};



