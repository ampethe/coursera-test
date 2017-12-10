(function () {
    'use strict';
    
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItems)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");
    
    function FoundItems () {
        var ddo = {
        templateUrl: 'foundItem.html',
            scope: {
              found: '<',
              onRemove: '&'
            }
        };
        
        return ddo;
    }
    
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController (MenuSearchService) {
        var narrow = this;
                
        narrow.narrowList = function () {
            var promise = MenuSearchService.getMenuItems(narrow.itemName);
            
            promise.then(function (response) {
                var allMenuItems = response.data["menu_items"];
                //console.log(allMenuItems);
                
                var matchedMenuItems = MenuSearchService.getMatchedMenuItems(allMenuItems, narrow.itemName);
                console.log(matchedMenuItems);
            }).catch(function (error) {
                console.log(error);
            });
              
            //console.log(narrow.found);
            //if (narrow.itemName === undefined || narrow.found === undefined || narrow.found.length == 0) {
            //    narrow.nothingMessage = "Nothing found";
            //} else {
            //    narrow.nothingMessage = "";
            //}
        }
        
        narrow.removeItem = function (itemIndex) {
            MenuSearchService.removeItem(itemIndex);
        }
        
        
    }
    
    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService ($http, ApiBasePath) {
        var service = this;
        var narrowedItems = [];
        
        service.getMenuItems = function () {
            
            //if (searchTerm !== undefined && searchTerm != "") {
            
                var response = $http({
                  method: "GET",
                  url: (ApiBasePath + "/menu_items.json")
                });
            
            return response;
            
            //.then(function (response) {
                            //process result and only keep items that matched
            //                var foundItems = response.data;

                            //console.log(foundItems['menu_items']);
            //                var foundMenuItems = foundItems['menu_items'];
            //                

            //                console.log(narrowedItems);

                            //return processed items
            //                return narrowedItems;
            //            });

                
            
            //} else {
            //    return narrowedItems;
            //}
        };
        
        service.getMatchedMenuItems = function (allItems, searchTerm) {
            var narrowedItems = [];
            //console.log(searchTerm);
            //console.log(allItems);
            for (var i = 0; i < allItems.length; i++) {
                //console.log(foundMenuItems[i]);
                if (allItems[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
                    narrowedItems.push(allItems[i]);
                }
            }
            //console.log(searchTerm);
            return narrowedItems;
            //console.log(narrowedItems);
        };
        
        service.removeItem = function (itemIndex) {
            narrowedItems.splice(itemIndex, 1);
        };
    }
    
    
})();