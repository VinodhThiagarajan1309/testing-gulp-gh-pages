function BillShellService($http) {
	var API="http://lowcost-env.tbm3pbiki7.us-east-1.elasticbeanstalk.com/api/billshell";
	var retrieve = function() {
		return $http.get(API).then(function(response) {
			return response.data;
		});
	};
	var create = function(shell) {
		return $http.post(API,shell).then(function(response) {
			return response.data;
		});
	};
	var deleteshell = function(shellID) {
		return $http.delete(API+"/"+shellID).then(function(response) {
			return response.data;
		});
	};
	return {
		retrieve: retrieve,
		create: create,
		deleteshell: deleteshell
	};

}
angular
.module('bilancio')
.service('BillShellService',BillShellService);