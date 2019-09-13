//run defferent ports for website and api server 
const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/api/', { target: 'http://localhost:3001/' }));
};