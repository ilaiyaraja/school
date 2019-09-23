'use strict';

app.service('eteTestResultFilterService', function()
{
	
	this.updateScopeFiltersWithDefaultValues = function(scope,rootScope)
	{	
		
		
		scope.testname='All';
		scope.release='All';
		scope.pmt='All';
		scope.pid='All';
		
		
	};
    
    
    this.updateScopeFiltersWithUrlParamsValues = function(scope,rootScope)
	{
    	
    	
    	
    	/*scope.api='All';
		scope.backend='All';
		scope.bundle='All';
		scope.pmt='All';
		scope.release='All';*/
		
		if(rootScope.urlparams!=undefined && rootScope.urlparams.Testnames!=undefined && rootScope.urlparams.Testnames!=null)
    	{
    		scope.testname = rootScope.urlparams.Testnames;
	    }
    	
    	if(rootScope.urlparams!=undefined && rootScope.urlparams.Releases!=undefined && rootScope.urlparams.Releases!=null)
    	{
    		scope.release = rootScope.urlparams.Releases;
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
		scope.testnameEteTestResultModel = [];
		scope.releaseEteTestResultModel = [];
		scope.pmtEteTestResultModel = [];
		scope.pidEteTestResultModel = [];
	
		
	};
	
	this.emptyFilterData = function(scope,rootScope)
	{
		scope.testnameEteTestResultData = [];
		scope.releaseEteTestResultData = [];
		scope.pmtEteTestResultData = [];
		scope.pidEteTestResultData = [];
		
		
	};
	
	
	this.addFilterSettings = function(scope,rootScope)
	{	
		 scope.testnameEteTestResultSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1,selectionLimit:30}; 
		 scope.testnameEteTestResultCustomTexts = {buttonDefaultText: 'Test Names'};
		
		 scope.releaseEteTestResultSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1,selectionLimit:30}; 
		 scope.releaseEteTestResultCustomTexts = {buttonDefaultText: 'Releases'};
		 
		 scope.pmtEteTestResultSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1,selectionLimit:30}; 
		 scope.pmtEteTestResultCustomTexts = {buttonDefaultText: 'PMTs'};
		 
		 scope.pidEteTestResultSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1,selectionLimit:30}; 
		 scope.pidEteTestResultCustomTexts = {buttonDefaultText: 'PIDs'};
		 
		
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
				 
				 
				
			    scope.testnameEteTestResultData = payload.data.result.testname;
				scope.releaseEteTestResultData = payload.data.result.release;
				scope.pmtEteTestResultData = payload.data.result.pmt;
				scope.pidEteTestResultData = payload.data.result.pid;
				
				var result=[];
				
				/*for (var dString in scope.releasefunctionTestResultData) 
				{ 
					var id = scope.releasefunctionTestResultData[dString].id;
					if (id == "2015.07"){
						result.push(scope.releasefunctionTestResultData[dString]); //+ ",";
					}
				}*/
				
				
				
				
				
			   
			   			    
			    if(rootScope.urlparams!=undefined)
				{
			    	
			    	if( rootScope.urlparams!=undefined && rootScope.urlparams.Testnames!=undefined && rootScope.urlparams.Testnames!=null)
			    	{
			    		var testnameArray = rootScope.urlparams.Testnames.split(",");
			    		
				    	for(var i=0; i < testnameArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = testnameArray[i];
				    		scope.testnameEteTestResultModel.push(idProp);
				    	}
				    }
			    	else
			    	{
			    		
			    		scope.testnameEteTestResultModel = new Array(payload.data.result.testname[0]);
			    	}
			    				    	
			    	
			    	if(rootScope.urlparams!=undefined && rootScope.urlparams.Releases!=undefined && rootScope.urlparams.Releases!=null)
			    	{
			    		var releaseArray = rootScope.urlparams.Releases.split(",");
			    		
				    	for(var i=0; i < releaseArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = releaseArray[i];
							scope.releaseEteTestResultModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.releaseEteTestResultModel = new Array(payload.data.result.release[0]);
			    	}
			    	
			    				    	
			    	
			    	if(rootScope.urlparams!=undefined && rootScope.urlparams.PMTs!=undefined && rootScope.urlparams.PMTs!=null)
			    	{
			    		var pmtBundlesArray = rootScope.urlparams.PMTs.split(",");
			    		
				    	for(var i=0; i < pmtBundlesArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = pmtBundlesArray[i];
							scope.pmtEteTestResultModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.pmtEteTestResultModel = new Array(payload.data.result.pmt[0]);
			    	}
			    	
			    	if(rootScope.urlparams!=undefined && rootScope.urlparams.PIDs!=undefined && rootScope.urlparams.PIDs!=null)
			    	{
			    		var pmtBundlesArray = rootScope.urlparams.PIDs.split(",");
			    		
				    	for(var i=0; i < pidBundlesArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = pidBundlesArray[i];
							scope.pidEteTestResultModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.pidEteTestResultModel = new Array(payload.data.result.pid[0]);
			    	}
			    	
					
				}
			    else
			    {
			    	//scope.apifunctionTestResultModel = new Array(payload.data.result.api[0]);
					//scope.backendfunctionTestResultModel = new Array(payload.data.result.backend[0]);
					scope.pmtEteTestResultModel = new Array(payload.data.result.pmt[0]);
					//scope.releaseEteTestResultModel =result ;
					//scope.bundlefunctionTestResultModel = new Array(payload.data.result.bundle[0]);	
					scope.releaseEteTestResultModel = new Array(payload.data.result.release[0]);
					
					scope.testnameEteTestResultModel = new Array(payload.data.result.testname[0]);
					scope.pidEteTestResultModel = new Array(payload.data.result.pid[0]);
				
					
			    }
		     }); 
	    };
	    
	    
	    
	    this.reloadComboBoxEteTestResult= function(scope,rootScope,http,url,ignore) 
		 {
	    	
	    	 var loadFilters = http.get(url);		 
			 http.dataType="json";
			 
			 loadFilters.then(function(payload) 
		     {
				
				
				
				if("Testnames"!=ignore)
				{
					var local = scope.testnameEteTestResultModel;
					
					scope.testnameEteTestResultModel = [];
					scope.testnameEteTestResultData = payload.data.result.testname;

					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.testnameEteTestResultModel.push(idProp);
		                });
					}
					else
					{
						scope.testnameEteTestResultModel = new Array(payload.data.result.testname[0]);
					}
				}			
				
				if("Releases"!=ignore)
				{
					var local = scope.releaseEteTestResultModel;
					
					scope.releaseEteTestResultModel = [];
					scope.releaseEteTestResultData = payload.data.result.release;

					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.releaseEteTestResultModel.push(idProp);
		                });
					}
					else
					{
						scope.releaseEteTestResultModel = new Array(payload.data.result.release[0]);
					}
				}					
				
				if("PMTs"!=ignore)
				{
					var local = scope.pmtEteTestResultModel;
					
					scope.pmtEteTestResultModel = [];
					scope.pmtEteTestResultData = payload.data.result.pmt;

					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.pmtEteTestResultModel.push(idProp);
		                });
					}
					else
					{
						scope.pmtEteTestResultModel = new Array(payload.data.result.pmt[0]);
					}
				}
				
				
				if("PIDs"!=ignore)
				{
					var local = scope.pidEteTestResultModel;
					
					scope.pidEteTestResultModel = [];
					scope.pidEteTestResultData = payload.data.result.pid;

					
					if(local!=null && local.length > 0)
					{
						angular.forEach(local, function (value) 
		                {
							 var idProp = {idProp: 'id'};
				    		 idProp['id'] = value["id"];
							scope.pidEteTestResultModel.push(idProp);
		                });
					}
					else
					{
						scope.pidEteTestResultModel = new Array(payload.data.result.pid[0]);
					}
				}
				
				
		     });
	   };
	   
	   
	   this.dashboardFilterReload=function(scope,rootScope,name,value)
		{
			
			
		   if("Testnames"==name)
	 		{
		 		
		 		if(scope.testnameEteTestResultModel.length==1 && scope.testnameEteTestResultModel[0].id=="All")
	 			{
		 			scope.testname = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.testnameEteTestResultModel.length > 1)
	 				{
		 				scope.testname = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.testnameEteTestResultModel.splice(0,scope.testnameEteTestResultModel.length);
			    		 scope.testnameEteTestResultModel.push(idProp);
			    		 
			    		 
		 			}
		 			else if(scope.testnameEteTestResultModel.length > 1 && scope.testnameEteTestResultModel[0].id=="All")
		 			{
		 				scope.testnameEteTestResultModel.splice(0,1);
		 				scope.testname = scope.getCommaSeparatedString(scope.testnameEteTestResultModel);
		 			}
		 			else
	 				{
		 				scope.testname = scope.getCommaSeparatedString(scope.testnameEteTestResultModel);
		 			}
		 		}
	 		}
		 	else if("Releases"==name)
	 		{
		 		
		 		if(scope.releaseEteTestResultModel.length==1 && scope.releaseEteTestResultModel[0].id=="All")
	 			{
		 			scope.release = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.releaseEteTestResultModel.length > 1)
	 				{
		 				scope.release = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.releaseEteTestResultModel.splice(0,scope.releaseEteTestResultModel.length);
			    		 scope.releaseEteTestResultModel.push(idProp); 
		 			}
		 			else if(scope.releaseEteTestResultModel.length > 1 && scope.releaseEteTestResultModel[0].id=="All")
		 			{
		 				scope.releaseEteTestResultModel.splice(0,1);
		 				scope.release = scope.getCommaSeparatedString(scope.releaseEteTestResultModel);
		 			}
		 			else
	 				{
		 				scope.release = scope.getCommaSeparatedString(scope.releaseEteTestResultModel);
		 			}
		 		}
	 		}
		 	else if("PMTs"==name)
	 		{
		 		if(scope.pmtEteTestResultModel.length==1 && scope.pmtEteTestResultModel[0].id=="All")
	 			{
		 			scope.pmt = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.pmtEteTestResultModel.length > 1)
	 				{
		 				scope.pmt = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.pmtEteTestResultModel.splice(0,scope.pmtEteTestResultModel.length);
			    		 scope.pmtEteTestResultModel.push(idProp);
		 			}
		 			else if(scope.pmtEteTestResultModel.length > 1 && scope.pmtEteTestResultModel[0].id=="All")
		 			{
		 				scope.pmtEteTestResultModel.splice(0,1);
		 				scope.pmt = scope.getCommaSeparatedString(scope.pmtEteTestResultModel);
		 			}
		 			else
	 				{
		 				scope.pmt = scope.getCommaSeparatedString(scope.pmtEteTestResultModel);
		 			}
		 		}			
	 		}
	 		else if("PIDs"==name)
	 		{
		 		if(scope.pidEteTestResultModel.length==1 && scope.pidEteTestResultModel[0].id=="All")
	 			{
		 			scope.pid = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.pidEteTestResultModel.length > 1)
	 				{
		 				scope.pid = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.pidEteTestResultModel.splice(0,scope.pidEteTestResultModel.length);
			    		 scope.pidEteTestResultModel.push(idProp);
		 			}
		 			else if(scope.pmtEteTestResultModel.length > 1 && scope.pmtEteTestResultModel[0].id=="All")
		 			{
		 				scope.pidEteTestResultModel.splice(0,1);
		 				scope.pid = scope.getCommaSeparatedString(scope.pidEteTestResultModel);
		 			}
		 			else
	 				{
		 				scope.pid = scope.getCommaSeparatedString(scope.pidEteTestResultModel);
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