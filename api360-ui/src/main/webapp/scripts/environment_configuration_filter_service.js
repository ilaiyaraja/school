'use strict';

app.service('environmentConfigurationFilterService', function()
{
	
	this.updateScopeFiltersWithDefaultValues = function(scope,rootScope)
	{	
		scope.adapters='All';
		scope.adapterBundles='All';
		scope.serviceBundles='All';
		scope.releases='All';
		scope.versions='All';
		scope.environments='All';
		scope.vtierhostnames='All';
	};
    
    
    this.updateScopeFiltersWithUrlParamsValues = function(scope,rootScope)
	{
    	
    	
    	scope.adapters='All';
		scope.adapterBundles='All';
		scope.serviceBundles='All';
		scope.releases='All';
		scope.versions='All';
		scope.environments='All';
		scope.vtierhostnames='All';
    	
		
    };
	
	this.emptyFilterModels = function(scope,rootScope)
	{
		scope.adaptersEnvConfigModel = [];
		scope.adapterBundlesEnvConfigModel = [];
		scope.serviceBundlesEnvConfigModel = [];
		scope.releasesEnvConfigModel = [];
		scope.versionsEnvConfigModel = [];
		scope.environmentsEnvConfigModel = [];
		scope.vtierhostnamesEnvConfigModel = [];
		
	};
	
	this.emptyFilterData = function(scope,rootScope)
	{
		scope.adaptersEnvConfigData = [];
		scope.adapterBundlesEnvConfigData = [];
		scope.serviceBundlesEnvConfigData = [];
		scope.releasesEnvConfigData = [];
		scope.versionsEnvConfigData = [];
		scope.environmentsEnvConfigData = [];
		scope.vtierhostnamesEnvConfigData = [];
		
	};
	
	
	this.addFilterSettings = function(scope,rootScope)
	{	
		 scope.adaptersEnvConfigSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1,selectionLimit:30}; 
		 scope.adaptersEnvConfigCustomTexts = {buttonDefaultText: 'Adapters'};
		
		 scope.adapterBundlesEnvConfigSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1,selectionLimit:30}; 
		 scope.adapterBundlesEnvConfigCustomTexts = {buttonDefaultText: 'AdapterBundles'};
		 
		 scope.serviceBundlesEnvConfigSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1,selectionLimit:30}; 
		 scope.serviceBundlesEnvConfigCustomTexts = {buttonDefaultText: 'ServiceBundles'};
		 
		 scope.releasesEnvConfigSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1,selectionLimit:30}; 
		 scope.releasesEnvConfigCustomTexts = {buttonDefaultText: 'Releases'};
		 
		 scope.versionsEnvConfigSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1,selectionLimit:30}; 
		 scope.versionsEnvConfigCustomTexts = {buttonDefaultText: 'Versions'};
		 
		 scope.environmentsEnvConfigSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1,selectionLimit:30}; 
		 scope.environmentsEnvConfigCustomTexts = {buttonDefaultText: 'Environments'};
		 
		 scope.vtierhostnamesEnvConfigSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1,selectionLimit:30}; 
		 scope.vtierhostnamesEnvConfigCustomTexts = {buttonDefaultText: 'Vtierhostnames'};
		 
		
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
				 
				 
				
				scope.adaptersEnvConfigData = payload.data.result.adapters;
			    scope.adapterBundlesEnvConfigData = payload.data.result.adapterBundles;
			    scope.serviceBundlesEnvConfigData = payload.data.result.serviceBundles;
			    scope.releasesEnvConfigData = payload.data.result.releases;
			    scope.versionsEnvConfigData = payload.data.result.versions;
			    scope.environmentsEnvConfigData = payload.data.result.environments;
			    scope.vtierhostnamesEnvConfigData = payload.data.result.vtierhostnames;
			    
			    
			   
			   			    
			    if(rootScope.urlparams!=undefined)
				{
			    	
			    	if( rootScope.urlparams!=undefined && rootScope.urlparams.adapters!=undefined && rootScope.urlparams.adapters!=null)
			    	{
			    		var adaptersArray = rootScope.urlparams.adapters.split(",");
			    		
				    	for(var i=0; i < adaptersArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = adaptersArray[i];
				    		scope.adaptersEnvConfigModel.push(idProp);
				    	}
				    }
			    	else
			    	{
			    		
			    		scope.adaptersEnvConfigModel = new Array(payload.data.result.adapters[0]);
			    	}
			    				    	
			    	
			    	if(rootScope.urlparams!=undefined && rootScope.urlparams.adapterBundles!=undefined && rootScope.urlparams.adapterBundles!=null)
			    	{
			    		var adapterBundlesArray = rootScope.urlparams.adapterBundles.split(",");
			    		
				    	for(var i=0; i < adapterBundlesArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = adapterBundlesArray[i];
							scope.adapterBundlesEnvConfigModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.adapterBundlesEnvConfigModel = new Array(payload.data.result.adapterBundles[0]);
			    	}
			    	
			    				    	
			    	
			    	if(rootScope.urlparams!=undefined && rootScope.urlparams.serviceBundles!=undefined && rootScope.urlparams.serviceBundles!=null)
			    	{
			    		var serviceBundlesArray = rootScope.urlparams.serviceBundles.split(",");
			    		
				    	for(var i=0; i < serviceBundlesArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = serviceBundlesArray[i];
							scope.serviceBundlesEnvConfigModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.serviceBundlesEnvConfigModel = new Array(payload.data.result.serviceBundles[0]);
			    	}
			    	
			    	if(rootScope.urlparams!=undefined && rootScope.urlparams.releases!=undefined && rootScope.urlparams.releases!=null)
			    	{
			    		var releasesArray = rootScope.urlparams.releases.split(",");
			    		
				    	for(var i=0; i < releasesArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = releasesArray[i];
							scope.releasesEnvConfigModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.releasesEnvConfigModel = new Array(payload.data.result.releases[0]);
			    	}
			    	
			    	if(rootScope.urlparams!=undefined && rootScope.urlparams.versions!=undefined && rootScope.urlparams.versions!=null)
			    	{
			    		var versionsArray = rootScope.urlparams.versions.split(",");
			    		
				    	for(var i=0; i <versionsArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = versionsArray[i];
							scope.versionsEnvConfigModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.versionsEnvConfigModel = new Array(payload.data.result.versions[0]);
			    	}
			    	
			    	if(rootScope.urlparams!=undefined && rootScope.urlparams.environments!=undefined && rootScope.urlparams.environments!=null)
			    	{
			    		var environmentsArray = rootScope.urlparams.environments.split(",");
			    		
				    	for(var i=0; i <environmentsArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = environmentsArray[i];
							scope.environmentsEnvConfigModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.environmentsEnvConfigModel = new Array(payload.data.result.environments[0]);
			    	}
			   
			    	if(rootScope.urlparams!=undefined && rootScope.urlparams.vtierhostnames!=undefined && rootScope.urlparams.vtierhostnames!=null)
			    	{
			    		var vtierhostnamesArray = rootScope.urlparams.vtierhostnames.split(",");
			    		
				    	for(var i=0; i <vtierhostnamesArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = vtierhostnamesArray[i];
							scope.vtierhostnamesEnvConfigModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.vtierhostnamesEnvConfigModel = new Array(payload.data.result.vtierhostnames[0]);
			    	}
			    	
					
				}
			    else
			    {
			    	scope.adaptersEnvConfigModel = new Array(payload.data.result.adapters[0]);
					scope.adapterBundlesEnvConfigModel = new Array(payload.data.result.adapterBundles[0]);
					scope.serviceBundlesEnvConfigModel = new Array(payload.data.result.serviceBundles[0]);
					scope.releasesEnvConfigModel = new Array(payload.data.result.releases[0]);
					scope.versionsEnvConfigModel = new Array(payload.data.result.versions[0]);
					scope.environmentsEnvConfigModel =  new Array(payload.data.result.environments[0]);
					scope.vtierhostnamesEnvConfigModel =new Array(payload.data.result.vtierhostnames[0]);
					
			    }
		     }); 
	    };
	    
	    
	    
	    this.reloadComboBoxEnvConfig= function(scope,rootScope,http,url,ignore) 
		 {
	    	
	    	 var loadFilters = http.get(url);		 
			 http.dataType="json";
			 
			 loadFilters.then(function(payload) 
		     {
				
				
				
				if("Adapters"!=ignore)
				{
					var local = scope.adaptersEnvConfigModel;
					
					scope.adaptersEnvConfigModel = [];
					scope.adaptersEnvConfigData = payload.data.result.adapters;

					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.adaptersEnvConfigModel.push(idProp);
		                });
					}
					else
					{
						scope.adaptersEnvConfigModel = new Array(payload.data.result.adapters[0]);
					}
				}			
				
				if("AdapterBundles"!=ignore)
				{
					var local = scope.adapterBundlesEnvConfigModel;
					
					scope.adapterBundlesEnvConfigModel = [];
					scope.adapterBundlesEnvConfigData = payload.data.result.adapterBundles;

					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.adapterBundlesEnvConfigModel.push(idProp);
		                });
					}
					else
					{
						scope.adapterBundlesEnvConfigModel = new Array(payload.data.result.adapterBundles[0]);
					}
				}					
				
				if("ServiceBundles"!=ignore)
				{
					var local = scope.serviceBundlesEnvConfigModel;
					
					scope.serviceBundlesEnvConfigModel = [];
					scope.serviceBundlesEnvConfigData = payload.data.result.serviceBundles;

					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.serviceBundlesEnvConfigModel.push(idProp);
		                });
					}
					else
					{
						scope.serviceBundlesEnvConfigModel = new Array(payload.data.result.serviceBundles[0]);
					}
				}
				
				if("Releases"!=ignore)
				{
					var local = scope.releasesEnvConfigModel;
					
					scope.releasesEnvConfigModel = [];
					scope.releasesEnvConfigData = payload.data.result.releases;

					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.releasesEnvConfigModel.push(idProp);
		                });
					}
					else
					{
						scope.releasesEnvConfigModel = new Array(payload.data.result.releases[0]);
					}
				}
				
				if("Versions"!=ignore)
				{
					var local = scope.versionsEnvConfigModel;
					
					scope.versionsEnvConfigModel = [];
					scope.versionsEnvConfigData = payload.data.result.versions;

					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.versionsEnvConfigModel.push(idProp);
		                });
					}
					else
					{
						scope.versionsEnvConfigModel = new Array(payload.data.result.versions[0]);
					}
				}
				
				if("Environments"!=ignore)
				{
					var local = scope.environmentsEnvConfigModel;
					
					scope.environmentsEnvConfigModel = [];
					scope.environmentsEnvConfigData = payload.data.result.environments;

					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.environmentsEnvConfigModel.push(idProp);
		                });
					}
					else
					{
						scope.environmentsEnvConfigModel = new Array(payload.data.result.environments[0]);
					}
				}
				
				
				if("Vtierhostnames"!=ignore)
				{
					var local = scope.vtierhostnamesEnvConfigModel;
					
					scope.vtierhostnamesEnvConfigModel = [];
					scope.vtierhostnamesEnvConfigData = payload.data.result.vtierhostnames;

					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.vtierhostnamesEnvConfigModel.push(idProp);
		                });
					}
					else
					{
						scope.vtierhostnamesEnvConfigModel = new Array(payload.data.result.vtierhostnames[0]);
					}
				}
				
				
		     });
	   };
	   
	   
	   this.dashboardFilterReload=function(scope,rootScope,name,value)
		{
			
			
		   if("Adapters"==name)
	 		{
		 		
		 		if(scope.adaptersEnvConfigModel.length==1 && scope.adaptersEnvConfigModel[0].id=="All")
	 			{
		 			scope.adapters = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.adaptersEnvConfigModel.length > 1)
	 				{
		 				scope.adapters = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.adaptersEnvConfigModel.splice(0,scope.adaptersEnvConfigModel.length);
			    		 scope.adaptersEnvConfigModel.push(idProp);
			    		 
			    		 
		 			}
		 			else if(scope.adaptersEnvConfigModel.length > 1 && scope.adaptersEnvConfigModel[0].id=="All")
		 			{
		 				scope.adaptersEnvConfigModel.splice(0,1);
		 				scope.adapters = scope.getCommaSeparatedString(scope.adaptersEnvConfigModel);
		 			}
		 			else
	 				{
		 				scope.adapters = scope.getCommaSeparatedString(scope.adaptersEnvConfigModel);
		 			}
		 		}
	 		}
		 	else if("AdapterBundles"==name)
	 		{
		 		
		 		if(scope.adapterBundlesEnvConfigModel.length==1 && scope.adapterBundlesEnvConfigModel[0].id=="All")
	 			{
		 			scope.adapterBundles = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.adapterBundlesEnvConfigModel.length > 1)
	 				{
		 				scope.adapterBundles = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.adapterBundlesEnvConfigModel.splice(0,scope.adapterBundlesEnvConfigModel.length);
			    		 scope.adapterBundlesEnvConfigModel.push(idProp); 
		 			}
		 			else if(scope.adapterBundlesEnvConfigModel.length > 1 && scope.adapterBundlesEnvConfigModel[0].id=="All")
		 			{
		 				scope.adapterBundlesEnvConfigModel.splice(0,1);
		 				scope.adapterBundles = scope.getCommaSeparatedString(scope.adapterBundlesEnvConfigModel);
		 			}
		 			else
	 				{
		 				scope.adapterBundles = scope.getCommaSeparatedString(scope.adapterBundlesEnvConfigModel);
		 			}
		 		}
	 		}
		 	else if("ServiceBundles"==name)
	 		{
		 		if(scope.serviceBundlesEnvConfigModel.length==1 && scope.serviceBundlesEnvConfigModel[0].id=="All")
	 			{
		 			scope.serviceBundles = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.serviceBundlesEnvConfigModel.length > 1)
	 				{
		 				scope.serviceBundles = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.serviceBundlesEnvConfigModel.splice(0,scope.serviceBundlesEnvConfigModel.length);
			    		 scope.serviceBundlesEnvConfigModel.push(idProp);
		 			}
		 			else if(scope.serviceBundlesEnvConfigModel.length > 1 && scope.serviceBundlesEnvConfigModel[0].id=="All")
		 			{
		 				scope.serviceBundlesEnvConfigModel.splice(0,1);
		 				scope.serviceBundles = scope.getCommaSeparatedString(scope.serviceBundlesEnvConfigModel);
		 			}
		 			else
	 				{
		 				scope.serviceBundles = scope.getCommaSeparatedString(scope.serviceBundlesEnvConfigModel);
		 			}
		 		}			
	 		}
		 	else if("Releases"==name)
	 		{
		 		if(scope.releasesEnvConfigModel.length==1 && scope.releasesEnvConfigModel[0].id=="All")
	 			{
		 			scope.releases = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.releasesEnvConfigModel.length > 1)
	 				{
		 				scope.releases = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.releasesEnvConfigModel.splice(0,scope.releasesEnvConfigModel.length);
			    		 scope.releasesEnvConfigModel.push(idProp);
		 			}
		 			else if(scope.releasesEnvConfigModel.length > 1 && scope.releasesEnvConfigModel[0].id=="All")
		 			{
		 				scope.releasesEnvConfigModel.splice(0,1);
		 				scope.releases = scope.getCommaSeparatedString(scope.releasesEnvConfigModel);
		 			}
		 			else
	 				{
		 				scope.releases = scope.getCommaSeparatedString(scope.releasesEnvConfigModel);
		 			}
		 		}			
	 		}
		 	else if("Versions"==name)
	 		{
		 		if(scope.versionsEnvConfigModel.length==1 && scope.versionsEnvConfigModel[0].id=="All")
	 			{
		 			scope.versions = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.versionsEnvConfigModel.length > 1)
	 				{
		 				scope.versions = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.versionsEnvConfigModel.splice(0,scope.versionsEnvConfigModel.length);
			    		 scope.versionsEnvConfigModel.push(idProp);
		 			}
		 			else if(scope.versionsEnvConfigModel.length > 1 && scope.versionsEnvConfigModel[0].id=="All")
		 			{
		 				scope.versionsEnvConfigModel.splice(0,1);
		 				scope.versions = scope.getCommaSeparatedString(scope.versionsEnvConfigModel);
		 			}
		 			else
	 				{
		 				scope.versions = scope.getCommaSeparatedString(scope.versionsEnvConfigModel);
		 			}
		 		}			
	 		}
		 	else if("Environments"==name)
	 		{
		 		if(scope.environmentsEnvConfigModel.length==1 && scope.environmentsEnvConfigModel[0].id=="All")
	 			{
		 			scope.environments = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.environmentsEnvConfigModel.length > 1)
	 				{
		 				scope.environments = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.environmentsEnvConfigModel.splice(0,scope.environmentsEnvConfigModel.length);
			    		 scope.environmentsEnvConfigModel.push(idProp);
		 			}
		 			else if(scope.environmentsEnvConfigModel.length > 1 && scope.environmentsEnvConfigModel[0].id=="All")
		 			{
		 				scope.environmentsEnvConfigModel.splice(0,1);
		 				scope.environments = scope.getCommaSeparatedString(scope.environmentsEnvConfigModel);
		 			}
		 			else
	 				{
		 				scope.environments = scope.getCommaSeparatedString(scope.environmentsEnvConfigModel);
		 			}
		 		}			
	 		}
		 	else if("Vtierhostnames"==name)
	 		{
		 		if(scope.vtierhostnamesEnvConfigModel.length==1 && scope.vtierhostnamesEnvConfigModel[0].id=="All")
	 			{
		 			scope.vtierhostnames = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.vtierhostnamesEnvConfigModel.length > 1)
	 				{
		 				scope.vtierhostnames = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.vtierhostnamesEnvConfigModel.splice(0,scope.vtierhostnamesEnvConfigModel.length);
			    		 scope.vtierhostnamesEnvConfigModel.push(idProp);
		 			}
		 			else if(scope.vtierhostnamesEnvConfigModel.length > 1 && scope.vtierhostnamesEnvConfigModel[0].id=="All")
		 			{
		 				scope.vtierhostnamesEnvConfigModel.splice(0,1);
		 				scope.vtierhostnames = scope.getCommaSeparatedString(scope.vtierhostnamesEnvConfigModel);
		 			}
		 			else
	 				{
		 				scope.vtierhostnames = scope.getCommaSeparatedString(scope.vtierhostnamesEnvConfigModel);
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