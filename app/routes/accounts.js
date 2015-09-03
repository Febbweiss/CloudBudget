var passport            = require('../security/passport'),
    AccountController   = require('../controllers/accounts');
    
module.exports = function(app) {
    /**
         * @api {post} /accounts Create account
         * @apiVersion 1.0.0
         * @apiName Create account
         * @apiGroup Accounts
         * 
         * @apiParam {String} name Name for the new account
         * @apiParam {String} reference A reference (bank account number) for the new account
         * @apiParamExample {json} Request-Example: 
         *  {
         *      name: 'Home',
         *      reference: '1234567890'
         *  }
         * 
         * @apiHeader {String} Content-Type application/json
         * 
         * @apiHeader {String} Authorization The valid JWT token provided by the {post} /users/login resource
         * @apiHeaderExample {string} Authorization header example:
         *      "Authorization": "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNTVlNmU0ZTAwNTIzMGY0OTI3MWM3MDc4IiwiaWF0IjoxNDQxMTk1MjMyfQ.eWh9nuXVVSVDKKCmTMDoc9FBU55-KgkiOJH1hrdQRTQ" 
         * @apiError (401) {json} AuthenticationFailed The user can't be found.
         * @apiErrorExample AuthenticationFailed:
         *     HTTP/1.1 401 Not Found
         *     {
         *       "message": "Authentication failed"
         *     }
         *
         * @apiSuccess (201) {Object} account The new account with its (sub)categories.
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 201 Created
         *      {
         *          "name": "Home",
         *          "reference": "1234567890",
         *          "user_id": "55e6e4e005230f49271c7078",
         *          "_id": "55e8218912c65a1730c34858",
         *          "created_at": "2015-09-03T10:31:37.889Z",
         *          "categories": [
         *              {
         *                  "key": "alimony_payments",
         *                  "label": "Alimony Payments",
         *                  "_id": "55e8218912c65a1730c34859",
         *                  "sub_categories": []
         *              },
         *              {
         *                  "key": "automobile_expenses",
         *                  "label": "Automobile Expenses",
         *                  "_id": "55e8218912c65a1730c3485a",
         *                  "sub_categories": [
         *                      {
         *                          "label": "Car Payment",
         *                          "key": "car_payment",
         *                          "_id": "55e8218912c65a1730c3485d"
         *                      }
         *                  ]
         *              }
         *          ]
         *      }
         *
         * @apiError (400) {json} BadRequest The user can't be found.
         *
         * @apiErrorExample BadRequest:
         *     HTTP/1.1 400 Bad Request
         *      [
         *        {
         *              "field": "name",
         *              "rule": "required",
         *              "message": "Path `name` is required."
         *          }
         *      ]
         *  
     */
    app.post('/api/accounts', passport.jwt, AccountController.create);

    /**
         * @api {delete} /accounts/:account_id Delete account
         * @apiVersion 1.0.0
         * @apiName Delete account
         * @apiGroup Accounts
         * 
         * @apiParam {String} account_id The account to delete
         * 
         * @apiHeader {String} Authorization The valid JWT token provided by the {post} /users/login resource
         * @apiHeaderExample {string} Authorization header example:
         *      "Authorization": "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNTVlNmU0ZTAwNTIzMGY0OTI3MWM3MDc4IiwiaWF0IjoxNDQxMTk1MjMyfQ.eWh9nuXVVSVDKKCmTMDoc9FBU55-KgkiOJH1hrdQRTQ" 
         * @apiError (401) {json} AuthenticationFailed The user can't be found.
         * @apiErrorExample AuthenticationFailed:
         *     HTTP/1.1 401 Not Found
         *     {
         *       "message": "Authentication failed"
         *     }
         *
         * @apiSuccess (204) -
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 204 No Content
         *
         * @apiError (404) {json} AccountNotFound The account can't be found.
         * @apiErrorExample AccountNotFound:
         *     HTTP/1.1 404 Not Found
         *      {
         *          "message": "Unknown account"
         *      }
     */   
    app.delete('/api/accounts/:account_id', passport.jwt, AccountController.delete);

    /**
         * @api {get} /accounts/:account_id Get account
         * @apiVersion 1.0.0
         * @apiName Get account
         * @apiGroup Accounts
         * 
         * @apiParam {String} account_id The given account
         * 
         * @apiHeader {String} Content-Type application/json
         * 
         * @apiHeader {String} Authorization The valid JWT token provided by the {post} /users/login resource
         * @apiHeaderExample {string} Authorization header example:
         *      "Authorization": "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNTVlNmU0ZTAwNTIzMGY0OTI3MWM3MDc4IiwiaWF0IjoxNDQxMTk1MjMyfQ.eWh9nuXVVSVDKKCmTMDoc9FBU55-KgkiOJH1hrdQRTQ" 
         * @apiError (401) {json} AuthenticationFailed The user can't be found.
         * @apiErrorExample AuthenticationFailed:
         *     HTTP/1.1 401 Not Found
         *     {
         *       "message": "Authentication failed"
         *     }
         *
         * @apiSuccess (200) {Object} account The account with its (sub)categories.
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *      {
         *          "name": "Home",
         *          "reference": "1234567890",
         *          "user_id": "55e6e4e005230f49271c7078",
         *          "_id": "55e8218912c65a1730c34858",
         *          "created_at": "2015-09-03T10:31:37.889Z",
         *          "categories": [
         *              {
         *                  "key": "alimony_payments",
         *                  "label": "Alimony Payments",
         *                  "_id": "55e8218912c65a1730c34859",
         *                  "sub_categories": []
         *              },
         *              {
         *                  "key": "automobile_expenses",
         *                  "label": "Automobile Expenses",
         *                  "_id": "55e8218912c65a1730c3485a",
         *                  "sub_categories": [
         *                      {
         *                          "label": "Car Payment",
         *                          "key": "car_payment",
         *                          "_id": "55e8218912c65a1730c3485d"
         *                      }
         *                  ]
         *              }
         *          ]
         *      }
         *
         * @apiError (404) {json} AccountNotFound The account can't be found.
         * @apiErrorExample AccountNotFound:
         *     HTTP/1.1 404 Not Found
         *      {
         *          "message": "Unknown account"
         *      }  
     */
    app.get('/api/accounts/:account_id', passport.jwt, AccountController.get);
  
  /**
         * @api {put} /accounts/:account_id Modify account
         * @apiVersion 1.0.0
         * @apiName Modify account
         * @apiGroup Accounts
         * 
         * @apiParam {String} account_id The account id to modify
         * @apiParam {String} name Name for the new account
         * @apiParam {String} reference A reference (bank account number) for the new account
         * @apiParamExample {json} Request-Example: 
         *  {
         *      name: 'Home',
         *      reference: '1234567890'
         *  }
         * 
         * @apiHeader {String} Content-Type application/json
         * 
         * @apiHeader {String} Authorization The valid JWT token provided by the {post} /users/login resource
         * @apiHeaderExample {string} Authorization header example:
         *      "Authorization": "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNTVlNmU0ZTAwNTIzMGY0OTI3MWM3MDc4IiwiaWF0IjoxNDQxMTk1MjMyfQ.eWh9nuXVVSVDKKCmTMDoc9FBU55-KgkiOJH1hrdQRTQ" 
         * @apiError (401) {json} AuthenticationFailed The user can't be found.
         * @apiErrorExample AuthenticationFailed:
         *     HTTP/1.1 401 Not Found
         *     {
         *       "message": "Authentication failed"
         *     }
         *
         * @apiSuccess {String} username Username of the User.
         * @apiSuccess {String} token  The JWT valid token.
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *      {
         *          "name": "Home",
         *          "reference": "1234567890",
         *          "user_id": "55e6e4e005230f49271c7078",
         *          "_id": "55e8218912c65a1730c34858",
         *          "created_at": "2015-09-03T10:31:37.889Z",
         *          "categories": [
         *              {
         *                  "key": "alimony_payments",
         *                  "label": "Alimony Payments",
         *                  "_id": "55e8218912c65a1730c34859",
         *                  "sub_categories": []
         *              },
         *              {
         *                  "key": "automobile_expenses",
         *                  "label": "Automobile Expenses",
         *                  "_id": "55e8218912c65a1730c3485a",
         *                  "sub_categories": [
         *                      {
         *                          "label": "Car Payment",
         *                          "key": "car_payment",
         *                          "_id": "55e8218912c65a1730c3485d"
         *                      }
         *                  ]
         *              }
         *          ]
         *      }
         *
         * @apiError (400) {json} BadRequest The user can't be found.
         * @apiErrorExample BadRequest:
         *     HTTP/1.1 400 Bad Request
         *      [
         *        {
         *              "field": "name",
         *              "rule": "required",
         *              "message": "Path `name` is required."
         *          }
         *      ]
         * @apiError (404) {json} AccountNotFound The account can't be found.
         * @apiErrorExample AccountNotFound:
         *     HTTP/1.1 404 Not Found
         *      {
         *          "message": "Unknown account"
         *      }    
     */
    app.put('/api/accounts/:account_id', passport.jwt, AccountController.modify);

    /**
         * @api {post} /accounts/:account_id/entries Create entry
         * @apiVersion 1.0.0
         * @apiName Create entry
         * @apiGroup Entries
         * 
         * @apiParam {String} account_id The account id to populate
         * @apiParam {String} amount Amount of the entry
         * @apiParam {String} date Date of the bill/deposit
         * @apiParam {String} [category] Category id of the bill/deposit 
         * @apiParam {String} [sub_category] Sub category id of the bill/deposit
         * @apiParam {String} [label] A label for the entry
         * @apiParamExample {json} Request-Example: 
         *  {
         *          amount: 1000,
         *          date: 2015-09-03T10:04:11.481Z
         *  }
         * 
         * @apiHeader {String} Content-Type application/json
         * 
         * @apiHeader {String} Authorization The valid JWT token provided by the {post} /users/login resource
         * @apiHeaderExample {string} Authorization header example:
         *      "Authorization": "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNTVlNmU0ZTAwNTIzMGY0OTI3MWM3MDc4IiwiaWF0IjoxNDQxMTk1MjMyfQ.eWh9nuXVVSVDKKCmTMDoc9FBU55-KgkiOJH1hrdQRTQ" 
         * @apiError (401) {json} AuthenticationFailed The user can't be found.
         * @apiErrorExample AuthenticationFailed:
         *     HTTP/1.1 401 Not Found
         *     {
         *       "message": "Authentication failed"
         *     }
         *
         * @apiSuccess (201) {Object} entry The created entry.
         * @apiSuccess (201) {Object[]} entries  All account's entries
         * @apiSuccess (201) {Number} balance The account's total balance
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 201 Created
         *    {
         *          entry: {
         *              _id: '',
         *              account_id: '1000',
         *              type: 'DEPOSIT'
         *              amount: 1000,
         *              date: 2015-09-03T10:04:11.481Z
         *          },
         *          entries: [
         *              {
         *                  _id: '',
         *                  account_id: '1000',
         *                  type: 'DEPOSIT'
         *                  amount: 1000,
         *                  date: 2015-09-03T10:04:11.481Z
         *              }
         *          ],
         *          balance: 1000
         *    }
         *
         * @apiError (400) {json} BadRequest The user can't be found.
         * @apiErrorExample BadRequest:
         *     HTTP/1.1 400 Bad Request
         *      [
         *        {
         *              "field": "amount",
         *              "rule": "required",
         *              "message": "Path `amount` is required."
         *          }
         *      ]
         *  
         * @apiError (404) {json} AccountNotFound The account can't be found.
         * @apiErrorExample AccountNotFound:
         *     HTTP/1.1 404 Not Found
         *      {
         *          "message": "Unknown account"
         *      }
     */
    app.post('/api/accounts/:account_id/entries', passport.jwt, AccountController.add_entry);

    /**
         * @api {post} /accounts/:account_id/entries/:entry_id Modify entry
         * @apiVersion 1.0.0
         * @apiName Modify entry
         * @apiGroup Entries
         * 
         * @apiParam {String} account_id The owner account
         * @apiParam {String} entry_id The entry to modify
         * @apiParam {String} amount Amount of the entry
         * @apiParam {String} date Date of the bill/deposit
         * @apiParam {String} [category] Category id of the bill/deposit 
         * @apiParam {String} [sub_category] Sub category id of the bill/deposit
         * @apiParam {String} [label] A label for the entry
         * @apiParamExample {json} Request-Example: 
         *  {
         *          amount: 1000,
         *          date: 2015-09-03T10:04:11.481Z
         *  }
         * 
         * @apiHeader {String} Content-Type application/json
         * 
         * @apiHeader {String} Authorization The valid JWT token provided by the {post} /users/login resource
         * @apiHeaderExample {string} Authorization header example:
         *      "Authorization": "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNTVlNmU0ZTAwNTIzMGY0OTI3MWM3MDc4IiwiaWF0IjoxNDQxMTk1MjMyfQ.eWh9nuXVVSVDKKCmTMDoc9FBU55-KgkiOJH1hrdQRTQ" 
         * @apiError (401) {json} AuthenticationFailed The user can't be found.
         * @apiErrorExample AuthenticationFailed:
         *     HTTP/1.1 401 Not Found
         *     {
         *       "message": "Authentication failed"
         *     }
         *
         * @apiSuccess (200) {Object} entry The created entry.
         * @apiSuccess (200) {Object[]} entries  All account's entries
         * @apiSuccess (200) {Number} balance The account's total balance
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *    {
         *          entry: {
         *              _id: '',
         *              account_id: '1000',
         *              type: 'DEPOSIT'
         *              amount: 1000,
         *              date: 2015-09-03T10:04:11.481Z
         *          },
         *          entries: [
         *              {
         *                  _id: '',
         *                  account_id: '1000',
         *                  type: 'DEPOSIT'
         *                  amount: 1000,
         *                  date: 2015-09-03T10:04:11.481Z
         *              }
         *          ],
         *          balance: 1000
         *    }
         *
         * @apiError (400) {json} BadRequest The user can't be found.
         * @apiErrorExample BadRequest:
         *     HTTP/1.1 400 Bad Request
         *      [
         *        {
         *              "field": "amount",
         *              "rule": "required",
         *              "message": "Path `amount` is required."
         *          }
         *      ]
         *  
         * @apiError (404) {json} AccountNotFound The account can't be found.
         * @apiErrorExample AccountNotFound:
         *     HTTP/1.1 404 Not Found
         *      {
         *          "message": "Unknown account"
         *      }
         * @apiError (404) {json} EntryNotFound The entry can't be found.
         * @apiErrorExample AccountNotFound:
         *     HTTP/1.1 404 Not Found
     */
    app.put('/api/accounts/:account_id/entries/:entry_id', passport.jwt, AccountController.modify_entry);
 
    /**
         * @api {delete} /accounts/:account_id/entries/:entry_id Delete entry
         * @apiVersion 1.0.0
         * @apiName Delete entry
         * @apiGroup Entries
         * 
         * @apiParam {String} account_id The owner account
         * @apiParam {String} entry_id The entry to delete
         * 
         * @apiHeader {String} Authorization The valid JWT token provided by the {post} /users/login resource
         * @apiHeaderExample {string} Authorization header example:
         *      "Authorization": "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNTVlNmU0ZTAwNTIzMGY0OTI3MWM3MDc4IiwiaWF0IjoxNDQxMTk1MjMyfQ.eWh9nuXVVSVDKKCmTMDoc9FBU55-KgkiOJH1hrdQRTQ" 
         * @apiError (401) {json} AuthenticationFailed The user can't be found.
         * @apiErrorExample AuthenticationFailed:
         *     HTTP/1.1 401 Not Found
         *     {
         *       "message": "Authentication failed"
         *     }
         *
         * @apiSuccess (204) -
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 204 No Content
         *
         * @apiError (404) {json} AccountNotFound The account can't be found.
         * @apiErrorExample AccountNotFound:
         *     HTTP/1.1 404 Not Found
         *      {
         *          "message": "Unknown account"
         *      }
         * @apiError (404) {json} EntryNotFound The entry can't be found.
         * @apiErrorExample AccountNotFound:
         *     HTTP/1.1 404 Not Found
     */   
    app.delete('/api/accounts/:account_id/entries/:entry_id', passport.jwt, AccountController.delete_entry);
    
    app.get('/api/accounts/:account_id/entries', passport.jwt, AccountController.list_entries);
    
};