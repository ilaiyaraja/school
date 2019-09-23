'use strict';

app.service('apiartifactFilterService', function()
{
	
	this.updateScopeFiltersWithDefaultValues = function(scope,rootScope)
	{
		scope.bundle ='All';
		scope.api='All';
		scope.version='All';
    };
    
    
    this.updateScopeFiltersWithUrlParamsValues = function(scope,rootScope)
	{
    	scope.version = 'All';
		if(rootScope.urlparams!=undefined && rootScope.urlparams.Bundles!=undefined && rootScope.urlparams.Bundles!=null)
    	{
    		scope.bundle = rootScope.urlparams.Bundles;
	    }
		if(rootScope.urlparams!=undefined && rootScope.urlparams.APIs!=undefined && rootScope.urlparams.APIs!=null)
    	{
    		scope.api = rootScope.urlparams.APIs;
	    }
		
		
		
    };
	
	this.emptyFilterModels = function(scope,rootScope)
	{
		scope.bundleAPIArtifactModel = [];		
		scope.apiAPIArtifactModel=[];
		scope.versionAPIArtifactModel=[];
		
		
	
		
	};
	
	
	
	
	this.emptyFilterData = function(scope,rootScope)
	{
		scope.bundleAPIArtifactData = [];
		scope.apiAPIArtifactData = [];
		scope.versionAPIArtifactData = [];
	};
	
	
	this.addFilterSettings = function(scope,rootScope)
	{
		 scope.bundleAPIArtifactSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1,selectionLimit:30}; 
		 scope.bundleAPIArtifactCustomTexts = {buttonDefaultText: 'Bundles'}; 
		 
		 scope.apiAPIArtifactSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1,selectionLimit:30}; 
		 scope.apiAPIArtifactCustomTexts = {buttonDefaultText: 'APIs'}; 
		 
		 
		 scope.versionAPIArtifactSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1,selectionLimit:30}; 
		 scope.versionAPIArtifactCustomTexts = {buttonDefaultText: 'Versions'}; 
		 
		 
		 
		 
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
				scope.bundleAPIArtifactData = payload.data.result.bundle;
				scope.apiAPIArtifactData = payload.data.result.api;
				scope.versionAPIArtifactData = payload.data.result.version;
				
				
				
                var result=[];
				
				for (var dString in scope.versionAPIArtifactData) 
				{ 
					var id = scope.versionAPIArtifactData[dString].id;
					if (id == "97.0"){
						result.push(scope.versionAPIArtifactData[dString]); //+ ",";
					}
				}
				
				
			    if(rootScope.urlparams!=undefined)
				{
			    	
			    	if(rootScope.urlparams!=undefined && rootScope.urlparams.Bundles!=undefined && rootScope.urlparams.Bundles!=null)
			    	{
			    		var BundlesArray = rootScope.urlparams.Bundles.split(",");
			    		
				    	for(var i=0; i < BundlesArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = BundlesArray[i];
				    		scope.bundleAPIArtifactModel.push(idProp);
				    	}
				    }
			    	else
			    	{
			    		scope.bundleAPIArtifactModel = new Array(payload.data.result.bundle[0]);
			    	}
			    	
			    	if(rootScope.urlparams!=undefined && rootScope.urlparams.APIs!=undefined && rootScope.urlparams.APIs!=null)
			    	{
			    		var EnvironmentsArray = rootScope.urlparams.APIs.split(",");
			    		
				    	for(var i=0; i < EnvironmentsArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = EnvironmentsArray[i];
							scope.apiAPIArtifactModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.apiAPIArtifactModel = new Array(payload.data.result.api[0]);
			    	}
			    	
			    	
			    	if(rootScope.urlparams!=undefined && rootScope.urlparams.Versions!=undefined && rootScope.urlparams.Versions!=null)
			    	{
			    		var EnvironmentsArray = rootScope.urlparams.Versions.split(",");
			    		
				    	for(var i=0; i < EnvironmentsArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = EnvironmentsArray[i];
							scope.versionAPIArtifactModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.versionAPIArtifactModel = new Array(payload.data.result.version[0]);
			    	}
			    	
			    	
				}
			    else
			    {
			    	scope.bundleAPIArtifactModel = new Array(payload.data.result.bundle[0]);	
			    	scope.apiAPIArtifactModel = new Array(payload.data.result.api[0]);
			    	scope.versionAPIArtifactModel =result ; //new Array(payload.data.result.version[0]);
			    	
			    }
		     }); 
	    };
	    
	    
	    
	    this.reloadComboBoxApiArtifact= function(scope,rootScope,http,url,ignore) 
		 {
	    	
	    	 var loadFilters = http.get(url);		 
			 http.dataType="json";
			 
			 loadFilters.then(function(payload) 
		     {
				
						
				
				if("Bundles"!=ignore)
				{
					var local = scope.bundleAPIArtifactModel;
					
					scope.bundleAPIArtifactModel = [];
					scope.bundleAPIArtifactData = payload.data.result.bundle;

					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.bundleAPIArtifactModel.push(idProp);
		                });	
					}
					else
					{
						scope.bundleAPIArtifactModel = new Array(payload.data.result.bundle[0]);
					}
				}
				
				
				
				if("Versions"!=ignore)
				{
					var local = scope.versionAPIArtifactModel;
					
					scope.versionAPIArtifactModel = [];
					scope.versionAPIArtifactData = payload.data.result.version;

					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.versionAPIArtifactModel.push(idProp);
		                });	
					}
					else
					{
						scope.versionAPIArtifactModel = new Array(payload.data.result.version[0]);
					}
				}
				
				
				
				if("APIs"!=ignore)
				{
					var local = scope.apiAPIArtifactModel;
					
					scope.apiAPIArtifactModel = [];
					scope.apiAPIArtifactData = payload.data.result.api;

					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.apiAPIArtifactModel.push(idProp);
		                });	
					}
					else
					{
						scope.apiAPIArtifactModel = new Array(payload.data.result.api[0]);
					}
				}
				
				
				
		     });				
				
	   };
	   
	   
	   
	   this.dashboardFilterReload=function(scope,rootScope,name,value)
		{
			
			
			if("Bundles"==name)
	 		{
		 		
		 		if(scope.bundleAPIArtifactModel.length==1 && scope.bundleAPIArtifactModel[0].id=="All")
	 			{
		 			scope.bundle = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.bundleAPIArtifactModel.length > 1)
	 				{
		 				scope.bundle = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.bundleAPIArtifactModel.splice(0,scope.bundleAPIArtifactModel.length);
			    		 scope.bundleAPIArtifactModel.push(idProp); 
		 			}
		 			else if(scope.bundleAPIArtifactModel.length > 1 && scope.bundleAPIArtifactModel[0].id=="All")
		 			{
		 				scope.bundleAPIArtifactModel.splice(0,1);
		 				scope.bundle = scope.getCommaSeparatedString(scope.bundleAPIArtifactModel);
		 			}
		 			else
	 				{
		 				scope.bundle = scope.getCommaSeparatedString(scope.bundleAPIArtifactModel);
		 			}
		 		}
	 		}
			
			
			
			if("Versions"==name)
	 		{
		 		
		 		if(scope.versionAPIArtifactModel.length==1 && scope.versionAPIArtifactModel[0].id=="All")
	 			{
		 			scope.version = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.versionAPIArtifactModel.length > 1)
	 				{
		 				scope.version = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.versionAPIArtifactModel.splice(0,scope.versionAPIArtifactModel.length);
			    		 scope.versionAPIArtifactModel.push(idProp); 
		 			}
		 			else if(scope.versionAPIArtifactModel.length > 1 && scope.versionAPIArtifactModel[0].id=="All")
		 			{
		 				scope.versionAPIArtifactModel.splice(0,1);
		 				scope.version = scope.getCommaSeparatedString(scope.versionAPIArtifactModel);
		 			}
		 			else
	 				{
		 				scope.version = scope.getCommaSeparatedString(scope.versionAPIArtifactModel);
		 			}
		 		}
	 		}
			
			
			
			if("APIs"==name)
	 		{
		 		
		 		if(scope.apiAPIArtifactModel.length==1 && scope.apiAPIArtifactModel[0].id=="All")
	 			{
		 			scope.api = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.apiAPIArtifactModel.length > 1)
	 				{
		 				scope.api = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.apiAPIArtifactModel.splice(0,scope.apiAPIArtifactModel.length);
			    		 scope.apiAPIArtifactModel.push(idProp); 
		 			}
		 			else if(scope.apiAPIArtifactModel.length > 1 && scope.apiAPIArtifactModel[0].id=="All")
		 			{
		 				scope.apiAPIArtifactModel.splice(0,1);
		 				scope.api = scope.getCommaSeparatedString(scope.apiAPIArtifactModel);
		 			}
		 			else
	 				{
		 				scope.api = scope.getCommaSeparatedString(scope.apiAPIArtifactModel);
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