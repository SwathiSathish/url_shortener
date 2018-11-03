const urlRoutes = require('./url.routes');


module.exports = function(app, db) {
    urlRoutes(app, db);
};
