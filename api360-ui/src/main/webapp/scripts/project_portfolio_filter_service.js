'use strict';

app.service('projectPortfolioFilterService', function()
{
	
	this.updateScopeFiltersWithDefaultValues = function(scope,rootScope)
	{	
		scope.version = '0';
		scope.backend 	= rootScope.getGlobalURLFilter("Backends");
		scope.bundle 	= rootScope.getGlobalURLFilter("Bundles");
		scope.api 		= rootScope.getGlobalURLFilter("APIs");
		scope.environment = 'All';
		scope.release = 'All';	
		scope.pid = 'All';
		scope.program=rootScope.getGlobalURLFilter("Programs");
    };
    
    
    this.updateScopeFiltersWithUrlParamsValues = function(scope,rootScope)
	{
		
    	scope.version = '0';
		scope.environment = 'All';
    	
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
    	
    	
		
		if(rootScope.urlparams!=undefined && rootScope.urlparams.Release!=undefined && rootScope.urlparams.Release!=null)
    	{
			scope.release = rootScope.urlparams.Release;
    	}
    	
	 
	 
		if(rootScope.urlparams!=undefined && rootScope.urlparams.PID!=undefined && rootScope.urlparams.PID!=null)
    	{
			scope.pid = rootScope.urlparams.PID;
    	}
		
		if(rootScope.urlparams!=undefined && rootScope.urlparams.Programs!=undefined && rootScope.urlparams.Programs!=null)
    	{
			scope.program = rootScope.urlparams.Programs;
    	}
    	
    };
	
	this.emptyFilterModels = function(scope,rootScope)
	{
		scope.backendProjectPortfolioModel = [];
		scope.bundleProjectPortfolioModel = [];
		scope.apiProjectPortfolioModel = [];		
		scope.releaseProjectPortfolioModel = [];
		scope.pidProjectPortfolioModel = [];	
		scope.programProjectPortfolioModel= [];	
		
	};
	
	this.emptyFilterData = function(scope,rootScope)
	{
		scope.backendProjectPortfolioData = [];
		scope.bundleProjectPortfolioData = [];
		scope.apiProjectPortfolioData = [];		
		scope.releaseProjectPortfolioData = [];
		scope.pidProjectPortfolioData = [];	
		scope.programProjectPortfolioData= [];	
	};
	
	
	this.addFilterSettings = function(scope,rootScope)
	{	
		 scope.backendProjectPortfolioSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:3,selectionLimit:30}; 
		 scope.backendProjectPortfolioCustomTexts = {buttonDefaultText: 'Backends'};
		 
		 scope.bundleProjectPortfolioSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1,selectionLimit:30}; 
		 scope.bundleProjectPortfolioCustomTexts = {buttonDefaultText: 'Bundles'};
		 
		 scope.apiProjectPortfolioSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1,selectionLimit:30}; 
		 scope.apiProjectPortfolioCustomTexts = {buttonDefaultText: 'APIs'};
		 
		 scope.releaseProjectPortfolioSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:3,selectionLimit:30}; 
		 scope.releaseProjectPortfolioCustomTexts = {buttonDefaultText: 'Release'};
		 
		 
		 scope.pidProjectPortfolioSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:3,selectionLimit:30}; 
		 scope.pidProjectPortfolioCustomTexts = {buttonDefaultText: 'PID'};
		 
		 scope.programProjectPortfolioSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:3,selectionLimit:30}; 
		 scope.programProjectPortfolioCustomTexts = {buttonDefaultText: 'Programs'};
		 
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
			 
			 loadFilters.then(function(payload) 
		     {
				 
				scope.backendProjectPortfolioData = payload.data.result.adapter;
			    scope.apiProjectPortfolioData = payload.data.result.api_name;
			    scope.bundleProjectPortfolioData = payload.data.result.container_name;
			    scope.releaseProjectPortfolioData = payload.data.result.release;
			    scope.pidProjectPortfolioData = payload.data.result.pids; 
			    scope.programProjectPortfolioData = payload.data.result.program; 
			   			    
			    if(rootScope.urlparams!=undefined)
				{
			    	
			    	if( rootScope.urlparams!=undefined && rootScope.urlparams.Bundles!=undefined && rootScope.urlparams.Bundles!=null)
			    	{
			    		var BundlesArray = rootScope.urlparams.Bundles.split(",");
			    		
				    	for(var i=0; i < BundlesArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = BundlesArray[i];
				    		scope.bundleProjectPortfolioModel.push(idProp);
				    	}
				    }
			    	else
			    	{
			    		scope.bundleProjectPortfolioModel = new Array(payload.data.result.container_name[0]);
			    	}
			    				    	
			    	
			    	if(rootScope.urlparams!=undefined && rootScope.urlparams.APIs!=undefined && rootScope.urlparams.APIs!=null)
			    	{
			    		var APIsArray = rootScope.urlparams.APIs.split(",");
			    		
				    	for(var i=0; i < APIsArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = APIsArray[i];
							scope.apiProjectPortfolioModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.apiProjectPortfolioModel = new Array(payload.data.result.api_name[0]);
			    	}
			    	
			    				    	
			    	
			    	if(rootScope.urlparams!=undefined && rootScope.urlparams.Backends!=undefined && rootScope.urlparams.Backends!=null)
			    	{
			    		var BackendsArray = rootScope.urlparams.Backends.split(",");
				    	for(var i=0; i < BackendsArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = BackendsArray[i];
							scope.backendProjectPortfolioModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.backendProjectPortfolioModel = new Array(payload.data.result.adapter[0]);			    		
			    	}
			    	
					if(rootScope.urlparams!=undefined && rootScope.urlparams.PID!=undefined && rootScope.urlparams.PID!=null)
			    	{
			    		var PIDArray = rootScope.urlparams.PID.split(",");	
			    		
				    	for(var i=0; i < PIDArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = PIDArray[i];
							scope.pidProjectPortfolioModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.pidProjectPortfolioModel = new Array(payload.data.result[0]);			    		
			    	}
					
					
					
				 	if(rootScope.urlparams!=undefined && rootScope.urlparams.Release!=undefined && rootScope.urlparams.Release!=null)
			    	{
			    		var ReleaseArray = rootScope.urlparams.Release.split(",");	
			    		
				    	for(var i=0; i < ReleaseArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = ReleaseArray[i];
							scope.releaseProjectPortfolioModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.releaseProjectPortfolioModel = new Array(payload.data.result[0]);			    		
			    	}
				 	
				 	
				 	
				 	if(rootScope.urlparams!=undefined && rootScope.urlparams.Programs!=undefined && rootScope.urlparams.Programs!=null)
			    	{
			    		var ProgramArray = rootScope.urlparams.Programs.split(",");	
			    		
				    	for(var i=0; i < ProgramArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = ProgramArray[i];
							scope.programProjectPortfolioModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.programProjectPortfolioModel = new Array(payload.data.result[0]);			    		
			    	}
				 	
				 	
				 	
				 	
				}
			    else
			    {
			    	scope.bundleProjectPortfolioModel = rootScope.getModelObject(rootScope.getGlobalURLFilter("Bundles"));		    
				    scope.backendProjectPortfolioModel = rootScope.getModelObject(rootScope.getGlobalURLFilter("Backends"));
					scope.apiProjectPortfolioModel = rootScope.getModelObject(rootScope.getGlobalURLFilter("APIs"));
					scope.releaseProjectPortfolioModel = new Array(payload.data.result.release[0]);
					scope.pidProjectPortfolioModel = new Array(payload.data.result.pids[0]);
					scope.programProjectPortfolioModel = rootScope.getModelObject(rootScope.getGlobalURLFilter("Programs"));
			    }
		     }); 
	    };
	    
	    
	    
	    this.reloadComboBox= function(scope,rootScope,http,url,ignore) 
		 {
	    	
	    	 var loadFilters = http.get(url);		 
			 http.dataType="json";
			 
			 loadFilters.then(function(payload) 
		     {
				
				
				
				if("Backends"!=ignore)
				{
					var local = scope.backendProjectPortfolioModel;
					
					scope.backendProjectPortfolioModel = [];
					scope.backendProjectPortfolioData = payload.data.result.adapter;

					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.backendProjectPortfolioModel.push(idProp);
		                });
					}
					else
					{
						scope.backendProjectPortfolioModel = new Array(payload.data.result.adapter[0]);
					}
				}			
				
				if("Bundles"!=ignore)
				{
					var local = scope.bundleProjectPortfolioModel;
					
					scope.bundleProjectPortfolioModel = [];
					scope.bundleProjectPortfolioData = payload.data.result.container_name;

					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.bundleProjectPortfolioModel.push(idProp);
		                });	
					}
					else
					{
						scope.bundleProjectPortfolioModel = new Array(payload.data.result.container_name[0]);
					}
				}					
				
				if("APIs"!=ignore)
				{
					var local = scope.apiProjectPortfolioModel;
					
					scope.apiProjectPortfolioModel = [];
					scope.apiProjectPortfolioData = payload.data.result.api_name;
					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.apiProjectPortfolioModel.push(idProp);
		                });	
					}
					else
					{
						scope.apiProjectPortfolioModel = new Array(payload.data.result.api_name[0]);
					}
				}
				
				
				if("PID"!=ignore)
				{
					var local = scope.pidProjectPortfolioModel;
					
					scope.pidProjectPortfolioModel = [];
					scope.pidProjectPortfolioData = payload.data.result.pids;
					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							 scope.pidProjectPortfolioModel.push(idProp);
		                });	
					}
					else
					{
						scope.pidProjectPortfolioModel = new Array(payload.data.result.pids[0]);
					}
				}
				
				if("Release"!=ignore)
				{
					var local = scope.releaseProjectPortfolioModel;
					
					scope.releaseProjectPortfolioModel = [];
					scope.releaseProjectPortfolioData = payload.data.result.release;
					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							 scope.releaseProjectPortfolioModel.push(idProp);
		                });	
					}
					else
					{
						scope.releaseProjectPortfolioModel = new Array(payload.data.result.release[0]);
					}
				}
				
				if("Programs"!=ignore)
				{
					var local = scope.programProjectPortfolioModel;
					
					scope.programProjectPortfolioModel = [];
					scope.programProjectPortfolioData = payload.data.result.program;
					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							 scope.programProjectPortfolioModel.push(idProp);
		                });	
					}
					else
					{
						scope.programProjectPortfolioModel = new Array(payload.data.result.program[0]);
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
					var local = scope.backendProjectPortfolioModel;
					
					scope.backendProjectPortfolioModel = [];
					scope.backendProjectPortfolioData = payload.data.result.adapter;

					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.backendProjectPortfolioModel.push(idProp);
		                });
					}
					else
					{
						scope.backendProjectPortfolioModel = new Array(payload.data.result.adapter[0]);
					}
				}			
				
				if("Bundles"!=ignore)
				{
					var local = scope.bundleProjectPortfolioModel;
					
					scope.bundleProjectPortfolioModel = [];
					scope.bundleProjectPortfolioData = payload.data.result.container_name;

					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.bundleProjectPortfolioModel.push(idProp);
		                });	
					}
					else
					{
						scope.bundleProjectPortfolioModel = new Array(payload.data.result.container_name[0]);
					}
				}					
				
				if("APIs"!=ignore)
				{
					var local = scope.apiProjectPortfolioModel;
					
					scope.apiProjectPortfolioModel = [];
					scope.apiProjectPortfolioData = payload.data.result.api_name;
					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.apiProjectPortfolioModel.push(idProp);
		                });	
					}
					else
					{
						scope.apiProjectPortfolioModel = new Array(payload.data.result.api_name[0]);
					}
				}
				
								
				
				
				
				
				if("PID"!=ignore)
				{
					var local = scope.pidProjectPortfolioModel;
					
					scope.pidProjectPortfolioModel = [];
					scope.pidProjectPortfolioData = payload.data.result.pids;
					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							 scope.pidProjectPortfolioModel.push(idProp);
		                });	
					}
					else
					{
						scope.pidProjectPortfolioModel = new Array(payload.data.result.pids[0]);
					}
				}
				
				if("Release"!=ignore)
				{
					var local = scope.releaseProjectPortfolioModel;
					
					scope.releaseProjectPortfolioModel = [];
					scope.releaseProjectPortfolioData = payload.data.result.release;
					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							 scope.releaseProjectPortfolioModel.push(idProp);
		                });	
					}
					else
					{
						scope.releaseProjectPortfolioModel = new Array(payload.data.result.release[0]);
					}
				}
				
				
				if("Programs"!=ignore)
				{
					var local = scope.programProjectPortfolioModel;
					
					
					
					scope.programProjectPortfolioModel = [];
					scope.programProjectPortfolioData = payload.data.result.program;
					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							 scope.programProjectPortfolioModel.push(idProp);
		                });	
					}
					else
					{
						scope.programProjectPortfolioModel = new Array(payload.data.result.program[0]);
					}
				}
				
		     });
	   };
	   
	   
	   
	   
	   
	   this.dashboardFilterReload=function(scope,rootScope,name,value)
		{
			
			
		   if("Backends"==name)
	 		{
		 		
		 		if(scope.backendProjectPortfolioModel.length==1 && scope.backendProjectPortfolioModel[0].id=="All")
	 			{
		 			scope.backend = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.backendProjectPortfolioModel.length > 1)
	 				{
		 				scope.backend = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.backendProjectPortfolioModel.splice(0,scope.backendProjectPortfolioModel.length);
			    		 scope.backendProjectPortfolioModel.push(idProp);
			    		 
			    		 
		 			}
		 			else if(scope.backendProjectPortfolioModel.length > 1 && scope.backendProjectPortfolioModel[0].id=="All")
		 			{
		 				scope.backendProjectPortfolioModel.splice(0,1);
		 				scope.backend = scope.getCommaSeparatedString(scope.backendProjectPortfolioModel);
		 			}
		 			else
	 				{
		 				scope.backend = scope.getCommaSeparatedString(scope.backendProjectPortfolioModel);
		 			}
		 		}
	 		}
		 	else if("Bundles"==name)
	 		{
		 		
		 		if(scope.bundleProjectPortfolioModel.length==1 && scope.bundleProjectPortfolioModel[0].id=="All")
	 			{
		 			scope.bundle = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.bundleProjectPortfolioModel.length > 1)
	 				{
		 				scope.bundle = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.bundleProjectPortfolioModel.splice(0,scope.bundleProjectPortfolioModel.length);
			    		 scope.bundleProjectPortfolioModel.push(idProp); 
		 			}
		 			else if(scope.bundleProjectPortfolioModel.length > 1 && scope.bundleProjectPortfolioModel[0].id=="All")
		 			{
		 				scope.bundleProjectPortfolioModel.splice(0,1);
		 				scope.bundle = scope.getCommaSeparatedString(scope.bundleProjectPortfolioModel);
		 			}
		 			else
	 				{
		 				scope.bundle = scope.getCommaSeparatedString(scope.bundleProjectPortfolioModel);
		 			}
		 		}
	 		}
		 	else if("APIs"==name)
	 		{
		 		if(scope.apiProjectPortfolioModel.length==1 && scope.apiProjectPortfolioModel[0].id=="All")
	 			{
		 			scope.api = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.apiProjectPortfolioModel.length > 1)
	 				{
		 				scope.api = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.apiProjectPortfolioModel.splice(0,scope.apiProjectPortfolioModel.length);
			    		 scope.apiProjectPortfolioModel.push(idProp);
		 			}
		 			else if(scope.apiProjectPortfolioModel.length > 1 && scope.apiProjectPortfolioModel[0].id=="All")
		 			{
		 				scope.apiProjectPortfolioModel.splice(0,1);
		 				scope.api = scope.getCommaSeparatedString(scope.apiProjectPortfolioModel);
		 			}
		 			else
	 				{
		 				scope.api = scope.getCommaSeparatedString(scope.apiProjectPortfolioModel);
		 			}
		 		}			
	 		}			
		 	else if("Release"==name)	
	 		{
		 		
		 		if(scope.releaseProjectPortfolioModel.length==1 && scope.releaseProjectPortfolioModel[0].id=="All")
	 			{
		 			scope.release = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.releaseProjectPortfolioModel.length > 1)
	 				{
		 				 scope.release = "All";
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 scope.releaseProjectPortfolioModel.splice(0,scope.releaseProjectPortfolioModel.length);
			    		 scope.releaseProjectPortfolioModel.push(idProp);		 				 
		 			}
		 			else if(scope.releaseProjectPortfolioModel.length > 1 && scope.releaseProjectPortfolioModel[0].id=="All")
		 			{
		 				scope.releaseProjectPortfolioModel.splice(0,1);
		 				scope.release = scope.getCommaSeparatedString(scope.releaseProjectPortfolioModel);		 					
		 			}
		 			else
	 				{
		 				scope.release = scope.getCommaSeparatedString(scope.releaseProjectPortfolioModel);
		 			}
		 		}
	 		}else if("PID"==name)	
	 		{
		 		
		 		if(scope.pidProjectPortfolioModel.length==1 && scope.pidProjectPortfolioModel[0].id=="All")
	 			{
		 			scope.pid = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.pidProjectPortfolioModel.length > 1)
	 				{
		 				 scope.pid = "All";
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 scope.pidProjectPortfolioModel.splice(0,scope.pidProjectPortfolioModel.length);
			    		 scope.pidProjectPortfolioModel.push(idProp);		 				 
		 			}
		 			else if(scope.pidProjectPortfolioModel.length > 1 && scope.pidProjectPortfolioModel[0].id=="All")
		 			{
		 				scope.pidProjectPortfolioModel.splice(0,1);
		 				scope.pid = scope.getCommaSeparatedString(scope.pidProjectPortfolioModel);		 					
		 			}
		 			else
	 				{
		 				scope.pid = scope.getCommaSeparatedString(scope.pidProjectPortfolioModel);
		 			}
		 		}
	 		}else if("Programs"==name)	
	 		{
		 		
	 			
		 		if(scope.programProjectPortfolioModel.length==1 && scope.programProjectPortfolioModel[0].id=="All")
	 			{
		 			scope.program = "All";
		 		}
		 		else
	 			{
		 			
		 			if(value=="All" && scope.programProjectPortfolioModel.length > 1)
	 				{
		 				 scope.program = "All";
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 scope.programProjectPortfolioModel.splice(0,scope.programProjectPortfolioModel.length);
			    		 scope.programProjectPortfolioModel.push(idProp);		 				 
		 			}
		 			else if(scope.programProjectPortfolioModel.length > 1 && scope.programProjectPortfolioModel[0].id=="All")
		 			{
		 				scope.programProjectPortfolioModel.splice(0,1);
		 				scope.program = scope.getCommaSeparatedString(scope.programProjectPortfolioModel);		 					
		 			}
		 			else
	 				{
		 				scope.program = scope.getCommaSeparatedString(scope.programProjectPortfolioModel);
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