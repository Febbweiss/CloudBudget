module.exports = {
    development: {
        port    : process.env.PORT || 3000,
        server  : process.env.IP || '0.0.0.0',
        errorHandlerOptions: {"dumpExceptions": true, "showStack": true}
    },
    test: {
        port    : 3000,
        server  : 'localhost',
        errorHandlerOptions: {"dumpExceptions": false, "showStack": false}
    },
    production: {
        port    : process.env.PORT || 3000,
        server  : process.env.IP || '0.0.0.0',
        errorHandlerOptions: {"dumpExceptions": false, "showStack": false}
    },
}