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
 * @apiSuccess {String} email The users email.
 * @apiSuccess {String}  name The users name.
 * @apiSuccess {String} token        The new users-token.
 * @apiSuccess {String} otp         The new users-otp.
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "err":false,
 *  "result":{
 *     "user":{ 
 *           "email" : "jimmykimmel@live.com", 
 *           "name" : "Jimmy", 
 *           "token" : "eyJhbGciOiJIUzI1NiJ9.amltbXlraW1tZWxAbGl2ZS5jb21pbG92ZW1hdHRkYW1vbg.rVRjrC1SpLNzQNpIZebHwpScR0Iv4uNF51suyupycwA", 
 *           "otp" : "020696"
 *            }
 *           }
 * }
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
 *     endpoint: http://localhost/user
 *         {
 *         
 *          "email": "xyz@gmail.com",
 *          "password":"12345",
 *          "name":"xyz"
 *      	}
 * @apiParam {String} name Name of the user.
 * @apiParam {String} email Email of the user.
 * @apiParam {String} password Password of the user.
 * 
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 *{
 *    "err":false,
 *    "result":{
 *               "ok":1,
 *                "n":1
 *             }
 *}
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
 *     endpoint: http://localhost/user/login
 *     body:
 *         {
 *         
 *          "email": "xyz@gmail.com",
 *          "password":"12345",
 *          "name":"xyz"
 *      	}
 * @apiParam {String} name Name of the user.
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
 *     endpoint: http://localhost/:id/forgotpassword/sms
 *     body:
 *         {
 *         
 *          "email": "xyz@gmail.com",
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
 *     endpoint: http://localhost/:id/forgotpassword/sms
 *     body:
 *         {
 *         
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
 * @api {post} /user/:id/Changepassword' user Change Password
 * @apiVersion 0.1.0
 * @apiName ChangePassword
 * @apiGroup user
 * *@apiExample {json} Example usage:
 *     endpoint: http://localhost/:id/Changepassword
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
 * @api {post} /slide Create a new slide
 * @apiVersion 0.1.0
 * @apiName addslide
 * @apiGroup slide
 *
 * @apiHeader {String} Authorization Users unique token.
 * 
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "eyJhbGciOiJIUzI1NiJ9.amltbXlraW1tZWxAbGl2ZS5jb21pbG92ZW1hdHRkYW1vbg.-4U_YqoundH6NAWLPUulfwVPF0tHIJux5hNsze6ziK4"
 *     }
 * @apiExample {json} Example usage:
*     endpoint: http://localhost/slide
*
*     body:
*         {
*   "slide": {
*       "title": "Red",
*       "text": "Red",
*       "param": "Identifies color red",
*       "background_image_url": "www.google.com/asd",
*       "static_image_url": "www.google.com/asd",
*       "slide_no": "www.google.com/asd",
*       "type": "Because I love it!"
*   }
* }
*
 * @apiParam {String} title title of the slide.
 * @apiParam {String} text text of the slide.
 * @apiParam {URL} background_image_url background image url of the slide.
 * @apiParam {URL} static_image_url static image url of the slide.
 * @apiParam {String} slide_no slide number .
 * @apiParam {String} type  Type of the slide .
 * 
 *
 *  * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 *{
 *    "err":false,
 *    "result":{
 *               "ok":1,
 *                "n":1
 *             }
 *}
 * @apiError CreateSlideError Unable to create new slide.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 204 No Content
 *     {
 *       "error": "CreateSlideError"
 *     }
 */
function addslide() { return; }

/**
 * @apiDefine slideNotFoundError
 *
 * @apiError slideNotFound The <code>id</code> of the slide was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "slideNotFound"
 *     }
 */

/**
 * @api {get} /slide/:id Request One slide information
 * @apiName Getslide
 * @apiGroup slide
 * @apiVersion 0.1.0
 * @apiHeader {String} Authorization Users unique token.
 * 
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "eyJhbGciOiJIUzI1NiJ9.amltbXlraW1tZWxAbGl2ZS5jb21pbG92ZW1hdHRkYW1vbg.-4U_YqoundH6NAWLPUulfwVPF0tHIJux5hNsze6ziK4"
 *     }
 * @apiParam {String} id The slides-ID.
 * 
 * @apiSuccess {String} id The slides-ID.
*  @apiSuccess {String} title title of the slide.
 * @apiSuccess {String} text text of the slide.
 * @apiSuccess {URL} background_image_url background image url of the slide.
 * @apiSuccess {URL} static_image_url static image url of the slide.
 * @apiSuccess {String} param Identification
 * @apiSuccess {String} slide_no slide number .
 * @apiSuccess {String} type  Type of the slide .
 * 
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 *{
 *    "err":false,
 *    "result":[
 *              {
 *                  "_id":"582ef75c56e02c3730852121",
 *                  "title":"yellow",
 *                  "text":"Yellow",
 *                  "param":"Identifies color yellow",
 *                  "background_image_url":"www.google.com/asd",
 *                  "static_image_url":"www.google.com/asd",
 *                  "slide_no":"www.google.com/asd",
 *                  "type":"Because I love it!"
 *              }
 *             ]
 * }
 * 
 * @apiUse slideNotFoundError
  */