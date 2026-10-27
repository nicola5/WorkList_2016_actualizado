angular.module('worklist', [])
.controller("mainCtrl", function($scope) { //rootscope todos lados

	$scope.saludar = "hola";

	$scope.mostrarScope = function(){
		console.log($scope.saludar);
	}
});
