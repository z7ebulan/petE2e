var app = angular.module('foodService', []);

app.service('foodService', function($http){
	
	this.getAppetizers = function(){
		return $http.get('http://localhost:8080/APP/rest/food/get-appetizers');
	}
	
	this.createAppetizer = function(appetizer){
		return $http.post('http://localhost:8080/APP/rest/food/createAppetizer', appetizer);
	}
	
	this.getToppings = function(){
		return $http.get('http://localhost:8080/APP/rest/food/get-toppings');
	}
})