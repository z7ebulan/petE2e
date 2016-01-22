(function() {
	angular
		.module('loginCtrl', [ 'ui.bootstrap','customerDataService', 'dialogService', 'drag'])
		.controller('loginCtrl', LoginCtrl);
				
	LoginCtrl.$inject = ['$scope', '$uibModal','customerDataService', 'dialogService', '$timeout'];
	function LoginCtrl($scope, $uibModal,customerDataService, dialogService, $timeout) {

		$scope.user = {};
		$scope.viewCartMessage = false;
		$scope.customerItems = customerDataService.items; 
		$scope.signUp = signUp;
		$scope.login = login;
		$scope.getTotal = getTotal;
		$scope.checkout = checkout;

		var defaultSignupModel = {
			userName : "",
			password : "",
			address : "",
			fullName : "",
			phone : "",
			card : ""
		}

		var defaultLoginModel = {
			username : "",
			password : ""
		}		

		// initialize model objects
		$scope.signupModel = angular.copy(defaultSignupModel);
		$scope.loginModel = angular.copy(defaultLoginModel);

		// resets the model in the ui
		var resetModel = function() {
			$scope.signupModel = angular.copy(defaultSignupModel);
			$scope.loginModel = angular.copy(defaultLoginModel);
			$scope.user.loggedIn = customerDataService.loggedIn;
			$scope.user.info = customerDataService.userInfo;
		}
		
		$scope.$watch(function() { return $scope.viewCartMessage; }, function(newVal, oldVal){
			console.log(newVal);
			console.log(oldVal);
			$timeout(function(){
				$scope.viewCartMessage = false;
			}, 200);
		});

		function signUp() {
			dialogService.signup($scope.signupModel).then(
				function(signupModel) {
					$scope.signupModel = signupModel;
					$scope.signupModel.card.name = signupModel.fullName;
					Stripe.card.createToken($scope.signupModel.card, stripeResponseHandler);
				}, function() {
					console.log('dismissed');
					resetModel();
				});
		}
		
		var stripeResponseHandler = function(status, response) {
			  if (response.error) {
				dialogService.message(response.error.message);
			    customerDataService.loggedIn = false;
			  } else {
			    var token = response.id;
			    $scope.signupModel.stripeToken = token;
			    delete $scope.signupModel.card;
				customerDataService.createStripeCustomer($scope.signupModel).then(
					function(res){
						customerDataService.setUser($scope.signupModel);
						resetModel();			
						dialogService.message("Welcome, " + $scope.user.info.userName + "!");
					},
					function(res){
						dialogService.message(res);
					}					
				);
			  }
		};
		
		function login() {
			customerDataService.login($scope.loginModel).then(function(res) {
				customerDataService.setUser(res.data);
				resetModel();
				$scope.viewCartMessage = true;
				//dialogService.message("Welcome, " + $scope.user.info.userName + "!");
			}, function() {
				dialogService.message("You are not in our system, Please Sign Up!");
				resetModel();
			});
		}
		
		function getTotal(){
			var total = 0;
			for(var item in $scope.customerItems){
				total += Number($scope.customerItems[item].price);
			}
			return total;
		}
		
		function checkout(){
			customerDataService.checkout().then(
					function(res){
						console.log(res.data);
					},function(err){
						console.log(err);
					}
					
			);
		}

	}
})()
