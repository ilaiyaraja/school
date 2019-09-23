'use strict';

app.service('ApiResourceFinderFilterService', function()
{
	
	this.updateScopeFiltersWithDefaultValues = function(scope,rootScope)
	{	
		
		scope.backend = rootScope.getGlobalURLFilter("Backends");
		scope.bundle = 'All' ;
		scope.api = rootScope.getGlobalURLFilter("APIs");
		scope.version = 'All';
		scope.profile = 'All';
		scope.srtd = 'All';
	};
    
    
    this.updateScopeFiltersWithUrlParamsValues = function(scope,rootScope)
	{
    	
    	
    	//scope.bundle ='All' ;
    	
    				    	
    	
    	if(rootScope.urlparams!=undefined && rootScope.urlparams.Apis!=undefined && rootScope.urlparams.Apis!=null)
    	{
    		scope.api = rootScope.urlparams.Apis;
    	}
    	
    	if(rootScope.urlparams!=undefined && rootScope.urlparams.Bundles!=undefined && rootScope.urlparams.Bundles!=null)
    	{
    		scope.bundle = rootScope.urlparams.Bundles;
    	}
    	
    	if(rootScope.urlparams!=undefined && rootScope.urlparams.Major!=undefined && rootScope.urlparams.Major!=null)
    	{
    		scope.version = rootScope.urlparams.Major;
    	}
    	
    	if(rootScope.urlparams!=undefined && rootScope.urlparams.Minor!=undefined && rootScope.urlparams.Minor!=null)
    	{
    		scope.profile = rootScope.urlparams.Minor;
    	}
    	
    	if(rootScope.urlparams!=undefined && rootScope.urlparams.Srtd!=undefined && rootScope.urlparams.Srtd!=null)
    	{
    		scope.srtd = rootScope.urlparams.Srtd;
    	}
    	
    	if(rootScope.urlparams!=undefined && rootScope.urlparams.Backends!=undefined && rootScope.urlparams.Backends!=null)
    	{
    		scope.backend = rootScope.urlparams.Backends;
    	}
    	
    	
		
    };
	
	this.emptyFilterModels = function(scope,rootScope)
	{
		scope.backendAdapterInventoryModel = [];
		scope.apiApiResourceFinderModel = [];
		scope.majorApiResourceFinderModel = [];	
		scope.minorApiResourceFinderModel = [];	
		scope.srtdApiResourceFinderModel = [];	
		scope.bundleApiResourceFinderModel = [];	
		
	};
	
	this.emptyFilterData = function(scope,rootScope)
	{
		scope.backendAdapterInventoryData = [];
		scope.apiApiResourceFinderData = [];
		scope.majorApiResourceFinderData = [];	
		scope.minorApiResourceFinderData = [];	
		scope.srtdApiResourceFinderData = [];	
		scope.bundleApiResourceFinderData = [];	
		
	};
	
	
	this.addFilterSettings = function(scope,rootScope)
	{	
		 scope.apiApiResourceFinderSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1,selectionLimit:30}; 
		 scope.apiApiResourceFinderCustomTexts = {buttonDefaultText: 'API'};
		
		 scope.majorApiResourceFinderSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1,selectionLimit:30}; 
		 scope.majorApiResourceFinderCustomTexts = {buttonDefaultText: 'Major Version'};
		
		 scope.minorApiResourceFinderSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1,selectionLimit:30}; 
		 scope.minorApiResourceFinderCustomTexts = {buttonDefaultText: 'Profile'};
		 
		 scope.srtdApiResourceFinderSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1,selectionLimit:30}; 
		 scope.srtdApiResourceFinderCustomTexts = {buttonDefaultText: 'Senior TD'};
		 
		 scope.backendAdapterInventorySettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1,selectionLimit:30}; 
		 scope.backendAdapterInventoryCustomTexts = {buttonDefaultText: 'Backends'};

		 scope.bundleApiResourceFinderSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1,selectionLimit:30}; 
		 scope.bundleApiResourceFinderCustomTexts = {buttonDefaultText: 'Bundle'};
		
	};
	    
	    
	this.loadComboBoxA= function(scope,rootScope,http,url,pagelocation,landing) 
	{
		this.emptyFilterModels(scope,rootScope);
		this.emptyFilterData(scope,rootScope);
		this.addFilterSettings(scope,rootScope);
		
		 var loadFilters = http.get(url);	 
		 http.dataType="json";
		 
		 loadFilters.then(function(payload) 
	     {
			 
			scope.apiApiResourceFinderData = payload.data.result.api;
			scope.majorApiResourceFinderData = payload.data.result.majorVersion;
			scope.minorApiResourceFinderData = payload.data.result.profile;
		    scope.srtdApiResourceFinderData = payload.data.result.srtd;
		    scope.bundleApiResourceFinderData = payload.data.result.bundle;
			
		   			    
		    if(rootScope.urlparams!=undefined)
			{
		    	
		    	if(rootScope.urlparams!=undefined && rootScope.urlparams.Apis!=undefined && rootScope.urlparams.Apis!=null)
		    	{
		    		var ApisArray = rootScope.urlparams.Apis.split(",");
		    		
			    	for(var i=0; i < ApisArray.length; i++)
			    	{
			    		var idProp = {idProp: 'id'};
			    		idProp['id'] = ApisArray[i];
						scope.apiApiResourceFinderModel.push(idProp);			    		
			    	}
		    	}
		    	else
	    		{
		    		scope.apiApiResourceFinderModel = new Array(payload.data.result.api[0]);
	    		}
		    	
		    	if( rootScope.urlparams!=undefined && rootScope.urlparams.Bundles!=undefined && rootScope.urlparams.Bundles!=null)
		    	{
		    		var BundlesArray = rootScope.urlparams.Bundles.split(",");
		    		
			    	for(var i=0; i < BundlesArray.length; i++)
			    	{
			    		var idProp = {idProp: 'id'};
			    		idProp['id'] = BundlesArray[i];
						scope.bundleApiResourceFinderModel.push(idProp);			    		
			    	}
		    	}
		    	else
		    	{
		    		scope.bundleApiResourceFinderModel = new Array(payload.data.result.bundle[0]);
		    	}
		    	
		    	if( rootScope.urlparams!=undefined && rootScope.urlparams.Major!=undefined && rootScope.urlparams.Major!=null)
		    	{
		    		var MajorArray = rootScope.urlparams.Major.split(",");
		    		
			    	for(var i=0; i < MajorArray.length; i++)
			    	{
			    		var idProp = {idProp: 'id'};
			    		idProp['id'] = MajorArray[i];
						scope.majorApiResourceFinderModel.push(idProp);			    		
			    	}
		    	}
		    	else
		    	{
		    		if(landing){
		    			scope.majorApiResourceFinderModel = new Array(payload.data.result.majorVersion[1]);
		    		}else{
		    			scope.majorApiResourceFinderModel = new Array(payload.data.result.majorVersion[0]);
		    		}
		    	}
				
		    	
		    	
		    	if( rootScope.urlparams!=undefined && rootScope.urlparams.Minor!=undefined && rootScope.urlparams.Minor!=null)
		    	{
		    		var MinorArray = rootScope.urlparams.Minor.split(",");
		    		
		    		for(var i=0; i < MinorArray.length; i++)
			    	{
			    		var idProp = {idProp: 'id'};
			    		idProp['id'] = MinorArray[i];
						scope.minorApiResourceFinderModel.push(idProp);			    		
			    	}
		    	}
		    	else
		    	{
		    		scope.minorApiResourceFinderModel = new Array(payload.data.result.profile[0]);	
		    	}
		    	
		    	
		    	if( rootScope.urlparams!=undefined && rootScope.urlparams.Srtd!=undefined && rootScope.urlparams.Srtd!=null)
		    	{
		    		var SrtdArray = rootScope.urlparams.Srtd.split(",");
		    		
			    	for(var i=0; i < SrtdArray.length; i++)
			    	{
			    		var idProp = {idProp: 'id'};
			    		idProp['id'] = SrtdArray[i];
			    		scope.srtdApiResourceFinderModel.push(idProp);
			    		
			    	}
			    }
		    	else
		    	{
		    		scope.srtdApiResourceFinderModel = new Array(payload.data.result.srtd[0]);
		    	}
		    				    	
			}
		    else
		    {
		    	
		    	scope.apiApiResourceFinderModel = new Array(payload.data.result.api[0]);
		    	if(landing){
		    		scope.majorApiResourceFinderModel = new Array(payload.data.result.majorVersion[1]);	
		    	}else{
		    		scope.majorApiResourceFinderModel = new Array(payload.data.result.majorVersion[0]);
		    	}
				scope.minorApiResourceFinderModel = new Array(payload.data.result.profile[0]);	
				scope.srtdApiResourceFinderModel = new Array(payload.data.result.srtd[0]);	
				scope.bundleApiResourceFinderModel = new Array(payload.data.result.bundle[0]);
		    }
		    			    
	     });		 
		 
    };
	    
	    
	    this.loadComboBox= function(scope,rootScope,http,url,pagelocation) 
		{
	    	 
	    	
	    	this.emptyFilterModels(scope,rootScope);
	    	this.emptyFilterData(scope,rootScope);
			this.addFilterSettings(scope,rootScope);
			
			 var loadFilters = http.get("/api360-service/filter/lookup/returnjson/api_portfolio_filters.json");	 
			 http.dataType="json";
			 loadFilters.then(function(payload) 
		     {
				 
				scope.apiApiResourceFinderData = payload.data.result.api_name;
			    //scope.majorApiResourceFinderData = payload.data.result.api_name;
			    scope.bundleAdapterInventoryData = payload.data.result.api_name;
			    scope.minorApiResourceFinderData = payload.data.result.profile;
			   
			    //scope.apiApiResourceFinderData.splice(0,1);
			   			    
			    if(rootScope.urlparams!=undefined)
				{
			    	
			    	if( rootScope.urlparams!=undefined && rootScope.urlparams.Bundles!=undefined && rootScope.urlparams.Bundles!=null)
			    	{
			    		var BundlesArray = rootScope.urlparams.Bundles.split(",");
			    		
				    	for(var i=0; i < BundlesArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = BundlesArray[i];
				    		scope.bundleAdapterInventoryModel.push(idProp);
				    	}
				    }
			    	else
			    	{
			    		
			    		scope.bundleAdapterInventoryModel = new Array(payload.data.result.container_name[0]);
			    	}
			    				    	
			    	
			    	if(rootScope.urlparams!=undefined && rootScope.urlparams.APIs!=undefined && rootScope.urlparams.APIs!=null)
			    	{
			    		var APIsArray = rootScope.urlparams.APIs.split(",");
			    		
				    	for(var i=0; i < APIsArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = APIsArray[i];
							scope.apiAdapterInventoryModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.apiAdapterInventoryModel = new Array(payload.data.result.api_name[0]);
			    	}
			    	
			    				    	
			    	
			    	if(rootScope.urlparams!=undefined && rootScope.urlparams.Backends!=undefined && rootScope.urlparams.Backends!=null)
			    	{
			    		var BackendsArray = rootScope.urlparams.Backends.split(",");
				    	for(var i=0; i < BackendsArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = BackendsArray[i];
							scope.backendAdapterInventoryModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.backendAdapterInventoryModel = new Array(payload.data.result.adapter[0]);			    		
			    	}
			    	
					
				}
			    else
			    {
			    	
			    	//scope.apiApiResourceFinderModel =  new Array(payload.data.result.api_name[0]);
				    scope.backendAdapterInventoryModel =  rootScope.getModelObject(rootScope.getGlobalURLFilter("Backends"));  
					//scope.apiAdapterInventoryModel = rootScope.getModelObject(rootScope.getGlobalURLFilter("APIs"));
						
					
			    }
		     }); 
			 
			 url = '/api360-service/resource-finder/lookup/major.json';
			 loadFilters = http.get(url);	 
			 http.dataType="json";
			 loadFilters.then(function(payload) 
		     {
				 scope.majorApiResourceFinderData.push({"id":"All","label":"All", "attuid":"All"});
				 angular.forEach(payload.data.result, function(value, key) {
						scope.majorApiResourceFinderData.push({"id":value,"label":value});
					});
			    //scope.majorApiResourceFinderModel =  scope.majorApiResourceFinderData[6];
		     }); 
			 
			 /*url = '/api360-service/resource-finder/lookup/minor.json';
			 loadFilters = http.get(url);	 
			 http.dataType="json";
			 loadFilters.then(function(payload) 
		     {
				 angular.forEach(payload.data.result, function(value, key) {
						if (value != 'All') {
							scope.minorApiResourceFinderData.push({"id":value,"label":value});
						}
					});
			   
			    //scope.majorApiResourceFinderModel =  scope.majorApiResourceFinderData[6];
		     }); */
			 
			 url = '/api360-service/resource-finder/lookup/srtd.json';
			 loadFilters = http.get(url);	 
			 http.dataType="json";
			 loadFilters.then(function(payload) 
		     {
				 scope.srtdApiResourceFinderData.push({"id":"All","label":"All", "attuid":"All"});
				 angular.forEach(payload.data.result, function(value, key) {
						if (value != 'All') {
							//scope.srtdApiResourceFinderData.push({"id":value.value,"label":value.value});
							var srtdname = value.lastname.concat(', ',value.firstname);
							scope.srtdApiResourceFinderData.push({"id":srtdname,"label":srtdname, "attuid":value.attuid});
						}
					});
			   
			    //scope.majorApiResourceFinderModel =  scope.majorApiResourceFinderData[6];
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
					var local = scope.backendAdapterInventoryModel;
					
					scope.backendAdapterInventoryModel = [];
					scope.backendAdapterInventoryData = payload.data.result.adapter;

					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.backendAdapterInventoryModel.push(idProp);
		                });
					}
					else
					{
						scope.backendAdapterInventoryModel = new Array(payload.data.result.adapter[0]);
					}
				}			
				
				if("Bundles"!=ignore)
				{
					var local = scope.bundleAdapterInventoryModel;
					
					scope.bundleAdapterInventoryModel = [];
					scope.bundleAdapterInventoryData = payload.data.result.container_name;

					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.bundleAdapterInventoryModel.push(idProp);
		                });	
					}
					else
					{
						scope.bundleAdapterInventoryModel = new Array(payload.data.result.container_name[0]);
					}
				}					
				
				if("APIs"!=ignore)
				{
					var local = scope.apiAdapterInventoryModel;
					
					scope.apiAdapterInventoryModel = [];
					scope.apiAdapterInventoryData = payload.data.result.api_name;
					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.apiAdapterInventoryModel.push(idProp);
		                });	
					}
					else
					{
						scope.apiAdapterInventoryModel = new Array(payload.data.result.api_name[0]);
					}
				}
				
				
				
				
		     });
	   };
	   
	   
	   
	   this.reloadComboBoxAdapterInventory= function(scope,rootScope,http,url,ignore) 
		 {
	    	
	    	 var loadFilters = http.get(url);		 
			 http.dataType="json";
			 
			 loadFilters.then(function(payload) 
		     {
				
				
				
				if("API"!=ignore)
				{
					var local = scope.apiApiResourceFinderModel;
					
					scope.apiApiResourceFinderModel = [];
					scope.apiApiResourceFinderData = payload.data.result.api;

					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.apiApiResourceFinderModel.push(idProp);
		                });
					}
					else
					{
						scope.apiApiResourceFinderModel = new Array(payload.data.result.api[0]);
					}
				}			
				
				if("Major Version"!=ignore)
				{
					var local = scope.majorApiResourceFinderModel;
					
					scope.majorApiResourceFinderModel = [];
					scope.majorApiResourceFinderData = payload.data.result.majorVersion;

					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.majorApiResourceFinderModel.push(idProp);
		                });	
					}
					else
					{
						scope.majorApiResourceFinderModel = new Array(payload.data.result.majorVersion[0]);
					}
				}					
				
				if("Profile"!=ignore)
				{
					var local = scope.minorApiResourceFinderModel;
					
					scope.minorApiResourceFinderModel = [];
					scope.minorApiResourceFinderData = payload.data.result.profile;
					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.minorApiResourceFinderModel.push(idProp);
		                });	
					}
					else
					{
						scope.minorApiResourceFinderModel = new Array(payload.data.result.profile[0]);
					}
				}
				
				if("Senior TD"!=ignore)
				{
					var local = scope.srtdApiResourceFinderModel;
					
					scope.srtdApiResourceFinderModel = [];
					scope.srtdApiResourceFinderData = payload.data.result.srtd;
					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.srtdApiResourceFinderModel.push(idProp);
		                });	
					}
					else
					{
						scope.srtdApiResourceFinderModel = new Array(payload.data.result.srtd[0]);
					}
				}				
				
				if("Bundle"!=ignore)
				{
					var local = scope.bundleApiResourceFinderModel;
					
					scope.bundleApiResourceFinderModel = [];
					scope.bundleApiResourceFinderData = payload.data.result.bundle;
					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.bundleApiResourceFinderModel.push(idProp);
		                });	
					}
					else
					{
						scope.bundleApiResourceFinderModel = new Array(payload.data.result.bundle[0]);
					}
				}	
				
				
				
				
		     });
	   };
	   
	   
	   
	   
	   
	   this.dashboardFilterReload=function(scope,rootScope,name,value)
		{
			
			
		   if("API"==name)
	 		{
		 		
		 		if(scope.apiApiResourceFinderModel.length==1 && scope.apiApiResourceFinderModel[0].id=="All")
	 			{
		 			scope.api = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.apiApiResourceFinderModel.length > 1)
	 				{
		 				scope.backend = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.apiApiResourceFinderModel.splice(0,scope.apiApiResourceFinderModel.length);
			    		 scope.apiApiResourceFinderModel.push(idProp);
			    		 
			    		 
		 			}
		 			else if(scope.apiApiResourceFinderModel.length > 1 && scope.apiApiResourceFinderModel[0].id=="All")
		 			{
		 				scope.apiApiResourceFinderModel.splice(0,1);
		 				scope.api = scope.getCommaSeparatedString(scope.apiApiResourceFinderModel);
		 			}
		 			else
	 				{
		 				scope.api = scope.getCommaSeparatedString(scope.apiApiResourceFinderModel);
		 			}
		 		}
	 		}
		 	else if("Major Version"==name)
	 		{
		 		
		 		if(scope.majorApiResourceFinderModel.length==1 && scope.majorApiResourceFinderModel[0].id=="All")
	 			{
		 			scope.version = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.majorApiResourceFinderModel.length > 1)
	 				{
		 				scope.version = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.majorApiResourceFinderModel.splice(0,scope.majorApiResourceFinderModel.length);
			    		 scope.majorApiResourceFinderModel.push(idProp); 
		 			}
		 			else if(scope.majorApiResourceFinderModel.length > 1 && scope.majorApiResourceFinderModel[0].id=="All")
		 			{
		 				scope.majorApiResourceFinderModel.splice(0,1);
		 				scope.version = scope.getCommaSeparatedString(scope.majorApiResourceFinderModel);
		 			}
		 			else
	 				{
		 				scope.version = scope.getCommaSeparatedString(scope.majorApiResourceFinderModel);
		 			}
		 		}
	 		}
		 	else if("Profile"==name)
	 		{
		 		if(scope.minorApiResourceFinderModel.length==1 && scope.minorApiResourceFinderModel[0].id=="All")
	 			{
		 			scope.profile = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.minorApiResourceFinderModel.length > 1)
	 				{
		 				scope.profile = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.minorApiResourceFinderModel.splice(0,scope.minorApiResourceFinderModel.length);
			    		 scope.minorApiResourceFinderModel.push(idProp);
		 			}
		 			else if(scope.minorApiResourceFinderModel.length > 1 && scope.minorApiResourceFinderModel[0].id=="All")
		 			{
		 				scope.minorApiResourceFinderModel.splice(0,1);
		 				scope.profile = scope.getCommaSeparatedString(scope.minorApiResourceFinderModel);
		 			}
		 			else
	 				{
		 				scope.profile = scope.getCommaSeparatedString(scope.minorApiResourceFinderModel);
		 			}
		 		}			
	 		}
		 	else if("Senior TD"==name)
	 		{
		 		if(scope.srtdApiResourceFinderModel.length==1 && scope.srtdApiResourceFinderModel[0].id=="All")
	 			{
		 			scope.srtd = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.srtdApiResourceFinderModel.length > 1)
	 				{
		 				scope.srtd = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.srtdApiResourceFinderModel.splice(0,scope.srtdApiResourceFinderModel.length);
			    		 scope.srtdApiResourceFinderModel.push(idProp);
		 			}
		 			else if(scope.srtdApiResourceFinderModel.length > 1 && scope.srtdApiResourceFinderModel[0].id=="All")
		 			{
		 				scope.srtdApiResourceFinderModel.splice(0,1);
		 				scope.srtd = scope.getCommaSeparatedString(scope.srtdApiResourceFinderModel);
		 			}
		 			else
	 				{
		 				scope.srtd = scope.getCommaSeparatedString(scope.srtdApiResourceFinderModel);
		 			}
		 		}			
	 		}
		 	else if("Bundle"==name)
	 		{
		 		if(scope.bundleApiResourceFinderModel.length==1 && scope.bundleApiResourceFinderModel[0].id=="All")
	 			{
		 			scope.bundle = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.bundleApiResourceFinderModel.length > 1)
	 				{
		 				scope.bundle = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.bundleApiResourceFinderModel.splice(0,scope.bundleApiResourceFinderModel.length);
			    		 scope.bundleApiResourceFinderModel.push(idProp);
		 			}
		 			else if(scope.bundleApiResourceFinderModel.length > 1 && scope.bundleApiResourceFinderModel[0].id=="All")
		 			{
		 				scope.bundleApiResourceFinderModel.splice(0,1);
		 				scope.bundle = scope.getCommaSeparatedString(scope.bundleApiResourceFinderModel);
		 			}
		 			else
	 				{
		 				scope.bundle = scope.getCommaSeparatedString(scope.bundleApiResourceFinderModel);
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