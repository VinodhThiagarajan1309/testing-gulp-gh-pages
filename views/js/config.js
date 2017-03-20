angular
.module('bilancio')
.config(function($stateProvider,$urlRouterProvider) {
	$stateProvider
			.state('dashboard', {
				url:'/dashboard',
				templateUrl: 'index.html'
			})
			.state('billView', {
				url: '/billView',
				params: {
					shellID:'65756'		
				},
				controller: 'MainController as main',
				templateUrl: 'view/billView.html'
			})
			.state('billshellList', {
				url: '/billShell',
				controller: '',
				templateUrl: 'view/billShellView.html'
			});
			$urlRouterProvider.otherwise('/dashboard');
});
