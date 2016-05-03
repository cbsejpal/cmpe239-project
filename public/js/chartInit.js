/**
 * Created by Manthan on 2016-04-30.
 */


function initBarGraph(){

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 1000 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10, "%");

    var svg = d3.select("#barPara").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.tsv("data\\algoComparisonData.tsv", type, function(error, data) {
        if (error) throw error;

        x.domain(data.map(function(d) { return d.algo; }));
        y.domain([0, d3.max(data, function(d) { return d.accuracy; })]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Accuracy");

        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.algo); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(d.accuracy); })
            .attr("height", function(d) { return height - y(d.accuracy); })
            .append("text")
            .attr("class", "bar-Text")
            .attr("x", function(d) { return x(d.algo); })
            .attr("y", function(d) { return 4+y(d.accuracy); })
            .attr("dx", ".71em")
            .text(function(d) { return y(d.accuracy); });

    });

    function type(d) {
        d.accuracy = +d.accuracy;
        return d;
    }
}

function getData(){
    var data = [];
    for(var i=0;i<=10;i++){
        data.push({x:i,y:2*i});
    }
    return data;
}