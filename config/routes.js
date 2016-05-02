/**
 * Created by cbsejpal on 4/30/2016.
 */

var routes = require('../routes/index');
var clusters = require('../routes/clusters');
var upload = require('../routes/upload');

var router = {
    setupRoutes: function (app) {
        app.use('/', routes);
        app.use('/clusters', clusters);
        app.use('/fileUpload', upload);

    }
};

module.exports = router;