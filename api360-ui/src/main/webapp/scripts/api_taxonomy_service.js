'use strict';
/*CREATED DATE :2/12/2015
  CREATEDBY :Abhimanyu

*/
app.service('apitaxonomyService', function()
{
	
	
	
	this.renderAPITaxonomyGrid = function(scope,rootScope)
	{
		
		if (rootScope.apiTaxonomytable != null || rootScope.apiTaxonomytable!=undefined  ) {
			  
			rootScope.apiTaxonomytable.destroy();
			$('#apitaxonomygrid').empty(); 
			
			
			
			rootScope.apiTaxonomytable = $('#apitaxonomygrid').DataTable({
			    "sDom": 'T<"clear">lfrtip',
			 	"serverSide": false,
				"processing": false,
				"responsive":true,
				"aaData":rootScope.globleData,
			    "aoColumns": rootScope.aryJSONColTable,
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
			     "bDestroy": true,	
			      "oTableTools": {
			    	  "sSwfPath": "swf/copy_csv_xls_pdf.swf",
			    	    "aButtons": [ /*{
						                    "sExtends": "copy",				                    
						                    "oSelectorOpts": { filter: 'applied', order: 'current' }
						               },*/
			    	                  
			    	                 
			    	                  {
					                    "sExtends": "xls",
					                    "sToolTip": "Save as XLS",
					                    "sFileName": "apitaxonomyReport.csv",
					                    "oSelectorOpts": { filter: 'applied', order: 'current' }
					                   
					                    
					                   } , {
						                    "sExtends": "csv",
						                    "sToolTip": "Save as csv",
						                    "sFileName": "apitaxonomyReport.csv",
						                    "oSelectorOpts": { filter: 'applied', order: 'current' }
						                   
						                    
						                   } ,
					                   {
						                    "sExtends": "pdf",
						                    "sButtonText":"Pdf",
						                    "sPdfOrientation": "landscape",
						                    "sFileName": "apitaxonomyReport.pdf",
						                    "sToolTip": "download as pdf",
						                    "oSelectorOpts": { filter: 'applied', order: 'current' },
						                   
						                    //"oSelectorOpts": {  filter: 'applied', order: 'current',page: "current" },
						                    "sTitle": "API Taxonomy Report"
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
			
	    }
	    else {              
	    	rootScope.apiTaxonomytable = $('#apitaxonomygrid').DataTable({
	    		 "sDom": 'T<"clear">lfrtip',
				 	"serverSide": false,
					"processing": false,
					"responsive":true,
					"aaData":rootScope.globleData,
				    "aoColumns": rootScope.aryJSONColTable,
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
				     "bDestroy": true,	
			      "oTableTools": {
			    	  "sSwfPath": "swf/copy_csv_xls_pdf.swf",
			    	    "aButtons": [ /*{
						                    "sExtends": "copy",				                    
						                    "oSelectorOpts": { filter: 'applied', order: 'current' }
						               },*/
			    	                  
			    	                 
			    	                  {
					                    "sExtends": "xls",
					                    "sToolTip": "Save as XLS",
					                    "sFileName": "apitaxonomyReport.csv",
					                    "oSelectorOpts": { filter: 'applied', order: 'current' }
					                   
					                    
					                   } , {
						                    "sExtends": "csv",
						                    "sToolTip": "Save as csv",
						                    "sFileName": "apitaxonomyReport.csv",
						                    "oSelectorOpts": { filter: 'applied', order: 'current' }
						                   
						                    
						                   } ,
					                   {
						                    "sExtends": "pdf",
						                    "sButtonText":"Pdf",
						                    "sPdfOrientation": "landscape",
						                    "sFileName": "apitaxonomyReport.pdf",
						                    "sToolTip": "download as pdf",
						                    "oSelectorOpts": { filter: 'applied', order: 'current' },
						                   
						                    //"oSelectorOpts": {  filter: 'applied', order: 'current',page: "current" },
						                    "sTitle": "API Taxonomy Report"
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
	    }
		
		
		
		
	};
	
	
	this.expandGridCallback =function(scope,rootScope){
	
	$('#apitaxonomygrid tbody').on('click', 'td.details-control', function () { 
        var tr = $(this).parent('tr'); 
      

        //keep the css in attr to re-apply it when row is collapsed 
        $(this).attr( 'border-bottom-old', $(this).css( 'border-bottom')); 
        $(this).siblings().attr( 'border-bottom-old', $(this).css( 'border-bottom')); 

        //remove border from parent row 
        $(this).css( 'border-bottom', 'none' ); 
        $(this).siblings().css( 'border-bottom', 'none' ); 

        var row =rootScope.apiTaxonomytable.row( tr ); 
       
        //console.log($(this).child.);
       // console.log($(this).children('td').);
       
        $(this).find('span:first').toggleClass( 'glyphicon-chevron-down',1000 );
       
        
        if ( row.child.isShown() ) { 
            // This row is already open - close it 
            row.child.hide(); 
            tr.removeClass('shown'); 
           
           // $(this).find('span:first').addClass( 'glyphicon glyphicon-chevron-down' );
            $(this).css( 'border-bottom', $(this).attr( 'border-bottom-old')); 
	        $(this).siblings().css( 'border-bottom', $(this).attr( 'border-bottom-old')); 
        } 
        else { 

        	
        		row.child(rootScope.formatExtraInfo(row.data())).show(); 
	            tr.addClass('shown');
	           // $(this).find('span:first').removeClass( 'glyphicon glyphicon-chevron-right' );
	           
	            
	           
        	

        } 
    } );
	
}
	
	
	
	
	
});

