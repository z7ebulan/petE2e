var app = angular.module('customerDataService', []);

app.service('customerDataService', function($http, $q){
	
	this.customer = {};	
	this.userInfo = {};
	this.loggedIn = false;
	
	this.order = {
			total: "",
			items: ""
	};
	this.items = [];
	this.itemModel = {
			name: "",
			size: "",
			price: "",
			comments: "",
			toppings: {}			
	}
	
	this.setUser = function(userData){
		this.userInfo = userData;
		this.loggedIn = true;
	}
	
	this.createStripeCustomer = function(customerInfo){
		return $http.post('http://localhost:8080/APP/rest/customer/create-stripe-customer', customerInfo);
	}
	
	this.login = function(loginInfo){
		return $http.post('http://localhost:8080/APP/rest/customer/login/'+ loginInfo.username +"/"+ loginInfo.password);
	}
	
	this.addItem = function(item){
		this.items.push(item);
	}
	
	this.checkout = function(){
		this.order.items = this.items;
		
		var total = 0;
		for(var itemId in this.items){
			var item = this.items[itemId];
			total += Number(item.price);
			
			for(var toppingId in item.toppings){
				var topping = item.toppings[toppingId];
				this.order.items[itemId].toppings[toppingId] = topping.name;				
			}
		}
		this.order.total = total;
		
		console.log(this.order);
		return $http.post('http://localhost:8080/APP/rest/customer/checkout/' + this.userInfo.userName, this.order);
	}
	
});