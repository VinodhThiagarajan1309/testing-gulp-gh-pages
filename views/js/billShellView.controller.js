function billShellView(BillShellService,$scope) {
	var ctrl = this;
	$scope.showModal = false;
    $scope.buttonClicked = "";
	ctrl.billShell = [];
	ctrl.shellMessage = "";
	this.getBillShell = function() {
		BillShellService.retrieve().then(function(response) {
				ctrl.billShell = response;
		});
	};
	this.getRandomColor = function(item,index){
		var colors = ['#3175b0','#58b358','#52bcdc',
					  '#efa741','#d24844'];
		var color = "";
		if(item.color) {
			return item.color;
		}
	     
	           color += colors[index%colors.length];
	           item.color = color;
	           return color;	             
    };
    $scope.toggleModal = function(btnClicked,shell,index){
        $scope.buttonClicked = btnClicked;
        $scope.shell = shell;
        $scope.index = index;
        $scope.showModal = !$scope.showModal;
    };
    this.deleteShell = function(shell,index) {
    	BillShellService.deleteshell(shell).then(function(response) {
    		ctrl.shellMessage ="Shell deleted Successfully!!!";
    		ctrl.billShell.splice(index,1);
    	},function(error) {
    		ctrl.shellMessage ="Error deleting the shell";
    	});
    	ctrl.shellMessage ="";
    };
    this.shellSubmit = function() {
    	var createDetails = {"login_id": "58b4bb8b428f652285bb62b4",
    						"owner": "priya.suriyamurthi@gmail.com"};
    	createDetails.sheetName = this.shellNew;
    	BillShellService.create(createDetails).then(function(response){
		ctrl.billShell.push(response);
		ctrl.shellNew = "";
		$scope.shellCreate.$setPristine();
      	$scope.shellCreate.$setUntouched();
      	$scope.shellCreate.$submitted = false;
       	});
    };
    this.getBillShell();
}
angular
.module('bilancio')
.controller('BillShellController',billShellView);