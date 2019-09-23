'use strict';

function ApiSearchCtrl($scope, $rootScope, $resource, $http, $location,
		$timeout, $interval, $modal, apiSearchService) 
{
	$scope.$scope = $scope;
	$rootScope.apiSearchGridHeaderMessages="API General Search";
	$rootScope.apiSearchServiceGridHeaderMessages="Search Service In Bundle";
	$rootScope.apiSearchAdapterGridHeaderMessages="Search Adapter In Bundle";
	
	$scope.majorVersionmodel = [];
	$scope.majorVersiondata = [];
	
	$scope.minorVersionmodel = [];
	$scope.minorVersiondata = [];
	
	
	$scope.majorVersionsettings = {
		scrollable : true,
		selectionLimit : 1,
		dynamicTitle : true,
		enableSearch : true,
		showCheckAll : false,
		smartButtonMaxItems : 1
	};
	
	$scope.majorVersionxustomTexts = {
		buttonDefaultText : 'MajorVersion'
	};
	
	$scope.minorVersionsettings = {
			scrollable : true,
			selectionLimit : 1,
			dynamicTitle : true,
			enableSearch : true,
			showCheckAll : false,
			smartButtonMaxItems : 1
	};
	
	$scope.minorVersioncustomTexts = {
		buttonDefaultText : 'MinorVersion'
	};
	
	
	$http.get("/atw-service/sig/major/versions.json")
	.success(function(data)
	{
		$scope.majorVersiondata =  data.majorVersions;
	});
	
	$http.get("/atw-service/sig/minor/versions.json")
	.success(function(data)
	{
		$scope.minorVersiondata =  data.minorVersions;
	});
	
	
	$scope.majorVersionEvents = 
	{
		onInitDone: function() 
		{
			
		},
		onItemDeselect : function(item) 
		{

		},
		onItemSelect : function(item) 
		{
			
		}
	};
	
	
	$scope.minorVersionEvents = 
	{
		onItemDeselect : function(item) 
		{

		},
		onItemSelect : function(item) 
		{
			
		}
	};
	
	
	$scope.general_search_text=null;
	
	$scope.onGeneralSearchTextEnter = function() 
	{
		$scope.general_search_text.trim();
		
		if($scope.general_search_text!=null && $scope.general_search_text!=undefined && $scope.general_search_text!="")
		{
			$scope.major = null;
			$scope.minor = null;
			
			if($scope.majorVersionmodel==null || $scope.majorVersionmodel.id ==undefined || $scope.majorVersionmodel.id==null)
			{
				$scope.major = $scope.majorVersiondata[0].id;
			}
			else
			{
				$scope.major = $scope.majorVersionmodel.id;
			}
			
			if($scope.minorVersionmodel==null || $scope.minorVersionmodel.id ==undefined || $scope.minorVersionmodel.id==null)
			{
				$scope.minor = "0";
			}
			else
			{
				$scope.minor = $scope.minorVersionmodel.id;
			}
			
			
			$rootScope.apiSearchGridHeaderMessages = "API General Search- SearchText: "+$scope.general_search_text+" MajorVersion: "+$scope.major+" MinorVersion: "+$scope.minor;
			
			$rootScope.launch('wait');		
			$rootScope.apiSearchGrid.api().ajax.url("/atw-service/search/api360/general.json?text="+$scope.general_search_text+"&majorVersion="+$scope.major+"&minorVersion="+$scope.minor).load($scope.searchGridCallback);
		}		
	};
	
	$scope.searchGridCallback = function ()
	{
		$('#apisearchgrid tbody tr td').each( function() 
	    {
		    this.setAttribute( 'title', $(this).text());
		});
		
		$rootScope.$broadcast('dialogs.wait.complete');
	};
	
	
	$scope.renderAPIServiceGrid = function ()
	{
		$rootScope.apiSearchGrid = $('#apisearchgrid').dataTable({
		"sDom": 'T<"clear">lfrtip',
		"serverSide": false,
		"processing": false,
        "sAjaxSource": '',
        "fnInitComplete": function(oSettings, json) 
        {
        	
        },
        "columns": [
                    { "data": "container","sWidth":"20%"},
                    { "data": "containerVersion" ,"sWidth":"20%"},	                    
                    { "data": "service" ,"sWidth":"5%"},
                    { "data": "subService" ,"sWidth":"10%"},
				     { "data": "adapter","sWidth":"5%" },
				     { "data": "adapterMethod" ,"sWidth":"5%"},
				     { "data": "adapterBundle" ,"sWidth":"5%"},
					{ "data": "adapterBundleVersion","sWidth":"10%"}
                ],
    "bAutoWidth": true,
    "bScrollCollapse": false,
    "bJQueryUI": true,
    "search": {"caseInsensitive": true},
    "sServerMethod": "GET",	     
     "iDisplayLength": 10,
     "bPaginate" : true,
     "bInfo":true,
     "lengthMenu": [10, 25, 50, 100],
     "sPaginationType": "full_numbers",
     "scrollY": $( window ).height() - 400,
     "scrollX": '100%',
     'sScrollXInner': '100%',
     "oTableTools": {
    	  "sSwfPath": "swf/copy_csv_xls_pdf.swf",
    	    "aButtons": [{
		                    "sExtends": "xls",
		                    "sToolTip": "Save as XLS",
		                    "sFileName": "apiSearchReport.xls",
		                    "oSelectorOpts": { filter: 'applied', order: 'current' } 
		                   } ,
		                   {
			                    "sExtends": "csv",
			                    "sToolTip": "Save as csv",
			                    "sFileName": "apiSearchReport.csv",
			                    "oSelectorOpts": { filter: 'applied', order: 'current' } 
			                   } ,
		                   {
			                    "sExtends": "pdf",
			                    "sButtonText":"Pdf",
			                    "sPdfOrientation": "landscape",
			                    "sFileName": "apiSearchReport.pdf",
			                    "sToolTip": "download as pdf",
			                    "oSelectorOpts": { filter: 'applied', order: 'current' },
			                    "sTitle": "API Portfolio Report"
			               }
    	                  ]                 
        	}
		});
	
	};
	
	
	////////////////////////////////////////////////////////
	 
	$rootScope.redrawDatatable = function() 
	{
		$timeout(function() {
	    	$( $.fn.dataTable.tables( true ) ).DataTable().columns.adjust().draw();		        
	    }, 1000);		
	};
	
	
	$scope.onSearchServiceTextEnter = function() 
	{
		$scope.general_search_text.trim();
		
		if($scope.general_search_text!=null && $scope.general_search_text!=undefined && $scope.general_search_text!="")
		{
			$scope.major = null;
			$scope.minor = null;
			
			if($scope.majorVersionmodel==null || $scope.majorVersionmodel.id ==undefined || $scope.majorVersionmodel.id==null)
			{
				$scope.major = $scope.majorVersiondata[0].id;
			}
			else
			{
				$scope.major = $scope.majorVersionmodel.id;
			}
			
			if($scope.minorVersionmodel==null || $scope.minorVersionmodel.id ==undefined || $scope.minorVersionmodel.id==null)
			{
				$scope.minor = "0";
			}
			else
			{
				$scope.minor = $scope.minorVersionmodel.id;
			}
			
			
			$rootScope.apiSearchServiceGridHeaderMessages = "Search Service In Bundle- SearchText: "+$scope.general_search_text+" MajorVersion: "+$scope.major+" MinorVersion: "+$scope.minor;
			
			$rootScope.launch('wait');	
			$rootScope.searchServiceGrid.api().ajax.url("/atw-service/search/api360/general/unique/service.json?text="+$scope.general_search_text+"&majorVersion="+$scope.major+"&minorVersion="+$scope.minor).load($scope.searchServiceGridCallback);
		}		
	};
	
	$scope.searchServiceGridCallback = function ()
	{
		$('#searchservicegrid tbody tr td').each( function() 
	    {
		    this.setAttribute( 'title', $(this).text());
		});
		
		$rootScope.$broadcast('dialogs.wait.complete');
	};
	
	
	$scope.renderSearchServiceGrid = function ()
	{
		$rootScope.searchServiceGrid = $('#searchservicegrid').dataTable({			
				"sDom": 'T<"clear">lfrtip',
	    			"serverSide": false,
	    			"processing": false,
	    			"bResponsive":true,
	    	        "sAjaxSource": '',
	    	        "fnInitComplete": function(oSettings, json) 
	    	        {
	    	        	
	    	        },
	    	        "columns": [{ "data": "container"},
	    	                    { "data": "containerVersion"},	                    
	    	                    { "data": "service"}	
	    	                ],
	    	    "bAutoWidth": true,
	    	    "bScrollCollapse": true,
	    	    "bJQueryUI": true,
	    	    "search": {"caseInsensitive": true},
	    	    "sServerMethod": "GET",	     
	    	     "iDisplayLength": 10,
	    	     "bPaginate" : true,
	    	     "bInfo":true,
	    	     "lengthMenu": [10, 25, 50, 100],
	    	     "sPaginationType": "full_numbers",
	    	     "scrollY": $( window ).height() - 400,
	    	     "scrollX": '100%',	 
	    	     'sScrollXInner': '100%',
	    	     "scrollCollapse": true,
	    	     "oTableTools": {
	    	    	  "sSwfPath": "swf/copy_csv_xls_pdf.swf",
	    	    	    "aButtons": [{
	    			                    "sExtends": "xls",
	    			                    "sToolTip": "Save as XLS",
	    			                    "sFileName": "apiSearchReport.xls",
	    			                    "oSelectorOpts": { filter: 'applied', order: 'current' } 
	    			                   } ,
	    			                   {
	    				                    "sExtends": "csv",
	    				                    "sToolTip": "Save as csv",
	    				                    "sFileName": "apiSearchReport.csv",
	    				                    "oSelectorOpts": { filter: 'applied', order: 'current' } 
	    				                   } ,
	    			                   {
	    				                    "sExtends": "pdf",
	    				                    "sButtonText":"Pdf",
	    				                    "sPdfOrientation": "landscape",
	    				                    "sFileName": "apiSearchReport.pdf",
	    				                    "sToolTip": "download as pdf",
	    				                    "oSelectorOpts": { filter: 'applied', order: 'current' },
	    				                    "sTitle": "API Portfolio Report"
	    				               }
	    	    	                  ]                 
	    	        	}
	    			});
		
	};
	
	
	
	///////////////////////////////////////
	
	
	
	
	$scope.onSearchAdapterTextEnter = function() 
	{
		$scope.general_search_text.trim();
		
		if($scope.general_search_text!=null && $scope.general_search_text!=undefined && $scope.general_search_text!="")
		{
			$scope.major = null;
			$scope.minor = null;
			
			if($scope.majorVersionmodel==null || $scope.majorVersionmodel.id ==undefined || $scope.majorVersionmodel.id==null)
			{
				$scope.major = $scope.majorVersiondata[0].id;
			}
			else
			{
				$scope.major = $scope.majorVersionmodel.id;
			}
			
			if($scope.minorVersionmodel==null || $scope.minorVersionmodel.id ==undefined || $scope.minorVersionmodel.id==null)
			{
				$scope.minor = "0";
			}
			else
			{
				$scope.minor = $scope.minorVersionmodel.id;
			}
			
			$rootScope.apiSearchAdapterGridHeaderMessages = "Search Adapter In Bundle- SearchText: "+$scope.general_search_text+" MajorVersion: "+$scope.major+" MinorVersion: "+$scope.minor;
			
			$rootScope.launch('wait');	
			
			$rootScope.searchAdapterGrid.api().ajax.url("/atw-service/search/api360/general/unique/adapter.json?text="+$scope.general_search_text+"&majorVersion="+$scope.major+"&minorVersion="+$scope.minor).load($scope.searchAdapterGridCallback);
		}		
	};
	
	$scope.searchAdapterGridCallback = function ()
	{
		$('#searchadaptergrid tbody tr td').each( function() 
	    {
		    this.setAttribute( 'title', $(this).text());
		});
		
		$rootScope.$broadcast('dialogs.wait.complete');
	};
	
	
	$scope.renderSearchAdapterGrid = function ()
	{
		$rootScope.searchAdapterGrid = $('#searchadaptergrid').dataTable({
			"sDom": 'T<"clear">lfrtip',
			"serverSide": false,
			"processing": false,
			"bResponsive":true,
	        "sAjaxSource": '',
	        "fnInitComplete": function(oSettings, json) 
	        {
	        	
	        },
	        "columns": [{ "data": "container"},
	                    { "data": "containerVersion"},	                    
	                    { "data": "service"}	
	                ],
	    "bAutoWidth": true,
	    "bScrollCollapse": true,
	    "bJQueryUI": true,
	    "search": {"caseInsensitive": true},
	    "sServerMethod": "GET",	     
	     "iDisplayLength": 10,
	     "bPaginate" : true,
	     "bInfo":true,
	     "lengthMenu": [10, 25, 50, 100],
	     "sPaginationType": "full_numbers",
	     "scrollY": $( window ).height() - 400,
	     "scrollX": '100%',	
	     'sScrollXInner': '100%',
	     "scrollCollapse": true,
	     "oTableTools": {
	    	  "sSwfPath": "swf/copy_csv_xls_pdf.swf",
	    	    "aButtons": [{
			                    "sExtends": "xls",
			                    "sToolTip": "Save as XLS",
			                    "sFileName": "apiSearchReport.xls",
			                    "oSelectorOpts": { filter: 'applied', order: 'current' } 
			                   } ,
			                   {
				                    "sExtends": "csv",
				                    "sToolTip": "Save as csv",
				                    "sFileName": "apiSearchReport.csv",
				                    "oSelectorOpts": { filter: 'applied', order: 'current' } 
				                   } ,
			                   {
				                    "sExtends": "pdf",
				                    "sButtonText":"Pdf",
				                    "sPdfOrientation": "landscape",
				                    "sFileName": "apiSearchReport.pdf",
				                    "sToolTip": "download as pdf",
				                    "oSelectorOpts": { filter: 'applied', order: 'current' },
				                    "sTitle": "API Portfolio Report"
				               }
	    	                  ]                 
	        	}
			});
		
	};
	
	

};