/**
 * Created by cbsejpal on 4/29/2016.
 */

var dir = require('node-dir');
var fs = require('fs');


exports.getFiles = function getFiles(cb) {

    dir.subdirs('./dataset', function(err, subdirs) {
        if (err) throw err;

        for(var i=0;i<subdirs.length;i++){
            dir.files(subdirs[i], function(err, files) {
                if (err) throw err;
                //console.log(files);
                //console.log();
                cb(files);
            });

        }


    });

};