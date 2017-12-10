(function () {
    'use strict';
    
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    //.directive('foundItems', FoundItems)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");
    
    //function FoundItems () {
    //    var ddo = {
    //    templateUrl: 'foundItem.html',
    //        scope: {
    //          found: '<',
    //          onRemove: '&'
    //        }
    //    };
    //    
    //    return ddo;
    //}
    
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController (MenuSearchService) {
        var narrow = this;
                
        narrow.narrowList = function () {
            var promise = MenuSearchService.getMenuItems(narrow.itemName);
            
            promise.then(function (response) {
                var allMenuItems = response.data;
                console.log(allMenuItems[0]);
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
            //                for (var i = 0; i < foundMenuItems.length; i++) {
                                //console.log(foundMenuItems[i]);

            //                    if (foundMenuItems[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {

            //                        narrowedItems.push(foundMenuItems[i]);
            //                    }
            //                }

            //                console.log(narrowedItems);

                            //return processed items
            //                return narrowedItems;
            //            });

                
            
            //} else {
            //    return narrowedItems;
            //}
        };
        
        //service.getMatchedMenuItems = function () {
        
        service.removeItem = function (itemIndex) {
            narrowedItems.splice(itemIndex, 1);
        };
    }
    
    
})();