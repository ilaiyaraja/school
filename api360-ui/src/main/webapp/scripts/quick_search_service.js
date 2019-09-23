'use strict';

app.service('quickSearchService', function()
{
	
	this.renderAPIServiceGrid = function($scope,$rootScope)
	{
		
		$scope.apisearchgridid = $('#apisearchgridid').dataTable({
			"sDom": 'T<"clear">lfrtip',
			"serverSide": false,
			"processing": false,
	        "sAjaxSource": '',
	        "searchHighlight": true,
	        "footerCallback": function ( row, data, start, end, display ) 
	        {
	        	var api = this.api();
	        	$scope.updateHighLevelResultTotal("apisearchgridid",data.length);
	        	$('#apisearchloadingid').hide();
	        },
	        "fnInitComplete": function(oSettings, json)
	        {
	        	
	        },
	        "columns": [
	                    { "data": "container","sWidth":"20%"},
	                    { "data": "containerVersion" ,"sWidth":"20%"},	                    
	                    { "data": "service" ,"sWidth":"5%"},
	                    { "data": "subService" ,"sWidth":"10%"},
					     { "data": "adapter","sWidth":"5%" },
					     { "data": "adapterMethod" ,"sWidth":"5%"},
					     { "data": "adapterBundle" ,"sWidth":"5%"},
						{ "data": "adapterBundleVersion"}
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
	    	    "aButtons": [{
			                    "sExtends": "xls",
			                    "sToolTip": "Save as XLS",
			                    "sFileName": "apiSearchReport.xls",
			                    "oSelectorOpts": { filter: 'applied', order: 'current' } 
			                   } ,
			                   {
				                    "sExtends": "csv",
				                    "sToolTip": "Save as csv",
				                    "sFileName": "apiSearchReport.csv",
				                    "oSelectorOpts": { filter: 'applied', order: 'current' } 
				                   } ,
			                   {
				                    "sExtends": "pdf",
				                    "sButtonText":"Pdf",
				                    "sPdfOrientation": "landscape",
				                    "sFileName": "apiSearchReport.pdf",
				                    "sToolTip": "download as pdf",
				                    "oSelectorOpts": { filter: 'applied', order: 'current' },
				                    "sTitle": "API Portfolio Report"
				               }
	    	                  ]                 
	        	}
			});
		
		
		$('#apisearchgridid').on( 'draw.dt', function () 
		{
			if($rootScope.quickSearchTermGlobal!=undefined)
			{
				var body = $( $scope.apisearchgridid.api().table().body() );
		        body.unhighlight();	        
		        body.highlight($rootScope.quickSearchTermGlobal);  
			}
	    });
		
		/*
		$(".dataTables_filter input")
	    .unbind() // Unbind previous default bindings
	    .bind("input", function(e) { // Bind our desired behavior
	        // If the length is 3 or more characters, or the user pressed ENTER, search
	        if(this.value.length >= 3 || e.keyCode == 13) {
	            // Call the API search function
	            dtable.search(this.value).draw();
	        }
	        // Ensure we clear the search if they backspace far enough
	        if(this.value == "") {
	            dtable.search("").draw();
	        }
	        return;
	    });
		
		var searchbox = $('#apisearchgridid div.dataTables_filter');
		
		searchbox.bind('input', function () 
		{
			var body = $( $scope.apisearchgridid.api().table().body() );
	        body.unhighlight();	      
			
	    });
	    */
				
	};
	
	
	
	this.renderAPIPorfolioGrid = function($scope,$rootScope)
	{
		$scope.apiportfoliogridid = $('#apiportfoliogridid').dataTable({
			"sDom": 'T<"clear">lfrtip',
			"serverSide": false,
			"processing": false,
	        "sAjaxSource": "",
	        "searchHighlight": true,
	        "footerCallback": function ( row, data, start, end, display ) 
	        {
	        	var api = this.api();  
	        	$scope.updateHighLevelResultTotal("apiportfoliogridid",data.length); 
	        	$('#apiportfolioloadingid').hide();
	        	//$('#apiportfoliogridid').DataTable().search($scope.quickSearchTerm,true,false,true).draw();
	        },
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
					    { "data": "jmsprovider"}
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
	     //"sDom": '<"H"lfrp>t<"F"ip>',
	     "sPaginationType": "full_numbers",
	     "scrollY": $( window ).height() - 400,
	     "scrollX": "100%",	   
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
		
		$('#apiportfoliogridid').on( 'draw.dt', function () 
		{
			if($rootScope.quickSearchTermGlobal!=undefined)
			{
				var body = $( $scope.apiportfoliogridid.api().table().body() );
		        body.unhighlight();	        
		        body.highlight($rootScope.quickSearchTermGlobal);  
			}
	    });

	};
	
	
	this.renderAdapterInventoryGrid = function($scope,$rootScope)
	{
		
		
		$scope.adapterinventoryquicksearchgridid = $('#adapterinventoryquicksearchgridid').dataTable({
			"sDom": 'T<"clear">lfrtip',
			"serverSide": false,
			"processing": false,
			"bResponsive":true,
	        "sAjaxSource": '',
	        "searchHighlight": true,
	        "footerCallback": function ( row, data, start, end, display ) 
	        {
	        	var api = this.api();  
	        	$scope.updateHighLevelResultTotal("adapterinventoryquicksearchgridid",data.length); 
	        	$('#adapterinventoryloadingid').hide();
	        },
	        "fnInitComplete": function(oSettings, json) 
	        {
	        	
	        },
	        "columns": [
	                    { "data": "backend","sWidth":"20%" },
	                    { "data": "backend_bundle","sWidth":"20%" },
	                    { "data": "backend_method","sWidth":"20%" },
	                    { "data": "application","sWidth":"20%" },
					    { "data": "backend_bundle_version","sWidth":"20%" }  
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
	    	    "aButtons": [{
			                    "sExtends": "xls",
			                    "sToolTip": "Save as XLS",
			                    "sFileName": "adapterInventoryReport.xls",
			                    "oSelectorOpts": { filter: 'applied', order: 'current' } 
			                   } ,
			                   {
				                    "sExtends": "csv",
				                    "sToolTip": "Save as csv",
				                    "sFileName": "adapterInventoryReport.csv",
				                    "oSelectorOpts": { filter: 'applied', order: 'current' } 
				                   } ,
			                   {
				                    "sExtends": "pdf",
				                    "sButtonText":"Pdf",
				                    "sPdfOrientation": "landscape",
				                    "sFileName": "adapterInventoryReport.pdf",
				                    "sToolTip": "download as pdf",
				                    "oSelectorOpts": { filter: 'applied', order: 'current' },
				                    "sTitle": "Adapter Inventory Report"
				               }
	    	                  ]                 
	        	}
			});
		
		$('#adapterinventoryquicksearchgridid').on( 'draw.dt', function () 
		{
			if($rootScope.quickSearchTermGlobal!=undefined)
			{
				var body = $( $scope.adapterinventoryquicksearchgridid.api().table().body() );
		        body.unhighlight();	        
		        body.highlight($rootScope.quickSearchTermGlobal);  
			}
	    });

	};
	
	
	
	this.renderProjectPortfoioGrid = function($scope,$rootScope)
	{
		$scope.projectportfoliogridid = $('#projectportfoliogridid').dataTable({
		    "sDom": 'T<"clear">lfrtip',
			"serverSide": false,
			"processing": false,
	        "sAjaxSource": "",
	        "searchHighlight": true,
	        "footerCallback": function ( row, data, start, end, display ) 
	        {
	        	var api = this.api();  
	        	$scope.updateHighLevelResultTotal("projectportfoliogridid",data.length); 
	        	$('#projectportfolioloadingid').hide();
	        },
	        "fnInitComplete": function(oSettings, json) 
	        {
	        	
	        },
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
		
		$('#projectportfoliogridid').on( 'draw.dt', function () 
		{
			if($rootScope.quickSearchTermGlobal!=undefined)
			{
				var body = $( $scope.projectportfoliogridid.api().table().body() );
		        body.unhighlight();	        
		        body.highlight($rootScope.quickSearchTermGlobal);  
			}
	    });
		
	};
	
	//jon
	this.renderEteTestResultGrid = function($scope,$rootScope)
	{
		$scope.etetestresultgridid = $('#etetestresultgridid').dataTable({
		    "sDom": 'T<"clear">lfrtip',
			"serverSide": false,
			"processing": false,
	        "sAjaxSource": "",
	        "searchHighlight": true,
	        "footerCallback": function ( row, data, start, end, display ) 
	        {
	        	var api = this.api();  
	        	$scope.updateHighLevelResultTotal("etetestresultgridid",data.length); 
	        	$('#etetestresultgridloadingid').hide();
	        },
	        "fnInitComplete": function(oSettings, json) 
	        {
	        	
	        },
	        "columns": [
	                    { "data": "trackName" }, 
	                    { "data": "release" },
	                    { "data": "pmt" },
	                    { "data": "pid" },
					    { "data": "totalSteps" },
					    { "data": "passedSteps" },
					    { "data": "passpercent" }    
					    
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
			                    "sFileName": "ETETestReport.csv",
			                    "oSelectorOpts": { filter: 'applied', order: 'current' }
			                   
			                    
			                   } , {
				                    "sExtends": "csv",
				                    "sToolTip": "Save as csv",
				                    "sFileName": "ETETestReport.csv",
				                    "oSelectorOpts": { filter: 'applied', order: 'current' } 
				                   } ,
			                   {
				                    "sExtends": "pdf",
				                    "sButtonText":"Pdf",
				                    "sPdfOrientation": "landscape",
				                    "sFileName": "ETETestReport.pdf",
				                    "sToolTip": "download as pdf",
				                    "oSelectorOpts": { filter: 'applied', order: 'current' },
				                    "sTitle": "ETE Test Result Report"
				               }]                 
	        }
	    });
		
		$('#etetestresultgridid').on( 'draw.dt', function () 
		{
			if($rootScope.quickSearchTermGlobal!=undefined)
			{
				var body = $( $scope.etetestresultgridid.api().table().body() );
		        body.unhighlight();	        
		        body.highlight($rootScope.quickSearchTermGlobal);  
			}
	    });
		
	};
	
	this.renderAPITaxonomyGrid = function($scope,$rootScope)
	{
		
		$scope.apitaxonomygridid = $('#apitaxonomygridid').dataTable({
		    "sDom": 'T<"clear">lfrtip',
			"serverSide": false,
			"processing": false,
	        "sAjaxSource": "",	
	        "searchHighlight": true,
	        "footerCallback": function ( row, data, start, end, display ) 
	        {
	        	var api = this.api();  
	        	$scope.updateHighLevelResultTotal("apitaxonomygridid",data.length); 
	        	$('#apitaxonomyloadingid').hide();
	        },
	        "columns": [
	                    { "data": "name" },
	                    { "data": "domain" },
					    { "data": "lbgups" },
					    { "data": "businessTrack" },
					    { "data": "businessName" },
						{ "data": "functionalModel"} ,
						{ "data": "functionalModelPath"}  , 
						{ "data": "description"}   
					    
	                ],
	                
	                "columnDefs": [
	                               {
	                                   "render": function ( data, type, row ) 
	                                   {  
	                                       return "<div class='desc'>"+data+"</div>";
	                                   },
	                                   "targets": 7
	                               }
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
	    	    "aButtons": [  {
			                    "sExtends": "xls",
			                    "sToolTip": "Save as XLS",
			                    "sFileName": "apitaxonomyReport.csv",
			                    "oSelectorOpts": { filter: 'applied', order: 'current' } 
			                   } , 
			                   {
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
				                    "sTitle": "API Taxonomy Report"
				               }
	    	                  ]                 
	        }
	    });
		
		$('#apitaxonomygridid').on( 'draw.dt', function () 
		{
			if($rootScope.quickSearchTermGlobal!=undefined)
			{
				var body = $( $scope.apitaxonomygridid.api().table().body() );
		        body.unhighlight();	        
		        body.highlight($rootScope.quickSearchTermGlobal);  
			}
	    });
	};
	
	
	
	
	this.renderDefectGrid = function($scope,$rootScope,$http)
	{
		$scope.defectgridid = $('#defectgridid').DataTable({
		    "sDom": 'T<"clear">lfrtip',
			"serverSide": false,
			"processing": false,
	        "sAjaxSource": "",	
	        "searchHighlight": true,
	        "footerCallback": function ( row, data, start, end, display ) 
	        {
	        	var api = this.api();  
	        	$scope.updateHighLevelResultTotal("defectgridid",data.length); 
	        	$('#defectgridloadingid').hide();
	        },
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
	    	    "aButtons": [{
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
		
		
		$('#defectgridid tbody').on('click', 'td.details-control', function () 
		{ 
	        var tr = $(this).parent('tr'); 

	        //keep the css in attr to re-apply it when row is collapsed 
	        $(this).attr( 'border-bottom-old', $(this).css( 'border-bottom')); 
	        $(this).siblings().attr( 'border-bottom-old', $(this).css( 'border-bottom')); 

	        //remove border from parent row 
	        $(this).css( 'border-bottom', 'none' ); 
	        $(this).siblings().css( 'border-bottom', 'none' ); 

	        var row = $scope.defectgridid.row( tr ); 
	        
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
	        		var loadFilters = $http.get("/api360-service/qc-defect/report/descrption.json?seqid="+row.data().seq_id); 
	        		$http.dataType="json"; 
	        		loadFilters.then(function(payload) 
	        		{ 
	        			row.data().config_details= payload.data.description;
	        			if(row.data().config_details == null){
	        				
	        				row.data().config_details="NA";
	        			}
	        			
	        			
	    	            row.child( $scope.formatExtraInfo(row.data().config_details,row.data(),$rootScope.quickSearchTermGlobal)).show(); 
	    	            tr.addClass('shown'); 
	        		}); 

	        	} else { 
	        		row.child( $scope.formatExtraInfo(row.data().config_details,row.data(),$rootScope.quickSearchTermGlobal)).show(); 
		            tr.addClass('shown'); 
	        	}

	        } 
	    	});
		
		
		$('#defectgridid').on( 'draw.dt', function () 
		{
			if($rootScope.quickSearchTermGlobal!=undefined)
			{
				var body = $( $scope.defectgridid.table().body() );
		        body.unhighlight();	        
		        body.highlight($rootScope.quickSearchTermGlobal);  
			}
	    });
		
	};
	
	
	this.renderBundleVersionGrid = function($scope,$rootScope)
	{
		
		$scope.bundleversiongridid = $('#bundleversiongridid').dataTable({
			"sDom": 'T<"clear">lfrtip',
			"serverSide": false,
			"processing": false,			
	        "sAjaxSource": "",	
	        "searchHighlight": true,
	        "footerCallback": function ( row, data, start, end, display ) 
	        {
	        	var api = this.api();  
	        	$scope.updateHighLevelResultTotal("bundleversiongridid",data.length); 
	        	$('#bundleversiongridloadingid').hide();
	        },
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
	     "scrollY": $( window ).height() - 400,
	     "scrollX": "100%",	   
	     'sScrollXInner': '100%',
	     "oTableTools": {
	    	  "sSwfPath": "swf/copy_csv_xls_pdf.swf",
	    	    "aButtons": [{
			                    "sExtends": "xls",
			                    "sToolTip": "Save as xls",
			                    "sFileName": "installedBundleVersionReport.xls",
			                    "oSelectorOpts": { filter: 'applied', order: 'current' } 
			                   },
			                   {
				                    "sExtends": "csv",
				                    "sToolTip": "Save as csv",
				                    "sFileName": "installedBundleVersionReport.csv",
				                    "oSelectorOpts": { filter: 'applied', order: 'current' } 
				                   }, 
			                   {
				                    "sExtends": "pdf",
				                    "sButtonText":"Pdf",
				                    "sPdfOrientation": "landscape",
				                    "sFileName": "installedBundleVersionReport.pdf",
				                    "sToolTip": "download as pdf",
				                    "oSelectorOpts": { filter: 'applied', order: 'current' },
				                    "sTitle": "Installed  Bundle Version Report"
				               }
	    	                  ]                 
	        }
	    });
		
		$('#bundleversiongridid').on( 'draw.dt', function () 
		{
			if($rootScope.quickSearchTermGlobal!=undefined)
			{
				var body = $( $scope.bundleversiongridid.api().table().body() );
		        body.unhighlight();	        
		        body.highlight($rootScope.quickSearchTermGlobal);  
			}
	    });
		
	};
	
	
	this.renderDiscoveryApiGrid = function($scope,$rootScope)
	{
		
		$scope.discoveryapigridid = $('#discoveryapigridid').dataTable({
			"sDom": 'T<"clear">lfrtip',
			"serverSide": false,
			"processing": false,			
	        "sAjaxSource": "",	
	        "searchHighlight": true,
	        "footerCallback": function ( row, data, start, end, display ) 
	        {
	        	var api = this.api();  
	        	$scope.updateHighLevelResultTotal("discoveryapigridid",data.length); 
	        	$('#discoveryapigridloadingid').hide();
	        },
	        "columns": [
	                     { "data": "schemaName" },
	                     { "data": "elementType" },
	                     { "data": "elementName" },
					     { "data": "cdmRef" }
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
	     "scrollY": $( window ).height() - 400,
	     "scrollX": "100%",	   
	     'sScrollXInner': '100%',
	     "oTableTools": {
	    	  "sSwfPath": "swf/copy_csv_xls_pdf.swf",
	    	    "aButtons": [{
			                    "sExtends": "xls",
			                    "sToolTip": "Save as xls",
			                    "sFileName": "ApiSchemaReport.xls",
			                    "oSelectorOpts": { filter: 'applied', order: 'current' } 
			                   },
			                   {
				                    "sExtends": "csv",
				                    "sToolTip": "Save as csv",
				                    "sFileName": "ApiSchemaReport.csv",
				                    "oSelectorOpts": { filter: 'applied', order: 'current' } 
				                   }, 
			                   {
				                    "sExtends": "pdf",
				                    "sButtonText":"Pdf",
				                    "sPdfOrientation": "landscape",
				                    "sFileName": "ApiSchemaReport.pdf",
				                    "sToolTip": "download as pdf",
				                    "oSelectorOpts": { filter: 'applied', order: 'current' },
				                    "sTitle": "Installed  Bundle Version Report"
				               }
	    	                  ]                 
	        }
	    });
		
		$('#discoveryapigridid').on( 'draw.dt', function () 
		{
			if($rootScope.quickSearchTermGlobal!=undefined)
			{
				var body = $( $scope.discoveryapigridid.api().table().body() );
		        body.unhighlight();	        
		        body.highlight($rootScope.quickSearchTermGlobal);  
			}
	    });
		
	};
	
	
	
	////abhi///
	this.renderEnvironmentConfigGrid = function($scope,$rootScope,$http){
		
		
		$scope.environmentconfiggridid = $('#environmentconfiggridid').DataTable({
			

		    "sDom": 'T<"clear">lfrtip',
			"serverSide": false,
			"processing": false,
	        "sAjaxSource": "",
	        "searchHighlight": true,
	        "footerCallback": function ( row, data, start, end, display ) 
	        {
	        	var api = this.api();  
	        	$scope.updateHighLevelResultTotal("environmentconfiggridid",data.length); 
	        	$('#environmentconfiggridloadingid').hide();
	        },
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
					               }
		    	                  ]                 
		        }
		    });
		
		   ////Expand Code////
		$('#environmentconfiggridid tbody').on('click', 'td.details-control', function () {
	        var tr = $(this).parent('tr');

	        //keep the css in attr to re-apply it when row is collapsed 
	        $(this).attr( 'border-bottom-old', $(this).css( 'border-bottom'));
	        $(this).siblings().attr( 'border-bottom-old', $(this).css( 'border-bottom'));
	        
	        //remove border from parent row
	        $(this).css( 'border-bottom', 'none' );
	        $(this).siblings().css( 'border-bottom', 'none' );
	        
	        $(this).find('span:first').toggleClass( 'glyphicon-chevron-down',1000 )
	        
	        var row = $scope.environmentconfiggridid.row( tr );
	 
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
   				 '&releases=All' +
   				 '&versions=All' +
   				 '&environments=All' +
   				 '&vtierhostnames=All' ;
        		var loadFilters = $http.get("/api360-service/environment_configuration/configs.json?"+params);
        		$http.dataType="json";
        		loadFilters.then(function(payload) {
        			row.data().config_details=payload.data;
    	            row.child( $scope.formatExtraInfoEnv(row.data().config_details,$rootScope.quickSearchTermGlobal)).show();
    	            tr.addClass('shown');
    	            clickIcon.attr('title', 'Click to collapse');
        		});

	        }
	    } );
		
		
		$('#environmentconfiggridid').on( 'draw.dt', function () 
				{
					if($rootScope.quickSearchTermGlobal!=undefined)
					{
						var body = $( $scope.environmentconfiggridid.table().body() );
				        body.unhighlight();	        
				        body.highlight($rootScope.quickSearchTermGlobal);  
					}
		 });
		
		
		
	}
	
	
	/*****
	 * 
	 * Functional Test Result Added By Abhimanyu
	 * 
	 */
	
	this.renderFunctionalTestResultGrid = function($scope,$rootScope,$http)
	{
		
		
		$scope.functionaltestresultgridid = $('#functionaltestresultgridid').DataTable({
		    "sDom": 'T<"clear">lfrtip',
			"serverSide": false,
			"processing": false,
			"responsive":true,
	        "sAjaxSource": false,	
	        "searchHighlight": true,
	        "footerCallback": function ( row, data, start, end, display ) 
	        {
	        	var api = this.api();  
	        	$scope.updateHighLevelResultTotal("functionaltestresultgridid",data.length); 
	        	$('#functionaltestresultgridloadingid').hide();
	        },
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
		
		
		$('#functionaltestresultgridid tbody').on('click', 'td.details-control', function () { 
	        var tr = $(this).parent('tr'); 

	        //keep the css in attr to re-apply it when row is collapsed 
	        $(this).attr( 'border-bottom-old', $(this).css( 'border-bottom')); 
	        $(this).siblings().attr( 'border-bottom-old', $(this).css( 'border-bottom')); 

	        //remove border from parent row 
	        $(this).css( 'border-bottom', 'none' ); 
	        $(this).siblings().css( 'border-bottom', 'none' ); 

	        var row = $scope.functionaltestresultgridid.row( tr ); 
	        
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
	        		var loadFilters = $http.get("/api360-service/functional-test/notes/reports.json?funid="+row.data().funtestid); 
	        		$http.dataType="json"; 
	        		loadFilters.then(function(payload) {
	        		    row.child( $scope.formatExtraInfoFunctionalTestResult(payload,row.data().funtestid)).show(); 
	    	            tr.addClass('shown'); 
	        		}); 

	       
	        } 
	    });
		
		
		
		
		
		
		$('#functionaltestresultgridid_wrapper').on('click','.myClass2',function(){
			$scope.funid = $(this).data("funid");
			$scope.showSummaryDialog();
			
			
		});
		
		
		
		
		$('#functionaltestresultgridid').on( 'draw.dt', function () 
				{
					if($rootScope.quickSearchTermGlobal!=undefined)
					{
						var body = $( $scope.functionaltestresultgridid.table().body() );
				        body.unhighlight();	        
				        body.highlight($rootScope.quickSearchTermGlobal);  
					}
		 });
		
		
		
		
		
		
		
		
	}
	
	/////abhi//
	this.functionalTestResultGridCallback = function($scope,$rootScope)
	{
		$('#functionaltestresultgridid tbody tr td').each( function()
	    {
		    this.setAttribute( 'title', $(this).text());
		});
		
	};
	
	this.eteTestResultGridCallback = function($scope,$rootScope)
	{
		$('#etetestresultgridid tbody tr td').each( function()
	    {
		    this.setAttribute( 'title', $(this).text());
		});
		
	};
	
	this.envConfigGridCallback = function($scope,$rootScope)
	{
		$('#environmentconfiggridid tbody tr td').each( function()
	    {
		    this.setAttribute( 'title', $(this).text());
		});
		
	};
	
	this.projectportfolioGridCallback = function($scope,$rootScope)
	{
		$('#projectportfoliogridid tbody tr td').each( function()
	    {
		    this.setAttribute( 'title', $(this).text());
		});
		
	};
	
	this.apisearchGridCallback = function($scope,$rootScope)
	{
		$('#apisearchgridid tbody tr td').each( function()
	    {
		    this.setAttribute( 'title', $(this).text());
		});
		
	};
	
	this.apiPortfoioGridCallback = function($scope,$rootScope)
	{
		$('#apiportfoliogridid tbody tr td').each( function() 
	    {
		    this.setAttribute( 'title', $(this).text());
		});
		
	};
	
	this.adapterInventoryGridCallback = function($scope,$rootScope)
	{
		$('#adapterinventorygridid tbody tr td').each( function() 
	    {
		    this.setAttribute( 'title', $(this).text());
		});
		
	};  
	
	this.apiTaxonomyGridCallback = function($scope,$rootScope)
	{
		$('#apitaxonomygridid tbody tr td').each( function() 
	    {
		    this.setAttribute( 'title', $(this).text());
		});
		
	};
	
	this.defectGridCallback = function($scope,$rootScope)
	{
		$('#defectgridid tbody tr td').each( function() 
	    {
		    this.setAttribute( 'title', $(this).text());
		});
		
	};
	
	this.bundleVersionGridCallback = function($scope,$rootScope)
	{
		$('#bundleversiongridid tbody tr td').each( function() 
	    {
		    this.setAttribute( 'title', $(this).text());
		});
		
	};
	
	this.discoveryApiGridCallback = function($scope,$rootScope)
	{
		$('#discoveryapigridid tbody tr td').each( function() 
	    {
		    this.setAttribute( 'title', $(this).text());
		});
		
	};
	
    
});

