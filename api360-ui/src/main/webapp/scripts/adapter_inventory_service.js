'use strict';

app.service('adapterInventoryService', function()
{
	
	
	
    
	this.renderAdapterInventoryGrid = function(scope,rootScope)
	{
		
		
		
		rootScope.adapterInventorytable = $('#adapterInventoryGridID').dataTable({
		    "sDom": 'T<"clear">lfrtip',
			"serverSide": false,
			"processing": false,
	        "sAjaxSource": "",		
	        "columns": [
	                    { "data": "backend" },
	                    { "data": "backend_bundle" },
	                    { "data": "backend_method" },
	                    { "data": "application" },
					    { "data": "backend_bundle_version" }  
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
	     "scrollY": $( window ).height() - 400,
	     "scrollX": "100%",	   
	     'sScrollXInner': '100%',
	      "oTableTools": {
	    	  "sSwfPath": "swf/copy_csv_xls_pdf.swf",
	    	    "aButtons": [ /*{
				                    "sExtends": "copy",				                    
				                    "oSelectorOpts": { filter: 'applied', order: 'current' }
				               },*/
	    	                  
	    	                 
	    	                  {
			                    "sExtends": "xls",
			                    "sToolTip": "Save as XLS",
			                    "sFileName": "backendInventoryReport.csv",
			                    "oSelectorOpts": { filter: 'applied', order: 'current' }
			                   
			                    
			                   } , {
				                    "sExtends": "csv",
				                    "sToolTip": "Save as csv",
				                    "sFileName": "backendInventoryReport.csv",
				                    "oSelectorOpts": { filter: 'applied', order: 'current' }
				                   
				                    
				                   } ,
			                   {
				                    "sExtends": "pdf",
				                    "sButtonText":"Pdf",
				                    "sPdfOrientation": "landscape",
				                    "sFileName": "backendInventoryReport.pdf",
				                    "sToolTip": "download as pdf",
				                    "oSelectorOpts": { filter: 'applied', order: 'current' },
				                   
				                    //"oSelectorOpts": {  filter: 'applied', order: 'current',page: "current" },
				                    "sTitle": "Project Portfolio Report"
				               }
	    	                   /*{
				    	    	"sExtends": "print",
				    	    	"sButtonText":"Print",
			                    "bShowAll": false,
			                    "sInfo": "Please press escape to exit!!!",
			                    "oSelectorOpts": { filter: 'applied', order: 'current' }
			                     
			                    }*/
			                    
				               
				               
				               
				                   
			                   
	    	                  
	    	                  ]                 
	        }
	    });
		
		
	};
	
	
	
	
	
	
	
	
	
	

    
});









