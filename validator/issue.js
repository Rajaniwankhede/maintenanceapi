module.exports = {
    "issue.issueId": { isString: true, notEmpty: false },
    "issue.clientName": { isString: true, notEmpty: false },
    "issue.status": { isString: true, notEmpty: false },
    "issue.issueassignto": { isString: true, notEmpty: false },
    "issue.assigndate": { notEmpty: true, isDate: true },
    "issue.completiondate": { notEmpty: true, isDate: true },
    "issue.costing": { isString: true, notEmpty: false },
    "issue.isverified": { isString: true, notEmpty: false },

};



