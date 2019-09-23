'use strict';

app.service('apiPortfolioFilterService', function()
{
	
	
    
    
	this.updateScopeFiltersWithDefaultValues = function(scope,rootScope)
	{
		scope.program = rootScope.getGlobalURLFilter("Programs");
		scope.client = rootScope.getGlobalURLFilter("Clients");
		scope.profile = rootScope.getGlobalURLFilter("Profiles");
		scope.version = '0';
		scope.backend = rootScope.getGlobalURLFilter("Backends");
		scope.bundle = rootScope.getGlobalURLFilter("Bundles");
		scope.api = rootScope.getGlobalURLFilter("APIs");
		scope.environment = 'All';		
		scope.federated = 'All';
		scope.apitoapi = 'All';
		scope.subprocess = 'All';
		scope.jmsprovider = 'All';
    };
    
    
    this.updateScopeFiltersWithUrlParamsValues = function(scope,rootScope)
	{
		
    	scope.version = '0';
		scope.environment = 'All';
		
    	if(rootScope.urlparams!=undefined && rootScope.urlparams.Programs!=undefined && rootScope.urlparams.Programs!=null)
    	{
    		scope.program = rootScope.urlparams.Programs;
    	}
    	
    		
    	if(rootScope.urlparams!=undefined && rootScope.urlparams.Clients!=undefined && rootScope.urlparams.Clients!=null)
    	{
    		scope.client = rootScope.urlparams.Clients;
    	}
    	
    	
    	
    	if(rootScope.urlparams!=undefined && rootScope.urlparams.Profiles!=undefined && rootScope.urlparams.Profiles!=null)
    	{
    		scope.profile = rootScope.urlparams.Profiles.split(",");	    		
    	}
    	
    	
    	
    	if(rootScope.urlparams!=undefined && rootScope.urlparams.Bundles!=undefined && rootScope.urlparams.Bundles!=null)
    	{
    		scope.bundle = rootScope.urlparams.Bundles;
	    }
    	
    				    	
    	
    	if(rootScope.urlparams!=undefined && rootScope.urlparams.APIs!=undefined && rootScope.urlparams.APIs!=null)
    	{
    		scope.api = rootScope.urlparams.APIs;
    	}
    	
    	
    				    	
    	
    	if(rootScope.urlparams!=undefined && rootScope.urlparams.Backends!=undefined && rootScope.urlparams.Backends!=null)
    	{
    		scope.backend = rootScope.urlparams.Backends;
    	}
    	
    	
    	
    	if(rootScope.urlparams!=undefined && rootScope.urlparams.Federated!=undefined && rootScope.urlparams.Federated!=null)
    	{
    		scope.federated  = rootScope.urlparams.Federated;
    	}
    	
	
		if(rootScope.urlparams!=undefined && rootScope.urlparams.ApiToApi!=undefined && rootScope.urlparams.ApiToApi!=null)
    	{
			scope.apitoapi = rootScope.urlparams.ApiToApi;
    	}
    	
		
		
		if(rootScope.urlparams!=undefined && rootScope.urlparams.SubProcess!=undefined && rootScope.urlparams.SubProcess!=null)
    	{
			scope.subprocess = rootScope.urlparams.SubProcess;
    	}
		
		if(rootScope.urlparams!=undefined && rootScope.urlparams.Jmsproviders!=undefined && rootScope.urlparams.Jmsproviders!=null)
    	{
			scope.jmsproviders = rootScope.urlparams.Jmsproviders;
    	}
    	
    };
	
	this.emptyFilterModels = function(scope,rootScope)
	{
		
		scope.programAPIPortfolioModel = [];
		scope.clientAPIPortfolioModel = [];
		scope.profileAPIPortfolioModel = [];
		scope.versionAPIPortfolioModel = [];
		scope.backendAPIPortfolioModel = [];
		scope.bundleAPIPortfolioModel = [];
		scope.apiAPIPortfolioModel = [];
		scope.environmentAPIPortfolioModel = [];
		scope.federatedAPIPortfolioModel =  [];
		scope.apitoapiAPIPortfolioModel =  [];
		scope.subprocessAPIPortfolioModel = [];
		scope.jmsproviderAPIPortfolioModel = [];
	};
	
	this.emptyFilterData = function(scope,rootScope)
	{
		
		scope.programAPIPortfolioData = [];	
		scope.clientAPIPortfolioData = [];	
		scope.profileAPIPortfolioData = [];
		scope.versionAPIPortfolioData = [];
		scope.backendAPIPortfolioData = [];
		scope.bundleAPIPortfolioData = [];
		scope.apiAPIPortfolioData = [];
		scope.environmentAPIPortfolioData = [];
		scope.federatedAPIPortfolioData =  [];
		scope.apitoapiAPIPortfolioData =  [];
		scope.subprocessAPIPortfolioData = [];
		scope.jmsproviderAPIPortfolioData= [];
	};
	
	
	this.addFilterSettings = function(scope,rootScope)
	{
		
		
		 scope.programAPIPortfolioSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:3}; 
		 scope.programAPIPortfolioCustomTexts = {buttonDefaultText: 'Programs'};
		 
		 scope.clientAPIPortfolioSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:3}; 
		 scope.clientAPIPortfolioCustomTexts = {buttonDefaultText: 'Clients'};
		 
		 scope.profileAPIPortfolioSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:3}; 
		 scope.profileAPIPortfolioCustomTexts = {buttonDefaultText: 'Profiles'};
		 
		 
		 scope.versionAPIPortfolioSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:3}; 
		 scope.versionAPIPortfolioCustomTexts = {buttonDefaultText: 'Versions'};
		 
		 scope.backendAPIPortfolioSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:3}; 
		 scope.backendAPIPortfolioCustomTexts = {buttonDefaultText: 'Backends'};
		 
		 scope.bundleAPIPortfolioSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1}; 
		 scope.bundleAPIPortfolioCustomTexts = {buttonDefaultText: 'Bundles'};
		 
		 scope.apiAPIPortfolioSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1}; 
		 scope.apiAPIPortfolioCustomTexts = {buttonDefaultText: 'APIs'};
		 
		 scope.environmentAPIPortfolioSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:3}; 
		 scope.environmentAPIPortfolioCustomTexts = {buttonDefaultText: 'Environments'};
		 		 
		 scope.federatedAPIPortfolioSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:3}; 
		 scope.federatedAPIPortfolioCustomTexts = {buttonDefaultText: 'Federated'};
		 		 
		 scope.apitoapiAPIPortfolioSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:3}; 
		 scope.apitoapiAPIPortfolioCustomTexts = {buttonDefaultText: 'ApiToApi'};
		 
		 scope.subProcessAPIPortfolioSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:3}; 
		 scope.subProcessAPIPortfolioCustomTexts = {buttonDefaultText: 'SubProcess'};
		 
		 scope.jmsproviderAPIPortfolioSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:3}; 
		 scope.jmsproviderAPIPortfolioCustomTexts = {buttonDefaultText: 'Jmsproviders'};
		 
	};
	
	 	this.updaterootScopeFiltersWithDefaultValues = function(scope,rootScope)
		{
		
	    	scope.program = 'All';
	        scope.client = 'All';
	        scope.profile = 'All';
	        scope.version = '0';
	        scope.backend = 'All';
	        scope.bundle = 'All';
	        scope.api = 'All';
	        scope.environment = 'All';	
	        scope.federated = 'All';
			scope.apitoapi = 'All';
			scope.subprocess = 'All';
	    };
	    
	    
	    
	    
	    var filterUrlsArray = new Array();
		
		this.getFilterRestURLs = function(scope,rootScope)
		{
			
	        filterUrlsArray.push(new KeyValueModel("ALL_FILTER_URL","/api360-service/filter/lookup/All/0/All/All/All/All/All/All/allfilters.json"));
			filterUrlsArray.push(new KeyValueModel("CUSTOM_FILTER_URL","/api360-service/filter/lookup/"+scope.api+"/"+scope.version+"/"+scope.profile+"/"+scope.client+"/"+scope.program+"/"+scope.bundle+"/"+scope.backend+"/"+scope.environment+"/"+scope.federated+"/"+scope.apitoapi+"/"+scope.subprocess+"/allfilters.json"));
			filterUrlsArray.push(new KeyValueModel("ENV_FILTER_URL","/api360-service/filter/lookup/environment.json"));
			filterUrlsArray.push(new KeyValueModel("PORTFOLIO_FILTER_URL","/api360-service/filter/lookup/"+scope.api+"/"+scope.bundle+"/"+scope.backend+"/"+scope.pid+"/"+scope.release+"/allPortfoliofilters.json"));
			return filterUrlsArray;	
	    };
	    
	    
	    this.getFilterRestURL = function(scope,keyParam)
		{
	    	
	    	
	    	var url="";
	    	var keepGoing = true;
	    	
			angular.forEach(this.getFilterRestURLs(scope), function(value, key) 
			{
				if(keepGoing)
				{
				  if(keyParam==value.key)
				  {  
					  url = value.value;
					  keepGoing=false;
			      }	
				}			  
			});
			
			return url;
	    };

	    
	     this.loadComboBox= function(scope,rootScope,http,url,pagelocation) 
		 {
	    	 
	    	this.emptyFilterModels(scope,rootScope);
			this.emptyFilterData(scope,rootScope);
			this.addFilterSettings(scope,rootScope);
			
			 var loadFilters = http.get(url);	 
			 http.dataType="json";
			 
			 var envLoad = http.get(this.getFilterRestURL(scope,"ENV_FILTER_URL"));
			 
			 
			 loadFilters.then(function(payload) 
		     {
				 
				scope.programAPIPortfolioData = payload.data.result.program;
				scope.clientAPIPortfolioData = payload.data.result.client;
				scope.profileAPIPortfolioData = payload.data.result.profile;
			    scope.backendAPIPortfolioData = payload.data.result.adapter;
			    scope.apiAPIPortfolioData = payload.data.result.api_name;
			    scope.bundleAPIPortfolioData = payload.data.result.container_name;
			    scope.federatedAPIPortfolioData = payload.data.result.federated;
			    scope.apitoapiAPIPortfolioData = payload.data.result.apitoapi;
			    scope.subprocessAPIPortfolioData = payload.data.result.subprocess;
			    scope.jmsproviderAPIPortfolioData = payload.data.result.jmsprovider;
			    
				
			   			    
			    if(rootScope.urlparams!=undefined)
				{
			    	
			    	if(rootScope.urlparams!=undefined && rootScope.urlparams.Programs!=undefined && rootScope.urlparams.Programs!=null)
			    	{
			    		var ProgramsArray = rootScope.urlparams.Programs.split(",");
			    		
				    	for(var i=0; i < ProgramsArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = ProgramsArray[i];
							scope.programAPIPortfolioModel.push(idProp);			    		
				    	}
			    	}
			    	else
		    		{
			    		scope.programAPIPortfolioModel = new Array(payload.data.result.program[0]);
		    		}
			    		
			    	
			    	if( rootScope.urlparams!=undefined && rootScope.urlparams.Clients!=undefined && rootScope.urlparams.Clients!=null)
			    	{
			    		var ClientArray = rootScope.urlparams.Clients.split(",");
			    		
				    	for(var i=0; i < ClientArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = ClientArray[i];
							scope.clientAPIPortfolioModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.clientAPIPortfolioModel = new Array(payload.data.result.client[0]);
			    	}
					
			    	
			    	
			    	if( rootScope.urlparams!=undefined && rootScope.urlparams.Profiles!=undefined && rootScope.urlparams.Profiles!=null)
			    	{
			    		var ProfilesArray = rootScope.urlparams.Profiles.split(",");
			    		
			    		for(var i=0; i < ProfilesArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = ProfilesArray[i];
							scope.profileAPIPortfolioModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.profileAPIPortfolioModel = new Array(payload.data.result.profile[0]);	
			    	}
			    	
			    	
			    	if( rootScope.urlparams!=undefined && rootScope.urlparams.Bundles!=undefined && rootScope.urlparams.Bundles!=null)
			    	{
			    		var BundlesArray = rootScope.urlparams.Bundles.split(",");
			    		
				    	for(var i=0; i < BundlesArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = BundlesArray[i];
				    		scope.bundleAPIPortfolioModel.push(idProp);
				    		
				    	}
				    }
			    	else
			    	{
			    		scope.bundleAPIPortfolioModel = new Array(payload.data.result.container_name[0]);
			    	}
			    				    	
			    	
			    	if( rootScope.urlparams!=undefined && rootScope.urlparams.APIs!=undefined && rootScope.urlparams.APIs!=null)
			    	{
			    		var APIsArray = rootScope.urlparams.APIs.split(",");
			    		
				    	for(var i=0; i < APIsArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = APIsArray[i];
							scope.apiAPIPortfolioModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.apiAPIPortfolioModel = new Array(payload.data.result.api_name[0]);
			    	}
			    	
			    				    	
			    	
			    	if(rootScope.urlparams!=undefined && rootScope.urlparams.Backends!=undefined && rootScope.urlparams.Backends!=null)
			    	{
			    		var BackendsArray = rootScope.urlparams.Backends.split(",");
				    	for(var i=0; i < BackendsArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = BackendsArray[i];
							scope.backendAPIPortfolioModel.push(idProp);			    		
				    	}
			    	}
			    	else 
			    	{
			    		scope.backendAPIPortfolioModel = new Array(payload.data.result.adapter[0]);			    		
			    	}
			    	
			    	
			    	
			    	if( rootScope.urlparams!=undefined && rootScope.urlparams.Federated!=undefined && rootScope.urlparams.Federated!=null)
			    	{
			    		var FederatedArray = rootScope.urlparams.Federated.split(",");
				    	for(var i=0; i < FederatedArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = FederatedArray[i];
							scope.federatedAPIPortfolioModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.federatedAPIPortfolioModel = new Array(payload.data.result.federated[0]);			    		
			    	}
			    		
				
					if(rootScope.urlparams!=undefined && rootScope.urlparams.ApiToApi!=undefined && rootScope.urlparams.ApiToApi!=null)
			    	{
			    		var ApiToApiArray = rootScope.urlparams.ApiToApi.split(",");
				    	for(var i=0; i < ApiToApiArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = ApiToApiArray[i];
							scope.apitoapiAPIPortfolioModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.apitoapiAPIPortfolioModel = new Array(payload.data.result.apitoapi[0]);			    		
			    	}
					
					
					if(rootScope.urlparams!=undefined && rootScope.urlparams.SubProcess!=undefined && rootScope.urlparams.SubProcess!=null)
			    	{
			    		var SubProcessArray = rootScope.urlparams.SubProcess.split(",");
			    		
				    	for(var i=0; i < SubProcessArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = SubProcessArray[i];
							scope.subprocessAPIPortfolioModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.subprocessAPIPortfolioModel = new Array(payload.data.result.subprocess[0]);			    		
			    	}
					
					
					if(rootScope.urlparams!=undefined && rootScope.urlparams.Jmsproviders!=undefined && rootScope.urlparams.Jmsproviders!=null)
			    	{
			    		var JmsProviderArray = rootScope.urlparams.Jmsproviders.split(",");
			    		
				    	for(var i=0; i < JmsProviderArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = JmsProviderArray[i];
							scope.jmsproviderAPIPortfolioModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.jmsproviderAPIPortfolioModel = new Array(payload.data.result.jmsprovider[0]);			    		
			    	}
				}
			    else
			    {
			    	
			    	scope.bundleAPIPortfolioModel = rootScope.getModelObject(rootScope.getGlobalURLFilter("Bundles"));		    
				    scope.programAPIPortfolioModel = rootScope.getModelObject(rootScope.getGlobalURLFilter("Programs"));
					scope.clientAPIPortfolioModel = rootScope.getModelObject(rootScope.getGlobalURLFilter("Clients"));
					scope.profileAPIPortfolioModel =  rootScope.getModelObject(rootScope.getGlobalURLFilter("Profiles"));			
					scope.backendAPIPortfolioModel = rootScope.getModelObject(rootScope.getGlobalURLFilter("Backends"));//new Array(payload.data.result.adapter[0]);
					scope.apiAPIPortfolioModel = rootScope.getModelObject(rootScope.getGlobalURLFilter("APIs"));					
					scope.federatedAPIPortfolioModel = new Array(payload.data.result.federated[0]);
					scope.apitoapiAPIPortfolioModel = new Array(payload.data.result.apitoapi[0]);
					scope.subprocessAPIPortfolioModel = new Array(payload.data.result.subprocess[0]);
					scope.jmsproviderAPIPortfolioModel = new Array(payload.data.result.jmsprovider[0]);
			    }
			    			    
		     });		 
			 
			 envLoad.then(function(payload) 
		     {
				scope.environmentAPIPortfolioData = payload.data.result;
				scope.environmentAPIPortfolioModel = new Array(payload.data.result[0]);
			 });	 
	    };
	    
	    
	    
	    
	    
	    
	    
	    this.reloadComboBox= function(scope,rootScope,http,url,ignore) 
		 {
	    	
	    	 var loadFilters = http.get(url);		 
			 http.dataType="json";
			 
			 loadFilters.then(function(payload) 
		     {
				
				if("Programs"!=ignore)
				{
					var local = scope.programAPIPortfolioModel;
					
					scope.programAPIPortfolioModel = [];
					scope.programAPIPortfolioData = payload.data.result.program;
					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							 scope.programAPIPortfolioModel.push(idProp);
		                });
					}
					else
					{
						scope.programAPIPortfolioModel = new Array(payload.data.result.program[0]);
					}
				}
				
				if("Clients"!=ignore)
				{
					var local = scope.clientAPIPortfolioModel;
					
					scope.clientAPIPortfolioModel = [];
					scope.clientAPIPortfolioData = payload.data.result.client;
					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.clientAPIPortfolioModel.push(idProp);
		                });
					}
					else
					{
						scope.clientAPIPortfolioModel = new Array(payload.data.result.client[0]);
					}

				}	
				
				if("Profiles"!=ignore)
				{
					var local = scope.profileAPIPortfolioModel;
					
					scope.profileAPIPortfolioModel = [];
					scope.profileAPIPortfolioData = payload.data.result.profile;
					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
						   var idProp = {idProp: 'id'};
						   idProp['id'] = value["id"];
							scope.profileAPIPortfolioModel.push(idProp);
		                });
					}
					else
					{
						scope.profileAPIPortfolioModel = new Array(payload.data.result.profile[0]);
					}
				}	
				
				if("Backends"!=ignore)
				{
					var local = scope.backendAPIPortfolioModel;
					
					scope.backendAPIPortfolioModel = [];
					scope.backendAPIPortfolioData = payload.data.result.adapter;

					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.backendAPIPortfolioModel.push(idProp);
		                });
					}
					else
					{
						scope.backendAPIPortfolioModel = new Array(payload.data.result.adapter[0]);
					}
				}			
				
				if("Bundles"!=ignore)
				{
					var local = scope.bundleAPIPortfolioModel;
					
					scope.bundleAPIPortfolioModel = [];
					scope.bundleAPIPortfolioData = payload.data.result.container_name;

					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.bundleAPIPortfolioModel.push(idProp);
		                });	
					}
					else
					{
						scope.bundleAPIPortfolioModel = new Array(payload.data.result.container_name[0]);
					}
				}					
				
				if("APIs"!=ignore)
				{
					var local = scope.apiAPIPortfolioModel;
					
					scope.apiAPIPortfolioModel = [];
					scope.apiAPIPortfolioData = payload.data.result.api_name;
					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.apiAPIPortfolioModel.push(idProp);
		                });	
					}
					else
					{
						scope.apiAPIPortfolioModel = new Array(payload.data.result.api_name[0]);
					}
				}
				
				//Added by Abhimanyu
				
				if("Federated"!=ignore)
				{
					
					var local = scope.federatedAPIPortfolioModel;
					
					scope.federatedAPIPortfolioModel = [];
					scope.federatedAPIPortfolioData = payload.data.result.federated;
					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							var idProp = {idProp: 'id'};
				    		idProp['id'] = value["id"];
							scope.federatedAPIPortfolioModel.push(idProp);
		                });	
					}
					else
					{
						scope.federatedAPIPortfolioModel = new Array(payload.data.result.federated[0]);
					}
				}
				
				
				if("ApiToApi"!=ignore)
				{
					var local = scope.apitoapiAPIPortfolioModel;
					
					scope.apitoapiAPIPortfolioModel = [];
					scope.apitoapiAPIPortfolioData = payload.data.result.apitoapi;
					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.apitoapiAPIPortfolioModel.push(idProp);
		                });	
					}
					else
					{
						scope.apitoapiAPIPortfolioModel = new Array(payload.data.result.apitoapi[0]);
					}
				}
				
				
				if("SubProcess"!=ignore)
				{
					var local = scope.subProcessAPIPortfolioModel;
					
					scope.subprocessAPIPortfolioModel = [];
					scope.subprocessAPIPortfolioData = payload.data.result.subprocess;
					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							 scope.subprocessAPIPortfolioModel.push(idProp);
		                });	
					}
					else
					{
						scope.subprocessAPIPortfolioModel = new Array(payload.data.result.subprocess[0]);
					}
				}
				
				if("Jmsproviders"!=ignore)
				{
					var local = scope.jmsproviderAPIPortfolioModel;
					
					scope.jmsproviderAPIPortfolioModel = [];
					scope.jmsproviderAPIPortfolioData = payload.data.result.jmsprovider;
					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							 scope.jmsproviderAPIPortfolioModel.push(idProp);
		                });	
					}
					else
					{
						scope.jmsproviderAPIPortfolioModel = new Array(payload.data.result.jmsprovider[0]);
					}
				}
				
				
				
				
		     });
	   };
	   
	   
	   
	   
	   this.dashboardFilterReload=function(scope,rootScope,name,value)
		{
			if("Environments"==name)	
	 		{
		 		if(scope.environmentAPIPortfolioModel.length==1 && scope.environmentAPIPortfolioModel[0].id=="All")
	 			{
		 			scope.environment = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.environmentAPIPortfolioModel.length > 1)
	 				{
		 				 scope.environment = "All";
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 scope.environmentAPIPortfolioModel.splice(0,scope.environmentAPIPortfolioModel.length);
			    		 scope.environmentAPIPortfolioModel.push(idProp);		 				 
		 			}
		 			else if(scope.environmentAPIPortfolioModel.length > 1 && scope.environmentAPIPortfolioModel[0].id=="All")
		 			{
		 				scope.environmentAPIPortfolioModel.splice(0,1);
		 				scope.environment = scope.getCommaSeparatedString(scope.environmentAPIPortfolioModel);		 					
		 			}
		 			else
	 				{
		 				scope.environment = scope.getCommaSeparatedString(scope.environmentAPIPortfolioModel);
		 			}
		 		}
	 		}else if("Programs"==name)	
	 		{
		 		if(scope.programAPIPortfolioModel.length==1 && scope.programAPIPortfolioModel[0].id=="All")
	 			{
		 			scope.program = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.programAPIPortfolioModel.length > 1)
	 				{
		 				 scope.program = "All";
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 scope.programAPIPortfolioModel.splice(0,scope.programAPIPortfolioModel.length);
			    		 scope.programAPIPortfolioModel.push(idProp);		 				 
		 			}
		 			else if(scope.programAPIPortfolioModel.length > 1 && scope.programAPIPortfolioModel[0].id=="All")
		 			{
		 				scope.programAPIPortfolioModel.splice(0,1);
		 				scope.program = scope.getCommaSeparatedString(scope.programAPIPortfolioModel);		 					
		 			}
		 			else
	 				{
		 				scope.program = scope.getCommaSeparatedString(scope.programAPIPortfolioModel);
		 			}
		 		}
	 		}
		 	else if("Clients"==name)
	 		{
		 		if(scope.clientAPIPortfolioModel.length==1 && scope.clientAPIPortfolioModel[0].id=="All")
	 			{
		 			scope.client = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.clientAPIPortfolioModel.length > 1)
	 				{
		 				scope.client = "All";
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.clientAPIPortfolioModel.splice(0,scope.clientAPIPortfolioModel.length);
			    		 scope.clientAPIPortfolioModel.push(idProp);
		 			}
		 			else if(scope.clientAPIPortfolioModel.length > 1 && scope.clientAPIPortfolioModel[0].id=="All")
		 			{
		 				scope.clientAPIPortfolioModel.splice(0,1);
		 				scope.client = scope.getCommaSeparatedString(scope.clientAPIPortfolioModel);
		 			}
		 			else
	 				{
		 				scope.client = scope.getCommaSeparatedString(scope.clientAPIPortfolioModel);
		 			}
		 		}		 		
	 		}
		 	else if("Profiles"==name)
	 		{
		 		
		 		if(scope.profileAPIPortfolioModel.length==1 && scope.profileAPIPortfolioModel[0].id=="All")
	 			{
		 			scope.profile = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.profileAPIPortfolioModel.length > 1)
	 				{
		 				scope.profile = "All";	
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.profileAPIPortfolioModel.splice(0,scope.profileAPIPortfolioModel.length);
			    		 scope.profileAPIPortfolioModel.push(idProp);
			    		 
		 			}
		 			else if(scope.profileAPIPortfolioModel.length > 1 && scope.profileAPIPortfolioModel[0].id=="All")
		 			{
		 				scope.profileAPIPortfolioModel.splice(0,1);
		 				scope.profile = scope.getCommaSeparatedString(scope.profileAPIPortfolioModel);
		 				
		 			}
		 			else
	 				{
		 				scope.profile = scope.getCommaSeparatedString(scope.profileAPIPortfolioModel);
		 			}
		 		}
	 		}
		 	else if("Backends"==name)
	 		{
		 		
		 		if(scope.backendAPIPortfolioModel.length==1 && scope.backendAPIPortfolioModel[0].id=="All")
	 			{
		 			scope.backend = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.backendAPIPortfolioModel.length > 1)
	 				{
		 				scope.backend = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.backendAPIPortfolioModel.splice(0,scope.backendAPIPortfolioModel.length);
			    		 scope.backendAPIPortfolioModel.push(idProp);
			    		 
			    		 
		 			}
		 			else if(scope.backendAPIPortfolioModel.length > 1 && scope.backendAPIPortfolioModel[0].id=="All")
		 			{
		 				scope.backendAPIPortfolioModel.splice(0,1);
		 				scope.backend = scope.getCommaSeparatedString(scope.backendAPIPortfolioModel);
		 			}
		 			else
	 				{
		 				scope.backend = scope.getCommaSeparatedString(scope.backendAPIPortfolioModel);
		 			}
		 		}
	 		}
		 	else if("Bundles"==name)
	 		{
		 		
		 		if(scope.bundleAPIPortfolioModel.length==1 && scope.bundleAPIPortfolioModel[0].id=="All")
	 			{
		 			scope.bundle = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.bundleAPIPortfolioModel.length > 1)
	 				{
		 				scope.bundle = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.bundleAPIPortfolioModel.splice(0,scope.bundleAPIPortfolioModel.length);
			    		 scope.bundleAPIPortfolioModel.push(idProp); 
		 			}
		 			else if(scope.bundleAPIPortfolioModel.length > 1 && scope.bundleAPIPortfolioModel[0].id=="All")
		 			{
		 				scope.bundleAPIPortfolioModel.splice(0,1);
		 				scope.bundle = scope.getCommaSeparatedString(scope.bundleAPIPortfolioModel);
		 			}
		 			else
	 				{
		 				scope.bundle = scope.getCommaSeparatedString(scope.bundleAPIPortfolioModel);
		 			}
		 		}
	 		}
		 	else if("APIs"==name)
	 		{
		 		if(scope.apiAPIPortfolioModel.length==1 && scope.apiAPIPortfolioModel[0].id=="All")
	 			{
		 			scope.api = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.apiAPIPortfolioModel.length > 1)
	 				{
		 				scope.api = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.apiAPIPortfolioModel.splice(0,scope.apiAPIPortfolioModel.length);
			    		 scope.apiAPIPortfolioModel.push(idProp);
		 			}
		 			else if(scope.apiAPIPortfolioModel.length > 1 && scope.apiAPIPortfolioModel[0].id=="All")
		 			{
		 				scope.apiAPIPortfolioModel.splice(0,1);
		 				scope.api = scope.getCommaSeparatedString(scope.apiAPIPortfolioModel);
		 			}
		 			else
	 				{
		 				scope.api = scope.getCommaSeparatedString(scope.apiAPIPortfolioModel);
		 			}
		 		}			
	 		}
			
		 	else if("Federated"==name)
	 		{
		 		if(scope.federatedAPIPortfolioModel.length==1 && scope.federatedAPIPortfolioModel[0].id=="All")
	 			{
		 			scope.federated = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.federatedAPIPortfolioModel.length > 1)
	 				{
		 				scope.federated = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.federatedAPIPortfolioModel.splice(0,scope.federatedAPIPortfolioModel.length);
			    		 scope.federatedAPIPortfolioModel.push(idProp);
		 			}
		 			else if(scope.federatedAPIPortfolioModel.length > 1 && scope.federatedAPIPortfolioModel[0].id=="All")
		 			{
		 				scope.federatedAPIPortfolioModel.splice(0,1);
		 				scope.federated = scope.getCommaSeparatedString(scope.federatedAPIPortfolioModel);
		 			}
		 			else
	 				{
		 				scope.federated = scope.getCommaSeparatedString(scope.federatedAPIPortfolioModel);
		 			}
		 		}			
	 		}
			
		 	else if("ApiToApi"==name)
	 		{
		 		if(scope.apitoapiAPIPortfolioModel.length==1 && scope.apitoapiAPIPortfolioModel[0].id=="All")
	 			{
		 			scope.apitoapi = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.apitoapiAPIPortfolioModel.length > 1)
	 				{
		 				scope.apitoapi = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.apitoapiAPIPortfolioModel.splice(0,scope.apitoapiAPIPortfolioModel.length);
			    		 scope.apitoapiAPIPortfolioModel.push(idProp);
		 			}
		 			else if(scope.apitoapiAPIPortfolioModel.length > 1 && scope.apitoapiAPIPortfolioModel[0].id=="All")
		 			{
		 				scope.apitoapiAPIPortfolioModel.splice(0,1);
		 				scope.apitoapi = scope.getCommaSeparatedString(scope.apitoapiAPIPortfolioModel);
		 			}
		 			else
	 				{
		 				scope.apitoapi = scope.getCommaSeparatedString(scope.apitoapiAPIPortfolioModel);
		 			}
		 		}			
	 		}
			
		 	else if("SubProcess"==name)
	 		{
		 		if(scope.subprocessAPIPortfolioModel.length==1 && scope.subprocessAPIPortfolioModel[0].id=="All")
	 			{
		 			scope.subprocess = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.subprocessAPIPortfolioModel.length > 1)
	 				{
		 				scope.subprocess = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.subprocessAPIPortfolioModel.splice(0,scope.subprocessAPIPortfolioModel.length);
			    		 scope.subprocessAPIPortfolioModel.push(idProp);
		 			}
		 			else if(scope.subprocessAPIPortfolioModel.length > 1 && scope.subprocessAPIPortfolioModel[0].id=="All")
		 			{
		 				scope.subprocessAPIPortfolioModel.splice(0,1);
		 				scope.subprocess = scope.getCommaSeparatedString(scope.subprocessAPIPortfolioModel);
		 			}
		 			else
	 				{
		 				scope.subprocess = scope.getCommaSeparatedString(scope.subprocessAPIPortfolioModel);
		 			}
		 		}			
	 		}
			
		 	else if("Jmsproviders"==name)
	 		{
		 		if(scope.jmsproviderAPIPortfolioModel.length==1 && scope.jmsproviderAPIPortfolioModel[0].id=="All")
	 			{
		 			scope.jmsprovider = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.jmsproviderAPIPortfolioModel.length > 1)
	 				{
		 				scope.jmsprovider = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.jmsproviderAPIPortfolioModel.splice(0,scope.jmsproviderAPIPortfolioModel.length);
			    		 scope.jmsproviderAPIPortfolioModel.push(idProp);
		 			}
		 			else if(scope.jmsproviderAPIPortfolioModel.length > 1 && scope.jmsproviderAPIPortfolioModel[0].id=="All")
		 			{
		 				scope.jmsproviderAPIPortfolioModel.splice(0,1);
		 				scope.jmsprovider = scope.getCommaSeparatedString(scope.jmsproviderAPIPortfolioModel);
		 			}
		 			else
	 				{
		 				scope.jmsprovider = scope.getCommaSeparatedString(scope.jmsproviderAPIPortfolioModel);
		 			}
		 		}			
	 		}
			
		};
	   
	    
	    
	   function KeyValueModel (key, value) 
		{
		    this.key = key;
		    this.value = value;
		}
		 
		KeyValueModel.prototype.getKey = function() 
		{
		    return this.key;
		};

		KeyValueModel.prototype.getValue = function() 
		{
		    return this.key;
		};
});