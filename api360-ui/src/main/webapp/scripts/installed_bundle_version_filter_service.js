'use strict';

app.service('installedBundleVersionFilterService', function()
{
	
	this.updateScopeFiltersWithDefaultValues = function(scope,rootScope)
	{
		scope.bundle = rootScope.getGlobalURLFilter("Bundles");
		scope.environment='All';
    };
    
    
    this.updateScopeFiltersWithUrlParamsValues = function(scope,rootScope)
	{
    	scope.environment = 'All';
		if(rootScope.urlparams!=undefined && rootScope.urlparams.Bundles!=undefined && rootScope.urlparams.Bundles!=null)
    	{
    		scope.bundle = rootScope.urlparams.Bundles;
	    }
    };
	
	this.emptyFilterModels = function(scope,rootScope)
	{
		scope.bundleInstalledBundleModel = [];		
		scope.bundleInstalledEnvironmentModel=[];
	};
	
	this.emptyFilterData = function(scope,rootScope)
	{
		scope.bundleInstalledBundleData = [];
		scope.bundleInstalledEnvironmentData = [];
	};
	
	
	this.addFilterSettings = function(scope,rootScope)
	{
		 scope.bundleInstalledBundleSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1,selectionLimit:30}; 
		 scope.bundleInstalledBundleCustomTexts = {buttonDefaultText: 'Bundles'}; 
		 
		 scope.bundleInstalledEnvironmentSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1,selectionLimit:30}; 
		 scope.bundleInstalledEnvironmentTexts = {buttonDefaultText: 'Environments'}; 
		 
		 
		 
	};
	
 	/*this.updaterootScopeFiltersWithDefaultValues = function(scope,rootScope)
	{
	
    	scope.bundle = 'All';
    	scope.environment='All';
       
    }; */
	    
	   
	    
	     this.loadComboBox= function(scope,rootScope,http,url,pagelocation) 
		 {
	    	this.emptyFilterModels(scope,rootScope);
			this.emptyFilterData(scope,rootScope);
			this.addFilterSettings(scope,rootScope);
			
			 var loadFilters = http.get(url);	 
			 http.dataType="json";
			 
			 loadFilters.then(function(payload) 
		     {
				scope.bundleInstalledBundleData = payload.data.result.container_name;
				scope.bundleInstalledEnvironmentData = payload.data.result.environment;
			    		    
			    if(rootScope.urlparams!=undefined)
				{
			    	
			    	if(rootScope.urlparams!=undefined && rootScope.urlparams.Bundles!=undefined && rootScope.urlparams.Bundles!=null)
			    	{
			    		var BundlesArray = rootScope.urlparams.Bundles.split(",");
			    		
				    	for(var i=0; i < BundlesArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = BundlesArray[i];
				    		scope.bundleInstalledBundleModel.push(idProp);
				    	}
				    }
			    	else
			    	{
			    		scope.bundleInstalledBundleModel = new Array(payload.data.result.container_name[0]);
			    	}
			    	
			    	if(rootScope.urlparams!=undefined && rootScope.urlparams.Environments!=undefined && rootScope.urlparams.Environments!=null)
			    	{
			    		var EnvironmentsArray = rootScope.urlparams.Environments.split(",");
			    		
				    	for(var i=0; i < EnvironmentsArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = EnvironmentsArray[i];
							scope.bundleInstalledEnvironmentModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.bundleInstalledEnvironmentModel = new Array(payload.data.result.environment[0]);
			    	}
			    	
			    	
				}
			    else
			    {
			    	scope.bundleInstalledBundleModel = rootScope.getModelObject(rootScope.getGlobalURLFilter("Bundles"));	
			    	scope.bundleInstalledEnvironmentModel = new Array(payload.data.result.environment[0]);
			    }
		     }); 
	    };
	    
	    
	    
	    this.reloadComboBoxInstalledBundle= function(scope,rootScope,http,url,ignore) 
		 {
	    	
	    	 var loadFilters = http.get(url);		 
			 http.dataType="json";
			 
			 loadFilters.then(function(payload) 
		     {
				
						
				
				if("Bundles"!=ignore)
				{
					var local = scope.bundleInstalledBundleModel;
					
					scope.bundleInstalledBundleModel = [];
					scope.bundleInstalledBundleData = payload.data.result.container_name;

					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.bundleInstalledBundleModel.push(idProp);
		                });	
					}
					else
					{
						scope.bundleInstalledBundleModel = new Array(payload.data.result.container_name[0]);
					}
				}
				
				
				
				if("Environments"!=ignore)
				{
					var local = scope.bundleInstalledEnvironmentModel;
					
					scope.bundleInstalledEnvironmentModel = [];
					scope.bundleInstalledEnvironmentData = payload.data.result.environment;

					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.bundleInstalledEnvironmentModel.push(idProp);
		                });	
					}
					else
					{
						scope.bundleInstalledEnvironmentModel = new Array(payload.data.result.environment[0]);
					}
				}
				
				
		     });				
				
	   };
	   
	   
	   
	   this.dashboardFilterReload=function(scope,rootScope,name,value)
		{
			
			
			if("Bundles"==name)
	 		{
		 		
		 		if(scope.bundleInstalledBundleModel.length==1 && scope.bundleInstalledBundleModel[0].id=="All")
	 			{
		 			scope.bundle = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.bundleInstalledBundleModel.length > 1)
	 				{
		 				scope.bundle = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.bundleInstalledBundleModel.splice(0,scope.bundleInstalledBundleModel.length);
			    		 scope.bundleInstalledBundleModel.push(idProp); 
		 			}
		 			else if(scope.bundleInstalledBundleModel.length > 1 && scope.bundleInstalledBundleModel[0].id=="All")
		 			{
		 				scope.bundleInstalledBundleModel.splice(0,1);
		 				scope.bundle = scope.getCommaSeparatedString(scope.bundleInstalledBundleModel);
		 			}
		 			else
	 				{
		 				scope.bundle = scope.getCommaSeparatedString(scope.bundleInstalledBundleModel);
		 			}
		 		}
	 		}
			
			
			
			if("Environments"==name)
	 		{
		 		
		 		if(scope.bundleInstalledEnvironmentModel.length==1 && scope.bundleInstalledEnvironmentModel[0].id=="All")
	 			{
		 			scope.environment = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.bundleInstalledEnvironmentModel.length > 1)
	 				{
		 				scope.environment = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.bundleInstalledEnvironmentModel.splice(0,scope.bundleInstalledEnvironmentModel.length);
			    		 scope.bundleInstalledEnvironmentModel.push(idProp); 
		 			}
		 			else if(scope.bundleInstalledEnvironmentModel.length > 1 && scope.bundleInstalledEnvironmentModel[0].id=="All")
		 			{
		 				scope.bundleInstalledEnvironmentModel.splice(0,1);
		 				scope.environment = scope.getCommaSeparatedString(scope.bundleInstalledEnvironmentModel);
		 			}
		 			else
	 				{
		 				scope.environment = scope.getCommaSeparatedString(scope.bundleInstalledEnvironmentModel);
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