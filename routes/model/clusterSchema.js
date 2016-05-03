/**
 * Created by cbsejpal on 4/29/2016.
 */

var mongoose = require('mongoose');
var connection = mongoose.createConnection("mongodb://localhost:27017/cmpe239");
var Schema = mongoose.Schema;


//wmc, dit, noc, cbo, rfc, lcom, bugs, bugsfreq, source
var clustersSchema = new Schema({
    wmc: {type: Number, required:true},
    dit: {type: Number, required:true},
    noc: {type: Number, required:true},
    cbo: {type: Number, required:true},
    rfc: {type: Number, required:true},
    lcom: {type: Number, required:true},
    bugs: {type: Number, required: true},
    bugFreq: {type: String},
    //file: {type: String},
    source: {type: String, required: true},
    class: {type: String}
}, {
    versionKey : false
});

//create Rides model from schema
var Clusters = mongoose.model('Clusters', clustersSchema);

exports.Clusters = Clusters;
