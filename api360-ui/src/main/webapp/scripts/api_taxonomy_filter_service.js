'use strict';

app.service('apiTaxonomyFilterService', function()
{
	
	
    
    
	this.updateScopeFiltersWithDefaultValues = function(scope,rootScope)
	{
		scope.doamin = 'All' ;
		scope.businesstrack = 'All';		
		scope.businessname =  'All';		
		scope.bundle 	= rootScope.getGlobalURLFilter("Bundles");
		scope.api 		= rootScope.getGlobalURLFilter("APIs");
		scope.lbgups = 'All';
		scope.funlevel1= 'All';
		scope.funlevel2= 'All';
		scope.funlevel3= 'All';
		scope.funlevel4= 'All';
		
		
    };
    
    
    this.updateScopeFiltersWithUrlParamsValues = function(scope,rootScope)
	{
		
    	scope.doamin = 'All' ;
		scope.businesstrack = 'All';		
		scope.businessname =  'All';		
		scope.funlevel1= 'All';
		scope.funlevel2= 'All';
		scope.funlevel3= 'All';
		scope.funlevel4= 'All';	
		scope.lbgups = 'All';
		
    	
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
		
		scope.domainAPITaxonomyModel = [];
		scope.businesstrackesAPITaxonomyModel =[];	
		scope.businessnameAPITaxonomyModel = [];
	
		scope.bundleAPITaxonomyModel =[];
		scope.apiAPITaxonomyModel =[];
		scope.lbgupsAPITaxonomyModel = [];
		scope.funlevel1APITaxonomyModel= [];
		scope.funlevel2APITaxonomyModel= [];
		scope.funlevel3APITaxonomyModel= [];
		scope.funlevel4APITaxonomyModel= [];
		
		
		
		
		
	};
	
	this.emptyFilterData = function(scope,rootScope)
	{
		
		scope.bundleAPITaxonomyData =[];
		scope.apiAPITaxonomyData =[];
		scope.lbgupsAPITaxonomyData = [];
		scope.domainAPITaxonomyData = [];
		scope.businesstrackesAPITaxonomyData =[];	
		scope.businessnameAPITaxonomyData = [];
		scope.funlevel1APITaxonomyData = [];
		scope.funlevel2APITaxonomyData = [];
		scope.funlevel3APITaxonomyData = [];
		scope.funlevel4APITaxonomyData = [];
		
		
		
		
	};
	
	
	this.addFilterSettings = function(scope,rootScope)
	{
		
		
		
		 
		 scope.lbgupsAPITaxonomySettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:3}; 
		 scope.lbgupsAPITaxonomyCustomTexts = {buttonDefaultText: 'LBGUPS'};
		 
		 
		 scope.domainAPITaxonomySettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:3}; 
		 scope.domainAPITaxonomyCustomTexts = {buttonDefaultText: 'Domains'};
		 
		 scope.businessnameAPITaxonomySettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:3}; 
		 scope.businessnameAPITaxonomyCustomTexts = {buttonDefaultText: 'BusinessNames'};
		 
		 
		 scope.businesstrackesAPITaxonomySettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:3}; 
		 scope.businesstrackesAPITaxonomyCustomTexts = {buttonDefaultText: 'BusinessTracks'};
		 
		 scope.bundleAPITaxonomySettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1}; 
		 scope.bundleAPITaxonomyCustomTexts = {buttonDefaultText: 'Bundles'};
		 
		 scope.apiAPITaxonomySettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1}; 
		 scope.apiAPITaxonomyCustomTexts = {buttonDefaultText: 'APIs'};
		 
		 
		 
		 
		 scope.funlevel1APITaxonomySettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1}; 
		 scope.funlevel1APITaxonomyCustomTexts = {buttonDefaultText: 'FunctionalModelLevel1'};
		 
		 scope.funlevel2APITaxonomySettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1}; 
		 scope.funlevel2APITaxonomyCustomTexts = {buttonDefaultText: 'FunctionalModelLevel2'};
		 
		 scope.funlevel3APITaxonomySettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1}; 
		 scope.funlevel3APITaxonomyCustomTexts = {buttonDefaultText: 'FunctionalModelLevel3'};
		 
		 scope.funlevel4APITaxonomySettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1}; 
		 scope.funlevel4APITaxonomyCustomTexts = {buttonDefaultText: 'FunctionalModelLevel4'};
		 
		 
		 
		 
		 
		
		 		 
		
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
				 
				
			    scope.bundleAPITaxonomyData =payload.data.result.bundle;
				scope.apiAPITaxonomyData =payload.data.result.name;
				scope.lbgupsAPITaxonomyData = payload.data.result.lbgups;
				scope.domainAPITaxonomyData = payload.data.result.domain;
				scope.businesstrackesAPITaxonomyData =payload.data.result.businessTrack;
				scope.businessnameAPITaxonomyData = payload.data.result.businessName;
				
				scope.funlevel1APITaxonomyData = payload.data.result.funlevel1;
				scope.funlevel2APITaxonomyData = payload.data.result.funlevel2;
				scope.funlevel3APITaxonomyData = payload.data.result.funlevel3;
				scope.funlevel4APITaxonomyData = payload.data.result.funlevel4;
				
			   			    
			    if(rootScope.urlparams!=undefined)
				{
			    	
			    	if( rootScope.urlparams!=undefined && rootScope.urlparams.Bundles!=undefined && rootScope.urlparams.Bundles!=null)
			    	{
			    		var BundlesArray = rootScope.urlparams.Bundles.split(",");
			    		
				    	for(var i=0; i < BundlesArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = BundlesArray[i];
				    		scope.bundleAPITaxonomyModel.push(idProp);
				    		
				    	}
				    }
			    	else
			    	{
			    		scope.bundleAPITaxonomyModel = new Array(payload.data.result.bundle[0]);
			    	}
			    				    	
			    	
			    	if( rootScope.urlparams!=undefined && rootScope.urlparams.APIs!=undefined && rootScope.urlparams.APIs!=null)
			    	{
			    		var APIsArray = rootScope.urlparams.APIs.split(",");
			    		
				    	for(var i=0; i < APIsArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = APIsArray[i];
							scope.apiAPITaxonomyModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.apiAPITaxonomyModel = new Array(payload.data.result.name[0]);
			    	}
			    	
			    	
			    	
			    	
			    	if( rootScope.urlparams!=undefined && rootScope.urlparams.LBGUPS!=undefined && rootScope.urlparams.LBGUPS!=null)
			    	{
			    		var APIsArray = rootScope.urlparams.LBGUPS.split(",");
			    		
				    	for(var i=0; i < APIsArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = APIsArray[i];
							scope.lbgupsAPITaxonomyModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.lbgupsAPITaxonomyModel = new Array(payload.data.result.lbgups[0]);
			    	}
			    	
			    	
			    	
			    	if( rootScope.urlparams!=undefined && rootScope.urlparams.Domains!=undefined && rootScope.urlparams.Domains!=null)
			    	{
			    		var APIsArray = rootScope.urlparams.Domains.split(",");
			    		
				    	for(var i=0; i < APIsArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = APIsArray[i];
							scope.domainAPITaxonomyModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.domainAPITaxonomyModel = new Array(payload.data.result.domain[0]);
			    	}
			    	
			    	
			    	if( rootScope.urlparams!=undefined && rootScope.urlparams.BusinessTracks!=undefined && rootScope.urlparams.BusinessTracks!=null)
			    	{
			    		var APIsArray = rootScope.urlparams.BusinessTracks.split(",");
			    		
				    	for(var i=0; i < APIsArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = APIsArray[i];
							scope.businesstrackesAPITaxonomyModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.businesstrackesAPITaxonomyModel = new Array(payload.data.result.businessTrack[0]);
			    	}
			    	
			    	
			    	if( rootScope.urlparams!=undefined && rootScope.urlparams.BusinessNames!=undefined && rootScope.urlparams.BusinessNames!=null)
			    	{
			    		var APIsArray = rootScope.urlparams.BusinessNames.split(",");
			    		
				    	for(var i=0; i < APIsArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = APIsArray[i];
							scope.businessnameAPITaxonomyModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.businessnameAPITaxonomyModel = new Array(payload.data.result.businessName[0]);
			    	}
			    	
			    	
			    	
			    	
			    	if( rootScope.urlparams!=undefined && rootScope.urlparams.FunctionalModelLevel1!=undefined && rootScope.urlparams.FunctionalModelLevel1!=null)
			    	{
			    		var APIsArray = rootScope.urlparams.FunctionalModelLevel1.split(",");
			    		
				    	for(var i=0; i < APIsArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = APIsArray[i];
							scope.funlevel1APITaxonomyModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.funlevel1APITaxonomyModel = new Array(payload.data.result.funlevel1[0]);
			    	}
			    	
			    	
			    	if( rootScope.urlparams!=undefined && rootScope.urlparams.FunctionalModelLevel2!=undefined && rootScope.urlparams.FunctionalModelLevel2!=null)
			    	{
			    		var APIsArray = rootScope.urlparams.FunctionalModelLevel2.split(",");
			    		
				    	for(var i=0; i < APIsArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = APIsArray[i];
							scope.funlevel2APITaxonomyModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.funlevel2APITaxonomyModel = new Array(payload.data.result.funlevel2[0]);
			    	}
			    	
			    	
			    	
			    	if( rootScope.urlparams!=undefined && rootScope.urlparams.FunctionalModelLevel3!=undefined && rootScope.urlparams.FunctionalModelLevel3!=null)
			    	{
			    		var APIsArray = rootScope.urlparams.FunctionalModelLevel3.split(",");
			    		
				    	for(var i=0; i < APIsArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = APIsArray[i];
							scope.funlevel3APITaxonomyModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.funlevel3APITaxonomyModel = new Array(payload.data.result.funlevel3[0]);
			    	}
			    	
			    	
			    	
			    	if( rootScope.urlparams!=undefined && rootScope.urlparams.FunctionalModelLevel4!=undefined && rootScope.urlparams.FunctionalModelLevel4!=null)
			    	{
			    		var APIsArray = rootScope.urlparams.FunctionalModelLevel4.split(",");
			    		
				    	for(var i=0; i < APIsArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = APIsArray[i];
							scope.funlevel4APITaxonomyModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.funlevel4APITaxonomyModel = new Array(payload.data.result.funlevel4[0]);
			    	}
			    	
			  	
					
					
				}
			    else
			    {
			    	
			    	scope.bundleAPITaxonomyModel = rootScope.getModelObject(rootScope.getGlobalURLFilter("Bundles"));		    
				    scope.apiAPITaxonomyModel =   rootScope.getModelObject(rootScope.getGlobalURLFilter("APIs"));					
				    scope.domainAPITaxonomyModel = new Array(payload.data.result.domain[0]);
					scope.businesstrackesAPITaxonomyModel =new Array(payload.data.result.businessTrack[0]);
					scope.businessnameAPITaxonomyModel = new Array(payload.data.result.businessName[0]);
					scope.lbgupsAPITaxonomyModel = new Array(payload.data.result.lbgups[0]);
					
					scope.funlevel1APITaxonomyModel=new Array(payload.data.result.funlevel1[0]);
					scope.funlevel2APITaxonomyModel=new Array(payload.data.result.funlevel2[0]);
					scope.funlevel3APITaxonomyModel=new Array(payload.data.result.funlevel3[0]);
					scope.funlevel4APITaxonomyModel=new Array(payload.data.result.funlevel4[0]);
					
					
				    
			    }
			    			    
		     });
			 
			 
			  
			 
	    };
	    
	    
	    
	    
	    
	    
	    
	   
	    
	    
	   
	   
	   
	   this.reloadComboBoxAPITaxonomy= function(scope,rootScope,http,url,ignore) 
		 {
	    	
		  
	    	 var loadFilters = http.get(url);		 
			 http.dataType="json";
			 
			 loadFilters.then(function(payload) 
		     {
				 if("Bundles"!=ignore)
					{
						var local = scope.bundleAPITaxonomyModel;
						
						scope.bundleAPITaxonomyModel = [];
						scope.bundleAPITaxonomyData = payload.data.result.bundle;

						if(local!=null && local.length > 0)
						{
							angular.forEach(local, function (value) 
			                {
								 var idProp = {idProp: 'id'};
					    		 idProp['id'] = value["id"];
								scope.bundleAPITaxonomyModel.push(idProp);
			                });	
						}
						else
						{
							scope.bundleAPITaxonomyModel = new Array(payload.data.result.bundle[0]);
						}
					}					
					
					if("APIs"!=ignore)
					{
						var local = scope.apiAPITaxonomyModel;
						
						scope.apiAPITaxonomyModel = [];
						scope.apiAPITaxonomyData = payload.data.result.name;
						
						if(local!=null && local.length > 0)
						{
							angular.forEach(local, function (value) 
			                {
								 var idProp = {idProp: 'id'};
					    		 idProp['id'] = value["id"];
								scope.apiAPITaxonomyModel.push(idProp);
			                });	
						}
						else
						{
							scope.apiAPITaxonomyModel = new Array(payload.data.result.name[0]);
						}
					}
					
					
					
					if("LBGUPS"!=ignore)
					{
						var local = scope.lbgupsAPITaxonomyModel;
						
						scope.lbgupsAPITaxonomyModel = [];
						scope.lbgupsAPITaxonomyData = payload.data.result.lbgups;
						
						if(local!=null && local.length > 0)
						{
							angular.forEach(local, function (value) 
			                {
								 var idProp = {idProp: 'id'};
					    		 idProp['id'] = value["id"];
								scope.lbgupsAPITaxonomyModel.push(idProp);
			                });	
						}
						else
						{
							scope.lbgupsAPITaxonomyModel = new Array(payload.data.result.lbgups[0]);
						}
					}
					
					
					if("Domains"!=ignore)
					{
						var local = scope.domainAPITaxonomyModel;
						
						scope.domainAPITaxonomyModel = [];
						scope.domainAPITaxonomyData = payload.data.result.domain;
						
						if(local!=null && local.length > 0)
						{
							angular.forEach(local, function (value) 
			                {
								 var idProp = {idProp: 'id'};
					    		 idProp['id'] = value["id"];
								scope.domainAPITaxonomyModel.push(idProp);
			                });	
						}
						else
						{
							scope.domainAPITaxonomyModel = new Array(payload.data.result.domain[0]);
						}
					}
					
					
					if("BusinessTracks"!=ignore)
					{
						var local = scope.businesstrackesAPITaxonomyModel;
						
						scope.businesstrackesAPITaxonomyModel = [];
						scope.businesstrackesAPITaxonomyData = payload.data.result.businessTrack;
						
						if(local!=null && local.length > 0)
						{
							angular.forEach(local, function (value) 
			                {
								 var idProp = {idProp: 'id'};
					    		 idProp['id'] = value["id"];
								scope.businesstrackesAPITaxonomyModel.push(idProp);
			                });	
						}
						else
						{
							scope.businesstrackesAPITaxonomyModel = new Array(payload.data.result.businessTrack[0]);
						}
					}
					
					
					if("BusinessNames"!=ignore)
					{
						var local = scope.businessnameAPITaxonomyModel;
						
						scope.businessnameAPITaxonomyModel = [];
						scope.businessnameAPITaxonomyData = payload.data.result.businessName;
						
						if(local!=null && local.length > 0)
						{
							angular.forEach(local, function (value) 
			                {
								 var idProp = {idProp: 'id'};
					    		 idProp['id'] = value["id"];
								scope.businessnameAPITaxonomyModel.push(idProp);
			                });	
						}
						else
						{
							scope.businessnameAPITaxonomyModel = new Array(payload.data.result.businessName[0]);
						}
					}
					
					
					
					
					if("FunctionalModelLevel1"!=ignore)
					{
						var local = scope.funlevel1APITaxonomyModel;
						
						scope.funlevel1APITaxonomyModel = [];
						scope.funlevel1APITaxonomyData = payload.data.result.funlevel1;
						
						if(local!=null && local.length > 0)
						{
							angular.forEach(local, function (value) 
			                {
								 var idProp = {idProp: 'id'};
					    		 idProp['id'] = value["id"];
								scope.funlevel1APITaxonomyModel.push(idProp);
			                });	
						}
						else
						{
							scope.funlevel1APITaxonomyModel = new Array(payload.data.result.funlevel1[0]);
						}
					}
					
					
					
					if("FunctionalModelLevel2"!=ignore)
					{
						var local = scope.funlevel2APITaxonomyModel;
						
						scope.funlevel2APITaxonomyModel = [];
						scope.funlevel2APITaxonomyData = payload.data.result.funlevel2;
						
						if(local!=null && local.length > 0)
						{
							angular.forEach(local, function (value) 
			                {
								 var idProp = {idProp: 'id'};
					    		 idProp['id'] = value["id"];
								 scope.funlevel2APITaxonomyModel.push(idProp);
			                });	
						}
						else
						{
							scope.funlevel2APITaxonomyModel = new Array(payload.data.result.funlevel2[0]);
						}
					}
					
					
					if("FunctionalModelLevel3"!=ignore)
					{
						var local = scope.funlevel3APITaxonomyModel;
						
						scope.funlevel3APITaxonomyModel = [];
						scope.funlevel3APITaxonomyData = payload.data.result.funlevel3;
						
						if(local!=null && local.length > 0)
						{
							angular.forEach(local, function (value) 
			                {
								 var idProp = {idProp: 'id'};
					    		 idProp['id'] = value["id"];
								scope.funlevel3APITaxonomyModel.push(idProp);
			                });	
						}
						else
						{
							scope.funlevel3APITaxonomyModel = new Array(payload.data.result.funlevel3[0]);
						}
					}
					
					
					
					
					
					if("FunctionalModelLevel4"!=ignore)
					{
						var local = scope.funlevel4APITaxonomyModel;
						
						scope.funlevel4APITaxonomyModel = [];
						scope.funlevel4APITaxonomyData = payload.data.result.funlevel4;
						
						if(local!=null && local.length > 0)
						{
							angular.forEach(local, function (value) 
			                {
								 var idProp = {idProp: 'id'};
					    		 idProp['id'] = value["id"];
								scope.funlevel4APITaxonomyModel.push(idProp);
			                });	
						}
						else
						{
							scope.funlevel4APITaxonomyModel = new Array(payload.data.result.funlevel4[0]);
						}
					}
					
					
					
					
					
					
					
					
				
		     });
	   };
	   
	   
	   
	   this.dashboardFilterReload=function(scope,rootScope,name,value)
		{
			
			
		   
		 	if("Bundles"==name)
	 		{
		 		
		 		if(scope.bundleAPITaxonomyModel.length==1 && scope.bundleAPITaxonomyModel[0].id=="All")
	 			{
		 			scope.bundle = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.bundleAPITaxonomyModel.length > 1)
	 				{
		 				scope.bundle = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.bundleAPITaxonomyModel.splice(0,scope.bundleAPITaxonomyModel.length);
			    		 scope.bundleAPITaxonomyModel.push(idProp); 
		 			}
		 			else if(scope.bundleAPITaxonomyModel.length > 1 && scope.bundleAPITaxonomyModel[0].id=="All")
		 			{
		 				scope.bundleAPITaxonomyModel.splice(0,1);
		 				scope.bundle = scope.getCommaSeparatedString(scope.bundleAPITaxonomyModel);
		 			}
		 			else
	 				{
		 				scope.bundle = scope.getCommaSeparatedString(scope.bundleAPITaxonomyModel);
		 			}
		 		}
	 		}
		 	else if("APIs"==name)
	 		{
		 		if(scope.apiAPITaxonomyModel.length==1 && scope.apiAPITaxonomyModel[0].id=="All")
	 			{
		 			scope.api = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.apiAPITaxonomyModel.length > 1)
	 				{
		 				scope.api = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.apiAPITaxonomyModel.splice(0,scope.apiAPITaxonomyModel.length);
			    		 scope.apiAPITaxonomyModel.push(idProp);
		 			}
		 			else if(scope.apiAPITaxonomyModel.length > 1 && scope.apiAPITaxonomyModel[0].id=="All")
		 			{
		 				scope.apiAPITaxonomyModel.splice(0,1);
		 				scope.api = scope.getCommaSeparatedString(scope.apiAPITaxonomyModel);
		 			}
		 			else
	 				{
		 				scope.api = scope.getCommaSeparatedString(scope.apiAPITaxonomyModel);
		 			}
		 		}			
	 		}			
		 	else if("LBGUPS"==name)	
	 		{
		 		
	 			
		 		if(scope.lbgupsAPITaxonomyModel.length==1 && scope.lbgupsAPITaxonomyModel[0].id=="All")
	 			{
		 			scope.lbgups = "All";
		 		}
		 		else
	 			{
		 			
		 			if(value=="All" && scope.lbgupsAPITaxonomyModel.length > 1)
	 				{
		 				 scope.lbgups = "All";
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 scope.lbgupsAPITaxonomyModel.splice(0,scope.lbgupsAPITaxonomyModel.length);
			    		 scope.lbgupsAPITaxonomyModel.push(idProp);		 				 
		 			}
		 			else if(scope.lbgupsAPITaxonomyModel.length > 1 && scope.lbgupsAPITaxonomyModel[0].id=="All")
		 			{
		 				scope.lbgupsAPITaxonomyModel.splice(0,1);
		 				scope.lbgups = scope.getCommaSeparatedString(scope.lbgupsAPITaxonomyModel);		 					
		 			}
		 			else
	 				{
		 				scope.lbgups = scope.getCommaSeparatedString(scope.lbgupsAPITaxonomyModel);
		 			}
		 		}
	 		}else if("Domains"==name)	
	 		{
		 		
	 			
		 		if(scope.domainAPITaxonomyModel.length==1 && scope.domainAPITaxonomyModel[0].id=="All")
	 			{
		 			scope.doamin = "All";
		 		}
		 		else
	 			{
		 			
		 			if(value=="All" && scope.domainAPITaxonomyModel.length > 1)
	 				{
		 				 scope.doamin = "All";
		 				 
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 scope.domainAPITaxonomyModel.splice(0,scope.domainAPITaxonomyModel.length);
			    		 scope.domainAPITaxonomyModel.push(idProp);		 				 
		 			}
		 			else if(scope.domainAPITaxonomyModel.length > 1 && scope.domainAPITaxonomyModel[0].id=="All")
		 			{
		 				scope.domainAPITaxonomyModel.splice(0,1);
		 				scope.doamin = scope.getCommaSeparatedString(scope.domainAPITaxonomyModel);		 					
		 			}
		 			else
	 				{
		 				scope.doamin = scope.getCommaSeparatedString(scope.domainAPITaxonomyModel);
		 			}
		 		}
	 		}else if("BusinessTracks"==name)	
	 		{
		 		
	 			
		 		if(scope.businesstrackesAPITaxonomyModel.length==1 && scope.businesstrackesAPITaxonomyModel[0].id=="All")
	 			{
		 			scope.businesstrack = "All";
		 		}
		 		else
	 			{
		 			
		 			if(value=="All" && scope.businesstrackesAPITaxonomyModel.length > 1)
	 				{
		 				 scope.businesstrack = "All";
		 				 
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 scope.businesstrackesAPITaxonomyModel.splice(0,scope.businesstrackesAPITaxonomyModel.length);
			    		 scope.businesstrackesAPITaxonomyModel.push(idProp);		 				 
		 			}
		 			else if(scope.businesstrackesAPITaxonomyModel.length > 1 && scope.businesstrackesAPITaxonomyModel[0].id=="All")
		 			{
		 				scope.businesstrackesAPITaxonomyModel.splice(0,1);
		 				scope.businesstrack = scope.getCommaSeparatedString(scope.businesstrackesAPITaxonomyModel);		 					
		 			}
		 			else
	 				{
		 				scope.businesstrack = scope.getCommaSeparatedString(scope.businesstrackesAPITaxonomyModel);
		 			}
		 		}
	 		}else if("BusinessNames"==name)	
	 		{
		 		
	 			
		 		if(scope.businessnameAPITaxonomyModel.length==1 && scope.businessnameAPITaxonomyModel[0].id=="All")
	 			{
		 			scope.businessname = "All";
		 		}
		 		else
	 			{
		 			
		 			if(value=="All" && scope.businessnameAPITaxonomyModel.length > 1)
	 				{
		 				 scope.businessname = "All";
		 				 
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 scope.businessnameAPITaxonomyModel.splice(0,scope.businessnameAPITaxonomyModel.length);
			    		 scope.businessnameAPITaxonomyModel.push(idProp);		 				 
		 			}
		 			else if(scope.businessnameAPITaxonomyModel.length > 1 && scope.businessnameAPITaxonomyModel[0].id=="All")
		 			{
		 				scope.businessnameAPITaxonomyModel.splice(0,1);
		 				scope.businessname = scope.getCommaSeparatedString(scope.businessnameAPITaxonomyModel);		 					
		 			}
		 			else
	 				{
		 				scope.businessname = scope.getCommaSeparatedString(scope.businessnameAPITaxonomyModel);
		 			}
		 		}
	 		}else if("FunctionalModelLevel4"==name)	
	 		{
		 		
		 		if(scope.funlevel4APITaxonomyModel.length==1 && scope.funlevel4APITaxonomyModel[0].id=="All")
	 			{
		 			scope.funlevel4 = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.funlevel4APITaxonomyModel.length > 1)
	 				{
		 				 scope.funlevel4 = "All";
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 scope.funlevel4APITaxonomyModel.splice(0,scope.funlevel4APITaxonomyModel.length);
			    		 scope.funlevel4APITaxonomyModel.push(idProp);		 				 
		 			}
		 			else if(scope.funlevel4APITaxonomyModel.length > 1 && scope.funlevel4APITaxonomyModel[0].id=="All")
		 			{
		 				scope.funlevel4APITaxonomyModel.splice(0,1);
		 				scope.funlevel4 = scope.getCommaSeparatedString(scope.funlevel4APITaxonomyModel);		 					
		 			}
		 			else
	 				{
		 				scope.funlevel4 = scope.getCommaSeparatedString(scope.funlevel4APITaxonomyModel);
		 			}
		 		}
	 		}else if("FunctionalModelLevel1"==name)	
	 		{
		 		
		 		if(scope.funlevel1APITaxonomyModel.length==1 && scope.funlevel1APITaxonomyModel[0].id=="All")
	 			{
		 			scope.funlevel1 = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.funlevel1APITaxonomyModel.length > 1)
	 				{
		 				 scope.funlevel1 = "All";
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 scope.funlevel1APITaxonomyModel.splice(0,scope.funlevel1APITaxonomyModel.length);
			    		 scope.funlevel1APITaxonomyModel.push(idProp);		 				 
		 			}
		 			else if(scope.funlevel1APITaxonomyModel.length > 1 && scope.funlevel1APITaxonomyModel[0].id=="All")
		 			{
		 				scope.funlevel1APITaxonomyModel.splice(0,1);
		 				scope.funlevel1 = scope.getCommaSeparatedString(scope.funlevel1APITaxonomyModel);		 					
		 			}
		 			else
	 				{
		 				scope.funlevel1 = scope.getCommaSeparatedString(scope.funlevel1APITaxonomyModel);
		 			}
		 		}
	 		}else if("FunctionalModelLevel2"==name)	
	 		{
		 		
		 		if(scope.funlevel2APITaxonomyModel.length==1 && scope.funlevel2APITaxonomyModel[0].id=="All")
	 			{
		 			scope.funlevel2 = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.funlevel2APITaxonomyModel.length > 1)
	 				{
		 				 scope.funlevel2 = "All";
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 scope.funlevel2APITaxonomyModel.splice(0,scope.funlevel2APITaxonomyModel.length);
			    		 scope.funlevel2APITaxonomyModel.push(idProp);		 				 
		 			}
		 			else if(scope.funlevel2APITaxonomyModel.length > 1 && scope.funlevel2APITaxonomyModel[0].id=="All")
		 			{
		 				scope.funlevel2APITaxonomyModel.splice(0,1);
		 				scope.funlevel2 = scope.getCommaSeparatedString(scope.funlevel2APITaxonomyModel);		 					
		 			}
		 			else
	 				{
		 				scope.funlevel2 = scope.getCommaSeparatedString(scope.funlevel2APITaxonomyModel);
		 			}
		 		}
	 		}else if("FunctionalModelLevel3"==name)	
	 		{
		 		
		 		if(scope.funlevel3APITaxonomyModel.length==1 && scope.funlevel3APITaxonomyModel[0].id=="All")
	 			{
		 			scope.funlevel3 = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.funlevel3APITaxonomyModel.length > 1)
	 				{
		 				 scope.funlevel3 = "All";
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 scope.funlevel3APITaxonomyModel.splice(0,scope.funlevel3APITaxonomyModel.length);
			    		 scope.funlevel3APITaxonomyModel.push(idProp);		 				 
		 			}
		 			else if(scope.funlevel3APITaxonomyModel.length > 1 && scope.funlevel3APITaxonomyModel[0].id=="All")
		 			{
		 				scope.funlevel3APITaxonomyModel.splice(0,1);
		 				scope.funlevel3 = scope.getCommaSeparatedString(scope.funlevel3APITaxonomyModel);		 					
		 			}
		 			else
	 				{
		 				scope.funlevel3 = scope.getCommaSeparatedString(scope.funlevel3APITaxonomyModel);
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