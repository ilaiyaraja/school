'use strict';

app.service('adapterInventoryFilterService', function()
{
	
	this.updateScopeFiltersWithDefaultValues = function(scope,rootScope)
	{	
		
		scope.backend = rootScope.getGlobalURLFilter("Backends");
		scope.bundle = 'All' ;
		scope.api = rootScope.getGlobalURLFilter("APIs");
	};
    
    
    this.updateScopeFiltersWithUrlParamsValues = function(scope,rootScope)
	{
    	
    	
    	scope.bundle ='All' ;
    	
    				    	
    	
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
		scope.backendAdapterInventoryModel = [];
		scope.bundleAdapterInventoryModel = [];
		scope.apiAdapterInventoryModel = [];		
		
	};
	
	this.emptyFilterData = function(scope,rootScope)
	{
		scope.backendAdapterInventoryData = [];
		scope.bundleAdapterInventoryData = [];
		scope.apiAdapterInventoryData = [];		
		
	};
	
	
	this.addFilterSettings = function(scope,rootScope)
	{	
		 scope.bundleAdapterInventorySettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1,selectionLimit:30}; 
		 scope.bundleAdapterInventoryCustomTexts = {buttonDefaultText: 'Bundles'};
		
		 scope.apiAdapterInventorySettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1,selectionLimit:30}; 
		 scope.apiAdapterInventoryCustomTexts = {buttonDefaultText: 'APIs'};
		
		 
		 scope.backendAdapterInventorySettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:3,selectionLimit:30}; 
		 scope.backendAdapterInventoryCustomTexts = {buttonDefaultText: 'Backends'};

		 
		
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
				 
				scope.backendAdapterInventoryData = payload.data.result.adapter;
			    scope.apiAdapterInventoryData = payload.data.result.api_name;
			    scope.bundleAdapterInventoryData = payload.data.result.container_name;
			   
			   			    
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
			    	
			    	scope.bundleAdapterInventoryModel =  new Array(payload.data.result.container_name[0]);
				    scope.backendAdapterInventoryModel =  rootScope.getModelObject(rootScope.getGlobalURLFilter("Backends"));  
					scope.apiAdapterInventoryModel = rootScope.getModelObject(rootScope.getGlobalURLFilter("APIs"));
						
					
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
	   
	   
	   
	   
	   
	   this.dashboardFilterReload=function(scope,rootScope,name,value)
		{
			
			
		   if("Backends"==name)
	 		{
		 		
		 		if(scope.backendAdapterInventoryModel.length==1 && scope.backendAdapterInventoryModel[0].id=="All")
	 			{
		 			scope.backend = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.backendAdapterInventoryModel.length > 1)
	 				{
		 				scope.backend = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.backendAdapterInventoryModel.splice(0,scope.backendAdapterInventoryModel.length);
			    		 scope.backendAdapterInventoryModel.push(idProp);
			    		 
			    		 
		 			}
		 			else if(scope.backendAdapterInventoryModel.length > 1 && scope.backendAdapterInventoryModel[0].id=="All")
		 			{
		 				scope.backendAdapterInventoryModel.splice(0,1);
		 				scope.backend = scope.getCommaSeparatedString(scope.backendAdapterInventoryModel);
		 			}
		 			else
	 				{
		 				scope.backend = scope.getCommaSeparatedString(scope.backendAdapterInventoryModel);
		 			}
		 		}
	 		}
		 	else if("Bundles"==name)
	 		{
		 		
		 		if(scope.bundleAdapterInventoryModel.length==1 && scope.bundleAdapterInventoryModel[0].id=="All")
	 			{
		 			scope.bundle = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.bundleAdapterInventoryModel.length > 1)
	 				{
		 				scope.bundle = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.bundleAdapterInventoryModel.splice(0,scope.bundleAdapterInventoryModel.length);
			    		 scope.bundleAdapterInventoryModel.push(idProp); 
		 			}
		 			else if(scope.bundleAdapterInventoryModel.length > 1 && scope.bundleAdapterInventoryModel[0].id=="All")
		 			{
		 				scope.bundleAdapterInventoryModel.splice(0,1);
		 				scope.bundle = scope.getCommaSeparatedString(scope.bundleAdapterInventoryModel);
		 			}
		 			else
	 				{
		 				scope.bundle = scope.getCommaSeparatedString(scope.bundleAdapterInventoryModel);
		 			}
		 		}
	 		}
		 	else if("APIs"==name)
	 		{
		 		if(scope.apiAdapterInventoryModel.length==1 && scope.apiAdapterInventoryModel[0].id=="All")
	 			{
		 			scope.api = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.apiAdapterInventoryModel.length > 1)
	 				{
		 				scope.api = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.apiAdapterInventoryModel.splice(0,scope.apiAdapterInventoryModel.length);
			    		 scope.apiAdapterInventoryModel.push(idProp);
		 			}
		 			else if(scope.apiAdapterInventoryModel.length > 1 && scope.apiAdapterInventoryModel[0].id=="All")
		 			{
		 				scope.apiAdapterInventoryModel.splice(0,1);
		 				scope.api = scope.getCommaSeparatedString(scope.apiAdapterInventoryModel);
		 			}
		 			else
	 				{
		 				scope.api = scope.getCommaSeparatedString(scope.apiAdapterInventoryModel);
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