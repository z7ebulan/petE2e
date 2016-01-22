(function() {
	var app = angular.module('food', [ 'foodService', 'ngTagsInput', 'customerDataService']);
	app.controller('appetizerCtrl', function($scope, $http, foodService, customerDataService) {
		
		$scope.size = "-select size-";
		$scope.showForm = false;
		$scope.appitizerSizesForm = false;
				
		$scope.appetizerObjDefaultModel = {
				name: "",
			    price: "",
			    appitizerSizes: []
		};
		
		$scope.appetizerSizeDefaultModel = {
				size: "",
		        price: ""				
		}
		
		$scope.toppings=[];
		
		$scope.loadToppings = function(query){
			return foodService.getToppings();	
		}
		
		
		var init = function(){
						
			$scope.appetizerSize = angular.copy($scope.appetizerSizeDefaultModel);
			$scope.appetizerObj = angular.copy($scope.appetizerObjDefaultModel);
			//$scope.item = angular.copy(customerDataService.itemModel);
			
			// gets list of appetizers
			foodService.getAppetizers().then(function(res) {
				$scope.appetizers = res.data;
				console.log(res.data);
			}, function(res) {
				console.log(res);
			});
			
			$scope.clearModel();
		};
		
		$scope.clearModel = function(){
			$scope.appetizerObj = angular.copy($scope.appetizerObjDefaultModel);
		//	$scope.item = angular.copy(customerDataService.itemModel);
			$scope.showForm = false;
		}

		$scope.selectedSize = function(appy, size) {
			// displays price after selecting size for that item
			for(var appId in $scope.appetizers){
				if($scope.appetizers[appId].id == appy.id){
					$scope.appetizers[appId].price = size.price;
				}
			}
		};
		
		$scope.addToCart = function(item){
			var itemObj = {};
			itemObj.name = item.name;
			itemObj.size = item.size;
			itemObj.price = item.price;
			itemObj.comments = item.comments || "";
			itemObj.toppings = angular.copy(item.toppings) || [];
						
			customerDataService.addItem(itemObj);
			$scope.clearModel();
		}
		
		$scope.showCreateForm = function(){
			$scope.showForm = true;
		}
		
		$scope.addAppetizerSize = function(){
			$scope.appetizerObj.appitizerSizes.push($scope.appetizerSize);
			$scope.appetizerSize = angular.copy($scope.appetizerSizeDefaultModel);
		}
		
		
		$scope.createAppetizer = function(){
			console.log($scope.appetizerObj);
		//	if (appitizerSizesForm){$scope.appetizerObj.size = "";} //omit default size if sizes are specified
			if($scope.appetizerObj.name && $scope.appetizerObj.price > 0 || $scope.appetizerObj.appitizerSizes.length > 0){
				//if required info is supplied in ui create appetizer
				foodService.createAppetizer($scope.appetizerObj).then(
						function(res){
							init();
						}		
				)
			}
		}

		init();
		
	})
})()