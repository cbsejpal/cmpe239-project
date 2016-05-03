/**
 * Created by cbsejpal on 5/2/2016.
 */

var express = require('express');
var router = express.Router();
var clusterSchema = require('./model/clusterSchema');
var Clusters = clusterSchema.Clusters;

router.get('/statistics', function(req, res) {

    var jsonObject = [];


    Clusters.find().distinct('source', function(err, sources){
        //console.log(sources);

        var counter = 0;
        for(var i = 0; i <sources.length;i++){


            Clusters.find({source: sources[i]}, function(err, clusters){
                var source = clusters[0].source;
//                console.log("source " + source);
                var dataObject = {};
                var lowCounter = 0, mediumCounter = 0, highCounter = 0;
                if (!err){

                    for(var j = 0; j<clusters.length;j++){
                        if(clusters[j].bugFreq == "low"){
                            lowCounter++;
                        }
                        else if(clusters[j].bugFreq == "medium"){
                            mediumCounter++;
                        }
                        else{
                            highCounter++;
                        }
                    }

                    dataObject.source = source;
                    dataObject.low = lowCounter;
                    dataObject.medium = mediumCounter;
                    dataObject.high = highCounter;

                    //console.log('data ' + dataObject );

                    jsonObject.push(dataObject);
                    //console.log(jsonObject);
                    counter++;

                    if(counter == sources.length){
                        res.send(jsonObject);
                    }
                } else {throw err;}
            });

        }

    });


});

module.exports = router;