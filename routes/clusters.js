/**
 * Created by cbsejpal on 4/26/2016.
 */

//modules
var clustering = require('density-clustering');
var fs = require('fs');

var clusterSchema = require('./model/clusterSchema');
var Clusters = clusterSchema.Clusters;

var events = require('events');
var eventEmitter = new events.EventEmitter();

//routes
var input = require('./input');
var fileio = require('./fileio');
var express = require('express');
var router = express.Router();

router.get('/addData', function(req, res, next) {
    //res.render('index', { title: 'Express' });

    fileio.getFiles(function(files){
        for(var i =0; i<files.length;i++){

            input.addData(files[i], function(err) {
                if(err){
                    console.log(err);
                }
            });
        }
    });

    setTimeout(function(){
        res.send("Done");
    },10000);

});

router.get('/clusterData', function(req, res, next) {

    var source = req.param('source');

    input.getMongoData(source, function (clusters){

        var newData = [];

        for(var x=0;x<clusters.length;x++){
            var inData = [];
            inData.push(clusters[x].bugs);
            newData.push(inData);
        }

        var kmeans = new clustering.KMEANS();

        var clusteredData = kmeans.run(newData, 3);

        var meanArray = {};

        for(var i = 0; i<clusteredData.length; i++) {
            var sum = 0;
            var mean = 0;

            for(var j=0;j<clusteredData[i].length;j++){
                sum += parseFloat(clusters[clusteredData[i][j]].bugs);
            }

            mean = sum/clusteredData[i].length;
            meanArray[i] = mean;

        }

        var keysSorted = Object.keys(meanArray).sort(function(a,b){return meanArray[a]-meanArray[b]});

        var bugs = [];
        for(var i=0;i<clusteredData.length;i++) {

            if (i == 0) {
                bugs[keysSorted[i]] = "low";
            }
            else if (i == 1) {
                bugs[keysSorted[i]] = "medium";
            }
            else if(i == 2){
                bugs[keysSorted[i]] = "high";
            }
        }

        for(var i=0;i<clusteredData.length;i++) {

            for(var j=0;j<clusteredData[i].length;j++){

                Clusters.findOneAndUpdate({_id: clusters[clusteredData[i][j]]._id}, {bugFreq: bugs[i]}  , {upsert: true}, function(err){
                    if(err){
                        console.error(err);
                        return err;
                    }
                });
            }
        }
        //console.log("Done dunna done done");

        setTimeout(function(){
            res.send("Don  don don");
        },10000);


    });
});


router.get('/getData', function(req, res, next) {

    var source = req.param('source');

    input.getMongoData(source, function(clusters){
        res.send(clusters);
    });
});

module.exports = router;


/*
exports.addClusteredData = function addClusteredData(){

    fileio.getFiles(function(files){

        for(var i =0; i<files.length;i++){

            input.getData(files[i], function(err) {
                if(err){
                    console.log(err);
                }
            });
        }


    });

};
*/




/*exports.getClustes = function getClusters(){

    var dbscan = new clustering.DBSCAN();

    var mainData = input.getData(filename, function(data){

        var newData = [];

        for(var i=0;i<data.length;i++){
            var inData = [];
            inData.push(data[i][6]);
            newData.push(inData);
        }

        var clusters = dbscan.run(newData,3,2);

        var meanArray = {};

        for(var i = 0; i<clusters.length; i++) {
            var sum = 0;
            var mean = 0;

            for(var j=0;j<clusters[i].length;j++){
                sum += parseFloat(data[clusters[i][j]][6]);
                console.log(i + " "+ data[clusters[i][j]]);
            }

            console.log("length " + clusters[i].length);

            mean = sum/clusters[i].length;
            meanArray[i] = mean;

        }
        console.log("noise " + dbscan.noise);
        input.addData(clusters, data, meanArray);

    });


};

exports.addClusteredData = function addClusteredData(){

    fileio.getFiles(function(files){
        //console.log("files length " + files.length);
        var newData = [];
        var clusterData = [];
        var y, z;
        for(y=0;y<files.length;y++){
            //console.log("y " + y);
            input.getData(files[y], y, files.length-1, function(data, x, length, filename){
                //console.log("yo " + x);

                for(z=0;z<data.length;z++){
                    var outData = [];

                    outData.push(data[z][0]);
                    outData.push(data[z][1]);
                    outData.push(data[z][2]);
                    outData.push(data[z][3]);
                    outData.push(data[z][4]);
                    outData.push(data[z][5]);
                    outData.push(data[z][6]);

                    clusterData.push(outData);
                    var inData = [];
                    inData.push(data[z][6]);
                    newData.push(inData);
                }
                console.log("x " + x + " filename" + filename);
                console.log("length " + length);
                if(x == length){
                    console.log("event emitted " + x + " " + filename);
                    console.log("file name " + filename);
                    input.resetCounter();
                    eventEmitter.emit('end', "source", newData, clusterData);
                }

            });


        }
    });

};

eventEmitter.on('end', function(source, newData, clusterData){
    generateClusters(source, newData, clusterData);
});

var generateClusters = function (source, newData, data) {

    var dbscan = new clustering.DBSCAN();

    var clusters = dbscan.run(newData,3,2);

    var meanArray = {};

    for(var i = 0; i<clusters.length; i++) {
        var sum = 0;
        var mean = 0;

        for(var j=0;j<clusters[i].length;j++){
            sum += parseFloat(data[clusters[i][j]][6]);
        }

        mean = sum/clusters[i].length;
        meanArray[i] = mean;
        console.log("noise " + dbscan.noise);
    }

    input.addData(clusters, data, meanArray, source);
};
 */