'use strict';

app.service('defectReportService', function()
{
	
	
	
    
	this.renderDefectReportGrid = function(scope,rootScope,http)
	{
		
		
		
		rootScope.defectreporttable = $('#defectGridID').DataTable({
		    "sDom": 'T<"clear">lfrtip',
			"serverSide": false,
			"processing": false,
			"responsive":true,
	        "sAjaxSource": "",		
	        "columns": [
						{
						    "className":      'details-control',
						    "orderable":      false,
						    "data":           null,
						    "defaultContent": '<span title="Click to expand" class="glyphicon glyphicon-chevron-right"></span>'
						},
	                    { "data": "defect_id" },
	                    { "data": "defect_status" },
	                    { "data": "assigend_to_app" },
					    { "data": "assigend_to_team" },
					    { "data": "pmt" },
					    { "data": "pid" },
					    { "data": "detectiondate" },
					    { "data": "severity"}
					    	
					   
					    
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
	    	    "aButtons": [ /*{
				                    "sExtends": "copy",				                    
				                    "oSelectorOpts": { filter: 'applied', order: 'current' }
				               },*/
	    	                  
	    	                 
	    	                  {
			                    "sExtends": "xls",
			                    "sToolTip": "Save as XLS",
			                    "sFileName": "defectReport.csv",
			                    "oSelectorOpts": { filter: 'applied', order: 'current' }
			                   
			                    
			                   } , {
				                    "sExtends": "csv",
				                    "sToolTip": "Save as csv",
				                    "sFileName": "defectReport.csv",
				                    "oSelectorOpts": { filter: 'applied', order: 'current' }
				                   
				                    
				                   } ,
			                   {
				                    "sExtends": "pdf",
				                    "sButtonText":"Pdf",
				                    "sPdfOrientation": "landscape",
				                    "sFileName": "defectReport.pdf",
				                    "sToolTip": "download as pdf",
				                    "oSelectorOpts": { filter: 'applied', order: 'current' },
				                   
				                    //"oSelectorOpts": {  filter: 'applied', order: 'current',page: "current" },
				                    "sTitle": "Defect Report"
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
		
		
		
		$('#defectGridID tbody').on('click', 'td.details-control', function () { 
	        var tr = $(this).parent('tr'); 

	        //keep the css in attr to re-apply it when row is collapsed 
	        $(this).attr( 'border-bottom-old', $(this).css( 'border-bottom')); 
	        $(this).siblings().attr( 'border-bottom-old', $(this).css( 'border-bottom')); 

	        //remove border from parent row 
	        $(this).css( 'border-bottom', 'none' ); 
	        $(this).siblings().css( 'border-bottom', 'none' ); 

	        var row = rootScope.defectreporttable.row( tr ); 
	        
	        $(this).find('span:first').toggleClass( 'glyphicon-chevron-down',1000 )
	        
	       
	       
	        
	        if ( row.child.isShown() ) { 
	            // This row is already open - close it 
	            row.child.hide(); 
	            tr.removeClass('shown'); 
	            $(this).find('span:first').attr('title', 'Click to expand');
	            $(this).css( 'border-bottom', $(this).attr( 'border-bottom-old')); 
		        $(this).siblings().css( 'border-bottom', $(this).attr( 'border-bottom-old')); 
		       
	        } 
	        else { 

	        	
	        	 $(this).find('span:first').attr('title', 'Click to collapse');
	        	$(this).css( 'border-bottom', $(this).attr( 'border-bottom-old')); 
		        $(this).siblings().css( 'border-bottom', $(this).attr( 'border-bottom-old')); 
		      
	        	//get config_details 
	        	if (row.data().config_details ==null){ 
	        		var loadFilters = http.get("/api360-service/qc-defect/report/descrption.json?seqid="+row.data().seq_id); 
	        		http.dataType="json"; 
	        		loadFilters.then(function(payload) { 
	        			row.data().config_details= payload.data.description   ;
	        			
	        			if(row.data().config_details == null){
	        				
	        				row.data().config_details="NA";
	        			}
	        			
	        			
	    	            row.child( rootScope.formatExtraInfo(row.data().config_details,row.data())).show(); 
	    	            tr.addClass('shown'); 
	        		}); 

	        	} else { 
	        		row.child( rootScope.formatExtraInfo(row.data().config_details,row.data())).show(); 
		            tr.addClass('shown'); 
	        	}

	        } 
	    } );
		
		
	};
	
	
	
	
	
	
	
	
	
	

    
});









