'use strict';

app.service('execDashboardFilterService', function()
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
    	    
    };
	
	this.emptyFilterModels = function(scope,rootScope)
	{
		
		scope.programExecDashboardModel = [];
		scope.clientExecDashboardModel = [];
		scope.profileExecDashboardModel = [];
		scope.versionExecDashboardModel = [];
		scope.backendExecDashboardModel = [];
		scope.bundleExecDashboardModel = [];
		scope.apiExecDashboardModel = [];
		scope.environmentExecDashboardModel = [];
		
	};
	
	this.emptyFilterData = function(scope,rootScope)
	{
		
		scope.programExecDashboardData = [];	
		scope.clientExecDashboardData = [];	
		scope.profileExecDashboardData = [];
		scope.versionExecDashboardData = [];
		scope.backendExecDashboardData = [];
		scope.bundleExecDashboardData = [];
		scope.apiExecDashboardData = [];
		scope.environmentExecDashboardData = [];
		
		
	};
	
	
	this.addFilterSettings = function(scope,rootScope)
	{
		 scope.programExecDashboardSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:3,selectionLimit:30}; 
		 scope.programExecDashboardCustomTexts = {buttonDefaultText: 'Programs'};
		 
		 scope.clientExecDashboardSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:3,selectionLimit:30}; 
		 scope.clientExecDashboardCustomTexts = {buttonDefaultText: 'Clients'};
		 
		 scope.profileExecDashboardSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:3,selectionLimit:30}; 
		 scope.profileExecDashboardCustomTexts = {buttonDefaultText: 'Profiles'};
		 
		 
		 scope.versionExecDashboardSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:3,selectionLimit:30}; 
		 scope.versionExecDashboardCustomTexts = {buttonDefaultText: 'Versions'};
		 
		 scope.backendExecDashboardSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:3,selectionLimit:30}; 
		 scope.backendExecDashboardCustomTexts = {buttonDefaultText: 'Backends'};
		 
		 scope.bundleExecDashboardSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1,selectionLimit:30}; 
		 scope.bundleExecDashboardCustomTexts = {buttonDefaultText: 'Bundles'};
		 
		 scope.apiExecDashboardSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1,selectionLimit:30}; 
		 scope.apiExecDashboardCustomTexts = {buttonDefaultText: 'APIs'};
		 
		 scope.environmentExecDashboardSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:3,selectionLimit:30}; 
		 scope.environmentExecDashboardCustomTexts = {buttonDefaultText: 'Environments'};	
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
	    };
	    
	    
	    
	    
	    var filterUrlsArray = new Array();
		
		this.getFilterRestURLs = function(scope,rootScope)
		{	
	        filterUrlsArray.push(new KeyValueModel("ALL_FILTER_URL","/api360-service/filter/lookup/All/0/All/All/All/allexecdashboardfilters.json"));
			filterUrlsArray.push(new KeyValueModel("CUSTOM_FILTER_URL","/api360-service/filter/lookup/"+scope.api+"/"+scope.version+"/"+scope.profile+"/"+scope.client+"/"+scope.program+"/"+scope.bundle+"/"+scope.backend+"/All/allexecdashboardfilters.json"));
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
				 
				scope.programExecDashboardData = payload.data.result.program;
				scope.clientExecDashboardData = payload.data.result.client;
				scope.profileExecDashboardData = payload.data.result.profile;
			    scope.backendExecDashboardData = payload.data.result.adapter;
			    scope.apiExecDashboardData = payload.data.result.api_name;
			    scope.bundleExecDashboardData = payload.data.result.container_name;
			    		    
			    if(rootScope.urlparams!=undefined)
				{
			    	
			    	if(rootScope.urlparams!=undefined && rootScope.urlparams.Programs!=undefined && rootScope.urlparams.Programs!=null)
			    	{
			    		var ProgramsArray = rootScope.urlparams.Programs.split(",");
			    		
				    	for(var i=0; i < ProgramsArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = ProgramsArray[i];
							scope.programExecDashboardModel.push(idProp);			    		
				    	}
			    	}
			    	else
		    		{
			    		scope.programExecDashboardModel = new Array(payload.data.result.program[0]);
		    		}
			    		
			    	
			    	if(rootScope.urlparams!=undefined && rootScope.urlparams.Clients!=undefined && rootScope.urlparams.Clients!=null)
			    	{
			    		var ClientArray = rootScope.urlparams.Clients.split(",");
			    		
				    	for(var i=0; i < ClientArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = ClientArray[i];
							scope.clientExecDashboardModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.clientExecDashboardModel = new Array(payload.data.result.client[0]);
			    	}
					
			    	
			    	
			    	if( rootScope.urlparams!=undefined && rootScope.urlparams.Profiles!=undefined && rootScope.urlparams.Profiles!=null)
			    	{
			    		var ProfilesArray = rootScope.urlparams.Profiles.split(",");
			    		
			    		for(var i=0; i < ProfilesArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = ProfilesArray[i];
							scope.profileExecDashboardModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.profileExecDashboardModel = new Array(payload.data.result.profile[0]);	
			    	}
			    	
			    	
			    	if(rootScope.urlparams!=undefined && rootScope.urlparams.Bundles!=undefined && rootScope.urlparams.Bundles!=null)
			    	{
			    		var BundlesArray = rootScope.urlparams.Bundles.split(",");
			    		
				    	for(var i=0; i < BundlesArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = BundlesArray[i];
				    		scope.bundleExecDashboardModel.push(idProp);
				    		
				    	}
				    }
			    	else
			    	{
			    		scope.bundleExecDashboardModel = new Array(payload.data.result.container_name[0]);
			    	}
			    				    	
			    	
			    	if( rootScope.urlparams!=undefined && rootScope.urlparams.APIs!=undefined && rootScope.urlparams.APIs!=null)
			    	{
			    		var APIsArray = rootScope.urlparams.APIs.split(",");
			    		
				    	for(var i=0; i < APIsArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = APIsArray[i];
							scope.apiExecDashboardModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.apiExecDashboardModel = new Array(payload.data.result.api_name[0]);
			    	}
			    	
			    				    	
			    	
			    	if( rootScope.urlparams!=undefined && rootScope.urlparams.Backends!=undefined && rootScope.urlparams.Backends!=null)
			    	{
			    		var BackendsArray = rootScope.urlparams.Backends.split(",");
				    	for(var i=0; i < BackendsArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = BackendsArray[i];
							scope.backendExecDashboardModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.backendExecDashboardModel = new Array(payload.data.result.adapter[0]);			    		
			    	}
				}
			    else
			    {
			    	scope.bundleExecDashboardModel = rootScope.getModelObject(rootScope.getGlobalURLFilter("Bundles"));		    
				    scope.programExecDashboardModel = rootScope.getModelObject(rootScope.getGlobalURLFilter("Programs"));
					scope.clientExecDashboardModel = rootScope.getModelObject(rootScope.getGlobalURLFilter("Clients"));
					scope.profileExecDashboardModel =  rootScope.getModelObject(rootScope.getGlobalURLFilter("Profiles"));			
					scope.backendExecDashboardModel = rootScope.getModelObject(rootScope.getGlobalURLFilter("Backends"));
					scope.apiExecDashboardModel = rootScope.getModelObject(rootScope.getGlobalURLFilter("APIs"));
			    }
		     });		 
			 
			 envLoad.then(function(payload) 
		     {
				scope.environmentExecDashboardData = payload.data.result;
				scope.environmentExecDashboardModel = new Array(payload.data.result[0]);
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
					var local = scope.programExecDashboardModel;
					
					scope.programExecDashboardModel = [];
					scope.programExecDashboardData = payload.data.result.program;
					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							 scope.programExecDashboardModel.push(idProp);
		                });
					}
					else
					{
						scope.programExecDashboardModel = new Array(payload.data.result.program[0]);
					}
				}
				
				if("Clients"!=ignore)
				{
					var local = scope.clientExecDashboardModel;
					
					scope.clientExecDashboardModel = [];
					scope.clientExecDashboardData = payload.data.result.client;
					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.clientExecDashboardModel.push(idProp);
		                });
					}
					else
					{
						scope.clientExecDashboardModel = new Array(payload.data.result.client[0]);
					}

				}	
				
				if("Profiles"!=ignore)
				{
					var local = scope.profileExecDashboardModel;
					
					scope.profileExecDashboardModel = [];
					scope.profileExecDashboardData = payload.data.result.profile;
					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
						   var idProp = {idProp: 'id'};
						   idProp['id'] = value["id"];
							scope.profileExecDashboardModel.push(idProp);
		                });
					}
					else
					{
						scope.profileExecDashboardModel = new Array(payload.data.result.profile[0]);
					}
				}	
				
				if("Backends"!=ignore)
				{
					var local = scope.backendExecDashboardModel;
					
					scope.backendExecDashboardModel = [];
					scope.backendExecDashboardData = payload.data.result.adapter;

					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.backendExecDashboardModel.push(idProp);
		                });
					}
					else
					{
						scope.backendExecDashboardModel = new Array(payload.data.result.adapter[0]);
					}
				}			
				
				if("Bundles"!=ignore)
				{
					var local = scope.bundleExecDashboardModel;
					
					scope.bundleExecDashboardModel = [];
					scope.bundleExecDashboardData = payload.data.result.container_name;

					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.bundleExecDashboardModel.push(idProp);
		                });	
					}
					else
					{
						scope.bundleExecDashboardModel = new Array(payload.data.result.container_name[0]);
					}
				}					
				
				if("APIs"!=ignore)
				{
					var local = scope.apiExecDashboardModel;
					
					scope.apiExecDashboardModel = [];
					scope.apiExecDashboardData = payload.data.result.api_name;
					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.apiExecDashboardModel.push(idProp);
		                });	
					}
					else
					{
						scope.apiExecDashboardModel = new Array(payload.data.result.api_name[0]);
					}
				}
				
		     });
	   };
	   
	   	   
	   
	   this.dashboardFilterReload=function(scope,rootScope,name,value)
		{
			
			
			if("Environments"==name)	
	 		{
		 		
		 		if(scope.environmentExecDashboardModel.length==1 && scope.environmentExecDashboardModel[0].id=="All")
	 			{
		 			scope.environment = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.environmentExecDashboardModel.length > 1)
	 				{
		 				 scope.environment = "All";
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 scope.environmentExecDashboardModel.splice(0,scope.environmentExecDashboardModel.length);
			    		 scope.environmentExecDashboardModel.push(idProp);		 				 
		 			}
		 			else if(scope.environmentExecDashboardModel.length > 1 && scope.environmentExecDashboardModel[0].id=="All")
		 			{
		 				scope.environmentExecDashboardModel.splice(0,1);
		 				scope.environment = scope.getCommaSeparatedString(scope.environmentExecDashboardModel);		 					
		 			}
		 			else
	 				{
		 				scope.environment = scope.getCommaSeparatedString(scope.environmentExecDashboardModel);
		 			}
		 		}
	 		}else if("Programs"==name)	
	 		{
		 		if(scope.programExecDashboardModel.length==1 && scope.programExecDashboardModel[0].id=="All")
	 			{
		 			scope.program = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.programExecDashboardModel.length > 1)
	 				{
		 				 scope.program = "All";
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 scope.programExecDashboardModel.splice(0,scope.programExecDashboardModel.length);
			    		 scope.programExecDashboardModel.push(idProp);		 				 
		 			}
		 			else if(scope.programExecDashboardModel.length > 1 && scope.programExecDashboardModel[0].id=="All")
		 			{
		 				scope.programExecDashboardModel.splice(0,1);
		 				scope.program = scope.getCommaSeparatedString(scope.programExecDashboardModel);		 					
		 			}
		 			else
	 				{
		 				scope.program = scope.getCommaSeparatedString(scope.programExecDashboardModel);
		 			}
		 		}
	 		}
		 	else if("Clients"==name)
	 		{
		 		if(scope.clientExecDashboardModel.length==1 && scope.clientExecDashboardModel[0].id=="All")
	 			{
		 			scope.client = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.clientExecDashboardModel.length > 1)
	 				{
		 				scope.client = "All";
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.clientExecDashboardModel.splice(0,scope.clientExecDashboardModel.length);
			    		 scope.clientExecDashboardModel.push(idProp);
		 			}
		 			else if(scope.clientExecDashboardModel.length > 1 && scope.clientExecDashboardModel[0].id=="All")
		 			{
		 				scope.clientExecDashboardModel.splice(0,1);
		 				scope.client = scope.getCommaSeparatedString(scope.clientExecDashboardModel);
		 			}
		 			else
	 				{
		 				scope.client = scope.getCommaSeparatedString(scope.clientExecDashboardModel);
		 			}
		 		}		 		
	 		}
		 	else if("Profiles"==name)
	 		{
		 		
		 		if(scope.profileExecDashboardModel.length==1 && scope.profileExecDashboardModel[0].id=="All")
	 			{
		 			scope.profile = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.profileExecDashboardModel.length > 1)
	 				{
		 				scope.profile = "All";	
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.profileExecDashboardModel.splice(0,scope.profileExecDashboardModel.length);
			    		 scope.profileExecDashboardModel.push(idProp);
			    		 
		 			}
		 			else if(scope.profileExecDashboardModel.length > 1 && scope.profileExecDashboardModel[0].id=="All")
		 			{
		 				scope.profileExecDashboardModel.splice(0,1);
		 				scope.profile = scope.getCommaSeparatedString(scope.profileExecDashboardModel);
		 				
		 			}
		 			else
	 				{
		 				scope.profile = scope.getCommaSeparatedString(scope.profileExecDashboardModel);
		 			}
		 		}
	 		}
		 	else if("Backends"==name)
	 		{
		 		
		 		if(scope.backendExecDashboardModel.length==1 && scope.backendExecDashboardModel[0].id=="All")
	 			{
		 			scope.backend = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.backendExecDashboardModel.length > 1)
	 				{
		 				scope.backend = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.backendExecDashboardModel.splice(0,scope.backendExecDashboardModel.length);
			    		 scope.backendExecDashboardModel.push(idProp);
			    		 
			    		 
		 			}
		 			else if(scope.backendExecDashboardModel.length > 1 && scope.backendExecDashboardModel[0].id=="All")
		 			{
		 				scope.backendExecDashboardModel.splice(0,1);
		 				scope.backend = scope.getCommaSeparatedString(scope.backendExecDashboardModel);
		 			}
		 			else
	 				{
		 				scope.backend = scope.getCommaSeparatedString(scope.backendExecDashboardModel);
		 			}
		 		}
	 		}
		 	else if("Bundles"==name)
	 		{
		 		
		 		if(scope.bundleExecDashboardModel.length==1 && scope.bundleExecDashboardModel[0].id=="All")
	 			{
		 			scope.bundle = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.bundleExecDashboardModel.length > 1)
	 				{
		 				scope.bundle = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.bundleExecDashboardModel.splice(0,scope.bundleExecDashboardModel.length);
			    		 scope.bundleExecDashboardModel.push(idProp); 
		 			}
		 			else if(scope.bundleExecDashboardModel.length > 1 && scope.bundleExecDashboardModel[0].id=="All")
		 			{
		 				scope.bundleExecDashboardModel.splice(0,1);
		 				scope.bundle = scope.getCommaSeparatedString(scope.bundleExecDashboardModel);
		 			}
		 			else
	 				{
		 				scope.bundle = scope.getCommaSeparatedString(scope.bundleExecDashboardModel);
		 			}
		 		}
	 		}
		 	else if("APIs"==name)
	 		{
		 		if(scope.apiExecDashboardModel.length==1 && scope.apiExecDashboardModel[0].id=="All")
	 			{
		 			scope.api = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.apiExecDashboardModel.length > 1)
	 				{
		 				scope.api = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.apiExecDashboardModel.splice(0,scope.apiExecDashboardModel.length);
			    		 scope.apiExecDashboardModel.push(idProp);
		 			}
		 			else if(scope.apiExecDashboardModel.length > 1 && scope.apiExecDashboardModel[0].id=="All")
		 			{
		 				scope.apiExecDashboardModel.splice(0,1);
		 				scope.api = scope.getCommaSeparatedString(scope.apiExecDashboardModel);
		 			}
		 			else
	 				{
		 				scope.api = scope.getCommaSeparatedString(scope.apiExecDashboardModel);
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