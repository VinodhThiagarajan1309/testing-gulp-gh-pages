function mainController($stateParams) {
	this.billHeader =['billType','description','itemAmount','date','action'];
	this.shellID = $stateParams.shellID;
}
angular
.module('bilancio')
.controller('MainController',mainController);