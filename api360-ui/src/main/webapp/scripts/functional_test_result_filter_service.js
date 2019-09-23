'use strict';

app.service('functionalTestResultFilterService', function()
{
	
	this.updateScopeFiltersWithDefaultValues = function(scope,rootScope)
	{	
		
		
		scope.api=rootScope.getGlobalURLFilter("APIs");
		scope.backend=rootScope.getGlobalURLFilter("Backends");
		scope.bundle=rootScope.getGlobalURLFilter("Bundles");
		scope.pmt='All';
		scope.pid='All';
		scope.release='All';
		
		
	};
    
    
    this.updateScopeFiltersWithUrlParamsValues = function(scope,rootScope)
	{
    	
    	
    	
    	/*scope.api='All';
		scope.backend='All';
		scope.bundle='All';
		scope.pmt='All';
		scope.release='All';*/
		
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
    	
	 
	 
		if(rootScope.urlparams!=undefined && rootScope.urlparams.PMTs!=undefined && rootScope.urlparams.PMTs!=null)
    	{
			scope.pmt = rootScope.urlparams.PMTs;
    	}
		
		if(rootScope.urlparams!=undefined && rootScope.urlparams.PIDs!=undefined && rootScope.urlparams.PIDs!=null)
    	{
			scope.pid = rootScope.urlparams.PIDs;
    	}
		
    	
    	
    	
		
    	
		
    };
	
	this.emptyFilterModels = function(scope,rootScope)
	{
		scope.apifunctionTestResultModel = [];
		scope.backendfunctionTestResultModel = [];
		scope.pmtfunctionTestResultModel = [];
		scope.releasefunctionTestResultModel = [];
		scope.bundlefunctionTestResultModel = [];
		scope.pidfunctionTestResultModel = [];
	
		
	};
	
	this.emptyFilterData = function(scope,rootScope)
	{
		scope.apifunctionTestResultData = [];
		scope.backendfunctionTestResultData = [];
		scope.pmtfunctionTestResultData = [];
		scope.releasefunctionTestResultData = [];
		scope.bundlefunctionTestResultData = [];
		scope.pidfunctionTestResultData = [];
		
		
	};
	
	
	this.addFilterSettings = function(scope,rootScope)
	{	
		 scope.apifunctionTestResultSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1,selectionLimit:30}; 
		 scope.apifunctionTestResultCustomTexts = {buttonDefaultText: 'APIs'};
		
		 scope.backendfunctionTestResultSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1,selectionLimit:30}; 
		 scope.backendfunctionTestResultCustomTexts = {buttonDefaultText: 'Backends'};
		 
		 scope.pmtfunctionTestResultSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1,selectionLimit:30}; 
		 scope.pmtfunctionTestResultCustomTexts = {buttonDefaultText: 'PMTs'};
		 
		 scope.releasefunctionTestResultSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1,selectionLimit:30}; 
		 scope.releasefunctionTestResultCustomTexts = {buttonDefaultText: 'Release'};
		 
		 
		 scope.bundlefunctionTestResultSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1,selectionLimit:30}; 
		 scope.bundlefunctionTestResultCustomTexts = {buttonDefaultText: 'Bundles'};
		
		 scope.pidfunctionTestResultSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1,selectionLimit:30}; 
		 scope.pidfunctionTestResultCustomTexts = {buttonDefaultText: 'PIDs'};
		 
		
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
				 
				 
				
			    scope.apifunctionTestResultData = payload.data.result.api;
				scope.backendfunctionTestResultData = payload.data.result.backend;
				scope.pmtfunctionTestResultData = payload.data.result.pmt;
				scope.releasefunctionTestResultData = payload.data.result.release;
				scope.pidfunctionTestResultData = payload.data.result.pid;
				
				var result=[];
				
				for (var dString in scope.releasefunctionTestResultData) 
				{ 
					var id = scope.releasefunctionTestResultData[dString].id;
					if (id == "2015.07"){
						result.push(scope.releasefunctionTestResultData[dString]); //+ ",";
					}
				}
				
				
				
				
				
				scope.bundlefunctionTestResultData = payload.data.result.bundle;
			   
			   			    
			    if(rootScope.urlparams!=undefined)
				{
			    	
			    	if( rootScope.urlparams!=undefined && rootScope.urlparams.APIs!=undefined && rootScope.urlparams.APIs!=null)
			    	{
			    		var apiArray = rootScope.urlparams.APIs.split(",");
			    		
				    	for(var i=0; i < apiArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = apiArray[i];
				    		scope.apifunctionTestResultModel.push(idProp);
				    	}
				    }
			    	else
			    	{
			    		
			    		scope.apifunctionTestResultModel = new Array(payload.data.result.api[0]);
			    	}
			    				    	
			    	
			    	if(rootScope.urlparams!=undefined && rootScope.urlparams.Backends!=undefined && rootScope.urlparams.Backends!=null)
			    	{
			    		var backendArray = rootScope.urlparams.Backends.split(",");
			    		
				    	for(var i=0; i < backendArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = backendArray[i];
							scope.backendfunctionTestResultModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.backendfunctionTestResultModel = new Array(payload.data.result.backend[0]);
			    	}
			    	
			    				    	
			    	
			    	if(rootScope.urlparams!=undefined && rootScope.urlparams.PMTs!=undefined && rootScope.urlparams.PMTs!=null)
			    	{
			    		var pmtBundlesArray = rootScope.urlparams.PMTs.split(",");
			    		
				    	for(var i=0; i < pmtBundlesArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = pmtBundlesArray[i];
							scope.pmtfunctionTestResultModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.pmtfunctionTestResultModel = new Array(payload.data.result.pmt[0]);
			    	}
			    	
			    	if(rootScope.urlparams!=undefined && rootScope.urlparams.Release!=undefined && rootScope.urlparams.Release!=null)
			    	{
			    		var releasesArray = rootScope.urlparams.Release.split(",");
			    		
				    	for(var i=0; i < releasesArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = releasesArray[i];
							scope.releasefunctionTestResultModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.releasefunctionTestResultModel = new Array(payload.data.result.release[0]);
			    	}
			    	
			    	
			    	if(rootScope.urlparams!=undefined && rootScope.urlparams.Bundles!=undefined && rootScope.urlparams.Bundles!=null)
			    	{
			    		var bundleArray = rootScope.urlparams.Bundles.split(",");
			    		
				    	for(var i=0; i < bundleArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = bundleArray[i];
							scope.bundlefunctionTestResultModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.bundlefunctionTestResultModel = new Array(payload.data.result.bundle[0]);
			    	}
			    	
			    	if(rootScope.urlparams!=undefined && rootScope.urlparams.PIDs!=undefined && rootScope.urlparams.PIDs!=null)
			    	{
			    		var pmtBundlesArray = rootScope.urlparams.PIDs.split(",");
			    		
				    	for(var i=0; i < pidBundlesArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = pidBundlesArray[i];
							scope.pidfunctionTestResultModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.pidfunctionTestResultModel = new Array(payload.data.result.pid[0]);
			    	}
			    	
					
				}
			    else
			    {
			    	//scope.apifunctionTestResultModel = new Array(payload.data.result.api[0]);
					//scope.backendfunctionTestResultModel = new Array(payload.data.result.backend[0]);
					scope.pmtfunctionTestResultModel = new Array(payload.data.result.pmt[0]);
					scope.releasefunctionTestResultModel =result ;
					//scope.bundlefunctionTestResultModel = new Array(payload.data.result.bundle[0]);	
					
					
					scope.bundlefunctionTestResultModel = rootScope.getModelObject(rootScope.getGlobalURLFilter("Bundles"));		    
				    scope.backendfunctionTestResultModel = rootScope.getModelObject(rootScope.getGlobalURLFilter("Backends"));
					scope.apifunctionTestResultModel = rootScope.getModelObject(rootScope.getGlobalURLFilter("APIs"));
					scope.pidfunctionTestResultModel = new Array(payload.data.result.pid[0]);
				
					
			    }
		     }); 
	    };
	    
	    
	    
	    this.reloadComboBoxFunTestResult= function(scope,rootScope,http,url,ignore) 
		 {
	    	
	    	 var loadFilters = http.get(url);		 
			 http.dataType="json";
			 
			 loadFilters.then(function(payload) 
		     {
				
				
				
				if("APIs"!=ignore)
				{
					var local = scope.apifunctionTestResultModel;
					
					scope.apifunctionTestResultModel = [];
					scope.apifunctionTestResultData = payload.data.result.api;

					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.apifunctionTestResultModel.push(idProp);
		                });
					}
					else
					{
						scope.apifunctionTestResultModel = new Array(payload.data.result.api[0]);
					}
				}			
				
				if("Backends"!=ignore)
				{
					var local = scope.backendfunctionTestResultModel;
					
					scope.backendfunctionTestResultModel = [];
					scope.backendfunctionTestResultData = payload.data.result.backend;

					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.backendfunctionTestResultModel.push(idProp);
		                });
					}
					else
					{
						scope.backendfunctionTestResultModel = new Array(payload.data.result.backend[0]);
					}
				}					
				
				if("PMTs"!=ignore)
				{
					var local = scope.pmtfunctionTestResultModel;
					
					scope.pmtfunctionTestResultModel = [];
					scope.pmtfunctionTestResultData = payload.data.result.pmt;

					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.pmtfunctionTestResultModel.push(idProp);
		                });
					}
					else
					{
						scope.pmtfunctionTestResultModel = new Array(payload.data.result.pmt[0]);
					}
				}
				
				if("Release"!=ignore)
				{
					var local = scope.releasefunctionTestResultModel;
					
					scope.releasefunctionTestResultModel = [];
					scope.releasefunctionTestResultData = payload.data.result.release;

					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.releasefunctionTestResultModel.push(idProp);
		                });
					}
					else
					{
						scope.releasefunctionTestResultModel = new Array(payload.data.result.release[0]);
					}
				}
				
				
				if("Bundles"!=ignore)
				{
					var local = scope.bundlefunctionTestResultModel;
					
					scope.bundlefunctionTestResultModel = [];
					scope.bundlefunctionTestResultData = payload.data.result.bundle;

					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.bundlefunctionTestResultModel.push(idProp);
		                });
					}
					else
					{
						scope.bundlefunctionTestResultModel = new Array(payload.data.result.bundle[0]);
					}
				}
				
				if("PIDs"!=ignore)
				{
					var local = scope.pidfunctionTestResultModel;
					
					scope.pidfunctionTestResultModel = [];
					scope.pidfunctionTestResultData = payload.data.result.pid;

					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.pidfunctionTestResultModel.push(idProp);
		                });
					}
					else
					{
						scope.pidfunctionTestResultModel = new Array(payload.data.result.pid[0]);
					}
				}
				
				
		     });
	   };
	   
	   
	   this.dashboardFilterReload=function(scope,rootScope,name,value)
		{
			
			
		   if("APIs"==name)
	 		{
		 		
		 		if(scope.apifunctionTestResultModel.length==1 && scope.apifunctionTestResultModel[0].id=="All")
	 			{
		 			scope.api = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.apifunctionTestResultModel.length > 1)
	 				{
		 				scope.api = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.apifunctionTestResultModel.splice(0,scope.apifunctionTestResultModel.length);
			    		 scope.apifunctionTestResultModel.push(idProp);
			    		 
			    		 
		 			}
		 			else if(scope.apifunctionTestResultModel.length > 1 && scope.apifunctionTestResultModel[0].id=="All")
		 			{
		 				scope.apifunctionTestResultModel.splice(0,1);
		 				scope.api = scope.getCommaSeparatedString(scope.apifunctionTestResultModel);
		 			}
		 			else
	 				{
		 				scope.api = scope.getCommaSeparatedString(scope.apifunctionTestResultModel);
		 			}
		 		}
	 		}
		 	else if("Backends"==name)
	 		{
		 		
		 		if(scope.backendfunctionTestResultModel.length==1 && scope.backendfunctionTestResultModel[0].id=="All")
	 			{
		 			scope.backend = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.backendfunctionTestResultModel.length > 1)
	 				{
		 				scope.backend = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.backendfunctionTestResultModel.splice(0,scope.backendfunctionTestResultModel.length);
			    		 scope.backendfunctionTestResultModel.push(idProp); 
		 			}
		 			else if(scope.backendfunctionTestResultModel.length > 1 && scope.backendfunctionTestResultModel[0].id=="All")
		 			{
		 				scope.backendfunctionTestResultModel.splice(0,1);
		 				scope.backend = scope.getCommaSeparatedString(scope.backendfunctionTestResultModel);
		 			}
		 			else
	 				{
		 				scope.backend = scope.getCommaSeparatedString(scope.backendfunctionTestResultModel);
		 			}
		 		}
	 		}
		 	else if("PMTs"==name)
	 		{
		 		if(scope.pmtfunctionTestResultModel.length==1 && scope.pmtfunctionTestResultModel[0].id=="All")
	 			{
		 			scope.pmt = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.pmtfunctionTestResultModel.length > 1)
	 				{
		 				scope.pmt = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.pmtfunctionTestResultModel.splice(0,scope.pmtfunctionTestResultModel.length);
			    		 scope.pmtfunctionTestResultModel.push(idProp);
		 			}
		 			else if(scope.pmtfunctionTestResultModel.length > 1 && scope.pmtfunctionTestResultModel[0].id=="All")
		 			{
		 				scope.pmtfunctionTestResultModel.splice(0,1);
		 				scope.pmt = scope.getCommaSeparatedString(scope.pmtfunctionTestResultModel);
		 			}
		 			else
	 				{
		 				scope.pmt = scope.getCommaSeparatedString(scope.pmtfunctionTestResultModel);
		 			}
		 		}			
	 		}
		 	else if("Release"==name)
	 		{
		 		if(scope.releasefunctionTestResultModel.length==1 && scope.releasefunctionTestResultModel[0].id=="All")
	 			{
		 			scope.release = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.releasefunctionTestResultModel.length > 1)
	 				{
		 				scope.release = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.releasefunctionTestResultModel.splice(0,scope.releasefunctionTestResultModel.length);
			    		 scope.releasefunctionTestResultModel.push(idProp);
		 			}
		 			else if(scope.releasefunctionTestResultModel.length > 1 && scope.releasefunctionTestResultModel[0].id=="All")
		 			{
		 				scope.releasefunctionTestResultModel.splice(0,1);
		 				scope.release = scope.getCommaSeparatedString(scope.releasefunctionTestResultModel);
		 			}
		 			else
	 				{
		 				scope.release = scope.getCommaSeparatedString(scope.releasefunctionTestResultModel);
		 			}
		 		}			
	 		}else if("Bundles"==name)
	 		{
		 		if(scope.bundlefunctionTestResultModel.length==1 && scope.bundlefunctionTestResultModel[0].id=="All")
	 			{
		 			scope.bundle = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.bundlefunctionTestResultModel.length > 1)
	 				{
		 				scope.bundle = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.bundlefunctionTestResultModel.splice(0,scope.bundlefunctionTestResultModel.length);
			    		 scope.bundlefunctionTestResultModel.push(idProp);
		 			}
		 			else if(scope.bundlefunctionTestResultModel.length > 1 && scope.bundlefunctionTestResultModel[0].id=="All")
		 			{
		 				scope.bundlefunctionTestResultModel.splice(0,1);
		 				scope.bundle = scope.getCommaSeparatedString(scope.bundlefunctionTestResultModel);
		 			}
		 			else
	 				{
		 				scope.bundle = scope.getCommaSeparatedString(scope.bundlefunctionTestResultModel);
		 			}
		 		}			
	 		}
	 		else if("PIDs"==name)
	 		{
		 		if(scope.pidfunctionTestResultModel.length==1 && scope.pidfunctionTestResultModel[0].id=="All")
	 			{
		 			scope.pid = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.pidfunctionTestResultModel.length > 1)
	 				{
		 				scope.pid = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.pidfunctionTestResultModel.splice(0,scope.pidfunctionTestResultModel.length);
			    		 scope.pidfunctionTestResultModel.push(idProp);
		 			}
		 			else if(scope.pidfunctionTestResultModel.length > 1 && scope.pidfunctionTestResultModel[0].id=="All")
		 			{
		 				scope.pidfunctionTestResultModel.splice(0,1);
		 				scope.pid = scope.getCommaSeparatedString(scope.pidfunctionTestResultModel);
		 			}
		 			else
	 				{
		 				scope.pid = scope.getCommaSeparatedString(scope.pidfunctionTestResultModel);
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