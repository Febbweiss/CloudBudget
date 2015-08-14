module.exports = {
    errorHandler : function(errors, status, response) {
        var message = []
        if( errors.errors) {
            Object.keys(errors.errors).forEach(function (field) {
                var error = errors.errors[field];
                message.push({
                    field: error.path,
                    rule: error.kind,
                    message: error.message
                });
            });
            return response.status(status).json(message);
        } else {
            return response.status(status).end();
        }
    }
}