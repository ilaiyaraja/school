'use strict';

app.service('apiPortfolioService', function()
{
    
	this.renderAPIPortfolioGrid = function(scope,rootScope)
	{
		
		rootScope.apiportfoliogrid = $('#apiportfoliogrid').dataTable({
			"sDom": 'T<"clear">lfrtip',
			"serverSide": false,
			"processing": false,
			"bResponsive":true,
	        "sAjaxSource": "",
	        "fnInitComplete": function(oSettings, json) 
	        {
	            
	        },
	        "columns": [
	                    { "data": "application","sWidth":"20%"},
	                    { "data": "apitoapi" ,"sWidth":"20%"},	                    
	                    { "data": "subprocess" ,"sWidth":"5%"},
	                    { "data": "bundle" ,"sWidth":"10%"},
					     { "data": "node","sWidth":"5%" },
					     { "data": "backend" ,"sWidth":"5%"},
					     { "data": "federated" ,"sWidth":"5%"},
						{ "data": "program","sWidth":"10%"},
	                    { "data": "client","sWidth":"10%"},                    
					     { "data": "profile" ,"sWidth":"10%"},
					     { "data": "jmsprovider","sWidth":"10%"}
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
	     "scrollY": $( window ).height() - 340,
	     "scrollX": '100%',
	     'sScrollXInner': '100%',
	     "oTableTools": {
	    	  "sSwfPath": "swf/copy_csv_xls_pdf.swf",
	    	    "aButtons": [{
			                    "sExtends": "xls",
			                    "sToolTip": "Save as XLS",
			                    "sFileName": "apiportfolioReport.xls",
			                    "oSelectorOpts": { filter: 'applied', order: 'current' } 
			                   } ,
			                   {
				                    "sExtends": "csv",
				                    "sToolTip": "Save as csv",
				                    "sFileName": "apiportfolioReport.csv",
				                    "oSelectorOpts": { filter: 'applied', order: 'current' } 
				                   } ,
			                   {
				                    "sExtends": "pdf",
				                    "sButtonText":"Pdf",
				                    "sPdfOrientation": "landscape",
				                    "sFileName": "apiportfolioReport.pdf",
				                    "sToolTip": "download as pdf",
				                    "oSelectorOpts": { filter: 'applied', order: 'current' },
				                    "sTitle": "API Portfolio Report"
				               }
	    	                  ]                 
	        }
	    });
		
		//new $.fn.dataTable.FixedColumns( rootScope.apiportfoliogrid);
	};
	
	
});


