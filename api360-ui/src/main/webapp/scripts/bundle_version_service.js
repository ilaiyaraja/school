'use strict';

app.service('bundleVersionService', function()
{
	
	
	this.renderBundleVersionGrid = function(scope,rootScope)
	{
		
		rootScope.bundleVersiontable = $('#installedBundleVersionGrid').dataTable({
			"sDom": 'T<"clear">lfrtip',
			"serverSide": false,
			"processing": false,
			"responsive":true,
	        "sAjaxSource": "",		
	        "columns": [
	                     { "data": "environment" },
					     { "data": "bundle" },					     
					     { "data": "deployed_version" }
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
	     //"sDom": '<"H"lfrp>t<"F"ip>',
	     "sPaginationType": "full_numbers",
	     "order": [[ 1, "asc" ],[ 2, "asc" ]],
	     "scrollY": $( window ).height() - 340,
	     "scrollX": "100%",	   
	     'sScrollXInner': '100%',
	     "oTableTools": {
	    	  "sSwfPath": "swf/copy_csv_xls_pdf.swf",
	    	    "aButtons": [{
			                    "sExtends": "xls",
			                    "sToolTip": "Save as xls",
			                    "sFileName": "installedBunVersionReport.xls",
			                    "oSelectorOpts": { filter: 'applied', order: 'current' } 
			                   },
			                   {
				                    "sExtends": "csv",
				                    "sToolTip": "Save as csv",
				                    "sFileName": "installedBunVersionReport.csv",
				                    "oSelectorOpts": { filter: 'applied', order: 'current' } 
				                   }, 
			                   {
				                    "sExtends": "pdf",
				                    "sButtonText":"Pdf",
				                    "sPdfOrientation": "landscape",
				                    "sFileName": "installedBunVersionReport.pdf",
				                    "sToolTip": "download as pdf",
				                    "oSelectorOpts": { filter: 'applied', order: 'current' },
				                    "sTitle": "Installed  Bundle Version Report"
				               }
	    	                  ]                 
	        }
	    });
	};
	
	
	
});