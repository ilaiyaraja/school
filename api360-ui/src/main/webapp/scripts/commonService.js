'use strict';

app.service('commonService', function()
{
	
	this.updateScopeFiltersWithDefaultValues = function(scope,rootScope)
	{
		
		scope.program = 'All';
		scope.client = 'All';
		scope.profile = 'All';
		scope.version = '0';
		scope.backend = 'All';
		scope.bundle = 'All';
		scope.api = 'All';
		scope.environment = 'All';
		scope.release = 'All';	
		scope.pid = 'All';	
		scope.federated = 'All';
		scope.apitoapi = 'All';
		scope.subprocess = 'All';
    };
    
    
    this.updateScopeFiltersWithUrlParamsValues = function(scope,rootScope)
	{
		
    	scope.version = '0';
		scope.environment = 'All';
		
    	if(rootScope.urlparams!=undefined && rootScope.urlparams.Programs!=undefined && rootScope.urlparams.Programs!=null)
    	{
    		scope.program = rootScope.urlparams.Programs;
    	}
    	else
		{
    		scope.program = 'All';
		}
    		
    	if(rootScope.urlparams!=undefined && rootScope.urlparams.Clients!=undefined && rootScope.urlparams.Clients!=null)
    	{
    		scope.client = rootScope.urlparams.Clients;
    	}
    	else
    	{
    		scope.client = 'All';
    	}
		
    	
    	
    	if(rootScope.urlparams!=undefined && rootScope.urlparams.Profiles!=undefined && rootScope.urlparams.Profiles!=null)
    	{
    		scope.profile = rootScope.urlparams.Profiles.split(",");	    		
    	}
    	else
    	{
    		scope.profile = 'All';	
    	}
    	
    	
    	if(rootScope.urlparams!=undefined && rootScope.urlparams.Bundles!=undefined && rootScope.urlparams.Bundles!=null)
    	{
    		scope.bundle = rootScope.urlparams.Bundles;
	    }
    	else
    	{
    		scope.bundle = 'All';
    	}
    				    	
    	
    	if(rootScope.urlparams!=undefined && rootScope.urlparams.APIs!=undefined && rootScope.urlparams.APIs!=null)
    	{
    		scope.api = rootScope.urlparams.APIs;
    	}
    	else
    	{
    		scope.api = 'All';
    	}
    	
    				    	
    	
    	if(rootScope.urlparams!=undefined && rootScope.urlparams.Backends!=undefined && rootScope.urlparams.Backends!=null)
    	{
    		scope.backend = rootScope.urlparams.Backends;
    	}
    	else
    	{
    		scope.backend = 'All';			    		
    	}
    	
    	
    	if(rootScope.urlparams!=undefined && rootScope.urlparams.Federated!=undefined && rootScope.urlparams.Federated!=null)
    	{
    		scope.federated  = rootScope.urlparams.Federated;
    	}
    	else
    	{
    		scope.federated = 'All';
    	}
    		
	
		if(rootScope.urlparams!=undefined && rootScope.urlparams.ApiToApi!=undefined && rootScope.urlparams.ApiToApi!=null)
    	{
			scope.apitoapi = rootScope.urlparams.ApiToApi;
    	}
    	else
    	{
    		scope.apitoapi = 'All';			    		
    	}
		
		
		if(rootScope.urlparams!=undefined && rootScope.urlparams.SubProcess!=undefined && rootScope.urlparams.SubProcess!=null)
    	{
			scope.subprocess = rootScope.urlparams.SubProcess;
    	}
    	else
    	{
    		scope.subprocess = 'All';		    		
    	}
		
		if(rootScope.urlparams!=undefined && rootScope.urlparams.Release!=undefined && rootScope.urlparams.Release!=null)
    	{
			scope.release = rootScope.urlparams.Release;
    	}
    	else
    	{
    		scope.release = 'All';			    		
    	}
	 
	 
		if(rootScope.urlparams!=undefined && rootScope.urlparams.PID!=undefined && rootScope.urlparams.PID!=null)
    	{
			scope.pid = rootScope.urlparams.PID;
    	}
    	else
    	{
    		scope.pid = 'All';	    		
    	}
    };
	
	this.emptyFilterModels = function(scope,rootScope)
	{
		
		scope.programModel = [];
		scope.clientModel = [];
		scope.profileModel = [];
		scope.versionModel = [];
		scope.backendModel = [];
		scope.bundleModel = [];
		scope.apiModel = [];
		scope.environmentModel = [];
		scope.releaseModel = [];
		scope.pidModel = [];		
		scope.federatedModel =  [];
		scope.apitoapiModel =  [];
		scope.subprocessModel = [];
	};
	
	this.emptyFilterData = function(scope,rootScope)
	{
		
		scope.programData = [];	
		scope.clientData = [];	
		scope.profileData = [];
		scope.versionData = [];
		scope.backendData = [];
		scope.bundleData = [];
		scope.apiData = [];
		scope.environmentData = [];
		scope.releaseData = [];
		scope.pidData = [];
		
		scope.federatedData =  [];
		scope.apitoapiData =  [];
		scope.subprocessData = [];
		
	};
	
	
	this.addFilterSettings = function(scope,rootScope)
	{
		
		
		 scope.programSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:3,selectionLimit:30}; 
		 scope.programCustomTexts = {buttonDefaultText: 'Programs'};
		 
		 scope.clientSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:3,selectionLimit:30}; 
		 scope.clientCustomTexts = {buttonDefaultText: 'Clients'};
		 
		 scope.profileSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:3,selectionLimit:30}; 
		 scope.profileCustomTexts = {buttonDefaultText: 'Profiles'};
		 
		 
		 scope.versionSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:3,selectionLimit:30}; 
		 scope.versionCustomTexts = {buttonDefaultText: 'Versions'};
		 
		 scope.backendSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:3,selectionLimit:30}; 
		 scope.backendCustomTexts = {buttonDefaultText: 'Backends'};
		 
		 scope.bundleSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1,selectionLimit:30}; 
		 scope.bundleCustomTexts = {buttonDefaultText: 'Bundles'};
		 
		 scope.apiSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1,selectionLimit:30}; 
		 scope.apiCustomTexts = {buttonDefaultText: 'APIs'};
		 
		 scope.environmentSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:3,selectionLimit:30}; 
		 scope.environmentCustomTexts = {buttonDefaultText: 'Environments'};
		 
		 scope.releaseSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:3,selectionLimit:30}; 
		 scope.releaseCustomTexts = {buttonDefaultText: 'Release'};
		 
		 
		 scope.pidSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:3,selectionLimit:30}; 
		 scope.pidCustomTexts = {buttonDefaultText: 'PID'};
		 
/*Added For New Filter 09/01/2015*/
		 
		 
		 scope.federatedSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:3,selectionLimit:30}; 
		 scope.federatedCustomTexts = {buttonDefaultText: 'Federated'};
		 
		 
		 scope.apitoapiSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:3,selectionLimit:30}; 
		 scope.apitoapiCustomTexts = {buttonDefaultText: 'ApiToApi'};
		 
		 scope.subProcessSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:3,selectionLimit:30}; 
		 scope.subProcessCustomTexts = {buttonDefaultText: 'SubProcess'};
		 
		 
		 
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
	        scope.release = 'All';	
	        scope.pid = 'All';	
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
			// var releaseLoad=http.get(this.getFilterRestURL(scope,"REA_FILTER_URL"));
			 //var pidLoad=http.get(this.getFilterRestURL(scope,"PID_FILTER_URL"));
			 
			 loadFilters.then(function(payload) 
		     {
				 
				scope.programData = payload.data.result.program;
				scope.clientData = payload.data.result.client;
				scope.profileData = payload.data.result.profile;
			    scope.backendData = payload.data.result.adapter;
			    scope.apiData = payload.data.result.api_name;
			    scope.bundleData = payload.data.result.container_name;
			    scope.federatedData = payload.data.result.federated;
			    scope.apitoapiData = payload.data.result.apitoapi;
			    scope.subprocessData = payload.data.result.subprocess;
				
			   			    
			    if(rootScope.urlparams!=undefined)
				{
			    	
			    	if(rootScope.programsDropDown==false && rootScope.urlparams!=undefined && rootScope.urlparams.Programs!=undefined && rootScope.urlparams.Programs!=null)
			    	{
			    		var ProgramsArray = rootScope.urlparams.Programs.split(",");
			    		
				    	for(var i=0; i < ProgramsArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = ProgramsArray[i];
							scope.programModel.push(idProp);			    		
				    	}
			    	}
			    	else if(rootScope.programsDropDown==false)
		    		{
			    		scope.programModel = new Array(payload.data.result.program[0]);
		    		}
			    		
			    	
			    	if(rootScope.clientsDropDown==false && rootScope.urlparams!=undefined && rootScope.urlparams.Clients!=undefined && rootScope.urlparams.Clients!=null)
			    	{
			    		var ClientArray = rootScope.urlparams.Clients.split(",");
			    		
				    	for(var i=0; i < ClientArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = ClientArray[i];
							scope.clientModel.push(idProp);			    		
				    	}
			    	}
			    	else if(rootScope.clientsDropDown==false)
			    	{
			    		scope.clientModel = new Array(payload.data.result.client[0]);
			    	}
					
			    	
			    	
			    	if(rootScope.profilesDropDown=false && rootScope.urlparams!=undefined && rootScope.urlparams.Profiles!=undefined && rootScope.urlparams.Profiles!=null)
			    	{
			    		var ProfilesArray = rootScope.urlparams.Profiles.split(",");
			    		
			    		for(var i=0; i < ProfilesArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = ProfilesArray[i];
							scope.profileModel.push(idProp);			    		
				    	}
			    	}
			    	else if(rootScope.profilesDropDown==false)
			    	{
			    		scope.profileModel = new Array(payload.data.result.profile[0]);	
			    	}
			    	
			    	
			    	if(rootScope.bundlesDropDown==false && rootScope.urlparams!=undefined && rootScope.urlparams.Bundles!=undefined && rootScope.urlparams.Bundles!=null)
			    	{
			    		var BundlesArray = rootScope.urlparams.Bundles.split(",");
			    		
				    	for(var i=0; i < BundlesArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = BundlesArray[i];
				    		scope.bundleModel.push(idProp);
				    		
				    	}
				    }
			    	else if(rootScope.bundlesDropDown==false)
			    	{
			    		scope.bundleModel = new Array(payload.data.result.container_name[0]);
			    	}
			    				    	
			    	
			    	if(rootScope.apisDropDown==false && rootScope.urlparams!=undefined && rootScope.urlparams.APIs!=undefined && rootScope.urlparams.APIs!=null)
			    	{
			    		var APIsArray = rootScope.urlparams.APIs.split(",");
			    		
				    	for(var i=0; i < APIsArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = APIsArray[i];
							scope.apiModel.push(idProp);			    		
				    	}
			    	}
			    	else if(rootScope.apisDropDown==false)
			    	{
			    		scope.apiModel = new Array(payload.data.result.api_name[0]);
			    	}
			    	
			    				    	
			    	
			    	if(rootScope.backendsDropDown==false && rootScope.urlparams!=undefined && rootScope.urlparams.Backends!=undefined && rootScope.urlparams.Backends!=null)
			    	{
			    		var BackendsArray = rootScope.urlparams.Backends.split(",");
				    	for(var i=0; i < BackendsArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = BackendsArray[i];
							scope.backendModel.push(idProp);			    		
				    	}
			    	}
			    	else if(rootScope.backendsDropDown==false)
			    	{
			    		scope.backendModel = new Array(payload.data.result.adapter[0]);			    		
			    	}
			    	
			    	
			    	
			    	if(rootScope.federatedDropDown==false && rootScope.urlparams!=undefined && rootScope.urlparams.Federated!=undefined && rootScope.urlparams.Federated!=null)
			    	{
			    		var FederatedArray = rootScope.urlparams.Federated.split(",");
				    	for(var i=0; i < FederatedArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = FederatedArray[i];
							scope.federatedModel.push(idProp);			    		
				    	}
			    	}
			    	else if(rootScope.federatedDropDown==false)
			    	{
			    		scope.federatedModel = new Array(payload.data.result.federated[0]);			    		
			    	}
			    		
				
					if(rootScope.apitoapiDropDown==false && rootScope.urlparams!=undefined && rootScope.urlparams.ApiToApi!=undefined && rootScope.urlparams.ApiToApi!=null)
			    	{
			    		var ApiToApiArray = rootScope.urlparams.ApiToApi.split(",");
				    	for(var i=0; i < ApiToApiArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = ApiToApiArray[i];
							scope.apitoapiModel.push(idProp);			    		
				    	}
			    	}
			    	else if(rootScope.apitoapiDropDown==false)
			    	{
			    		scope.apitoapiModel = new Array(payload.data.result.apitoapi[0]);			    		
			    	}
					
					
					if(rootScope.subProcessDropDown==false && rootScope.urlparams!=undefined && rootScope.urlparams.SubProcess!=undefined && rootScope.urlparams.SubProcess!=null)
			    	{
			    		var SubProcessArray = rootScope.urlparams.SubProcess.split(",");
				    	for(var i=0; i < SubProcessArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = SubProcessArray[i];
							scope.subprocessModel.push(idProp);			    		
				    	}
			    	}
			    	else if(rootScope.subProcessDropDown==false)
			    	{
			    		scope.subprocessModel = new Array(payload.data.result.subprocess[0]);			    		
			    	}
					
					
					
				}
			    else
			    {
			    	
			    	scope.bundleModel = new Array(payload.data.result.container_name[0]);		    
				    scope.programModel = new Array(payload.data.result.program[0]);
					scope.clientModel = new Array(payload.data.result.client[0]);
					scope.profileModel = new Array(payload.data.result.profile[0]);			
					scope.backendModel = new Array(payload.data.result.adapter[0]);
					scope.apiModel = new Array(payload.data.result.api_name[0]);
					
					scope.federatedModel = new Array(payload.data.result.federated[0]);
					scope.apitoapiModel = new Array(payload.data.result.apitoapi[0]);
					scope.subprocessModel = new Array(payload.data.result.subprocess[0]);
			    }
		     });		 
			 
			 envLoad.then(function(payload) 
		     {
				scope.environmentData = payload.data.result;
				scope.environmentModel = new Array(payload.data.result[0]);
			 });	 
	    };
	    
	    
	    
	    this.loadComboBoxForProjectPortfolio= function(scope,rootScope,http,url,pagelocation) 
		 {
	    	 
	    	this.emptyFilterModels(scope,rootScope);
			this.emptyFilterData(scope,rootScope);
			this.addFilterSettings(scope,rootScope);
			
			 var loadFilters = http.get(url);	 
			 http.dataType="json";
			 
			 
			 loadFilters.then(function(payload) 
		     {
				 
				scope.backendData = payload.data.result.adapter;
			    scope.apiData = payload.data.result.api_name;
			    scope.bundleData = payload.data.result.container_name;
			    scope.releaseData = payload.data.result.release;
			    scope.pidData = payload.data.result.pids;
			  
			   
			   			    
			    if(rootScope.urlparams!=undefined)
				{
			    	
			    	
			    	if(rootScope.bundlesDropDown==false && rootScope.urlparams!=undefined && rootScope.urlparams.Bundles!=undefined && rootScope.urlparams.Bundles!=null)
			    	{
			    		var BundlesArray = rootScope.urlparams.Bundles.split(",");
			    		
				    	for(var i=0; i < BundlesArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = BundlesArray[i];
				    		scope.bundleModel.push(idProp);
				    		
				    	}
				    }
			    	else if(rootScope.bundlesDropDown==false)
			    	{
			    		scope.bundleModel = new Array(payload.data.result.container_name[0]);
			    	}
			    				    	
			    	
			    	if(rootScope.apisDropDown==false && rootScope.urlparams!=undefined && rootScope.urlparams.APIs!=undefined && rootScope.urlparams.APIs!=null)
			    	{
			    		var APIsArray = rootScope.urlparams.APIs.split(",");
			    		
				    	for(var i=0; i < APIsArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = APIsArray[i];
							scope.apiModel.push(idProp);			    		
				    	}
			    	}
			    	else if(rootScope.apisDropDown==false)
			    	{
			    		scope.apiModel = new Array(payload.data.result.api_name[0]);
			    	}
			    	
			    				    	
			    	
			    	if(rootScope.backendsDropDown==false && rootScope.urlparams!=undefined && rootScope.urlparams.Backends!=undefined && rootScope.urlparams.Backends!=null)
			    	{
			    		var BackendsArray = rootScope.urlparams.Backends.split(",");
				    	for(var i=0; i < BackendsArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = BackendsArray[i];
							scope.backendModel.push(idProp);			    		
				    	}
			    	}
			    	else if(rootScope.backendsDropDown==false)
			    	{
			    		scope.backendModel = new Array(payload.data.result.adapter[0]);			    		
			    	}
			    	
					if(rootScope.pidDropDown==false && rootScope.urlparams!=undefined && rootScope.urlparams.PID!=undefined && rootScope.urlparams.PID!=null)
			    	{
			    		var PIDArray = rootScope.urlparams.PID.split(",");	
			    		
				    	for(var i=0; i < PIDArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = PIDArray[i];
							scope.pidModel.push(idProp);			    		
				    	}
			    	}
			    	else if(rootScope.pidDropDown==false)
			    	{
			    		scope.pidModel = new Array(payload.data.result[0]);			    		
			    	}
					
					
					
				 	if(rootScope.releaseDropDown==false && rootScope.urlparams!=undefined && rootScope.urlparams.Release!=undefined && rootScope.urlparams.Release!=null)
			    	{
			    		var ReleaseArray = rootScope.urlparams.Release.split(",");	
			    		
				    	for(var i=0; i < ReleaseArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = ReleaseArray[i];
							scope.releaseModel.push(idProp);			    		
				    	}
			    	}
			    	else if(rootScope.releaseDropDown==false)
			    	{
			    		scope.releaseModel = new Array(payload.data.result[0]);			    		
			    	}
				}
			    else
			    {
			    	
			    	scope.bundleModel = new Array(payload.data.result.container_name[0]);		    
				    scope.backendModel = new Array(payload.data.result.adapter[0]);
					scope.apiModel = new Array(payload.data.result.api_name[0]);					
					scope.releaseModel = new Array(payload.data.result.release[0]);
					scope.pidModel = new Array(payload.data.result.pids[0]);
			    }
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
					var local = scope.programModel;
					
					scope.programModel = [];
					scope.programData = payload.data.result.program;
					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							 scope.programModel.push(idProp);
		                });
					}
					else
					{
						scope.programModel = new Array(payload.data.result.program[0]);
					}
				}
				
				if("Clients"!=ignore)
				{
					var local = scope.clientModel;
					
					scope.clientModel = [];
					scope.clientData = payload.data.result.client;
					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.clientModel.push(idProp);
		                });
					}
					else
					{
						scope.clientModel = new Array(payload.data.result.client[0]);
					}

				}	
				
				if("Profiles"!=ignore)
				{
					var local = scope.profileModel;
					
					scope.profileModel = [];
					scope.profileData = payload.data.result.profile;
					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
						   var idProp = {idProp: 'id'};
						   idProp['id'] = value["id"];
							scope.profileModel.push(idProp);
		                });
					}
					else
					{
						scope.profileModel = new Array(payload.data.result.profile[0]);
					}
				}	
				
				if("Backends"!=ignore)
				{
					var local = scope.backendModel;
					
					scope.backendModel = [];
					scope.backendData = payload.data.result.adapter;

					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.backendModel.push(idProp);
		                });
					}
					else
					{
						scope.backendModel = new Array(payload.data.result.adapter[0]);
					}
				}			
				
				if("Bundles"!=ignore)
				{
					var local = scope.bundleModel;
					
					scope.bundleModel = [];
					scope.bundleData = payload.data.result.container_name;

					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.bundleModel.push(idProp);
		                });	
					}
					else
					{
						scope.bundleModel = new Array(payload.data.result.container_name[0]);
					}
				}					
				
				if("APIs"!=ignore)
				{
					var local = scope.apiModel;
					
					scope.apiModel = [];
					scope.apiData = payload.data.result.api_name;
					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.apiModel.push(idProp);
		                });	
					}
					else
					{
						scope.apiModel = new Array(payload.data.result.api_name[0]);
					}
				}
				
				//Added by Abhimanyu
				
				if("Federated"!=ignore)
				{
					
					var local = scope.federatedModel;
					
					scope.federatedModel = [];
					scope.federatedData = payload.data.result.federated;
					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							var idProp = {idProp: 'id'};
				    		idProp['id'] = value["id"];
							scope.federatedModel.push(idProp);
		                });	
					}
					else
					{
						scope.federatedModel = new Array(payload.data.result.federated[0]);
					}
				}
				
				
				if("ApiToApi"!=ignore)
				{
					var local = scope.apitoapiModel;
					
					scope.apitoapiModel = [];
					scope.apitoapiData = payload.data.result.apitoapi;
					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.apitoapiModel.push(idProp);
		                });	
					}
					else
					{
						scope.apitoapiModel = new Array(payload.data.result.apitoapi[0]);
					}
				}
				
				
				if("SubProcess"!=ignore)
				{
					var local = scope.subProcessModel;
					
					scope.subprocessModel = [];
					scope.subprocessData = payload.data.result.subprocess;
					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							 scope.subprocessModel.push(idProp);
		                });	
					}
					else
					{
						scope.subprocessModel = new Array(payload.data.result.subprocess[0]);
					}
				}
				
				
				
				
				if("PID"!=ignore)
				{
					var local = scope.pidModel;
					
					scope.pidModel = [];
					scope.pidData = payload.data.result.pids;
					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							 scope.pidModel.push(idProp);
		                });	
					}
					else
					{
						scope.pidModel = new Array(payload.data.result.pids[0]);
					}
				}
				
				if("Release"!=ignore)
				{
					var local = scope.releaseModel;
					
					scope.releaseModel = [];
					scope.releaseData = payload.data.result.release;
					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							 scope.releaseModel.push(idProp);
		                });	
					}
					else
					{
						scope.releaseModel = new Array(payload.data.result.release[0]);
					}
				}
				
		     });
	   };
	   
	   
	   
	   this.reloadComboBoxProjectPortfolio= function(scope,rootScope,http,url,ignore) 
		 {
	    	
	    	 var loadFilters = http.get(url);		 
			 http.dataType="json";
			 
			 loadFilters.then(function(payload) 
		     {
				
				
				
				if("Backends"!=ignore)
				{
					var local = scope.backendModel;
					
					scope.backendModel = [];
					scope.backendData = payload.data.result.adapter;

					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.backendModel.push(idProp);
		                });
					}
					else
					{
						scope.backendModel = new Array(payload.data.result.adapter[0]);
					}
				}			
				
				if("Bundles"!=ignore)
				{
					var local = scope.bundleModel;
					
					scope.bundleModel = [];
					scope.bundleData = payload.data.result.container_name;

					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.bundleModel.push(idProp);
		                });	
					}
					else
					{
						scope.bundleModel = new Array(payload.data.result.container_name[0]);
					}
				}					
				
				if("APIs"!=ignore)
				{
					var local = scope.apiModel;
					
					scope.apiModel = [];
					scope.apiData = payload.data.result.api_name;
					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.apiModel.push(idProp);
		                });	
					}
					else
					{
						scope.apiModel = new Array(payload.data.result.api_name[0]);
					}
				}
				
								
				
				
				
				
				if("PID"!=ignore)
				{
					var local = scope.pidModel;
					
					scope.pidModel = [];
					scope.pidData = payload.data.result.pids;
					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							 scope.pidModel.push(idProp);
		                });	
					}
					else
					{
						scope.pidModel = new Array(payload.data.result.pids[0]);
					}
				}
				
				if("Release"!=ignore)
				{
					var local = scope.releaseModel;
					
					scope.releaseModel = [];
					scope.releaseData = payload.data.result.release;
					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							 scope.releaseModel.push(idProp);
		                });	
					}
					else
					{
						scope.releaseModel = new Array(payload.data.result.release[0]);
					}
				}
				
		     });
	   };
	   
	   
	   
	   
	   
	   this.dashboardFilterReload=function(scope,rootScope,name,value)
		{
			
			
			if("Environments"==name)	
	 		{
		 		
		 		if(scope.environmentModel.length==1 && scope.environmentModel[0].id=="All")
	 			{
		 			scope.environment = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.environmentModel.length > 1)
	 				{
		 				 scope.environment = "All";
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 scope.environmentModel.splice(0,scope.environmentModel.length);
			    		 scope.environmentModel.push(idProp);		 				 
		 			}
		 			else if(scope.environmentModel.length > 1 && scope.environmentModel[0].id=="All")
		 			{
		 				scope.environmentModel.splice(0,1);
		 				scope.environment = scope.getCommaSeparatedString(scope.environmentModel);		 					
		 			}
		 			else
	 				{
		 				scope.environment = scope.getCommaSeparatedString(scope.environmentModel);
		 			}
		 		}
	 		}else if("Programs"==name)	
	 		{
		 		if(scope.programModel.length==1 && scope.programModel[0].id=="All")
	 			{
		 			scope.program = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.programModel.length > 1)
	 				{
		 				 scope.program = "All";
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 scope.programModel.splice(0,scope.programModel.length);
			    		 scope.programModel.push(idProp);		 				 
		 			}
		 			else if(scope.programModel.length > 1 && scope.programModel[0].id=="All")
		 			{
		 				scope.programModel.splice(0,1);
		 				scope.program = scope.getCommaSeparatedString(scope.programModel);		 					
		 			}
		 			else
	 				{
		 				scope.program = scope.getCommaSeparatedString(scope.programModel);
		 			}
		 		}
	 		}
		 	else if("Clients"==name)
	 		{
		 		if(scope.clientModel.length==1 && scope.clientModel[0].id=="All")
	 			{
		 			scope.client = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.clientModel.length > 1)
	 				{
		 				scope.client = "All";
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.clientModel.splice(0,scope.clientModel.length);
			    		 scope.clientModel.push(idProp);
		 			}
		 			else if(scope.clientModel.length > 1 && scope.clientModel[0].id=="All")
		 			{
		 				scope.clientModel.splice(0,1);
		 				scope.client = scope.getCommaSeparatedString(scope.clientModel);
		 			}
		 			else
	 				{
		 				scope.client = scope.getCommaSeparatedString(scope.clientModel);
		 			}
		 		}		 		
	 		}
		 	else if("Profiles"==name)
	 		{
		 		
		 		if(scope.profileModel.length==1 && scope.profileModel[0].id=="All")
	 			{
		 			scope.profile = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.profileModel.length > 1)
	 				{
		 				scope.profile = "All";	
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.profileModel.splice(0,scope.profileModel.length);
			    		 scope.profileModel.push(idProp);
			    		 
		 			}
		 			else if(scope.profileModel.length > 1 && scope.profileModel[0].id=="All")
		 			{
		 				scope.profileModel.splice(0,1);
		 				scope.profile = scope.getCommaSeparatedString(scope.profileModel);
		 				
		 			}
		 			else
	 				{
		 				scope.profile = scope.getCommaSeparatedString(scope.profileModel);
		 			}
		 		}
	 		}
		 	else if("Backends"==name)
	 		{
		 		
		 		if(scope.backendModel.length==1 && scope.backendModel[0].id=="All")
	 			{
		 			scope.backend = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.backendModel.length > 1)
	 				{
		 				scope.backend = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.backendModel.splice(0,scope.backendModel.length);
			    		 scope.backendModel.push(idProp);
			    		 
			    		 
		 			}
		 			else if(scope.backendModel.length > 1 && scope.backendModel[0].id=="All")
		 			{
		 				scope.backendModel.splice(0,1);
		 				scope.backend = scope.getCommaSeparatedString(scope.backendModel);
		 			}
		 			else
	 				{
		 				scope.backend = scope.getCommaSeparatedString(scope.backendModel);
		 			}
		 		}
	 		}
		 	else if("Bundles"==name)
	 		{
		 		
		 		if(scope.bundleModel.length==1 && scope.bundleModel[0].id=="All")
	 			{
		 			scope.bundle = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.bundleModel.length > 1)
	 				{
		 				scope.bundle = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.bundleModel.splice(0,scope.bundleModel.length);
			    		 scope.bundleModel.push(idProp); 
		 			}
		 			else if(scope.bundleModel.length > 1 && scope.bundleModel[0].id=="All")
		 			{
		 				scope.bundleModel.splice(0,1);
		 				scope.bundle = scope.getCommaSeparatedString(scope.bundleModel);
		 			}
		 			else
	 				{
		 				scope.bundle = scope.getCommaSeparatedString(scope.bundleModel);
		 			}
		 		}
	 		}
		 	else if("APIs"==name)
	 		{
		 		if(scope.apiModel.length==1 && scope.apiModel[0].id=="All")
	 			{
		 			scope.api = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.apiModel.length > 1)
	 				{
		 				scope.api = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.apiModel.splice(0,scope.apiModel.length);
			    		 scope.apiModel.push(idProp);
		 			}
		 			else if(scope.apiModel.length > 1 && scope.apiModel[0].id=="All")
		 			{
		 				scope.apiModel.splice(0,1);
		 				scope.api = scope.getCommaSeparatedString(scope.apiModel);
		 			}
		 			else
	 				{
		 				scope.api = scope.getCommaSeparatedString(scope.apiModel);
		 			}
		 		}			
	 		}
			
		 	else if("Federated"==name)
	 		{
		 		if(scope.federatedModel.length==1 && scope.federatedModel[0].id=="All")
	 			{
		 			scope.federated = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.federatedModel.length > 1)
	 				{
		 				scope.federated = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.federatedModel.splice(0,scope.federatedModel.length);
			    		 scope.federatedModel.push(idProp);
		 			}
		 			else if(scope.federatedModel.length > 1 && scope.federatedModel[0].id=="All")
		 			{
		 				scope.federatedModel.splice(0,1);
		 				scope.federated = scope.getCommaSeparatedString(scope.federatedModel);
		 			}
		 			else
	 				{
		 				scope.federated = scope.getCommaSeparatedString(scope.federatedModel);
		 			}
		 		}			
	 		}
			
		 	else if("ApiToApi"==name)
	 		{
		 		if(scope.apitoapiModel.length==1 && scope.apitoapiModel[0].id=="All")
	 			{
		 			scope.apitoapi = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.apitoapiModel.length > 1)
	 				{
		 				scope.apitoapi = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.apitoapiModel.splice(0,scope.apitoapiModel.length);
			    		 scope.apitoapiModel.push(idProp);
		 			}
		 			else if(scope.apitoapiModel.length > 1 && scope.apitoapiModel[0].id=="All")
		 			{
		 				scope.apitoapiModel.splice(0,1);
		 				scope.apitoapi = scope.getCommaSeparatedString(scope.apitoapiModel);
		 			}
		 			else
	 				{
		 				scope.apitoapi = scope.getCommaSeparatedString(scope.apitoapiModel);
		 			}
		 		}			
	 		}
			
		 	else if("SubProcess"==name)
	 		{
		 		if(scope.subprocessModel.length==1 && scope.subprocessModel[0].id=="All")
	 			{
		 			scope.subprocess = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.subprocessModel.length > 1)
	 				{
		 				scope.subprocess = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.subprocessModel.splice(0,scope.subprocessModel.length);
			    		 scope.subprocessModel.push(idProp);
		 			}
		 			else if(scope.subprocessModel.length > 1 && scope.subprocessModel[0].id=="All")
		 			{
		 				scope.subprocessModel.splice(0,1);
		 				scope.subprocess = scope.getCommaSeparatedString(scope.subprocessModel);
		 			}
		 			else
	 				{
		 				scope.subprocess = scope.getCommaSeparatedString(scope.subprocessModel);
		 			}
		 		}			
	 		}
			
			if("Release"==name)	
	 		{
		 		
		 		if(scope.releaseModel.length==1 && scope.releaseModel[0].id=="All")
	 			{
		 			scope.release = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.releaseModel.length > 1)
	 				{
		 				 scope.release = "All";
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 scope.releaseModel.splice(0,scope.releaseModel.length);
			    		 scope.releaseModel.push(idProp);		 				 
		 			}
		 			else if(scope.releaseModel.length > 1 && scope.releaseModel[0].id=="All")
		 			{
		 				scope.releaseModel.splice(0,1);
		 				scope.release = scope.getCommaSeparatedString(scope.releaseModel);		 					
		 			}
		 			else
	 				{
		 				scope.release = scope.getCommaSeparatedString(scope.releaseModel);
		 			}
		 		}
	 		}else if("PID"==name)	
	 		{
		 		
		 		if(scope.pidModel.length==1 && scope.pidModel[0].id=="All")
	 			{
		 			scope.pid = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.pidModel.length > 1)
	 				{
		 				 scope.pid = "All";
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 scope.pidModel.splice(0,scope.pidModel.length);
			    		 scope.pidModel.push(idProp);		 				 
		 			}
		 			else if(scope.pidModel.length > 1 && scope.pidModel[0].id=="All")
		 			{
		 				scope.pidModel.splice(0,1);
		 				scope.pid = scope.getCommaSeparatedString(scope.pidModel);		 					
		 			}
		 			else
	 				{
		 				scope.pid = scope.getCommaSeparatedString(scope.pidModel);
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