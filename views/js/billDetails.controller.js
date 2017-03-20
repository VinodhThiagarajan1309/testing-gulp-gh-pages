function BillController(BillService,$stateParams,$scope,$state,$filter) {
	var ctrl = this;
	ctrl.shellID = $stateParams.shellID;
	ctrl.billList = [];
	ctrl.filteredList = [];
	ctrl.currentPage = 1;
	ctrl.numPerPage = 10;
	ctrl.maxsize = ctrl.billList.length/10;
	ctrl.billMessage = '';
	ctrl.getRandomColor = function(item,index) {
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
   	ctrl.toggleModal = function(btnClicked,bill,index) {
        $scope.buttonClicked = btnClicked;
        $scope.showModal = !$scope.showModal;
        ctrl.btnClicked = btnClicked;
        if(btnClicked == 'Add Bill') {
	        ctrl.createDate = new Date();
	        ctrl.billType= 'Rent';
	        ctrl.billMessage = '';
	        ctrl.itemAmount = '';
			ctrl.description = '';
			ctrl.comments = '';
			ctrl.CreateEdit = 'Create';
		} else {
			ctrl.index = index;
			ctrl.billID = bill._id;
			ctrl.createDate = new Date(bill.date);
	        ctrl.billType= bill.billType;
	        ctrl.billMessage = '';
	        ctrl.itemAmount = bill.itemAmount;
			ctrl.description = bill.description;
			ctrl.comments = bill.comments;
			ctrl.CreateEdit = 'update';
		}
    };
  	ctrl.billModify =function() {
  		var newBill = {};
  		newBill.billShell_id = ctrl.shellID;
  		newBill.person = "priya.suriyamurthi@gmail.com";
  		newBill.itemAmount = ctrl.itemAmount;
		newBill.billType = ctrl.billType;
		newBill.description = ctrl.description;
		newBill.comments = ctrl.comments;
		newBill.date = ctrl.createDate;
  		if(ctrl.btnClicked == 'Add Bill') {
		BillService.create(newBill).then(function(response) 
		{
			ctrl.billList.push(response);
			ctrl.billMessage ='New Bill was added';
			ctrl.listFilter();
		});
		ctrl.billMessage = '';
		} else {
			BillService.update(newBill,ctrl.billID).then(function(response) {
				var key = Object.keys(ctrl.billList[ctrl.index]);
				for(var i=0;i<key.length;i++) {
					if(newBill.hasOwnProperty([key[i]])) {
						ctrl.billList[ctrl.index][key[i]] = newBill[key[i]];
					} 					
				}
				ctrl.billMessage ='Bill was updated';
				ctrl.listFilter();
			});
		}
		ctrl.billCreate.$setPristine();
      	ctrl.billCreate.$setUntouched();
      	ctrl.billCreate.$submitted = false;

  	};
  	ctrl.deleteBill = function(bill,index) {
  		BillService.remove(bill.billShell_id,bill._id).then(function(response) {
  			ctrl.billMessage ='Bill was removed';
  			ctrl.billList.splice(index,1);
  			ctrl.listFilter();
  		});
  	};
	ctrl.fetchBills = function() {
		ctrl.billList.length=0;
		BillService
		.retrieve(this.shellID)
		.then(function(response) {
			ctrl.billList = response;
			ctrl.listFilter();
		});
	};
	ctrl.listFilter = function() {
		ctrl.filteredList.length = 0;
		$scope.$watch('currentPage + numPerPage',function(){
				var begin = ((ctrl.currentPage - 1) * ctrl.numPerPage);
		    	var end = begin + ctrl.numPerPage;
		    	ctrl.filteredList = ctrl.billList.slice(begin,end);
			});
	};
	ctrl.fetchBills();
}
angular
.module('bilancio')
.controller('BillController',BillController);