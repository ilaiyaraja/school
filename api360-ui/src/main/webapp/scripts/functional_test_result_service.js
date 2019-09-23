'use strict';

app.service('functionalTestResultService', function()
{
	
	
	
	
	
	this.renderFunctionalTestResultGrid = function(scope,rootScope,http)
	{
		
		/*
		 * this.api = api;
		this.backend = backend;
		this.bundle = bundle;
		this.pmt = pmt;
		this.release = release;
		this.totaltestcase = totaltestcase;
		this.passedtestcase = passedtestcase;
		this.failedtestcase = failedtestcase;
		this.passpercent = passpercent;
		this.funtestid = funtestid;
		 * 
		 */
		
		rootScope.funtestresultTable = $('#funtestresultID').DataTable({
		    "sDom": 'T<"clear">lfrtip',
			"serverSide": false,
			"processing": false,
			"responsive":true,
	        "sAjaxSource": false,	
	        "columns": [
	                    { "data": "api" }, 
	                    { "data": "backend" },
	                    { "data": "bundle" },
					    { "data": "pmt" },
					    { "data": "pid" },
					    { "data": "release" },
					    { "data": "totaltestcase" },
					    { "data": "passedtestcase" },
					    { "data": "failedtestcase" },
					    { "data": "passpercent" },
					    {
						    "className":      'details-control',
						    "orderable":      false,
						    "data":           null,
						    "defaultContent": '<span title="Click to expand" class="glyphicon glyphicon-chevron-right"></span>'
						},
					    
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
		
		
		
		$('#funtestresultID tbody').on('click', 'td.details-control', function () { 
	        var tr = $(this).parent('tr'); 

	        //keep the css in attr to re-apply it when row is collapsed 
	        $(this).attr( 'border-bottom-old', $(this).css( 'border-bottom')); 
	        $(this).siblings().attr( 'border-bottom-old', $(this).css( 'border-bottom')); 

	        //remove border from parent row 
	        $(this).css( 'border-bottom', 'none' ); 
	        $(this).siblings().css( 'border-bottom', 'none' ); 

	        var row = rootScope.funtestresultTable.row( tr ); 
	        
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
		         
                   console.log(row.data().funtestid);
	        		var loadFilters = http.get("/api360-service/functional-test/notes/reports.json?funid="+row.data().funtestid); 
	        		http.dataType="json"; 
	        		loadFilters.then(function(payload) {
	        		    row.child( rootScope.formatExtraInfo(payload,row.data().funtestid)).show(); 
	    	            tr.addClass('shown'); 
	        		}); 

	       
	        } 
	    } );
		
		
		
		
		
		
		$('#funtestresultID_wrapper').on('click','.myClass1',function(){
			var funid = $(this).data("funid");
			var text = $("#notesId"+funid).val();
			var attuid=rootScope.attuid.split(',')[0];
			
            if(text==""){
				
            	$("#message"+funid).fadeIn('fast');
	    		$("#message"+funid).addClass('alert-danger');
	    		$("#message"+funid).html("Notes can not be empty!!!");
	    		$("#message"+funid).delay(4000).fadeTo("slow", 0.0);
	    		setTimeout(function() {
	    		$("#message"+funid).fadeOut('fast');
	    		}, 2000);
	    		
	    		return ;
				
			}
			
			
			if(text.length > 200){
				
				$("#message"+funid).fadeIn('fast');
	    		$("#message"+funid).addClass('alert-danger');
	    		$("#message"+funid).html("Notes cannot exceed more than 200 characters!!!");
	    		$("#message"+funid).delay(4000).fadeTo("slow", 0.0);
	    		setTimeout(function() {
	    		$("#message"+funid).fadeOut('fast');
	    		}, 2000);
				
	    		return ;
			}
			
			
			
			
			
			var url ='/api360-service/functional-test/notes/save/reports.json?';
			
			var params= 'fun_id=' +funid+
						'&notes=' +text+
						'&attuid=' +attuid ;
						
				
				
					 
			
			var addNotes = http.post(url+params);
			
			
			addNotes.then(function(payload) 
	                {
	        	
	        	$("#message"+funid).fadeIn('fast');
	    		$("#message"+funid).addClass('alert-success');
	    		$("#message"+funid).html(payload.data.result);
	    		$("#message"+funid).delay(4000).fadeTo("slow", 0.0);
	    		
	    		setTimeout(function() {
	    		$("#message"+funid).fadeOut('fast');
	    		}, 2000);
	    		
	        	     //setTimeout(function() {
	        	    	 scope.refreshGrid();
	        	 		//}, 3000);
	        	    
	 	        	
	 	            
	        	    });
			
			
			
			
			
		    
			  
	   		  
	   		 
			
			
			
			
			
			
		});
		
		
		
		$('#funtestresultID_wrapper').on('click','.myClass2',function(){
			scope.funid = $(this).data("funid");
			rootScope.showSummaryDialog();
			
			
		});
		
		
		
	};
	
	
		
	
	
		
		
		
		
		
		

	

});