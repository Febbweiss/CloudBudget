module.exports = {
    development: {
        url: 'mongodb://' + process.env.IP + ':27017/cloudbudget_dev'
    },
    test: {
        url: 'mongodb://localhost:27017/cloudbudget_test'
    },
    production: {
        url: 'mongodb://' + process.env.IP + ':27017/cloudbudget'
    },
}