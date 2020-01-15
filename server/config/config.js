/**
 * main configuration file
 */
const config = {
    production :{
        SECRET : 'SUPERSECRETPASSWORD123',
        DATABASE : 'mongodb://54.185.16.135:27017/booksShelf'
    },
    default : {
        SECRET : 'SUPERSECRETPASSWORD123',
        DATABASE : 'mongodb://54.185.16.135:27017/booksShelf'
    }
}

exports.get = function get(env){
    return config[env] || config.default
}

