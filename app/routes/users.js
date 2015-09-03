var passport        = require('../security/passport'),
    UserController  = require('../controllers/users');
    
module.exports = function(app) {
    
    /**
         * @api {post} /users/login Login
         * @apiVersion 1.0.0
         * @apiName Login
         * @apiGroup Users
         * 
         * @apiHeader {String} Content-Type application/json
         * 
         * @apiParam {String} username User's username
         * @apiParam {String} password User's password
         * @apiParamExample {json} Request-Example: 
         *  { 
         *      "username": "John", 
         *      "password": "s3cr3t" 
         *  }
         *
         * @apiSuccess {String} username Username of the User.
         * @apiSuccess {String} token  The JWT valid token.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *       "username": "John",
         *       "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNTVlNmU0ZTAwNTIzMGY0OTI3MWM3MDc4IiwiaWF0IjoxNDQxMTk1MjMyfQ.eWh9nuXVVSVDKKCmTMDoc9FBU55-KgkiOJH1hrdQRTQ"
         *     }
         *
         * @apiError (401) {json} AuthenticationFailed The user can't be found.
         * @apiErrorExample AuthenticationFailed:
         *     HTTP/1.1 401 Not Found
         *     {
         *       "message": "Authentication failed"
         *     }
         * 
     */
    app.post('/api/users/login', passport.local, UserController.login);

    /**
         * @api {delete} /users/login Logout
         * @apiVersion 1.0.0
         * @apiName Logout
         * @apiGroup Users
         *
         * @apiHeader {String} Authorization The valid JWT token provided by the {post} /users/login resource
         * @apiHeaderExample {string} Authorization header example:
         *      "Authorization": "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNTVlNmU0ZTAwNTIzMGY0OTI3MWM3MDc4IiwiaWF0IjoxNDQxMTk1MjMyfQ.eWh9nuXVVSVDKKCmTMDoc9FBU55-KgkiOJH1hrdQRTQ" 
         * 
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *
     */
    app.delete('/api/users/login', UserController.logout);
  
    /**
         * @api {post} /users Registration
         * @apiVersion 1.0.0
         * @apiName Registration
         * @apiGroup Users
         * 
         * @apiHeader {String} Content-Type application/json
         * 
         * @apiParam {String} username User's username
         * @apiParam {String} password User's password
         * @apiParam {String} [language='en'] User's default language
         * @apiParamExample {json} Request-Example: 
         *  { 
         *      "username": "John", 
         *      "password": "s3cr3t",
         *      "language": "en"
         *  }
         *
         * @apiSuccess (201) {String} username Username of the User.
         * @apiSuccess (201) {String} token  The JWT valid token.
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 201 OK
         *     {
         *       "username": "John",
         *       "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNTVlNmU0ZTAwNTIzMGY0OTI3MWM3MDc4IiwiaWF0IjoxNDQxMTk1MjMyfQ.eWh9nuXVVSVDKKCmTMDoc9FBU55-KgkiOJH1hrdQRTQ"
         *     }
         *
         * @apiError (409) {json} UserAlreadyExist The user can't be found.
         * @apiErrorExample {json} UserAlreadyExist:
         *     HTTP/1.1 409 Not Found
         *     {
         *       "message": "Account already exists"
         *     }
         * 
         * @apiError (400) {json} BadRequest Validation errors.
         * @apiErrorExample {json} BadRequest:
         *     HTTP/1.1 400 Bad Request
         *     [
         *        {
         *              "field": "password",
         *              "rule": "required",
         *              "message": "Path `password` is required."
         *          },
         *          {
         *              "field": "username",
         *              "rule": "required",
         *              "message": "Path `username` is required."
         *          }
         *      ]
         * 
         *
     */
    app.post('/api/users', UserController.subscribe);

    /**
         * @api {delete} /users Unregistration
         * @apiVersion 1.0.0
         * @apiName Unregistration
         * @apiGroup Users
         *
         * @apiHeader {String} Content-Type application/json
         * @apiHeader {String} Authorization The valid JWT token provided by the {post} /users/login resource
         * @apiHeaderExample {string} Authorization header example:
         *      "Authorization": "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNTVlNmU0ZTAwNTIzMGY0OTI3MWM3MDc4IiwiaWF0IjoxNDQxMTk1MjMyfQ.eWh9nuXVVSVDKKCmTMDoc9FBU55-KgkiOJH1hrdQRTQ" 
         *
         * @apiSuccess (204) -
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 204 No Content
         *
         * @apiError (401) {json} AuthenticationFailed The user can't be found.
         * @apiErrorExample AuthenticationFailed:
         *     HTTP/1.1 401 Not Found
         *     {
         *       "message": "Authentication failed"
         *     }

         *
     */    
    app.delete('/api/users', passport.jwt, UserController.unsubscribe);
};