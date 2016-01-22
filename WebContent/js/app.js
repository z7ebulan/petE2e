(function(){
	var app = angular.module('app', ['ui.router', 'food', 'loginCtrl','ui.bootstrap']);
	
	app.config(function($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise('/');
		
		$stateProvider
			.state('home',{
				url:'/',
				templateUrl:'./views/home.html',
				controller: 'homeCtrl'
			})
			.state('appetizer',{
				url:'/appetizer',
				templateUrl: './views/appetizer.html',
				controller: 'appetizerCtrl'
			})		
	})

})()