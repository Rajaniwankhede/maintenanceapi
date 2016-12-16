/**
 * @apiDefine userNotFoundError
 *
 * @apiError userNotFound The <code>id</code> of the user was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "userNotFound"
 *     }
 */

/**
 * @api {get} /user/:id Request user information
 * @apiName Getuser
 * @apiGroup user
 * @apiVersion 0.1.0
 * @apiParam {String} id The users-ID.
 * 
 * @apiSuccess {String} username The users username.
 * @apiSuccess {String} firstName The users firstname.
 * @apiSuccess {String} lastName The users lastname.
 * @apiSuccess {String} email The users email.
 * @apiSuccess {String} mobile The users mobile number.
 * @apiSuccess {String} plan The users plan.
 * @apiSuccess {String} status The users account status.
 * @apiSuccess {String} otp    The new users-otp.
 * @apiSuccess {String} token  The new users-token.
 
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 {
  "err": false,
  "result": {
    "user": {
      "username": "John",
      "firstName": "John",
      "lastName": "Sen",
      "email": "xyz@gmail.com",
      "mobile": "+919860626638",
      "plan": "monthly",
      "status": "inactive",
      "otp": "702113",
      "token": "eyJhbGciOiJIUzI1NiJ9.bW9yZXJhbmkyMTAyQGdtYWlsLmNvbXJhbmkxMjM.97j18HfcKNaFn2qNyz_xYjftft_2lXQMUWsM28CvhdM"
    }
  }
}
 * @apiUse userNotFoundError
  */
function getuser() {
    return;
}
/**
 * @api {post} /user Create a new user
 * @apiVersion 0.1.0
 * @apiName adduser
 * @apiGroup user
 * @apiExample {json} Example usage:
 *     endpoint: http://localhost/8080/user
 *        
{

    "user":{
    "name":"rajani",
    "gender": "female",
    "email": "rajaniwankhede@gmail.com",
    "mobile": "7385744701",
    "address": "pune",
    "doj": "2016/3/2",
    "selectdesignation": "design",
    "password" :"a123",
    "confirmpassword" :"a123"
    
    }
}

 * @apiParam {String} Name The users name.
 * @apiParam {String} gender The users gender.
 * @apiParam {String} email The users email.
 * @apiParam {String} mobile The users mobile number with country code.
 * @apiParam {String} date of joining The users date of joining.
 * @apiParam {String} select designation The users select designation.
 * @apiParam {String} password The users password.
 * @apiParam {String} confirmpassword The users confirmpassword.
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 *{
  "err": false,
  "result": {
    "message": "success"
  }
 }
 * @apiError CreateuserError Unable to create new user.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 204 No Content
 *     {
 *       "error": "CreateuserError"
 *     }
 */
function adduser() { return; }

/**
 * @api {post} /user/login user Login
 * @apiVersion 0.1.0
 * @apiName Loginuser
 * @apiGroup user
 * @apiExample {json} Example usage:
 *     endpoint: http://localhost/8080/user/login
 *     body:
 *         {
 *         
 *          "email": "xyz@gmail.com",
 *          "password":"john123"
 *      	}
 * @apiParam {String} email Email of the user.
 * @apiParam {String} password Password of the user.
 * @apiSuccess {String} token        The new users-token.
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * { 
 * "token" : "eyJhbGciOiJIUzI1NiJ9.amltbXlraW1tZWxAbGl2ZS5jb21pbG92ZW1hdHRkYW1vbg.rVRjrC1SpLNzQNpIZebHwpScR0Iv4uNF51suyupycwA", 
 * }
 * 
 * @apiError EmailNotFoundError Email doesn't exist.
 * @apiError InvalidEmail/PwdError Invalid email/password combination.
 * @apiError ServerError Server error.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": " InvalidEmail/PwdError"
 *     }
 */

function userLogin() { return; }
/**
 * @api {post} /user/:id/forgotpassword/email user forgotpassword send email
 * @apiVersion 0.1.0
 * @apiName forgotpassword
 * @apiGroup user
 *@apiExample {json} Example usage:
 *     endpoint: http://localhost/8080/user/:id/forgotpassword/sms
 *     body:
 *         {
 *           "email": "xyz@gmail.com",
 *      	}
 * @apiParam {String} id The users-ID.
 * @apiParam {String} email Email of the user.
 * @apiSuccessExample {json} Success-Response:
* HTTP/1.1 200 OK
 * {
 * "err": false,
 * "result": {
 *  "message": "success"
 * }
 * }
 * 
 * @apiUse userNotFoundError
 */
function forgotpassword() { return; }
/**
 * @api {post} /user/:id/forgotpassword/sms user forgotpassword send sms
 * @apiVersion 0.1.0
 * @apiName forgotpasswordSMS
 * @apiGroup user
 *@apiExample {json} Example usage:
 *     endpoint: http://localhost/8080/user/:id/forgotpassword/sms
 *     body:
 *         {
 *          "mobile": "+445458345389",
 *      	}
 * @apiParam {String} id The users-ID.       
 * @apiParam {String} mobile mobile number with country code of the user.
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 * "err": false,
 * "result": {
 *  "message": "success"
 * }
 * }
 * 
 * @apiUse userNotFoundError
 */
function forgotpasswordSMS() { return; }
/**
 * @api {post} /user/:id/Changepassword  user Change Password
 * @apiVersion 0.1.0
 * @apiName ChangePassword
 * @apiGroup user
 * *@apiExample {json} Example usage:
 *     endpoint: http://localhost/8080/user/:id/Changepassword
 *     body:
 *         {
 *         
 *          "otp": "345389",
 *          "password":"12345",
 *           "confPassword":"12345"
 *      	}
 * @apiParam {String} id The users-ID.
 * 
 * @apiParam {String} otp  otp got by user.
 * @apiParam {String} password  New password of user.
 * @apiParam {String}  confPassword  confirm Password of user.
 * @apiError PwdNotMatchError Password and confirm password do not match.
 * @apiError InvalidOtpError Invalid OTP Presented.Please try again.
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 * "err":false,
 * "result":{
 * "ok":1,
 * "nModified":1,
 * "n":1
 * }
 * }
 * 
 * * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "InvalidOtpError"
 *     }
 */
function ChangePassword() { return; }
/**
 * @api {post} /user/:id/activate make user active
 * @apiVersion 0.1.0
 * @apiName activateuser
 * @apiGroup user
 *@apiExample {json} Example usage:
 *     endpoint: http://localhost/8080/user/:id/activate
 *     body:
 *         {
 *           "otp": "123456",
 *      	}
 * @apiParam {String} id The users-ID.
 * @apiParam {String} otp otp of the user.
 * @apiSuccessExample {json} Success-Response:
* HTTP/1.1 200 OK
{
  "err": false,
  "result": {
    "ok": 1,
    "nModified": 1,
    "n": 1
  }
}
 * 
 * @apiUse userNotFoundError
 */
function activateuser() { return; }
/**
 * @api {post} /user/:id/inactive make user inactive
 * @apiVersion 0.1.0
 * @apiName inactivateUser
 * @apiGroup user
 * @apiParam {String} id The users-ID.
 * @apiSuccessExample {json} Success-Response:
* HTTP/1.1 200 OK
{
  "err": false,
  "result": {
    "ok": 1,
    "nModified": 1,
    "n": 1
  }
}
 * 
 * @apiUse userNotFoundError
 */
function inactivateUser() { return; }
/**
 * @api {post} /user/:id/logout user logout
 * @apiVersion 0.1.0
 * @apiName logoutuser
 * @apiGroup user
 * @apiParam {String} id The users-ID.
 * @apiSuccessExample {json} Success-Response:
* HTTP/1.1 200 OK
{
  "err": false,
  "result": "user logged out successfully."
}
 * 
 * @apiUse userNotFoundError
 */
function logoutuser() { return; }

 /**
 * @api {delete} /user/:id/delete delete user
 * @apiVersion 0.1.0
 * @apiName deleteuser
 * @apiGroup user
 * @apiParam {String} id The users-ID.
 * @apiParam {Strng} email The admins email id.
 * @apiParam {String} password The admins password.
 *@apiHeader {String} Authorization Only Admin can Access
 * 
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "email":"xyz@gmail.com",
 *        "password":"john123"
 *     }
 * @apiSuccessExample {json} Success-Response:
* HTTP/1.1 200 OK
{
  "err": false,
  "result": {
    "ok": 1,
    "n": 1
  }
}
 * 
 * @apiUse userNotFoundError
 */
function deleteuser(){return;}
/**
 * @api {put} /user/:id Updare user information
 * @apiVersion 0.1.0
 * @apiName updateuser
 * @apiGroup user
 * @apiExample {json} Example usage:
 *     endpoint: http://localhost/8080/user/:id
 *        
{
    "user" :
    {
        "username" :"John",
        "firstName" : "John",
        "lastName" : "Sen",
        "email": "xyz@gmail.com",
        "mobile": "+441234567891",
        "plan":"monthly"
    }
}
* @apiParam {String} id The users id.
 * @apiParam {String} username The users username.
 * @apiParam {String} firstName The users firstname.
 * @apiParam {String} lastName The users lastname.
 * @apiParam {String} email The users email.
 * @apiParam {String} mobile The users mobile number with country code.
 * @apiParam {String} plan The users plan.
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
{
  "err": false,
  "result": {
    "ok": 1,
    "nModified": 1,
    "n": 1
  }
}
 * 
 * @apiUse userNotFoundError
 */
function updateuser() { return; }

/**
 * @apiDefine adminNotFoundError
 *
 * @apiError adminnotfound The <code>id</code> of the admin was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "adminNotFound"
 *     }
 */

/**
 * @api {get} /admin/:id Request admin information
 * @apiName Getadmin
 * @apiGroup admin
 * @apiVersion 0.1.0
 * @apiParam {String} id The admins-ID.
 * 
 * @apiSuccess {String} username The admins username.
 * @apiSuccess {String} firstName The admins firstname.
 * @apiSuccess {String} lastName The admins lastname.
 * @apiSuccess {String} email The admins email.
 * @apiSuccess {String} mobile The admins mobile number.
 * @apiSuccess {String} status The admins account status.
 * @apiSuccess {String} otp    The new admins-otp.
 * @apiSuccess {String} token  The newadmins-token.
 
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 {
  "err": false,
  "result": {
    "user": {
      "username": "John",
      "firstName": "John",
      "lastName": "Sen",
      "email": "xyz@gmail.com",
      "mobile": "+919860626638",
      "status": "inactive",
      "otp": "702113",
      "token": "eyJhbGciOiJIUzI1NiJ9.bW9yZXJhbmkyMTAyQGdtYWlsLmNvbXJhbmkxMjM.97j18HfcKNaFn2qNyz_xYjftft_2lXQMUWsM28CvhdM"
    }
  }
}
 * @apiuse adminNotFoundError
  */
function getadmin() {
    return;
}
/**
 * @api {post} /client Create a new client
 * @apiVersion 0.1.0
 * @apiName addclient
 * @apiGroup client
 * @apiExample {json} Example usage:
 *     endpoint: http://localhost/8080/client
 *        

 {

    "client":{
    "name":"kranti",
    "email": "rajaniwankhede8@gmail.com",
    "mobile": "74547815362",
    "machinedetails": "fddscsssdd",
    "companyname": "infoxtech",
    "model": "samsung",
    "machineId":"12",
    "issueDescription":"hi",
    "assignto":"bw",
    "assigndate": "2016/3/4",
    "completiondate":"2016/5/6",
    "costing":"233"
   
     }
}

 * @apiParam {String} 
 * @apiParam {String} password The admins password.
 * @apiParam {String} firstName The admins firstname.
 * @apiParam {String} lastName The admins lastname.
 * @apiParam {String} email The admins email.
 * @apiParam {String} mobile The admins mobile number with country code.
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 *{
  "err": false,
  "result": {
    "message": "success"
  }
 }
 * @apiError CreateadminError Unable to create new admin.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 204 No Content
 *     {
 *       "error": "CreateadminError"
 *     }
 */
function addclient() { return; }

/**
 * @api {post} /admin/login admin Login
 * @apiVersion 0.1.0
 * @apiName Loginadmin
 * @apiGroup admin
 * @apiExample {json} Example usage:
 *     endpoint: http://localhost/8080/admin/login
 *     body:
 *         {
 *         
 *          "email": "xyz@gmail.com",
 *          "password":"john123"
 *      	}
 * @apiParam {String} email Email of the admin.
 * @apiParam {String} password Password of the admin.
 * @apiSuccess {String} token        The new admins-token.
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * { 
 * "token" : "eyJhbGciOiJIUzI1NiJ9.amltbXlraW1tZWxAbGl2ZS5jb21pbG92ZW1hdHRkYW1vbg.rVRjrC1SpLNzQNpIZebHwpScR0Iv4uNF51suyupycwA", 
 * }
 * 
 * @apiError EmailNotFoundError Email doesn't exist.
 * @apiError InvalidEmail/PwdError Invalid email/password combination.
 * @apiError ServerError Server error.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": " InvalidEmail/PwdError"
 *     }
 */

function adminLogin() { return; }
/**
 * @api {post} /admin/:id/forgotpassword/email admin forgotpassword send email
 * @apiVersion 0.1.0
 * @apiName forgotpassword
 * @apiGroup admin
 *@apiExample {json} Example usage:
 *     endpoint: http://localhost/8080/admin/:id/forgotpassword/sms
 *     body:
 *         {
 *           "email": "xyz@gmail.com",
 *      	}
 * @apiParam {String} id Theadmins-ID.
 * @apiParam {String} email Email of theadmin.
 * @apiSuccessExample {json} Success-Response:
* HTTP/1.1 200 OK
 * {
 * "err": false,
 * "result": {
 *  "message": "success"
 * }
 * }
 * 
 * @apiuse adminNotFoundError
 */
function forgotpassword() { return; }
/**
 * @api {post} /admin/:id/forgotpassword/sms admin forgotpassword send sms
 * @apiVersion 0.1.0
 * @apiName forgotpasswordSMS
 * @apiGroup admin
 *@apiExample {json} Example usage:
 *     endpoint: http://localhost/8080/admin/:id/forgotpassword/sms
 *     body:
 *         {
 *          "mobile": "+445458345389",
 *      	}
 * @apiParam {String} id The admins-ID.       
 * @apiParam {String} mobile mobile number with country code of the admin.
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 * "err": false,
 * "result": {
 *  "message": "success"
 * }
 * }
 * 
 * @apiuse adminNotFoundError
 */
function forgotpasswordSMS() { return; }
/**
 * @api {post} /admin/:id/Changepassword admin Change Password
 * @apiVersion 0.1.0
 * @apiName ChangePassword
 * @apiGroup admin
 * *@apiExample {json} Example usage:
 *     endpoint: http://localhost/8080/admin/:id/Changepassword
 *     body:
 *         {
 *         
 *          "otp": "345389",
 *          "password":"12345",
 *           "confPassword":"12345"
 *      	}
 * @apiParam {String} id The admins-ID.
 * 
 * @apiParam {String} otp  otp got by admin.
 * @apiParam {String} password  New password of admin.
 * @apiParam {String}  confPassword  confirm Password of admin.
 * @apiError PwdNotMatchError Password and confirm password do not match.
 * @apiError InvalidOtpError Invalid OTP Presented.Please try again.
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 * "err":false,
 * "result":{
 * "ok":1,
 * "nModified":1,
 * "n":1
 * }
 * }
 * 
 * * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "InvalidOtpError"
 *     }
 */
function ChangePassword() { return; }
/**
 * @api {post} /admin/:id/activate make admin active
 * @apiVersion 0.1.0
 * @apiName activateadmin
 * @apiGroup admin
 *@apiExample {json} Example usage:
 *     endpoint: http://localhost/8080/admin/:id/activate
 *     body:
 *         {
 *           "otp": "123456",
 *      	}
 * @apiParam {String} id Theadmins-ID.
 * @apiParam {String} otp otp of theadmin.
 * @apiSuccessExample {json} Success-Response:
* HTTP/1.1 200 OK
{
  "err": false,
  "result": {
    "ok": 1,
    "nModified": 1,
    "n": 1
  }
}
 * 
 * @apiuse adminNotFoundError
 */
function activateadmin() { return; }

/**
 * @api {post} /admin/:id/logout admin logout
 * @apiVersion 0.1.0
 * @apiName logoutadmin
 * @apiGroup admin
 * @apiParam {String} id Theadmins-ID.
 * @apiSuccessExample {json} Success-Response:
* HTTP/1.1 200 OK
{
  "err": false,
  "result": "admin logged out successfully."
}
 * 
 * @apiuse adminNotFoundError
 */
function logoutadmin() { return; }


/**
 * @api {put} /admin/:id Update admin information
 * @apiVersion 0.1.0
 * @apiName updateadmin
 * @apiGroup admin
 * @apiExample {json} Example usage:
 *     endpoint: http://localhost/8080/admin/:id
 *        
{
    "admin" :
    {
        "adminname" :"John",
        "firstName" : "John",
        "lastName" : "Sen",
        "email": "xyz@gmail.com",
        "mobile": "+441234567891",
       
    }
}
* @apiParam {String} id The admins id.
 * @apiParam {String} username The admins username.
 * @apiParam {String} firstName The admins firstname.
 * @apiParam {String} lastName The admins lastname.
 * @apiParam {String} email The admins email.
 * @apiParam {String} mobile The admins mobile number with country code.
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
{
  "err": false,
  "result": {
    "ok": 1,
    "nModified": 1,
    "n": 1
  }
}
 * 
 * @apiuse adminNotFoundError
 */
function updateadmin() { return; }

/**
 * @api {post} /company Create a new company
 * @apiVersion 0.1.0
 * @apiName addcompany
 * @apiGroup company
 *  @apiExample {json} Example usage:
*     endpoint: http://localhost/company
*
*body:
* {
    "company":{
* "name" : "Infoxtech", 
*  "usertype" : "Admin", 
*  "url" : "www.infoxtech.co.uk", 
*  "superadmin" : "Joe"
* }
}
 * @apiParam {String} name name of the company.
 * @apiParam {String} usertype usertype of the company.
 * @apiParam {URL} url  url of the company.
 * @apiParam {String} superadmin name of super admin of the company .
  *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 {
  "err": false,
  "result": {
    "company": {
      "ok": 1,
      "n": 1
    }
  }
}
 * @apiError CreatecompanyError Unable to create new company.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 204 No Content
 *     {
 *       "error": "CreatecompanyError"
 *     }
 */
function addcompany() { return; }

/**
 * @apiDefine companyNotFoundError
 *
 * @apiError companyNotFound The <code>id</code> of the company was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "companyNotFound"
 *     }
 */

/**
 * @api {get} /company/:id Request One company information
 * @apiName Getcompany
 * @apiGroup company
 * @apiVersion 0.1.0
 * @apiParam {String} id The companys-ID.
 * 
 * @apiSuccess {String} id The companys-ID.
 * @apiSuccess {String} name name of the company.
 * @apiSuccess {String} usertype usertype of the company.
 * @apiSuccess {URL} url   url of the company.
 * @apiSuccess {String} superadmin superadmins name of the company.
 * @apiSuccess {URL} status status of company.
   @apiSuccess {String} permitments permitments of the company.
   @apiSuccess {String} companyCode companyCode of company.
 * 
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 {
  "err": false,
  "result": {
    "company": {
      "name": "Infoxtech",
      "usertype": "Admin",
      "url": "www.infoxtech.co.uk",
      "superadmin": "Joe",
      "status": "Active",
      "permitments": [],
      "companyCode": "8404c0f50d"
    }
  }
}
 * @apiUse companyNotFoundError
  */
function getcompany() {
    return;
}

/**
 * @api {put} /company/:id Change company information
 * @apiVersion 0.1.0
 * @apiName updatecompany
 * @apiGroup company
 
*  @apiExample {json} Example usage:
*     endpoint: http://localhost/company
*body:
* {
    "company":{
* "name" : "Infoxtech", 
*  "usertype" : "Admin", 
*  "url" : "www.infoxtech.co.uk", 
*  "superadmin" : "Joe"
* }
}
*@apiParam {String} id id of the comapny.
* @apiParam {String} name name of the company.
 * @apiParam {String} usertype usertype of the company.
 * @apiParam {URL} url  url of the company.
 * @apiParam {String} superadmin name of super admin of the company .
 *
 * @apiSuccessExample {json} Success-Response:
 HTTP/1.1 200 OK
 * {
 *  "err":false,
 *  "result":{
 *              "ok":1,
 *              "nModified":1,
 *              "n":1
 *           }
 * }
 *
 *  @apiUse companyNotFoundError
 */
function updatecompany() { return; }
/**
 * @api {delete} /company/:id  delete company
 * @apiVersion 0.1.0
 * @apiName deletecompany
 * @apiGroup company
 * @apiParam {String} id The companys-ID.
 * @apiSuccessExample {json} Success-Response:
* HTTP/1.1 200 OK
  {
  "err": false,
  "result": {
    "ok": 1,
    "n": 1
   }
 }
 * 
 * @apiUse companyNotFoundError
 */
 //endpoint
 /**
  *  @api {post} /clientissue Create a new clientissue
 * @apiVersion 0.1.0
 * @apiName addissue
 * @apiGroup issue
 * @apiExample {json} Example usage:
 *   endpoint: http://localhost/issue/:id
 *
 * body:
 {
	"issue":
	{
	"issueId": "1",
    "clientName": "kranti",
    "status": "done",
    "issueassignto":"rani",
    "assigndate": "2016/3/4",
    "completiondate":"2016/4/2", 
    "costing": "323",
    "isverified":"yes" 

	}
}
 * @apiParam {String} issueId issueId of the issue.
 * @apiParam {String} clientName clientName of the issue.
 *  @apiParam {String} issueassignto issueassignto of the issue.
 * @apiParam {String} assignto assignto of the issue.
 *  @apiParam {String} completiondate completiondate of the issue.
 *  @apiParam {String} costing costing of the issue.
 *  @apiParam {String} isverified isverified of the issue.

 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK

{
  "err": false,
  "result": {
    "ok": 1,
    "nModified": 1,
    "n": 1
  }
}
  */





function addissue() { return; }