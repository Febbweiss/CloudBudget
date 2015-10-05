define({ "api": [
  {
    "type": "post",
    "url": "/accounts",
    "title": "Create account",
    "version": "1.0.0",
    "name": "Create_account",
    "group": "Accounts",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "name",
            "description": "<p>Name for the new account</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "reference",
            "description": "<p>A reference (bank account number) for the new account</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example: ",
          "content": "{\n    name: 'Home',\n    reference: '1234567890'\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p> "
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>The valid JWT token provided by the {post} /users/login resource</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization header example:",
          "content": "\"Authorization\": \"JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNTVlNmU0ZTAwNTIzMGY0OTI3MWM3MDc4IiwiaWF0IjoxNDQxMTk1MjMyfQ.eWh9nuXVVSVDKKCmTMDoc9FBU55-KgkiOJH1hrdQRTQ\"",
          "type": "string"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>The user can't be found.</p> "
          }
        ],
        "401": [
          {
            "group": "401",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "AuthenticationFailed",
            "description": "<p>The user can't be found.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "AuthenticationFailed:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 Bad Request\n [\n   {\n         \"field\": \"name\",\n         \"rule\": \"required\",\n         \"message\": \"Path `name` is required.\"\n     }\n ]",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "<p>Object</p> ",
            "optional": false,
            "field": "account",
            "description": "<p>The new account with its (sub)categories.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created\n {\n     \"name\": \"Home\",\n     \"reference\": \"1234567890\",\n     \"user_id\": \"55e6e4e005230f49271c7078\",\n     \"_id\": \"55e8218912c65a1730c34858\",\n     \"created_at\": \"2015-09-03T10:31:37.889Z\",\n     \"categories\": [\n         {\n             \"key\": \"alimony_payments\",\n             \"label\": \"Alimony Payments\",\n             \"_id\": \"55e8218912c65a1730c34859\",\n             \"sub_categories\": []\n         },\n         {\n             \"key\": \"automobile_expenses\",\n             \"label\": \"Automobile Expenses\",\n             \"_id\": \"55e8218912c65a1730c3485a\",\n             \"sub_categories\": [\n                 {\n                     \"label\": \"Car Payment\",\n                     \"key\": \"car_payment\",\n                     \"_id\": \"55e8218912c65a1730c3485d\"\n                 }\n             ]\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/accounts.js",
    "groupTitle": "Accounts"
  },
  {
    "type": "delete",
    "url": "/accounts/:account_id",
    "title": "Delete account",
    "version": "1.0.0",
    "name": "Delete_account",
    "group": "Accounts",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "account_id",
            "description": "<p>The account to delete</p> "
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>The valid JWT token provided by the {post} /users/login resource</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization header example:",
          "content": "\"Authorization\": \"JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNTVlNmU0ZTAwNTIzMGY0OTI3MWM3MDc4IiwiaWF0IjoxNDQxMTk1MjMyfQ.eWh9nuXVVSVDKKCmTMDoc9FBU55-KgkiOJH1hrdQRTQ\"",
          "type": "string"
        }
      ]
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "AuthenticationFailed",
            "description": "<p>The user can't be found.</p> "
          }
        ],
        "404": [
          {
            "group": "404",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "AccountNotFound",
            "description": "<p>The account can't be found.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "AuthenticationFailed:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "AccountNotFound:",
          "content": "HTTP/1.1 404 Not Found\n {\n     \"message\": \"Unknown account\"\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "204": [
          {
            "group": "204",
            "optional": false,
            "field": "-",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/accounts.js",
    "groupTitle": "Accounts"
  },
  {
    "type": "get",
    "url": "/accounts/:account_id",
    "title": "Get account",
    "version": "1.0.0",
    "name": "Get_account",
    "group": "Accounts",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "account_id",
            "description": "<p>The given account</p> "
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p> "
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>The valid JWT token provided by the {post} /users/login resource</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization header example:",
          "content": "\"Authorization\": \"JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNTVlNmU0ZTAwNTIzMGY0OTI3MWM3MDc4IiwiaWF0IjoxNDQxMTk1MjMyfQ.eWh9nuXVVSVDKKCmTMDoc9FBU55-KgkiOJH1hrdQRTQ\"",
          "type": "string"
        }
      ]
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "AuthenticationFailed",
            "description": "<p>The user can't be found.</p> "
          }
        ],
        "404": [
          {
            "group": "404",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "AccountNotFound",
            "description": "<p>The account can't be found.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "AuthenticationFailed:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "AccountNotFound:",
          "content": "HTTP/1.1 404 Not Found\n {\n     \"message\": \"Unknown account\"\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "<p>Object</p> ",
            "optional": false,
            "field": "account",
            "description": "<p>The account with its (sub)categories.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n     \"name\": \"Home\",\n     \"reference\": \"1234567890\",\n     \"user_id\": \"55e6e4e005230f49271c7078\",\n     \"_id\": \"55e8218912c65a1730c34858\",\n     \"created_at\": \"2015-09-03T10:31:37.889Z\",\n     \"categories\": [\n         {\n             \"key\": \"alimony_payments\",\n             \"label\": \"Alimony Payments\",\n             \"_id\": \"55e8218912c65a1730c34859\",\n             \"sub_categories\": []\n         },\n         {\n             \"key\": \"automobile_expenses\",\n             \"label\": \"Automobile Expenses\",\n             \"_id\": \"55e8218912c65a1730c3485a\",\n             \"sub_categories\": [\n                 {\n                     \"label\": \"Car Payment\",\n                     \"key\": \"car_payment\",\n                     \"_id\": \"55e8218912c65a1730c3485d\"\n                 }\n             ]\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/accounts.js",
    "groupTitle": "Accounts"
  },
  {
    "type": "put",
    "url": "/accounts/:account_id",
    "title": "Modify account",
    "version": "1.0.0",
    "name": "Modify_account",
    "group": "Accounts",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "account_id",
            "description": "<p>The account id to modify</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "name",
            "description": "<p>Name for the new account</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "reference",
            "description": "<p>A reference (bank account number) for the new account</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example: ",
          "content": "{\n    name: 'Home',\n    reference: '1234567890'\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p> "
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>The valid JWT token provided by the {post} /users/login resource</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization header example:",
          "content": "\"Authorization\": \"JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNTVlNmU0ZTAwNTIzMGY0OTI3MWM3MDc4IiwiaWF0IjoxNDQxMTk1MjMyfQ.eWh9nuXVVSVDKKCmTMDoc9FBU55-KgkiOJH1hrdQRTQ\"",
          "type": "string"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>The user can't be found.</p> "
          }
        ],
        "401": [
          {
            "group": "401",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "AuthenticationFailed",
            "description": "<p>The user can't be found.</p> "
          }
        ],
        "404": [
          {
            "group": "404",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "AccountNotFound",
            "description": "<p>The account can't be found.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "AuthenticationFailed:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 Bad Request\n [\n   {\n         \"field\": \"name\",\n         \"rule\": \"required\",\n         \"message\": \"Path `name` is required.\"\n     }\n ]",
          "type": "json"
        },
        {
          "title": "AccountNotFound:",
          "content": "HTTP/1.1 404 Not Found\n {\n     \"message\": \"Unknown account\"\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the User.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "token",
            "description": "<p>The JWT valid token.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n     \"name\": \"Home\",\n     \"reference\": \"1234567890\",\n     \"user_id\": \"55e6e4e005230f49271c7078\",\n     \"_id\": \"55e8218912c65a1730c34858\",\n     \"created_at\": \"2015-09-03T10:31:37.889Z\",\n     \"categories\": [\n         {\n             \"key\": \"alimony_payments\",\n             \"label\": \"Alimony Payments\",\n             \"_id\": \"55e8218912c65a1730c34859\",\n             \"sub_categories\": []\n         },\n         {\n             \"key\": \"automobile_expenses\",\n             \"label\": \"Automobile Expenses\",\n             \"_id\": \"55e8218912c65a1730c3485a\",\n             \"sub_categories\": [\n                 {\n                     \"label\": \"Car Payment\",\n                     \"key\": \"car_payment\",\n                     \"_id\": \"55e8218912c65a1730c3485d\"\n                 }\n             ]\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/accounts.js",
    "groupTitle": "Accounts"
  },
  {
    "type": "get",
    "url": "/accounts",
    "title": "List accounts",
    "version": "1.0.0",
    "name": "Retrieve_accounts",
    "group": "Accounts",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p> "
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>The valid JWT token provided by the {post} /users/login resource</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization header example:",
          "content": "\"Authorization\": \"JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNTVlNmU0ZTAwNTIzMGY0OTI3MWM3MDc4IiwiaWF0IjoxNDQxMTk1MjMyfQ.eWh9nuXVVSVDKKCmTMDoc9FBU55-KgkiOJH1hrdQRTQ\"",
          "type": "string"
        }
      ]
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "AuthenticationFailed",
            "description": "<p>The user can't be found.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "AuthenticationFailed:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"message\": \"Authentication failed\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "accounts",
            "description": "<p>List of all accounts and their (sub)categories.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n [{\n     \"name\": \"Home\",\n     \"reference\": \"1234567890\",\n     \"user_id\": \"55e6e4e005230f49271c7078\",\n     \"_id\": \"55e8218912c65a1730c34858\",\n     \"created_at\": \"2015-09-03T10:31:37.889Z\",\n     \"categories\": [\n         {\n             \"key\": \"alimony_payments\",\n             \"label\": \"Alimony Payments\",\n             \"_id\": \"55e8218912c65a1730c34859\",\n             \"sub_categories\": []\n         },\n         {\n             \"key\": \"automobile_expenses\",\n             \"label\": \"Automobile Expenses\",\n             \"_id\": \"55e8218912c65a1730c3485a\",\n             \"sub_categories\": [\n                 {\n                     \"label\": \"Car Payment\",\n                     \"key\": \"car_payment\",\n                     \"_id\": \"55e8218912c65a1730c3485d\"\n                 }\n             ]\n         }\n     ]\n }]",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/accounts.js",
    "groupTitle": "Accounts"
  },
  {
    "type": "post",
    "url": "/accounts/:account_id/entries",
    "title": "Create entry",
    "version": "1.0.0",
    "name": "Create_entry",
    "group": "Entries",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "account_id",
            "description": "<p>The account id to populate</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "amount",
            "description": "<p>Amount of the entry</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "date",
            "description": "<p>Date of the bill/deposit</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": true,
            "field": "category",
            "description": "<p>Category id of the bill/deposit</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": true,
            "field": "sub_category",
            "description": "<p>Sub category id of the bill/deposit</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": true,
            "field": "label",
            "description": "<p>A label for the entry</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example: ",
          "content": "{\n        amount: 1000,\n        date: 2015-09-03T10:04:11.481Z\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p> "
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>The valid JWT token provided by the {post} /users/login resource</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization header example:",
          "content": "\"Authorization\": \"JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNTVlNmU0ZTAwNTIzMGY0OTI3MWM3MDc4IiwiaWF0IjoxNDQxMTk1MjMyfQ.eWh9nuXVVSVDKKCmTMDoc9FBU55-KgkiOJH1hrdQRTQ\"",
          "type": "string"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>The user can't be found.</p> "
          }
        ],
        "401": [
          {
            "group": "401",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "AuthenticationFailed",
            "description": "<p>The user can't be found.</p> "
          }
        ],
        "404": [
          {
            "group": "404",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "AccountNotFound",
            "description": "<p>The account can't be found.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "AuthenticationFailed:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 Bad Request\n [\n   {\n         \"field\": \"amount\",\n         \"rule\": \"required\",\n         \"message\": \"Path `amount` is required.\"\n     }\n ]",
          "type": "json"
        },
        {
          "title": "AccountNotFound:",
          "content": "HTTP/1.1 404 Not Found\n {\n     \"message\": \"Unknown account\"\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "<p>Object</p> ",
            "optional": false,
            "field": "entry",
            "description": "<p>The created entry.</p> "
          },
          {
            "group": "201",
            "type": "<p>Object[]</p> ",
            "optional": false,
            "field": "entries",
            "description": "<p>All account's entries</p> "
          },
          {
            "group": "201",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "balance",
            "description": "<p>The account's total balance</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 201 Created\n{\n      entry: {\n          _id: '',\n          account_id: '1000',\n          type: 'DEPOSIT'\n          amount: 1000,\n          date: 2015-09-03T10:04:11.481Z\n      },\n      entries: [\n          {\n              _id: '',\n              account_id: '1000',\n              type: 'DEPOSIT'\n              amount: 1000,\n              date: 2015-09-03T10:04:11.481Z\n          }\n      ],\n      balance: 1000\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/accounts.js",
    "groupTitle": "Entries"
  },
  {
    "type": "delete",
    "url": "/accounts/:account_id/entries/:entry_id",
    "title": "Delete entry",
    "version": "1.0.0",
    "name": "Delete_entry",
    "group": "Entries",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "account_id",
            "description": "<p>The owner account</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "entry_id",
            "description": "<p>The entry to delete</p> "
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>The valid JWT token provided by the {post} /users/login resource</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization header example:",
          "content": "\"Authorization\": \"JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNTVlNmU0ZTAwNTIzMGY0OTI3MWM3MDc4IiwiaWF0IjoxNDQxMTk1MjMyfQ.eWh9nuXVVSVDKKCmTMDoc9FBU55-KgkiOJH1hrdQRTQ\"",
          "type": "string"
        }
      ]
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "AuthenticationFailed",
            "description": "<p>The user can't be found.</p> "
          }
        ],
        "404": [
          {
            "group": "404",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "AccountNotFound",
            "description": "<p>The account can't be found.</p> "
          },
          {
            "group": "404",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "EntryNotFound",
            "description": "<p>The entry can't be found.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "AuthenticationFailed:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "AccountNotFound:",
          "content": "HTTP/1.1 404 Not Found\n {\n     \"message\": \"Unknown account\"\n }",
          "type": "json"
        },
        {
          "title": "AccountNotFound:",
          "content": "HTTP/1.1 404 Not Found",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "204": [
          {
            "group": "204",
            "optional": false,
            "field": "-",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/accounts.js",
    "groupTitle": "Entries"
  },
  {
    "type": "get",
    "url": "/accounts/:account_id/entries",
    "title": "List account entries",
    "version": "1.0.0",
    "name": "List_entries",
    "group": "Entries",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "account_id",
            "description": "<p>The account id to retrieve</p> "
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p> "
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>The valid JWT token provided by the {post} /users/login resource</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization header example:",
          "content": "\"Authorization\": \"JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNTVlNmU0ZTAwNTIzMGY0OTI3MWM3MDc4IiwiaWF0IjoxNDQxMTk1MjMyfQ.eWh9nuXVVSVDKKCmTMDoc9FBU55-KgkiOJH1hrdQRTQ\"",
          "type": "string"
        }
      ]
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "AuthenticationFailed",
            "description": "<p>The user can't be found.</p> "
          }
        ],
        "404": [
          {
            "group": "404",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "AccountNotFound",
            "description": "<p>The account can't be found.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "AuthenticationFailed:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "AccountNotFound:",
          "content": "HTTP/1.1 404 Not Found\n {\n     \"message\": \"Unknown account\"\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "entries",
            "description": "<p>List of all account entries.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n [\n     {\n         _id: '',\n         account_id: '1000',\n         type: 'DEPOSIT'\n         amount: 1000,\n         date: 2015-09-03T10:04:11.481Z\n     }\n ]",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/accounts.js",
    "groupTitle": "Entries"
  },
  {
    "type": "post",
    "url": "/accounts/:account_id/entries/:entry_id",
    "title": "Modify entry",
    "version": "1.0.0",
    "name": "Modify_entry",
    "group": "Entries",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "account_id",
            "description": "<p>The owner account</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "entry_id",
            "description": "<p>The entry to modify</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "amount",
            "description": "<p>Amount of the entry</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "date",
            "description": "<p>Date of the bill/deposit</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": true,
            "field": "category",
            "description": "<p>Category id of the bill/deposit</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": true,
            "field": "sub_category",
            "description": "<p>Sub category id of the bill/deposit</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": true,
            "field": "label",
            "description": "<p>A label for the entry</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example: ",
          "content": "{\n        amount: 1000,\n        date: 2015-09-03T10:04:11.481Z\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p> "
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>The valid JWT token provided by the {post} /users/login resource</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization header example:",
          "content": "\"Authorization\": \"JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNTVlNmU0ZTAwNTIzMGY0OTI3MWM3MDc4IiwiaWF0IjoxNDQxMTk1MjMyfQ.eWh9nuXVVSVDKKCmTMDoc9FBU55-KgkiOJH1hrdQRTQ\"",
          "type": "string"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>The user can't be found.</p> "
          }
        ],
        "401": [
          {
            "group": "401",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "AuthenticationFailed",
            "description": "<p>The user can't be found.</p> "
          }
        ],
        "404": [
          {
            "group": "404",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "AccountNotFound",
            "description": "<p>The account can't be found.</p> "
          },
          {
            "group": "404",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "EntryNotFound",
            "description": "<p>The entry can't be found.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "AuthenticationFailed:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"message\": \"Authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 Bad Request\n [\n   {\n         \"field\": \"amount\",\n         \"rule\": \"required\",\n         \"message\": \"Path `amount` is required.\"\n     }\n ]",
          "type": "json"
        },
        {
          "title": "AccountNotFound:",
          "content": "HTTP/1.1 404 Not Found\n {\n     \"message\": \"Unknown account\"\n }",
          "type": "json"
        },
        {
          "title": "AccountNotFound:",
          "content": "HTTP/1.1 404 Not Found",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "<p>Object</p> ",
            "optional": false,
            "field": "entry",
            "description": "<p>The created entry.</p> "
          },
          {
            "group": "200",
            "type": "<p>Object[]</p> ",
            "optional": false,
            "field": "entries",
            "description": "<p>All account's entries</p> "
          },
          {
            "group": "200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "balance",
            "description": "<p>The account's total balance</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n      entry: {\n          _id: '',\n          account_id: '1000',\n          type: 'DEPOSIT'\n          amount: 1000,\n          date: 2015-09-03T10:04:11.481Z\n      },\n      entries: [\n          {\n              _id: '',\n              account_id: '1000',\n              type: 'DEPOSIT'\n              amount: 1000,\n              date: 2015-09-03T10:04:11.481Z\n          }\n      ],\n      balance: 1000\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/accounts.js",
    "groupTitle": "Entries"
  },
  {
    "type": "post",
    "url": "/users/login",
    "title": "Login",
    "version": "1.0.0",
    "name": "Login",
    "group": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p> "
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "username",
            "description": "<p>User's username</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "password",
            "description": "<p>User's password</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example: ",
          "content": "{ \n    \"username\": \"John\", \n    \"password\": \"s3cr3t\" \n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the User.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "token",
            "description": "<p>The JWT valid token.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"username\": \"John\",\n  \"token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNTVlNmU0ZTAwNTIzMGY0OTI3MWM3MDc4IiwiaWF0IjoxNDQxMTk1MjMyfQ.eWh9nuXVVSVDKKCmTMDoc9FBU55-KgkiOJH1hrdQRTQ\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "AuthenticationFailed",
            "description": "<p>The user can't be found.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "AuthenticationFailed:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"message\": \"Authentication failed\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "delete",
    "url": "/users/login",
    "title": "Logout",
    "version": "1.0.0",
    "name": "Logout",
    "group": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>The valid JWT token provided by the {post} /users/login resource</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization header example:",
          "content": "\"Authorization\": \"JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNTVlNmU0ZTAwNTIzMGY0OTI3MWM3MDc4IiwiaWF0IjoxNDQxMTk1MjMyfQ.eWh9nuXVVSVDKKCmTMDoc9FBU55-KgkiOJH1hrdQRTQ\"",
          "type": "string"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/users",
    "title": "Registration",
    "version": "1.0.0",
    "name": "Registration",
    "group": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p> "
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "username",
            "description": "<p>User's username</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "password",
            "description": "<p>User's password</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": true,
            "field": "language",
            "defaultValue": "en",
            "description": "<p>User's default language</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example: ",
          "content": "{ \n    \"username\": \"John\", \n    \"password\": \"s3cr3t\",\n    \"language\": \"en\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the User.</p> "
          },
          {
            "group": "201",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "token",
            "description": "<p>The JWT valid token.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n  \"username\": \"John\",\n  \"token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNTVlNmU0ZTAwNTIzMGY0OTI3MWM3MDc4IiwiaWF0IjoxNDQxMTk1MjMyfQ.eWh9nuXVVSVDKKCmTMDoc9FBU55-KgkiOJH1hrdQRTQ\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Validation errors.</p> "
          }
        ],
        "409": [
          {
            "group": "409",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "UserAlreadyExist",
            "description": "<p>The user can't be found.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "UserAlreadyExist:",
          "content": "HTTP/1.1 409 Not Found\n{\n  \"message\": \"Account already exists\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 Bad Request\n[\n   {\n         \"field\": \"password\",\n         \"rule\": \"required\",\n         \"message\": \"Path `password` is required.\"\n     },\n     {\n         \"field\": \"username\",\n         \"rule\": \"required\",\n         \"message\": \"Path `username` is required.\"\n     }\n ]",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "delete",
    "url": "/users",
    "title": "Unregistration",
    "version": "1.0.0",
    "name": "Unregistration",
    "group": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p> "
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>The valid JWT token provided by the {post} /users/login resource</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization header example:",
          "content": "\"Authorization\": \"JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNTVlNmU0ZTAwNTIzMGY0OTI3MWM3MDc4IiwiaWF0IjoxNDQxMTk1MjMyfQ.eWh9nuXVVSVDKKCmTMDoc9FBU55-KgkiOJH1hrdQRTQ\"",
          "type": "string"
        }
      ]
    },
    "success": {
      "fields": {
        "204": [
          {
            "group": "204",
            "optional": false,
            "field": "-",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "AuthenticationFailed",
            "description": "<p>The user can't be found.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "AuthenticationFailed:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"message\": \"Authentication failed\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/users.js",
    "groupTitle": "Users"
  }
] });