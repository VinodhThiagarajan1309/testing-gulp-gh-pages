function BillService($http) {
	var API="http://lowcost-env.tbm3pbiki7.us-east-1.elasticbeanstalk.com/api/billshell/";
	var retrieve = function(shellID) {
		return $http.get(API + shellID + '/bills').then(function(response) {
				return response.data;
		});
	};
	var create = function(bill) {
		return $http.post(API + bill.billShell_id + '/bills',bill).then(function(response) {
				return response.data;
		});
	};
	var update = function(bill,billID) {
		return $http.put(API + bill.billShell_id + '/bills/' + billID ,bill).then(function(response) {
			return response.data;
		});
	};
	var remove = function(billShell_id,billID) {
		return $http.delete(API + billShell_id + '/bills/' + billID ).then(function(response) {
			return response.data;
		});
	};
	return {
		retrieve: retrieve,
		create: create,
		update: update,
		remove: remove
	};
}
angular
.module('bilancio')
.service("BillService",BillService);