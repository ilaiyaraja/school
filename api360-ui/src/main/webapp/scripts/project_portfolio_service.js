'use strict';

app.service('projectPortfolioService', function()
{
	
	
	
    
	this.renderProjectPortfolioGrid = function(scope,rootScope)
	{
		
		
		
		rootScope.projectPortfoliotable = $('#projectportfolioGridID').dataTable({
		    "sDom": 'T<"clear">lfrtip',
			"serverSide": false,
			"processing": false,
	        "sAjaxSource": "",		
	        "columns": [
	                    { "data": "pid" },
	                    { "data": "release" },
	                    { "data": "bundle" },
					    { "data": "bundleVersion" },
					    { "data": "application" },
					    { "data": "adapterBundle" },
						{ "data": "backends"} ,
						{ "data": "program"}     
					    
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
	     "scrollX": "100%",	   
	     'sScrollXInner': '100%',
	      "oTableTools": {
	    	  "sSwfPath": "swf/copy_csv_xls_pdf.swf",
	    	    "aButtons": [ {
			                    "sExtends": "xls",
			                    "sToolTip": "Save as XLS",
			                    "sFileName": "projectportfolioReport.csv",
			                    "oSelectorOpts": { filter: 'applied', order: 'current' }
			                   
			                    
			                   } , {
				                    "sExtends": "csv",
				                    "sToolTip": "Save as csv",
				                    "sFileName": "projectportfolioReport.csv",
				                    "oSelectorOpts": { filter: 'applied', order: 'current' } 
				                   } ,
			                   {
				                    "sExtends": "pdf",
				                    "sButtonText":"Pdf",
				                    "sPdfOrientation": "landscape",
				                    "sFileName": "projectportfolioReport.pdf",
				                    "sToolTip": "download as pdf",
				                    "oSelectorOpts": { filter: 'applied', order: 'current' },
				                    "sTitle": "Project Portfolio Report"
				               }]                 
	        }
	    });
	};
	

    
});









