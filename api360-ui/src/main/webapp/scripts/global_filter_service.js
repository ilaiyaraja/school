'use strict';

app.service('globalFilterService', function()
{
	
	this.updateGlobalScopeFiltersWithDefaultValues = function(scope,rootScope)
	{
		scope.global_program = 'All';
		scope.global_client = 'All';
		scope.global_profile = 'All';
		scope.global_version = '0';
		scope.global_backend = 'All';
		scope.global_bundle = 'All';
		scope.global_api = 'All';
		scope.global_environment = 'All';
		scope.global_release = 'All';	
		scope.global_pid = 'All';	
		scope.global_federated = 'All';
		scope.global_apitoapi = 'All';
		scope.global_subprocess = 'All';
		scope.global_pmt = 'All'
    };
	
	
	
});