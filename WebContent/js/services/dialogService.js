(function(){
	var app = angular.module('dialogService', ['ui.bootstrap']);
	app.service('dialogService', function($http, $uibModal){
		
		
		this.message = function(message){
			var modalOptions = {
					templateUrl: "views/dialogMessage.html",
					controller : 'messageCtrl',
					resolve: {
						mes: function () {
				          return message;
				        }
				    }
			};
			var modal = $uibModal.open(modalOptions);
			return modal.result;
		}
		
		this.signup = function(signupModel){
			//modal confuguration for signup form
			var modalOptions = {
				templateUrl: "views/signup.html",
				controller : 'signupCtrl',
				resolve: {
					signupModel: function () {
			          return signupModel;
			        }
			    }
			};
			return $uibModal.open(modalOptions).result;
		}
	});	
	
	app.controller('messageCtrl', function ($scope, $uibModalInstance, mes) {
		  $scope.message = mes;
		  $scope.cancel = function () {
		    $uibModalInstance.dismiss('cancel');
		  };
	});
	
	app.controller('signupCtrl', function ($scope, $uibModalInstance, signupModel) {
		  $scope.signup = signupModel;
		  $scope.submit = function () {
		    $uibModalInstance.close($scope.signup);
		  };
		  $scope.cancel = function () {
		    $uibModalInstance.dismiss('cancel');
		  };
	});
})();

