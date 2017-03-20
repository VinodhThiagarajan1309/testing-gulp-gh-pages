function infoMessage() {
	return {
		restrict: 'E',
		scope: {
			message:"="
		},
		template:"<div"+  
					'class="alert alert-info alert-dismissable fade in" '+
					'class="alertMessage">'+
            '<strong>Info!</strong> {{message}}'+
            '<button type="button" '+
            		'class="btn" ' +
            		'class="close" id="btn-alert" '+
            		'data-dismiss="alert">×</button>' +
         '</div>'
	};
}
angular
.module('bilancio')
.directive('infoMessage',infoMessage);