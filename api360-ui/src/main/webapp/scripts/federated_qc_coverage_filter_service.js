'use strict';

app.service('federatedQcCoverageFilterService', function()
{
	 
	this.updateScopeFiltersWithDefaultValues = function(scope,rootScope)
	{	
	 	 
		scope.api 		= rootScope.getGlobalURLFilter("APIs");
		scope.qccluster = 'All';
		scope.client = 'All';	
		scope.version = 'All';
		 
				
    };
	
    this.updateScopeFiltersWithUrlParamsValues = function(scope,rootScope)
	{
	 	if(rootScope.urlparams!=undefined && rootScope.urlparams.APIs!=undefined && rootScope.urlparams.APIs!=null)
    	{
    		scope.api = rootScope.urlparams.APIs;
    	}
    
	};
	
	this.emptyFilterModels = function(scope,rootScope)
	{
		scope.qcClustermodel = [{id:"All"}];
		scope.versionModel = [{id:"88"}];
		scope.apiNameModel = [{id:"All"}];
		scope.clientModel = [{id:"All"}];
 		
	};
	
	
	this.emptyModel= function(scope,rootScope)
	{
		scope.qcClustermodel = [];
		scope.versionModel = [];
		scope.apiNameModel = [];
		scope.clientModel = [];
 		
	};
	
	this.emptyFilterData = function(scope,rootScope)
	{
		scope.qcClusterData = [];
		scope.versionData = [];
		scope.apiNameData = [];
		scope.clientData = [];
	};
	
	
	this.addFilterSettings = function(scope,rootScope)
	{	
		 scope.qcClusterSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:3,selectionLimit:30}; 
		 scope.QCcustomTexts = {buttonDefaultText: 'Qc_Cluster'};
		
		 
		 scope.versionSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:3,selectionLimit:30}; 
		 scope.versioncustomTexts = {buttonDefaultText: 'Version'};
	
		 scope.apiNameSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1,selectionLimit:30}; 
		 scope.apiNamecustomTexts = {buttonDefaultText: 'API'};
	
		 scope.clientSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:3,selectionLimit:30}; 
		 scope.clientcustomTexts = {buttonDefaultText: 'Client'};
 
			 
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
	    
	    this.getQcClusterFilter = function(scope,rootScope,http){
			 
			var url = "/api360-service/federatedQCCoverage/federated/filters.json";
			var loadFilters = http.get(url);  
		    http.dataType="json";
		    loadFilters.success(function(data){
		         //$scope.bundleModel = new Array(data.result.container_name[1]);
		    	 var  respData = data.aaData;
		    	// rootScope.submitFederatedCodeCoverageDefaultSearch(); 
			     var clusterArray = respData['cluster']; 
			     var apiArray = respData['api']; 
			     var versionArray = respData['major_version']; 
			     var clientArray = respData['client']; 
			     
			     var clusterData = [], apiData = [], versionData = [], clientData = [];
			      
			     for(var i=0; i< clusterArray.length; i++){
			    	 clusterData.push(clusterArray[i]);
			     }
			     for(var i=0; i< apiArray.length; i++){
			    	 apiData.push(apiArray[i]);
			     }
			     for(var i=0; i< versionArray.length; i++){
			    	 versionData.push(versionArray[i]);
			     }
			     for(var i=0; i< clientArray.length; i++){
			    	 clientData.push(clientArray[i]);
			     }
			         
			     
				 scope.qcClusterData=clusterData;
				 scope.apiNameData =apiData;
				 scope.versionData =versionData;
				 scope.clientData =clientData;
				 rootScope.$broadcast('dialogs.wait.complete');
				 
	       });
		}

	    
	       
	    this.loadFilterWithUrlParameteres = function(scope,rootScope){
	    	
	    	if(rootScope.urlparams!=undefined && rootScope.urlparams.api!=null)
	    	{
	    		this.emptyModel(scope,rootScope);
	    	}
	    	if(rootScope.urlparams!=undefined && rootScope.urlparams.api!=undefined && rootScope.urlparams.api!=null)
	    	{
	    		scope.api = rootScope.urlparams.api;
	    		var apiStr = rootScope.urlparams.api;
	    		apiStr = apiStr.split(",");
	    		for(var i =0; i< apiStr.length;i++){
	    			var obj ={id:""};
	    			obj.id=apiStr[i];
	    			scope.apiNameModel.push(obj);
	    		}
	    	} 
	    	 
	    	
	    	if(rootScope.urlparams!=undefined && rootScope.urlparams.cluster!=undefined && rootScope.urlparams.cluster!=null)
	    	{
	    		scope.qccluster = rootScope.urlparams.cluster;
	    		var apiStr = rootScope.urlparams.cluster;
	    		apiStr = apiStr.split(",");
	    		for(var i =0; i< apiStr.length;i++){
	    			var obj ={id:""};
	    			obj.id=apiStr[i];
	    			scope.qcClustermodel.push(obj);
	    		}
	    	}
	    	
	    	if(rootScope.urlparams!=undefined && rootScope.urlparams.client!=undefined && rootScope.urlparams.client!=null)
	    	{
	    		scope.client = rootScope.urlparams.client;
	    		var apiStr = rootScope.urlparams.client;
	    		apiStr = apiStr.split(",");
	    		for(var i =0; i< apiStr.length;i++){
	    			var obj ={id:""};
	    			obj.id=apiStr[i];
	    			scope.clientModel.push(obj);
	    		}
	    	}
	    	
	    	if(rootScope.urlparams!=undefined && rootScope.urlparams.startDate !=undefined && rootScope.urlparams.client!=null)
	    	{
	    		scope.qcStartDate = rootScope.urlparams.startDate;
	    	}
	    	
	    	if(rootScope.urlparams!=undefined && rootScope.urlparams.endDate !=undefined && rootScope.urlparams.client!=null)
	    	{
	    		scope.qcEndDate = rootScope.urlparams.endDate;
	    	}
	    	
	    	if(rootScope.urlparams!=undefined && rootScope.urlparams.version!=undefined && rootScope.urlparams.version!=null)
	    	{
	    		scope.version = rootScope.urlparams.version;
	    		var apiStr = rootScope.urlparams.version;
	    		apiStr = apiStr.split(",");
	    		for(var i =0; i< apiStr.length;i++){
	    			var obj ={id:""};
	    			obj.id=apiStr[i];
	    			scope.versionModel.push(obj);
	    		}
	    	}
	    	 
	    	
	    	
	    };

	    this.loadComboBox= function(scope,rootScope,http,pagelocation) 
		{
	    	rootScope.launch('wait');  
	    	this.addFilterSettings(scope,rootScope);  
    		this.emptyFilterModels(scope,rootScope);
	    	 
			this.emptyFilterData(scope,rootScope);
			this.loadFilterWithUrlParameteres(scope,rootScope);
		 	this.getQcClusterFilter(scope,rootScope,http);
			 
	     };
	    
	   
	   this.dashboardFilterReload=function(scope,rootScope,name,value)
		{
		   
		   if("API"==name)
	 		{
		 		if(scope.apiNameModel.length==1 && scope.apiNameModel[0].id=="All")
	 			{
		 			scope.api = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.apiNameModel.length > 1)
	 				{
		 				scope.api = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.apiNameModel.splice(0,scope.apiNameModel.length);
			    		 scope.apiNameModel.push(idProp);
		 			}
		 			else if(scope.apiNameModel.length > 1 && scope.apiNameModel[0].id=="All")
		 			{
		 				scope.apiNameModel.splice(0,1);
		 				scope.api = scope.getCommaSeparatedString(scope.apiNameModel);
		 			}
		 			else
	 				{
		 				scope.api = scope.getCommaSeparatedString(scope.apiNameModel);
		 			}
		 		}			
	 		 
	 		} else if("Client"==name || name =="All")
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
	 		 
	 		}else if("Qc_Cluster"==name)
	 		{
		 		if(scope.qcClustermodel.length==1 && scope.qcClustermodel[0].id=="All")
	 			{
		 			scope.qccluster = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.qcClustermodel.length > 1)
	 				{
		 				scope.qccluster = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.qcClustermodel.splice(0,scope.qcClustermodel.length);
			    		 scope.qcClustermodel.push(idProp);
		 			}
		 			else if(scope.qcClustermodel.length > 1 && scope.qcClustermodel[0].id=="All")
		 			{
		 				scope.qcClustermodel.splice(0,1);
		 				scope.qccluster = scope.getCommaSeparatedString(scope.qcClustermodel);
		 			}
		 			else
	 				{
		 				scope.qccluster = scope.getCommaSeparatedString(scope.qcClustermodel);
		 			}
		 		}			
	 		 
	 		} else if("Version"==name)
	 		{
		 		if(scope.versionModel.length==1 && scope.versionModel[0].id=="All")
	 			{
		 			scope.version = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.versionModel.length > 1)
	 				{
		 				scope.version = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.versionModel.splice(0,scope.versionModel.length);
			    		 scope.versionModel.push(idProp);
		 			}
		 			else if(scope.versionModel.length > 1 && scope.versionModel[0].id=="All")
		 			{
		 				scope.versionModel.splice(0,1);
		 				scope.version = scope.getCommaSeparatedString(scope.versionModel);
		 			}
		 			else
	 				{
		 				scope.version = scope.getCommaSeparatedString(scope.versionModel);
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