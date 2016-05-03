/**
 * Created by cbsejpal on 5/3/2016.
 */

/**
 * Created by cbsejpal on 5/2/2016.
 */

var app = angular.module('result', []);

app.controller('c-result', [ '$scope', '$http',
    function($scope, $http) {


        $scope.highCharts = function(data){
            for(var i=0;i<data.length;i++){

                Highcharts.chart('chartscontainer'+(i+1), {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    exporting: { enabled: false },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: 'Software - ' + data[i].source
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            }
                        }
                    },
                    series: [{
                        name: 'Bugs',
                        colorByPoint: true,
                        data: [{
                            name: 'Low',
                            y: data[i].low
                        }, {
                            name: 'Medium',
                            y: data[i].medium,
                            sliced: true,
                            selected: true
                        }, {
                            name: 'High',
                            y: data[i].high
                        }]
                    }]
                });
            }

        };

        $scope.init = function(){

            $http({
                method : "GET",
                url : '/charts/statistics',
            }).success(function(data) {
                $scope.highCharts(data);
            }).error(function(error) {
                console.log("error");
            });

        };

    }]);