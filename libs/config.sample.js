// config
var config = {
    title: 'title',
    desc: 'desc',
    version: require('../package.json').version,
    root: 'http://127.0.0.1:3000',
    readability: {
        consumer_key: 'your key here',
        consumer_secret: 'your secret here',
        token: '',
        token_secret: ''
    },
    smtp: {
        server: '',
        port: 25,
        useAuth: true,
        email: "",
        password: "",
        from: ' mike<mike@gmail.com>'
    },
    firebase: {
        cave: 'your firebase url here',
        user: 'your firebase user name',
        password: 'your firebase password'
    }
}

module.exports = function(type) {
    return config[type];
}