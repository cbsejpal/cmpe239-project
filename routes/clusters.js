/**
 * Created by cbsejpal on 4/26/2016.
 */

var clustering = require('density-clustering');
var input = require('./input');
exports.getClustes = function getClusters(){

    var dbscan = new clustering.DBSCAN();

    var mainData = input.getData(function(data){

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


