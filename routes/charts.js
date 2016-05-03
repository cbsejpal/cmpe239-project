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

router.get('/defect_analysis', function(req, res) {

    var response = {"dataset":[],"data":[]};


    Clusters.find().distinct('source', function(err, sources){
        //console.log(sources);

        var counter = 0;
        for(var i = 0; i <sources.length;i++){
            var jsonObject = {sources:["wmc","dit","noc","cbo","rfc","lcom"],series:[]};

            Clusters.find({source: sources[i]}, function(err, clusters){
                var source = clusters[0].source;
                response.dataset.push(clusters[0].source);
//                console.log("source " + source);

                var lowCounter = 0, mediumCounter = 0, highCounter = 0;
                var lowwmc= 0,highwmc = 0, mediumwmc = 0;
                var lowdit= 0,highdit = 0, mediumdit = 0;
                var lownoc= 0,highnoc = 0, mediumnoc = 0;
                var lowcbo= 0,highcbo = 0, mediumcbo = 0;
                var lowrfc= 0,highrfc = 0, mediumrfc = 0;
                var lowlcom= 0,highlcom = 0, mediumlcom = 0;


                if (!err){

                    for(var j = 0; j<clusters.length;j++){
                        if(clusters[j].bugFreq == "low"){
                            lowCounter++;
                            lowwmc += clusters[j].wmc;
                            lowdit += clusters[j].dit;
                            lownoc += clusters[j].noc;
                            lowcbo += clusters[j].cbo;
                            lowrfc += clusters[j].rfc;
                            lowlcom += clusters[j].lcom;
                        }
                        else if(clusters[j].bugFreq == "medium"){
                            mediumCounter++;
                            mediumwmc += clusters[j].wmc;
                            mediumdit += clusters[j].dit;
                            mediumnoc += clusters[j].noc;
                            mediumcbo += clusters[j].cbo;
                            mediumrfc += clusters[j].rfc;
                            mediumlcom += clusters[j].lcom;
                        }
                        else{
                            highCounter++;
                            highwmc += clusters[j].wmc;
                            highdit += clusters[j].dit;
                            highnoc += clusters[j].noc;
                            highcbo += clusters[j].cbo;
                            highrfc += clusters[j].rfc;
                            highlcom += clusters[j].lcom;
                        }
                    }


                    if(jsonObject.series.length == 0){
                        jsonObject.series.push({"name":"low",data:[]});
                        jsonObject.series.push({"name":"medium",data:[]});
                        jsonObject.series.push({"name":"high",data:[]});
                    }

                    jsonObject.series[0].data.push(lowwmc/lowCounter);
                    jsonObject.series[1].data.push(mediumwmc/mediumCounter);
                    jsonObject.series[2].data.push(highwmc/highCounter);

                    jsonObject.series[0].data.push(lowdit*10/lowCounter);
                    jsonObject.series[1].data.push(mediumdit*10/mediumCounter);
                    jsonObject.series[2].data.push(highdit*10/highCounter);

                    jsonObject.series[0].data.push(lownoc*10/lowCounter);
                    jsonObject.series[1].data.push(mediumnoc*10/mediumCounter);
                    jsonObject.series[2].data.push(highnoc*10/highCounter);

                    jsonObject.series[0].data.push(lowcbo/lowCounter);
                    jsonObject.series[1].data.push(mediumcbo/mediumCounter);
                    jsonObject.series[2].data.push(highcbo/highCounter);

                    jsonObject.series[0].data.push(lowrfc/(lowCounter*2));
                    jsonObject.series[1].data.push(mediumrfc/(mediumCounter*2));
                    jsonObject.series[2].data.push(highrfc/(highCounter*2));

                    jsonObject.series[0].data.push(lowlcom/(lowCounter*13));
                    jsonObject.series[1].data.push(mediumlcom/(mediumCounter*13));
                    jsonObject.series[2].data.push(highlcom/(highCounter*13));

                    //console.log(jsonObject);
                    counter++;
                    response.data.push(jsonObject);
                    jsonObject = {sources:["wmc","dit","noc","cbo","rfc","lcom"],series:[]};

                    if(counter == sources.length){
                        console.log(response);
                        res.send(response);
                    }
                } else {throw err;}
            });

        }

    });


});


router.post('/results', function(req, res){

    var jsonObject = req.param('json');
    //var source = req.param('source');

/*
    for(var i=0;i<jsonObject.length;i++){
        console.log(JSON.stringify(jsonObject[i]));
    }
*/


    //console.log(source);

    var low = [];
    var medium = [];
    var high = [];

    var json = {};

    //json.source = source;

    for(var i=0;i<jsonObject.length;i++){

        var data = [];

        if(jsonObject[i].bugFreq == "low"){
            data.push(jsonObject[i].wmc);
            data.push(jsonObject[i].dit);
            low.push(data);
        }
        else if(jsonObject[i].bugFreq == "medium"){

            data.push(jsonObject[i].wmc);
            data.push(jsonObject[i].dit);
            medium.push(data);
        }
        else if(jsonObject[i].bugFreq == "high"){

            data.push(jsonObject[i].wmc);
            data.push(jsonObject[i].dit);
            high.push(data);
        }

        if(i == jsonObject.length - 1){
            json.low = low;
            json.medium = medium;
            json.high = high;

            res.send(json);
        }

    }

});

/*router.post('/results', function(req, res){

    var jsonObject = req.params('json');
    var source = req.params('source');

    var low = [], medium = [], high = [];

//    var counter = 0 ;
    var json = {};

    json.source = source;

    for(var i=0;i<jsonObject.length;i++){

        var data = [];

        if(jsonObject[i].bugFreq == "low"){
            data.push(jsonObject[i].wmc);
            data.push(jsonObject[i].dit);
            low.push(data);
       //     console.log("low " + jsonObject[i]);
     //       counter++;
        }
        else if(jsonObject[i].bugFreq == "medium"){
            data.push(jsonObject[i].wmc);
            data.push(jsonObject[i].dit);
            medium.push(data);
   //         console.log("medium " + jsonObject[i]);
 //           counter++;
        }
        else if(jsonObject[i].bugFreq == "high"){
            data.push(jsonObject[i].wmc);
            data.push(jsonObject[i].dit);
            high.push(data);
//            console.log("high " + jsonObject[i]);
//            counter++;
        }

        if(i == jsonObject.length - 1){

            json.low = low;
            json.medium = medium;
            json.high = high;

            console.log(json);

            res.send(json);
        }

    }

});*/


module.exports = router;