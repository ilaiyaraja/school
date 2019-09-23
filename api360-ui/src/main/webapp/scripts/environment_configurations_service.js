'use strict';

app.service('environmentConfigurationService', function()
{
	
	this.renderEnvironmentConfigurationGrid = function(scope,rootScope,http)
	{
		
		rootScope.formatExtraInfo = function(data){
			
			var html = '';
			for(var j=0;data!=null && j<data.length;j++){
				html +='<div style="padding:15px;">' +
					'<span style="padding:15px;"><strong>Release:</strong> '+data[j].release+'</span>' +
					'<span style="padding:15px;"><strong>Version:</strong> '+data[j].version+'</span>' +
					'<span style="padding:15px;"><strong>Environment:</strong> '+data[j].environment+'</span>' +
					'<span style="padding:15px;"><strong>VTier Hostname:</strong> '+data[j].vtierhostname+'</span>'+				
					'<div style="padding-top:15px;">';
					if (data[j].config==null){
						html +='<pre><code>Configuration is not available</code></pre>';
					} else {
						html +='<pre><code>'+data[j].config+'</code></pre>';
					}
					html +='</div>' +
				'</div>';				
			}
			if (html==''){
				html = '<div style="padding:15px;text-align:center;">' +
				'<span style="padding:15px;">Configuration not available</span>';
			}
			
			return html;
			 
		
		}
		
		
			rootScope.environmentConfigurationTable = $('#environmentConfigurationGridID').DataTable({
				

		    "sDom": 'T<"clear">lfrtip',
			"serverSide": false,
			"processing": false,
	        "sAjaxSource": "",
	        "searchHighlight": true,
	        "columns": [
				{
				    "className":      'details-control',
				    "orderable":      false,
				    "data":           null,
				    "defaultContent": '<span title="Click to expand" class="glyphicon glyphicon-chevron-right"></span>'
				},
		        { "data": "adapter" },
				{ "data": "adapterBundle" },
				{ "data": "serviceBundle" }									
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
		     "scrollY": ($(window).height() - 340),
        	 "scrollX": "100%",  
        	 'sScrollXInner': '100%',		     
	    	 "oTableTools": {
		    	  "sSwfPath": "swf/copy_csv_xls_pdf.swf",
		    	    "aButtons": [{
				                    "sExtends": "xls",
				                    "sToolTip": "Save as XLS",
				                    "sFileName": "EnvironmentConfigReport.xls",
				                    "oSelectorOpts": { filter: 'applied', order: 'current' } 
				                   } ,
				                   {
					                    "sExtends": "csv",
					                    "sToolTip": "Save as CSV",
					                    "sFileName": "EnvironmentConfigReport.csv",
					                    "oSelectorOpts": { filter: 'applied', order: 'current' } 
					                   } ,
				                   {
					                    "sExtends": "pdf",
					                    "sButtonText":"PDF",
					                    "sPdfOrientation": "landscape",
					                    "sFileName": "EnvironmentConfigReport.pdf",
					                    "sToolTip": "Save as PDF",
					                    "oSelectorOpts": { filter: 'applied', order: 'current' },
					                    "sTitle": "Environment Configuration Report"
					               },
					               {
					                    "sExtends": "text",
					                    "sButtonText":"Extract Configuration",
					                   /* "data-toggle":"modal",
					                    "data-target":"#exampleModal",*/
					                    "fnClick": function ( nButton, oConfig, oFlash ) {
					                    	rootScope.extractConfig();
					                    }
					                }
		    	                  ]                 
		        }
		    });
		
			
		// Add event listener for opening and closing details
		$('#environmentConfigurationGridID tbody').on('click', 'td.details-control', function () {
	        var tr = $(this).parent('tr');

	        //keep the css in attr to re-apply it when row is collapsed 
	        $(this).attr( 'border-bottom-old', $(this).css( 'border-bottom'));
	        $(this).siblings().attr( 'border-bottom-old', $(this).css( 'border-bottom'));
	        
	        //remove border from parent row
	        $(this).css( 'border-bottom', 'none' );
	        $(this).siblings().css( 'border-bottom', 'none' );
	        
	        $(this).find('span:first').toggleClass( 'glyphicon-chevron-down',1000 )
	        
	        var row = rootScope.environmentConfigurationTable.row( tr );
	 
	        var clickIcon = $(this).find('span:first');
	        if ( row.child.isShown() ) {
	            // This row is already open - close it
	            row.child.hide();
	            tr.removeClass('shown');
	            clickIcon.attr('title', 'Click to expand');
	            $(this).css( 'border-bottom', $(this).attr( 'border-bottom-old'));
		        $(this).siblings().css( 'border-bottom', $(this).attr( 'border-bottom-old'));
	        }
	        else {
	            
	        	//get config_details
        		var params = 
   				 'adapters=' + row.data().adapter+
   				 '&adapterBundles=' + row.data().adapterBundle+ 			 
   				 '&releases=' +scope.getCommaSeparatedString(rootScope.getEnvConfigFilterModel("Releases")) +
   				 '&versions=' +scope.getCommaSeparatedString(rootScope.getEnvConfigFilterModel("Versions")) +
   				 '&environments=' +scope.getCommaSeparatedString(rootScope.getEnvConfigFilterModel("Environments")) +
   				 '&vtierhostnames=' +scope.getCommaSeparatedString(rootScope.getEnvConfigFilterModel("Vtierhostnames"));
        		var loadFilters = http.get("/api360-service/environment_configuration/configs.json?"+params);
        		http.dataType="json";
        		loadFilters.then(function(payload) {
        			row.data().config_details=payload.data;
    	            row.child( rootScope.formatExtraInfo(row.data().config_details)).show();
    	            tr.addClass('shown');
    	            clickIcon.attr('title', 'Click to collapse');
        		});

	        }
	    } );		
		
	};
    
});









