(function () {
    'use strict';
    
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('MenuItemListDirective', MenuItemListDirective)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");
    
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController (MenuSearchService) {
        var narrow = this;
        
        narrow.narrowList = function () {
            var narrowedItems = MenuSearchService.getMatchedMenuItems(narrow.itemName);    
        }
    }
    
    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService ($http, ApiBasePath) {
        var service = this;
        
        service.getMatchedMenuItems = function (searchTerm) {
            var response = $http({
              method: "GET",
              url: (ApiBasePath + "/categories.json")
            }).then(function (response) {
                        //process result and only keep items that matched
                        //var foundItems = 
                        console.log(response.data);
                        
                        //return processed items
                        return foundItems;
                    });

            return response;
        };
    }
})();