/**
 * Created by cbsejpal on 5/3/2016.
 */

/**
 * Created by cbsejpal on 5/2/2016.
 */

var myApp = angular.module('result', ['angular-loading-bar'])
    .config(function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = true;
    });

myApp.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

myApp.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .success(function(data){
                //alert(JSON.stringify(data));
                //$scope.highCharts(data);

                $http({
                    method : "POST",
                    url : '/charts/results',
                    data: {
                        'json': data.json
                        //'source': source
                    }
                }).success(function(mainData) {
                    //$scope.highCharts(data);
                    //alert('highcharts success');



                    Highcharts.chart('chartscontainer', {
                        chart: {
                            type: 'scatter',
                            zoomType: 'xy'
                        },
                        exporting: { enabled: false },
                        credits: {
                            enabled: false
                        },
                        title: {
                            text: 'WMC and DIT w.r.t Bugs prediction'
                        },
                        subtitle: {
                            text: 'Source: '+ data.source
                        },
                        xAxis: {
                            title: {
                                enabled: true,
                                text: 'WMC'
                            },
                            startOnTick: true,
                            endOnTick: true,
                            showLastLabel: true
                        },
                        yAxis: {
                            title: {
                                text: 'DIT'
                            }
                        },
                        legend: {
                            layout: 'vertical',
                            align: 'left',
                            verticalAlign: 'top',
                            x: 100,
                            y: 70,
                            floating: true,
                            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
                            borderWidth: 1
                        },
                        plotOptions: {
                            scatter: {
                                marker: {
                                    radius: 5,
                                    states: {
                                        hover: {
                                            enabled: true,
                                            lineColor: 'rgb(100,100,100)'
                                        }
                                    }
                                },
                                states: {
                                    hover: {
                                        marker: {
                                            enabled: false
                                        }
                                    }
                                },
                                tooltip: {
                                    headerFormat: '<b>{series.name}</b><br>',
                                    pointFormat: '{point.x}, {point.y}'
                                }
                            }
                        },
                        series: [{
                            name: 'Low',
                            color: 'rgba(223, 83, 83, .5)',
                            data: mainData.low

                        }, {
                            name: 'Medium',
                            color: 'rgba(119, 152, 191, .5)',
                            data: mainData.medium
                        }, {
                            name: 'High',
                            color:  'rgba(129, 112, 191, .5)',
                            data: mainData.high
                        }]
                    });
                }).error(function(error) {
                    console.log("error");
                });


            })
            .error(function(){
            });
    }
}]);

myApp.controller('c-result', [ '$scope', '$http', 'fileUpload',
    function($scope, $http, fileUpload) {

        $scope.uploadFile = function(){
            var file = $scope.fileModel;
            alert('file is ' );
            //alert(JSON.stringify(file));
            var uploadUrl = "/fileUpload/uploadFile";
            fileUpload.uploadFileToUrl(file, uploadUrl);

            //$scope.
        };


        $scope.highCharts = function(data){

                alert("data came");


        };

        $scope.init = function(json){

            //var data = JSON.parse(json.json);
            //alert("lol");
            //alert(data);

            $http({
                method : "POST",
                url : '/charts/results',
                data: {
                    'json': json,
                    'source': source
                }
            }).success(function(data) {
                //$scope.highCharts(data);
                //alert('');
            }).error(function(error) {
                console.log("error");
            });

        };

        $scope.submit = function(){

            alert("submit");

            $http({
                method: "POST",
                url: '/fileUpload/uploadFile',
                data: {
                    'file': $scope.fileModel
                }
            }).success(function(data){
                $scope.init(data);
            }).error(function(error) {
                console.log("error");
            });
        };

    }]);