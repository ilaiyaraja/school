'use strict';

app.service('ApiProdHitService', function()
{
	
	/*this.renderAPISchemaSearchGrid = function(scope,rootScope,http)
	{
		
	};*/
	
	this.renderApiProdHitGrid = function(scope,rootScope,http)
	{
		
	rootScope.apiprodhittable = $('#apiProdHitGrid').dataTable({
	    "sDom": 'T<"clear">lfrtip',
		"serverSide": false,
		"processing": false,
		"responsive":true,
        "sAjaxSource": "",		
        "columns": [
                    { "data": "api" },
                    { "data": "profile" },
                    { "data": "hits" },
                    { "data": "bundle" },
                    { "data": "interval" },
				    { "data": "datacenter" },
				    { "data": "transactions" },
				    { "data": "failures" },
				    { "data": "avgtps" },
                ],
    "bAutoWidth": false,
    "bScrollCollapse": false,
    "bJQueryUI": true,
    "search": {"caseInsensitive": true},
    "sServerMethod": "GET",	     
     "iDisplayLength": 10,
     "bPaginate" : true,
     "bInfo":true,
     "lengthMenu": [10, 25, 50, 100],
     "sPaginationType": "full_numbers",
     "scrollY": $( window ).height() - 340,
     "scrollX": "100%",	   
     'sScrollXInner': '100%',
      "oTableTools": {
    	  "sSwfPath": "swf/copy_csv_xls_pdf.swf",
    	    "aButtons": [ 
    	                  {
		                    "sExtends": "xls",
		                    "sToolTip": "Save as XLS",
		                    "sFileName": "ApiProdHitReport.xls",
		                    "oSelectorOpts": { filter: 'applied', order: 'current' }
		                   
		                    
		                   } , {
			                    "sExtends": "csv",
			                    "sToolTip": "Save as csv",
			                    "sFileName": "ApiProdHitReport.csv",
			                    "oSelectorOpts": { filter: 'applied', order: 'current' }
			                   
			                    
			                   } ,
		                   {
			                    "sExtends": "pdf",
			                    "sButtonText":"Pdf",
			                    "sPdfOrientation": "landscape",
			                    "sFileName": "ApiProdHitReport.pdf",
			                    "sToolTip": "download as pdf",
			                    "oSelectorOpts": { filter: 'applied', order: 'current' },
			                   
			                    "sTitle": "API Resource Finder Report"
			               }
    	                  ]                 
        }
    });
		
		/*$('#apiSchemaSearchGridID').on( 'draw.dt', function () 
		{
			if($rootScope.quickSearchTermGlobal!=undefined)
			{
				var body = $( $scope.apiSchemaSearchGridid.api().table().body() );
		        body.unhighlight();	        
		        body.highlight($rootScope.quickSearchTermGlobal);  
			}
	    });*/
		

		
		
	};
	
	
});