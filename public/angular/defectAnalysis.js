/*
Created by rushil
 */
var app = angular.module('defectAnalysis', ['angular-loading-bar'])
    .config(function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = true;
    });

app.controller('analysis', [ '$scope', '$http',
    function($scope, $http) {

        $scope.init = function(){

            $http({
                method : "GET",
                url : '/charts/defect_analysis'
            }).success(function(data) {
                $scope.highCharts(data);
            }).error(function(error) {
                console.log("error");
            });

        };

        $scope.highCharts = function(data){
            for(var i=0;i<data.data.length;i++){

                Highcharts.chart('chartscontainer'+(i+1), {
                    chart: {
                        type: 'column'
                    },
                    exporting: { enabled: false },
                    credits: {
                        enabled: false
                    },
                    xAxis: {
                        categories: data.data[i].sources,
                        crosshair: true
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Analysis'
                        }
                    },
                    title: {
                        text: 'Software - '+data.dataset[i]
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        }
                    },
                    series: [{
                        name: data.data[i].series[0].name,
                        data: data.data[i].series[0].data

                    }, {
                        name: data.data[i].series[1].name,
                        data: data.data[i].series[1].data

                    }, {
                        name: data.data[i].series[2].name,
                        data: data.data[i].series[2].data

                    }]
                });
            }

        };



    }]);
