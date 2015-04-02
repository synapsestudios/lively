module.exports = {
    lively : {
        hostname : 'localhost',
        port     : 9001
    },
    apis : {
        example: require('./config/config.example'),
        github : require('./config/config.github')
    }
};
