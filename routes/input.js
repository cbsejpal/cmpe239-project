/**
 * Created by cbsejpal on 4/27/2016.
 */

var fs = require('fs');
var csv = require("fast-csv");

//get csv data

exports.getData = function getData(cb){
    var mainData = [];
    var stream = fs.createReadStream("./dataset/xerces-1.4.csv");

    var csvStream = csv()
        .on("data", function(data){

            var eachData = [];
            if(data[3] == "wmc"){

            }
            else {
                //wmc-3, dit-4, noc-5, cbo-6, rfc-7, lcom-8, bugs-23
                eachData.push(parseFloat(data[3]));
                eachData.push(parseFloat(data[4]));
                eachData.push(parseFloat(data[5]));
                eachData.push(parseFloat(data[6]));
                eachData.push(parseFloat(data[7]));
                eachData.push(parseFloat(data[8]));
                eachData.push(parseInt(data[23]));
                mainData.push(eachData);
            }
        })
        .on("end", function(){
            cb(mainData);
        });

    stream.pipe(csvStream);
};

exports.addData = function addData(clusters, dataset, meanArray){

    var writeStream = csv.createWriteStream({headers: true}),
        writableStream = fs.createWriteStream("./dataset/clusteredData.csv");

    writableStream.on("finish", function(){
        console.log("File write success!");
    });

    var keysSorted = Object.keys(meanArray).sort(function(a,b){return meanArray[a]-meanArray[b]});

    writeStream.pipe(writableStream);

    for(var i=0;i<clusters.length;i++){
        var bugs;

        if(keysSorted[i] == 0){
            bugs = "low"
        }
        else if(keysSorted[i] == 1){
            bugs = "medium";
        }
        else{
            bugs = "high"
        }

        for(var j=0;j<clusters[i].length;j++){

            writeStream.write({wmc: dataset[clusters[i][j]][0], dit: dataset[clusters[i][j]][1], noc: dataset[clusters[i][j]][2], cbo: dataset[clusters[i][j]][3], rfc: dataset[clusters[i][j]][4], lcom: dataset[clusters[i][j]][5], bugs: bugs});
        }
    }
    writeStream.end();

};