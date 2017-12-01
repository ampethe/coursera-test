(function () {
    'use strict';
    
    angular.module('ShoppingApp', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingService', ShoppingService);
    
    ToBuyController.$inject = ['ShoppingService'];
    
    function ToBuyController (ShoppingService) {
        var ToBuy = this;
        
        ToBuy.items = ShoppingService.getItems();

        ToBuy.moveToBought = function (itemIndex) {
            ShoppingService.removeFromToBuy(itemIndex);
            //ShoppingService.moveToBought(itemIndex);
        };
    }
    
    AlreadyBoughtController.$inject = ['ShoppingService'];
    
    function AlreadyBoughtController (ShoppingService) {
        var AlreadyBought = this;
        
        AlreadyBought.items = ShoppingService.getBoughtItems();
        console.log(AlreadyBought.items);
        var showAllBoughtMsg = 1;
            
        if (AlreadyBought.items.length > 0){
            var showAllBoughtMsg = 0;
        }

        //console.log(boughtItems.length);
       //console.log(showAllBoughtMsg);
    }
    
    function ShoppingService () {
        var service = this;

        // List of shopping items
        var toBuyitems = [];
        var boughtItems = [];
        
        var toBuyItems =[
            {
                name: 'cookies',
                quantity: 10
            },
            {
                name: 'chips',
                quantity: 5
            },
            {
                name: 'cola',
                quantity: 5
            },
            {
                name: 'icebreakers',
                quantity: 2
            },
            {
                name: 'pepto bismol',
                quantity: 2
            }
        ];
        
        var numOfItems = toBuyItems.length;
        //console.log(numOfItems  );
        var newToBuyItems = toBuyItems;
        //console.log(newToBuyItems);
        
        service.getItems = function () {
            return toBuyItems;
        }
        
        service.getBoughtItems = function () {
            return boughtItems;
        }
        
        service.removeFromToBuy = function (itemIndex) {
            var item = {
                name: toBuyItems[itemIndex].name,
                quantity: toBuyItems[itemIndex].quantity
            };
            
            toBuyItems.splice(itemIndex, 1);
            //console.log(itemIndex);
            
            
            boughtItems.push(item);
            
        }
        
        var numOfBoughtItems = boughtItems.length;
                
       //service.moveToBought = function () {console.log(itemIndex);
            
        //}
    }
}
)();