(function () {
    'use strict';
    
    angular.module('LCApp', []).controller('LunchCheckController', LunchCheckController);
    
    LunchCheckController.inject = ['$scope'];
    
    function LunchCheckController($scope) {
        $scope.lunchArray = [];
        $scope.lunchCount = 0;
        $scope.msgLunch = "";
        
        $scope.checkLunch = function () {
            $scope.lunchArray = $scope.lunchString.split(",");
            $scope.lunchCount = $scope.lunchArray.length;
            if ($scope.lunchCount > 3) {
                $scope.msgLunch = "Too much!";
            } else {
                $scope.msgLunch = "Enjoy!";
            }
            
            if ($scope.lunchString == "") {
                $scope.msgLunch = "";                
            }
        };
    }
})();