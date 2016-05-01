/**
 * Created by cbsejpal on 4/30/2016.
 */

var routes = require('../routes/index');
var clusters = require('../routes/clusters');

var router = {
    setupRoutes: function (app) {
        app.use('/', routes);
        app.use('/clusters', clusters);
    }
};

module.exports = router;