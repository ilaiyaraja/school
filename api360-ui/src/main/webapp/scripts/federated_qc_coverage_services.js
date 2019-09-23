'use strict';

app.service('federatedQcCoverageService', function()
{
    var previousApi = "";
    
    this.iframeLoadedCallBack = function(scope,rootScope)
	{	
		$("#transaction_trace_iframe").height( $( window ).height() - 150 );
	};
    
    this.getActivities = function(coded) {
    	alert(coded);
    };
	this.rederQcCodeCoverageGrid = function(scope,http,rootScope)
	{
		rootScope.qcCodeCoverageTable = $('#qcCodeCoverageGridID').dataTable({
  		"processing": true,
		"ajax":"",
		"columns": [
					{ "data": "api",className:"api"},
					{ "data": "version", className: "version" },	                    
					{ "data": "client", className: "client" },
					{ "data": "cluster", className: "cluster" },
					{ "data": "actsCoded" , className: "actsCoded"},
					{ "data": "actsTested", className: "actsTested"},
					{ "data": "actsNotTested", className: "actsNotTested"},
					{ "data": "percentTested", className: "percentTested"},
					{ "data":"api_name", className:"duplicateApi"},
					{ "data":"max_patch", className:"maxPatch"},
					{ "data":"full_version", className:"verName"}
                ],
         
        "sDom":'T<"clear">lfrtip',
        deferRender:true,
        paging: true,
        searching: false,
        ordering:  false,
        "bSort": true,
        "iDisplayLength": 20,
        "lengthMenu": [ 20, 25, 40, 50, 80, 100],
        "sPaginationType": "full_numbers",
        "scrollY": "400px",
	     "scrollX": "83.5%",
	     "scrollCollapse": true,
	     "bAutoWidth": false,
		 "bScrollCollapse": true,
		 "createdRow": function( row, data, dataIndex ) {
	            if ( data.api != "" ) {
	              $(row).addClass( 'apiHeading' );
	            }else  if ( data.version != "" ) {
	              $(row).addClass( 'versionRow' );
	            } 
	            
	               if ( data.actsCoded != "" ) {
	                $('td', row).eq(4).addClass('highlight');
	               } 
	               if( data.actsTested != "" ) {
	                $('td', row).eq(5).addClass('highlight');
	               }
	               if( data.actsNotTested != "" ) {
	                $('td', row).eq(6).addClass('highlight');
	               }
	             
	          },

         "oTableTools": {
			"sSwfPath":"swf/copy_csv_xls_pdf.swf",
            "aButtons":[
					{
						"sExtends": "xls",
						"sToolTip": "Save as XLS",
						"sFileName": "QCCoverageReport.xls",
						"mColumns":[0,1,2,3,4,5,6,7],
						
						"oSelectorOpts": { filter: 'applied', order: 'current' },
					    "sTitle": "QC Coverage Report"
					   } ,
					   {
							"sExtends": "csv",
							"sToolTip": "Save as csv",
							"sFileName": "QCCoverageReport.csv",
							"oSelectorOpts": { filter: 'applied', order: 'current' },
							"mColumns":[0,1,2,3,4,5,6,7],
					         "sTitle": "QC Coverage Report"
						   } ,
					   {
							"sExtends": "pdf",
							"sButtonText":"Pdf",
							"sPdfOrientation": "landscape",
							"sFileName": "QCCoverageReport.pdf",
							"sToolTip": "download as pdf",
							"mColumns":[0,1,2,3,4,5,6,7],
							"oSelectorOpts": { filter: 'applied', order: 'current' },
							"sTitle": "QC Coverage Report"
					   }
            ]
        }
    });
	
	$('#qcCodeCoverageGridID tbody').on('click', '.highlight', function () {
			rootScope.gridActivityOptions.data = [];
		
			var actsCoded_Checker = $(this).hasClass('actsCoded');
	    	var actsTested_Checker = $(this).hasClass('actsTested');
	    	var actsNotTested_Checker = $(this).hasClass('actsNotTested');
	    	var modelFilterurl = "";
	    	var currentApiName = $(this).parent().children().eq(8).text();
	    	var currentMaxPatch = $(this).parent().children().eq(9).text();
	    	var currentVersion = $(this).parent().children().eq(1).text();
	    	
	    	var clientName = $(this).parent().children().eq(2).text();
	    	var clusterName = $(this).parent().children().eq(3).text();
	    	var ccVersion = $(this).parent().children().eq(10).text();
	    	
	    	var filterClientNames = rootScope.getCommaSeparatedString(rootScope.getQcCodeCoverageFilterModel("client"));
	    	var filterClusterNames = rootScope.getCommaSeparatedString(rootScope.getQcCodeCoverageFilterModel("cluster"));
	    	var pSummaryValue ='false';
	    	
	    	if(currentMaxPatch != ""){ /* max-patech value is not empty */
	    	 	currentVersion = currentVersion +'.'+currentMaxPatch;
	    	 	pSummaryValue = 'false'; /* made true in few cases */
	    	}
	    	if(clientName != "" || clusterName != "" ){
	    		currentVersion = ccVersion;
	    	}
	    	
	    	if(actsCoded_Checker){
	    		modelFilterurl = '/api360-service/federatedQCCoverage/federated/activites?api=' + currentApiName + '&version='+currentVersion;
	    		rootScope.modelHeading = "Activities Coded For"; 
	    		
	    		
	    		rootScope.showFlag = false;
	    	} else if(actsTested_Checker){
	    		rootScope.modelHeading = "Activities Tested For"; 
	    		if(clientName !=  ""){
	    			filterClientNames = clientName;
	    		}
	    		
	    		if(clusterName !=  ""){
	    			filterClusterNames = clusterName;
	    		}
	    		
	    		rootScope.modelClient = filterClientNames;
	    		rootScope.modelStartDate = rootScope.getQcCodeCoverageFilterModel("startDate");
	    		rootScope.modelEndDate = rootScope.getQcCodeCoverageFilterModel("endDate");
	    		rootScope.modelCluster = filterClusterNames;
	    		
	    		rootScope.showFlag = true;
	    		
	    		modelFilterurl    = '/api360-service/federatedQCCoverage/federated/activitestested?startDate='+  rootScope.getQcCodeCoverageFilterModel("startDate") ;
	    		modelFilterurl  += '&endDate='+ rootScope.getQcCodeCoverageFilterModel("endDate");
	    		modelFilterurl  += '&cluster='+filterClusterNames;
	    		modelFilterurl  += '&api='+currentApiName;
	    		modelFilterurl  += '&version='+currentVersion;
	    		modelFilterurl  += '&client='+filterClientNames;
	    		modelFilterurl  += '&pSummary='+pSummaryValue;
	    		
	    	} else if(actsNotTested_Checker){
	    		rootScope.modelHeading = "Missing Activities For";
	    		
	    		if(clientName !=  ""){
	    			filterClientNames = clientName;
	    		}
	    		
	    		if(clusterName !=  ""){
	    			filterClusterNames = clusterName;
	    		}
	    		
	    		rootScope.modelClient = filterClientNames;
	    		rootScope.modelStartDate = rootScope.getQcCodeCoverageFilterModel("startDate");
	    		rootScope.modelEndDate = rootScope.getQcCodeCoverageFilterModel("endDate");
	    		rootScope.modelCluster = filterClusterNames;
	    		
	    		rootScope.showFlag = true;
	    		
	    		modelFilterurl    = '/api360-service/federatedQCCoverage/federated/activitesnottested?startDate='+  rootScope.getQcCodeCoverageFilterModel("startDate") ;
	    		modelFilterurl  += '&endDate='+ rootScope.getQcCodeCoverageFilterModel("endDate");
	    		modelFilterurl  += '&cluster='+filterClusterNames;
	    		modelFilterurl  += '&api='+currentApiName;
	    		modelFilterurl  += '&version='+currentVersion;
	    		modelFilterurl  += '&client='+filterClientNames;
	    		modelFilterurl  += '&pSummary='+pSummaryValue;
	    	}
	    	
	    	if(modelFilterurl != ""){
	    		var loadFilters = http.get(modelFilterurl);  
			    http.dataType="json";
			    loadFilters.success(function(data){
			    	if(data.aaData  != undefined && data.aaData != null){
			    		rootScope.gridActivityOptions.data = data.aaData;
			    	 	rootScope.modelApiName = data.aaData[0].api_name;
			    		rootScope.modelVersion = data.aaData[0].major_minor_version;
			    	}
			 	});
	    	}
	    	
	    	rootScope.openactivity('lg');
	   } );
		
	};
	
	 
    
});


