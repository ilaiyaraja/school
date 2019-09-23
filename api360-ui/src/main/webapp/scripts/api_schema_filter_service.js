'use strict';

app.service('apiSchemaSearchFilterService', function()
{

	this.updateScopeFiltersWithDefaultValues = function(scope,rootScope)
	{
		scope.keyword1 = '';		
		scope.keyword01 = '';
		scope.type2 = 'true';
		scope.Service = 'All';
		scope.apiVersion = '97';
		scope.searchSchema = 'Any';
		//scope.apiSearchSchemaScopeModel = 'Any';
    };
	
       
	this.emptyFilterModels = function(scope,rootScope)
	{
		//var test1 = {id:"All", label:"All"} ;
		//new Array(payload.data.result.pmt[0]);
		
		
		scope.apiSchemaServiceNameModel = [];
		scope.apiSearchSchemaScopeModel = [];
		scope.apiSchemaVersionModel =  [];

	};
	
	this.emptyFilterData = function(scope,rootScope)
	{
		scope.apiSchemaServiceNameData =[];
		scope.apiSchemaVersionData =[];
		scope.apiSearchSchemaScopeData =[];
		
	};
	
	this.addFilterSettings = function(scope,rootScope)
	{	

		scope.apiSchemaServiceNameSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1,selectionLimit:30}; 
		scope.apiSchemaServiceNameCustomTexts = {buttonDefaultText: 'APIs'};
		
		scope.apiSchemaVersionSettings 	= {selectionLimit : 2,enableSearch : false,	showCheckAll : false,showUncheckAll : false,closeOnSelect : true,closeOnDeselect : true,scrollable : true,smartButtonMaxItems : 1,
				smartButtonTextConverter : function(itemText, originalItem) {
				return itemText;
				},
				buttonClasses : 'btn btn-default custombtn',};
		
		//scope.apiSchemaVersionSettings 	= {enableSearch: false,scrollable: false,closeOnBlur:true, showCheckAll:false, showUncheckAll:false,smartButtonMaxItems:1,selectionLimit:2}; 
		scope.apiSchemaVersioncustomTexts = {buttonDefaultText: 'Version'};
		
		/*scope.apiSearchSchemaScopeSettings 	= {selectionLimit : 2,enableSearch : false,	showCheckAll : false,showUncheckAll : false,closeOnSelect : true,closeOnDeselect : true,scrollable : true,smartButtonMaxItems : 1,
		smartButtonTextConverter : function(itemText, originalItem) {
		return itemText;
		},
		buttonClasses : 'btn btn-default custombtn',};*/
	
		scope.apiSearchSchemaScopeSettings 	= {enableSearch: false,scrollable: false,closeOnBlur:true, showCheckAll:false, showUncheckAll:false,smartButtonMaxItems:1,selectionLimit:2}; 
		scope.apiSearchSchemaScopeCustomTexts = {buttonDefaultText: 'SearchSchema'};
 
			 
	};
	

	this.resetRadioType = function(scope,rootScope) 
	{
		scope.type2 = "true";
	};
	
	
	this.loadComboBox= function(scope,rootScope,http,pagelocation)
	{
		this.emptyFilterData(scope,rootScope);
		this.addFilterSettings(scope,rootScope);
		this.emptyFilterModels(scope,rootScope);
		this.addFilterDataAndModel(scope,rootScope,http,pagelocation);
			
	 };
	    
	 
	 this.addFilterDataAndModel= function(scope,rootScope,http,ignore)
	 {
		var url = "/api360-service/dapi/apiSchema/filters.json";
		var loadFilters = http.get(url);
		http.dataType = "json";
		
		loadFilters.success(function(data) {
			
			var respData = data.aaData;
			var apiArray = respData['apiSchemaService'];
			var versionArray = respData['apiSchemaVersion'];
			var typeArray = respData['apiSchemaSearchType'];

			var apiData = [], versionData = [], typeData = [];
			
			for (var i = 0; i < apiArray.length; i++) {
				apiData.push(apiArray[i]);
			}
			for (var i = 0; i < versionArray.length; i++) {
				versionData.push(versionArray[i]);
			}
			for (var i = 0; i < typeArray.length; i++) {
				typeData.push(typeArray[i]);
			}
			//console.log(new Array(typeData[0]));
			
			
			scope.apiSchemaServiceNameData = apiData;
			scope.apiSchemaVersionData = versionData;
			scope.apiSearchSchemaScopeData = typeData;
			
			scope.apiSchemaServiceNameModel = new Array(apiData[0]);
			scope.apiSearchSchemaScopeModel = new Array(typeData[0]);
			scope.apiSchemaVersionModel =  new Array(versionData[0]);
			
			rootScope.$broadcast('dialogs.wait.complete');

		});
	 };
	
	    
	    
	this.reloadComboBoxApiSearchSchema= function(scope,rootScope,ignore)
	{
	    if("type2" !=ignore)	{
	    	scope.type2 = "true";
	    }
	};
	
	this.dashboardFilterReload=function(scope,rootScope,name,value)
	{
		
		
	   if("APIs"==name)
 		{
	 		
	 		if(scope.apiSchemaServiceNameModel.length==1 && scope.apiSchemaServiceNameModel[0].id=="All")
 			{
	 			scope.Service = "All";
	 		}
	 		else
 			{
	 			if(value=="All" && scope.apiSchemaServiceNameModel.length > 1)
 				{
	 				scope.Service = "All";	
	 				
	 				 var idProp = {idProp: 'id'};
		    		 idProp['id'] = "All";
		    		 
		    		 scope.apiSchemaServiceNameModel.splice(0,scope.apiSchemaServiceNameModel.length);
		    		 scope.apiSchemaServiceNameModel.push(idProp);
		    		 
		    		 
	 			}
	 			else if(scope.apiSchemaServiceNameModel.length > 1 && scope.apiSchemaServiceNameModel[0].id=="All")
	 			{
	 				scope.apiSchemaServiceNameModel.splice(0,1);
	 				scope.Service = scope.getCommaSeparatedString(scope.apiSchemaServiceNameModel);
	 			}
	 			else
 				{
	 				scope.Service = scope.getCommaSeparatedString(scope.apiSchemaServiceNameModel);
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