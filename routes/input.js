/**
 * Created by cbsejpal on 4/27/2016.
 */

var fs = require('fs');
var csv = require("fast-csv");
var clusterSchema = require('./model/clusterSchema');
var Clusters = clusterSchema.Clusters;
//get csv data

var counter = 0;


exports.resetCounter = function resetCounter(){
  counter = 0;
};

exports.addData = function getData(filename, cb){ //, y, length, cb){
    var mainData = [];

    var stream = fs.createReadStream(".\\"+ filename);

    var source = filename.substring(filename.indexOf('\\')+1, filename.indexOf('\\', filename.indexOf('\\')+1));

    var csvStream = csv()
        .on("data", function(data){

            var eachData = [];
            if(data[3] == "wmc" || ! (data.length > 0)){

            }
            else {
                //wmc-3, dit-4, noc-5, cbo-6, rfc-7, lcom-8, bugs-23

                var newCluster = new Clusters({
                    wmc: parseFloat(data[3]),
                    dit: parseFloat(data[4]),
                    noc: parseFloat(data[5]),
                    cbo: parseFloat(data[6]),
                    rfc: parseFloat(data[7]),
                    lcom: parseFloat(data[8]),
                    bugs: parseFloat(data[23]),
                    //bugFreq: bugs,
                    //file: filename,
                    source: source
                });

                newCluster.save(function (err) {

                    if(err){
                        console.log(filename);
                        console.log(data);
                        console.log(err);
                    }
                });

            }
        })
        .on("end", function(err){
            //cb(mainData, counter++, length, filename);
            cb();
        });

    stream.pipe(csvStream);
};

/*exports.addData = function addData(clusters, dataset, meanArray, source){

/!*    var writeStream = csv.createWriteStream({headers: true}),
        writableStream = fs.createWriteStream("./clustered data/clusteredData.csv");

    writableStream.on("finish", function(){
        console.log("File write success!");
    });*!/

    var keysSorted = Object.keys(meanArray).sort(function(a,b){return meanArray[a]-meanArray[b]});

    //writeStream.pipe(writableStream);

    for(var i=0;i<clusters.length;i++){
        var bugs;

        if(keysSorted[i] == 0){
            bugs = "low";
        }
        else if(keysSorted[i] == 1){
            bugs = "medium";
        }
        else{
            bugs = "high";
        }

        for(var j=0;j<clusters[i].length;j++){
            //console.log(i + " " + j);
            var newCluster = new Clusters({
                wmc: dataset[clusters[i][j]][0],
                dit: dataset[clusters[i][j]][1],
                noc: dataset[clusters[i][j]][2],
                cbo: dataset[clusters[i][j]][3],
                rfc: dataset[clusters[i][j]][4],
                lcom: dataset[clusters[i][j]][5],
                bugs: dataset[clusters[i][j]][6],
                bugFreq: bugs,
                //file: filename,
                source: source
            });

            newCluster.save(function (err) {

                if(err){
                    console.log(err);
                }
            });
            //writeStream.write({wmc: dataset[clusters[i][j]][0], dit: dataset[clusters[i][j]][1], noc: dataset[clusters[i][j]][2], cbo: dataset[clusters[i][j]][3], rfc: dataset[clusters[i][j]][4], lcom: dataset[clusters[i][j]][5], bugs: bugs});
        }
    }
    //writeStream.end();

};*/




exports.getMongoData = function getMongoData(source, cb){

    Clusters.find({source: source}, function(err, clusters){
        if (!err){
            //console.log(clusters.length);
            cb(clusters);
        } else {throw err;}
    });
};
