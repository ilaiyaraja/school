'use strict';

app.service('execDashboardService', function()
{
    
	/*
	 * Executive Dashboard Service Started 
	 */
	
	this.onClickCombinedViewIcon = function(scope,rootScope,http,url,params)
	{
		 //rootScope.launch('wait');	
		 
		 var combinedViewGridUrl = '/api360-service/exec-dashboard/api360/combined/view.json?limit=10000&'+params;
    	 
     		$('#combinedViewGridId tfoot th').each( function () 
         	{
                 var title = $('#combinedViewGridId thead th').eq( $(this).index() ).text();
                 $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
             });
     		
     		var displayMsg = false;
    	 
        	rootScope.combinedCharttable = $('#combinedViewGridId').dataTable({
        	"serverSide": false,
			"processing": false,
			"fnPreDrawCallback": function() 
			{
	            // gather info to compose a message
	            //showMessage(...);				
				if(displayMsg==false)
				{
					rootScope.launch('wait');
					displayMsg=true;
				}
	        },
	        "fnDrawCallback": function() 
	        {
	            // in case your overlay needs to be put away automatically you can put it here
	            //hideOverlay();
	        	rootScope.$broadcast('dialogs.wait.complete');
	        },
	        "sAjaxSource": combinedViewGridUrl,	
	        "columns": [
	                {"data": "programs"},
	                {"data": "clients"},	            		
            		{"data": "apis"},
            		{"data": "backends"}
            	],
	    "bAutoWidth": true,
	    "iTotalRecords":100,
	    "bScrollCollapse": true,
	    "bJQueryUI": true,
	    'sScrollXInner': '100%',
	    "search": {"caseInsensitive": true},
	    "sServerMethod": "POST",	     
	     "iDisplayLength": 5,
	     "bPaginate" : true,
	     "bInfo":true,
	     "lengthMenu": [5, 10, 25, 50, 100],
	     "sPaginationType": "full_numbers",
	     "order": [[ 2, "asc" ]]	  
	    }) .columnFilter();
        	
        	
        	
        	$('#combinedViewGridId tbody').on( 'click', 'td', function () 
			{
		    	var position = rootScope.combinedCharttable.fnGetPosition(this); // getting the clicked row position
		    	
		    	 //var aData = rootScope.combinedCharttable.fnGetData( position[0] );
		    	
		    	 if(position[1]==0) // ProgramModel cell clicked
   		    	 {
		    		 
		    		 var dummyModel = [];
				     var idProp = {idProp: 'id'};
			         idProp['id'] = this.innerHTML;	
			    	 dummyModel.push(idProp);
			    	 
   		    		 rootScope.updateDashboardFilters("Programs",dummyModel);	
   		    		 rootScope.ReLoadDashboardComboBox("Programs",this.innerHTML);
   		    		 //scope.submitDashboardSearch();    		    		
   		    		 
   		    	 }
		    	 else  if(position[1]==1) //Client cell clicked
		    	 {
		    		 var dummyModel = [];
				     var idProp = {idProp: 'id'};
			         idProp['id'] = this.innerHTML;	
			    	 dummyModel.push(idProp);	    		    		 
		    		 rootScope.updateDashboardFilters("Clients",dummyModel);
		    		 rootScope.ReLoadDashboardComboBox("Clients",this.innerHTML);
		    		 //scope.submitDashboardSearch();    		    		
		    	 }    		    	 
		    	 else if(position[1]==2) // APIs cell clicked
		    	 {
		    		 var dummyModel = [];
				     var idProp = {idProp: 'id'};
			         idProp['id'] = this.innerHTML;	
			    	 dummyModel.push(idProp);	
		    		 
		    		 rootScope.updateDashboardFilters("APIs",dummyModel);
		    		 rootScope.ReLoadDashboardComboBox("APIs",this.innerHTML);
		    		 //scope.submitDashboardSearch();    		    		 
		    		 
		    	 }
		    	 else if(position[1]==3)// Backend cell clicked
		    	 {
		    		 var dummyModel = [];
				     var idProp = {idProp: 'id'};
			         idProp['id'] = this.innerHTML;	
			    	 dummyModel.push(idProp);
		    		 rootScope.updateDashboardFilters("Backends",dummyModel);
		    		 rootScope.ReLoadDashboardComboBox("Backends",this.innerHTML);
		    		 //scope.submitDashboardSearch(); 
		    	 }
			});
        	
        	 $('#combinedViewGridId tbody').on('click', 'tr', function() 
		    {
		
		        var position = rootScope.combinedCharttable.fnGetPosition(this); // getting the clicked row position
		        var contactId = rootScope.combinedCharttable.fnGetData(position); // getting the value of the first (invisible) column
		        
		        if ($(this).hasClass('selected')) 
		        {
		            $(this).removeClass('selected');
		        } 
		        else
		        {
		        	rootScope.combinedCharttable.$('tr.selected').removeClass('selected');
		            $(this).addClass('selected');
		        }
		    });	
	};
	
	this.renderDashboard = function(scope,rootScope,http,url,params)
	{
		
		rootScope.launch('wait');		
		
		scope.show360View = true;
		scope.showBackendView=true;
		scope.showAPIView=true;
		scope.showProgramView=true;
		scope.showClientView=true;
		
    	scope.showCombinedView = false;
        scope.showClientDetails = true;
        scope.showTestExecution=true;
        scope.showAPIDonutChart=true;
        
        
        var myE2 = angular.element(document.querySelector('#morris-donut-chart1'));
        
    	var apitootlacount = http.post(url+params);
        apitootlacount.then(
            function(payload) 
            {
                rootScope.total_federated_apis = payload.data.result.total_federated_apis;
                rootScope.total_non_federated_apis = payload.data.result.total_non_federated_apis;
                rootScope.total_programs = payload.data.result.total_programs;
                rootScope.total_clients = payload.data.result.total_clients;
                rootScope.total_profiles = payload.data.result.total_profiles;
                rootScope.total_federated_bundles = payload.data.result.total_federated_bundles;
                rootScope.non_federeated_bundles = payload.data.result.non_federeated_bundles;
                rootScope.total_adapters = payload.data.result.total_adapters;                
                rootScope.totalApis = parseInt(scope.total_federated_apis + scope.total_non_federated_apis);
                
                scope.total_federated_apis = payload.data.result.total_federated_apis;
                scope.total_non_federated_apis = payload.data.result.total_non_federated_apis;
                
                rootScope.donutChart1 = Morris.Donut({
                    element: myE2,
                    data: [{
                        label: "Number of Federated Apis",
                        value: scope.total_federated_apis
                    }, {
                        label: "Number of Non Federated Apis",
                        value: scope.total_non_federated_apis
                    }],
                    resize: true,
                    gridEnabled: true
                }).on('click', function(i, row)
                {
                	  //console.log(i, row);
                });
                
                rootScope.$broadcast('dialogs.wait.complete');
                
            });
        
                
        var myEl = angular.element(document.querySelector('#morris-area-chartDemo'));
        var chartArea = http.get('/api360-service/exec-dashboard/api360/sig/consumer/for/chart.json?'+params);
        chartArea.then(
            function(payload) 
        {
            	rootScope.areaChart1 =   Morris.Area({
                    element: myEl,
                    data: payload.data.result,
                    xkey: ['key'],
                    ykeys: ['value'],
                    labels: ['ConversationIds'],
                    pointSize: 4,
                    hideHover: 'auto',
                    resize: true,
                    behaveLikeLine: true,
                    parseTime: false,
                    gridEnabled: true

                });
            });
        
            
        
        $(document).ready(function(){
            $('.single-item').slick({
            	 dots: true,
            	 autoplay:true,
            	 arrows:true,
            	 autoplaySpeed:4000,
            	 
            });
        });
        
        
        var clientViewGridUrl = '/api360-service/exec-dashboard/api360/client/view.json?'+params;
      	 var programViewGridUrl = '/api360-service/exec-dashboard/api360/program/view.json?'+params;
      	 var apiViewGridUrl = '/api360-service/exec-dashboard/api360/api/view.json?'+params;
      	 var backendViewGridUrl = '/api360-service/exec-dashboard/api360/backend/view.json?'+params;
	        	
	        	rootScope.clientCharttable = $('#clientViewGridId').dataTable({
					"serverSide": false,
					"processing": false,
			        "sAjaxSource": clientViewGridUrl,
			        "aoColumns": [

			                      {   "sTitle": "","mDataProp": null, "sWidth": "20px", "bSortable": false},
			                      {   "sTitle":"Clients","mDataProp": "clients","bSortable": true}					                     
			          ],
			       // "columns": [{"data": "clients","bSortable": true}],
			     "bAutoWidth": false,
			     "bScrollCollapse": false,
			     "bJQueryUI": true,
			     "search": {"caseInsensitive": true},
			     "sServerMethod": "POST",	     
			     "iDisplayLength": 5,
			     "bPaginate" : false,
			     "bInfo":false,
			     "lengthMenu": [5, 10, 25, 50, 100],
			     "sPaginationType": "full_numbers",
			     //"order": [[ 0, "asc" ]],
			     "bFilter": true,
			     "sScrollY" : "200",
			     	"fnCreatedRow": function( nRow, aData, iDataIndex ) 
			     	{
			     		
			     		var clientModel = rootScope.getDashboardFilterModel("Clients");
			     		
			     		var found = false;
			     		
	     				angular.forEach(clientModel, function (value) 
		                {
							 var idProp = value["id"];
							 
							if(aData.clients==idProp)
							{
								found=true; 
							}
		                });
			     		
	     				if(found)
	     				{
	     					$('td:eq(0)', nRow).html( '<span class="client_checkbox client_checkbox_glyphicon_glyphicon_ok glyphicon glyphicon-ok" id="'+aData.clients+'"></span>');
	     				}
	     				else
	     				{
	     					$('td:eq(0)', nRow).html( '<span class="client_checkbox client_checkbox_glyphicon_glyphicon_unchecked glyphicon glyphicon-unchecked" id="'+aData.clients+'"></span>');
	     				}
			     	}
			    });
	        	
	        	
	        	$('#clientViewGridId tbody').on('click', 'tr', function() 
			    {
			
			        var position = rootScope.clientCharttable.fnGetPosition(this); // getting the clicked row position
			        var contactId = rootScope.clientCharttable.fnGetData(position); // getting the value of the first (invisible) column
			       			        
			        if ($(this).hasClass('selected')) 
			        {
			            $(this).removeClass('selected');
			        } 
			        else
			        {
			        	rootScope.clientCharttable.$('tr.selected').removeClass('selected');
			            $(this).addClass('selected');
			        }
			        
			    });	
	        			    
	        			    
			    $('#clientViewGridId tbody').on( 'click', 'td', function () 
				{
			    	var position = rootScope.clientCharttable.fnGetPosition(this); // getting the clicked row position			    	
			    	 //var aData = rootScope.combinedCharttable.fnGetData( position[0] );
			    	
			    	var dummyModel = [];
			    	
			    	 if(position[1]==1) //Client cell clicked
			    	 {
			    		 
			    		 	var valueX = this.innerHTML;
	  			    		
	  			    		$('.client_checkbox').each(function(i, obj) 
	  			    		{	 
	  			    			var uncheck = $(obj).hasClass( "glyphicon-unchecked");
	  			    			
	  			    			if(valueX==obj.id && uncheck)
			    		    	{
	  			    				$(obj).attr('class','client_checkbox client_checkbox_glyphicon_glyphicon_ok glyphicon glyphicon-ok');
			    		    	}		    		    	
			    		    	else if(valueX==obj.id && !uncheck)
			    		    	{
			    		    		$(obj).attr('class','client_checkbox client_checkbox_glyphicon_glyphicon_unchecked glyphicon glyphicon-unchecked');
			    		    	}		    		    	  			    			
	  			    		});
  			    		
  			    		
			    		 if($('.client_checkbox_glyphicon_glyphicon_ok').length <= 0)
		    		     {
			    			 var idProp = {idProp: 'id'};
 				    		 idProp['id'] = "All";				    		 
 				    		 dummyModel.push(idProp);
 				    		 rootScope.updateDashboardFilters("Clients",dummyModel);
 				    		 scope.client="All";
 				    		 rootScope.ReLoadDashboardFromViewComboBox("Clients","All");
			    		 }
			    		 else
		    			 {
			    			 
    			 			$('.client_checkbox_glyphicon_glyphicon_ok').each(function(i, obj) 
	 				    	{	 
	 				    		 var idProp = {idProp: 'id'};
	 				    		 idProp['id'] = obj.id;				    		 
	 				    		 dummyModel.push(idProp);
	 				    	});	
    			 			
    			 			if(dummyModel.length > 0)
    			 			{
    			 				rootScope.updateDashboardFilters("Clients",dummyModel);	    			 			
    			 				scope.client=scope.getCommaSeparatedString(dummyModel);    			 			
    			 				rootScope.ReLoadDashboardFromViewComboBox("Clients",scope.client);
    			 			}
		    			 }
			    	 }		
			    	 else
			    	 {
			    		var valueX = this.innerHTML.substring(this.innerHTML.indexOf("id=\"")+4,this.innerHTML.length-9);
			    		
  			    		$('.client_checkbox').each(function(i, obj) 
		   				{	 
  			    			var uncheck = $(obj).hasClass( "glyphicon-unchecked");
  			    			
  			    			if(valueX==obj.id && uncheck)
		    		    	{
  			    				$(obj).attr('class','client_checkbox client_checkbox_glyphicon_glyphicon_ok glyphicon glyphicon-ok');
		    		    	}		    		    	
		    		    	else if(valueX==obj.id && !uncheck)
		    		    	{
		    		    		$(obj).attr('class','client_checkbox client_checkbox_glyphicon_glyphicon_unchecked glyphicon glyphicon-unchecked');
		    		    	}
		    		    	  			    			
		   				 });
  			    		
  			    		
			    		 if($('.client_checkbox_glyphicon_glyphicon_ok').length <= 0)
		    		     {
			    			 var idProp = {idProp: 'id'};
 				    		 idProp['id'] = "All";				    		 
 				    		 dummyModel.push(idProp);
 				    		 rootScope.updateDashboardFilters("Clients",dummyModel);
 				    		 scope.client="All";
 				    		 rootScope.ReLoadDashboardFromViewComboBox("Clients","All");
			    		 }
			    		 else
		    			 {
			    			 
    			 			$('.client_checkbox_glyphicon_glyphicon_ok').each(function(i, obj) 
	 				    	{	 
	 				    		 var idProp = {idProp: 'id'};
	 				    		 idProp['id'] = obj.id;				    		 
	 				    		 dummyModel.push(idProp);
	 				    	});	
    			 			
    			 			if(dummyModel.length > 0)
    			 			{
    			 				rootScope.updateDashboardFilters("Clients",dummyModel);	    			 			
    			 				scope.client=scope.getCommaSeparatedString(dummyModel);    			 			
    			 				rootScope.ReLoadDashboardFromViewComboBox("Clients",scope.client);
    			 			}
		    			 }
		    			 
			    	 }			    	 
				});
	        			    
	        			    
	        	
			        	rootScope.programCharttable = $('#programViewGridId').dataTable({
							"serverSide": false,
							"processing": false,
					        "sAjaxSource": programViewGridUrl,	
					        "aoColumns": [

					                      {   "sTitle": "","mDataProp": null, "sWidth": "20px", "bSortable": false},
					                      {   "sTitle":"Programs","mDataProp": "programs","bSortable": true}					                     
					          ],
					        //"columns": [{"data": "programs","bSortable": false},{"data": "programs","bSortable": true}],
						     "bAutoWidth": false,
						     "bScrollCollapse": false,
						     "bJQueryUI": true,
						     "search": {"caseInsensitive": true},
						     "sServerMethod": "POST",	     
						     "iDisplayLength": 5,
						     "bPaginate" : false,
						     "bInfo":false,
						     "lengthMenu": [5, 10, 25, 50, 100],
						     "sPaginationType": "full_numbers",
						     //"order": [[ 1, "asc" ]],
						     "bFilter": true,
						     "sScrollY" : "200",
						     "fnCreatedRow": function( nRow, aData, iDataIndex ) 
					     	{
                             	
						    	 var clientModel = rootScope.getDashboardFilterModel("Programs");
						     		
						     		var found = false;
						     		
				     				angular.forEach(clientModel, function (value) 
					                {
										 var idProp = value["id"];
										 
										if(aData.clients==idProp)
										{
											found=true; 
										}
					                });
						     		
				     				if(found)
				     				{
				     					$('td:eq(0)', nRow).html( '<span class="program_checkbox program_checkbox_glyphicon_glyphicon_ok glyphicon glyphicon-ok" id="'+aData.programs+'"></span>');
				     				}
				     				else
				     				{
				     					$('td:eq(0)', nRow).html( '<span class="program_checkbox program_checkbox_glyphicon_glyphicon_unchecked glyphicon glyphicon-unchecked" id="'+aData.programs+'"></span>');
				     				}
						    	 
						    	 
						    	 
					     	} 
					    });
			        	
	        	
	        	
	        			$('#programViewGridId tbody').on('click', 'tr', function() 
	     			    {
	     			
	     			        var position = rootScope.programCharttable.fnGetPosition(this); // getting the clicked row position
	     			        var contactId = rootScope.programCharttable.fnGetData(position); // getting the value of the first (invisible) column
	     			        
	     			        
	     			        if ($(this).hasClass('selected')) 
	     			        {
	     			            $(this).removeClass('selected');
	     			        } 
	     			        else
	     			        {
	     			        	rootScope.programCharttable.$('tr.selected').removeClass('selected');
	     			            $(this).addClass('selected');
	     			        }
	     			    });	
	     	        			    
	     	        			    
	     			    $('#programViewGridId tbody').on( 'click', 'td', function () 
	     				{
	     			    	var position = rootScope.programCharttable.fnGetPosition(this); // getting the clicked row position
	     			    	
	     			    	 //var aData = rootScope.combinedCharttable.fnGetData( position[0] );
	     			    	var dummyModel = [];
	     			    	
	     			    	 if(position[1]==1) // ProgramModel cell clicked
	     			    	 {
	     			    		 
	     			    		 		var valueX = this.innerHTML;
	     			    		
	     			    				$('.program_checkbox').each(function(i, obj) 
	    	    		   				{	 
	    	      			    			var uncheck = $(obj).hasClass( "glyphicon-unchecked");
	    	      			    			
	    	      			    			if(valueX==obj.id && uncheck)
	    	    		    		    	{
	    	      			    				$(obj).attr('class','program_checkbox program_checkbox_glyphicon_glyphicon_ok glyphicon glyphicon-ok');
	    	    		    		    	}		    		    	
	    	    		    		    	else if(valueX==obj.id && !uncheck)
	    	    		    		    	{
	    	    		    		    		$(obj).attr('class','program_checkbox program_checkbox_glyphicon_glyphicon_unchecked glyphicon glyphicon-unchecked');
	    	    		    		    	}
	    	    		    		    	  			    			
	    	    		   				 });
	    	     			    		
	    	     			    		 if($('.program_checkbox_glyphicon_glyphicon_ok').length <=0)
	    		   		    		     {
	    		   			    			 	 var idProp = {idProp: 'id'};
	    		    				    		 idProp['id'] = "All";				    		 
	    		    				    		 dummyModel.push(idProp);
	    		    				    		 rootScope.updateDashboardFilters("Programs",dummyModel);
	    		    				    		 scope.program="All";
	    		    				    		 rootScope.ReLoadDashboardFromViewComboBox("Programs","All");
	    		   			    		 }
	    		   			    		 else
	    		   		    			 {
	    			   				    	$('.program_checkbox_glyphicon_glyphicon_ok').each(function(i, obj) 
	    			   				    	{	 
	    			   				    		 var idProp = {idProp: 'id'};
	    			   				    		 idProp['id'] = obj.id;				    		 
	    			   				    		 dummyModel.push(idProp);	
	    			   				    	});
	    			   				    	
	    			   				    	rootScope.updateDashboardFilters("Programs",dummyModel);	    			 			
	    		    			 			scope.program=scope.getCommaSeparatedString(dummyModel);    			 			
	    						    		rootScope.ReLoadDashboardFromViewComboBox("Programs",scope.program);
	    		   		    			 }
	     			    	 }	
	     			    	else
	     			    	{
	     			    		var valueX = this.innerHTML.substring(this.innerHTML.indexOf("id=\"")+4,this.innerHTML.length-9);
	    			    		
	      			    		$('.program_checkbox').each(function(i, obj) 
	    		   				{	 
	      			    			var uncheck = $(obj).hasClass( "glyphicon-unchecked");
	      			    			
	      			    			if(valueX==obj.id && uncheck)
	    		    		    	{
	      			    				$(obj).attr('class','program_checkbox program_checkbox_glyphicon_glyphicon_ok glyphicon glyphicon-ok');
	    		    		    	}		    		    	
	    		    		    	else if(valueX==obj.id && !uncheck)
	    		    		    	{
	    		    		    		$(obj).attr('class','program_checkbox program_checkbox_glyphicon_glyphicon_unchecked glyphicon glyphicon-unchecked');
	    		    		    	}
	    		    		    	  			    			
	    		   				 });
	     			    		
	     			    		 if($('.program_checkbox_glyphicon_glyphicon_ok').length <=0)
		   		    		     {
		   			    			 	 var idProp = {idProp: 'id'};
		    				    		 idProp['id'] = "All";				    		 
		    				    		 dummyModel.push(idProp);
		    				    		 rootScope.updateDashboardFilters("Programs",dummyModel);
		    				    		 scope.program="All";
		    				    		 rootScope.ReLoadDashboardFromViewComboBox("Programs","All");
		   			    		 }
		   			    		 else
		   		    			 {
			   				    	$('.program_checkbox_glyphicon_glyphicon_ok').each(function(i, obj) 
			   				    	{	 
			   				    		 var idProp = {idProp: 'id'};
			   				    		 idProp['id'] = obj.id;				    		 
			   				    		 dummyModel.push(idProp);	
			   				    	});
			   				    	
			   				    	rootScope.updateDashboardFilters("Programs",dummyModel);	    			 			
		    			 			scope.program=scope.getCommaSeparatedString(dummyModel);    			 			
						    		rootScope.ReLoadDashboardFromViewComboBox("Programs",scope.program);
		   		    			 }
	     			    	}	
	     				});
	        	
	        	
	        	
			        	rootScope.apiCharttable = $('#apiViewGridId').dataTable({
							"serverSide": false,
							"processing": false,
					        "sAjaxSource": apiViewGridUrl,
					        "aoColumns": [

					                      {   "sTitle": "","mDataProp": null, "sWidth": "20px", "bSortable": false},
					                      {   "sTitle":"APIs","mDataProp": "apis","bSortable": true}					                     
					          ],
					        //"columns": [{"data": "apis","bSortable": true}],
					     "bAutoWidth": false,
					     "bScrollCollapse": false,
					     "bJQueryUI": true,
					     "search": {"caseInsensitive": true},
					     "sServerMethod": "POST",	     
					     "iDisplayLength": 5,
					     "bPaginate" : false,
					     "bInfo":false,
					     "lengthMenu": [5, 10, 25, 50, 100],
					     "sPaginationType": "full_numbers",
					     "order": [[ 0, "asc" ]],
					     //"bFilter": true,
					     "sScrollY" : "200",
					     	"fnCreatedRow": function( nRow, aData, iDataIndex ) 
					     	{
					     		
					     		var clientModel = rootScope.getDashboardFilterModel("APIs");
					     		
					     		var found = false;
					     		
			     				angular.forEach(clientModel, function (value) 
				                {
									 var idProp = value["id"];
									 
									if(aData.clients==idProp)
									{
										found=true; 
									}
				                });
					     		
			     				if(found)
			     				{
			     					$('td:eq(0)', nRow).html( '<span class="apis_checkbox apis_checkbox_glyphicon_glyphicon_ok glyphicon glyphicon-ok" id="'+aData.apis+'"></span>');
			     				}
			     				else
			     				{
			     					$('td:eq(0)', nRow).html( '<span class="apis_checkbox apis_checkbox_glyphicon_glyphicon_unchecked glyphicon glyphicon-unchecked" id="'+aData.apis+'"></span>');
			     				}
			     				
					     		
					     		
					     	}
					    });
	        	
	        	
	        			$('#apiViewGridId tbody').on('click', 'tr', function() 
	     			    {
	     			
	     			        var position = rootScope.apiCharttable.fnGetPosition(this); // getting the clicked row position
	     			        var contactId = rootScope.apiCharttable.fnGetData(position); // getting the value of the first (invisible) column
	     			        
	     			        if ($(this).hasClass('selected')) 
	     			        {
	     			            $(this).removeClass('selected');
	     			        } 
	     			        else
	     			        {
	     			        	rootScope.apiCharttable.$('tr.selected').removeClass('selected');
	     			            $(this).addClass('selected');
	     			        }
	     			    });	
	     	        			    
	     	        			    
	     			    $('#apiViewGridId tbody').on( 'click', 'td', function () 
	     				{
	     			    	var position = rootScope.apiCharttable.fnGetPosition(this); // getting the clicked row position
	     			    	
	     			    	 //var aData = rootScope.combinedCharttable.fnGetData( position[0] );
	     			    	var dummyModel = [];
	     			    	
	     			    	if(position[1]==1) // APIs cell clicked
	     			    	 {
	     			    				var valueX = this.innerHTML;
	     			    		
	     			    				$('.apis_checkbox').each(function(i, obj) 
	    	    		   				{	 
	    	      			    			var uncheck = $(obj).hasClass( "glyphicon-unchecked");
	    	      			    			
	    	      			    			if(valueX==obj.id && uncheck)
	    	    		    		    	{
	    	      			    				$(obj).attr('class','apis_checkbox apis_checkbox_glyphicon_glyphicon_ok glyphicon glyphicon-ok');
	    	    		    		    	}		    		    	
	    	    		    		    	else if(valueX==obj.id && !uncheck)
	    	    		    		    	{
	    	    		    		    		$(obj).attr('class','apis_checkbox apis_checkbox_glyphicon_glyphicon_unchecked glyphicon glyphicon-unchecked');
	    	    		    		    	}
	    	    		    		    	  			    			
	    	    		   				 });
	    	     			    		
	    	     			    		if($('.apis_checkbox_glyphicon_glyphicon_ok').length <=0)
	    		   		    		     {
	    		   			    			 	 var idProp = {idProp: 'id'};
	    		    				    		 idProp['id'] = "All";				    		 
	    		    				    		 dummyModel.push(idProp);
	    		    				    		 rootScope.updateDashboardFilters("APIs",dummyModel);
	    		    				    		 
	    		    				    		 scope.api="All";
	    		    				    		 
	    		    				    		 rootScope.ReLoadDashboardFromViewComboBox("APIs","All");
	    		   			    		 }
	    		   			    		 else
	    		   		    			 {
	    			   				    	$('.apis_checkbox_glyphicon_glyphicon_ok').each(function(i, obj) 
	    			   				    	{	 
	    			   				    		 var idProp = {idProp: 'id'};
	    			   				    		 idProp['id'] = obj.id;				    		 
	    			   				    		 dummyModel.push(idProp);	
	    			   				    	});
	    			   				    	
	    			   				    	rootScope.updateDashboardFilters("APIs",dummyModel);	    			 			
	    		    			 			scope.api=scope.getCommaSeparatedString(dummyModel);    			 			
	    						    		rootScope.ReLoadDashboardFromViewComboBox("APIs",scope.api);						    		
	    		   		    			 }
	     			    	 }	
	     			    	else
	     			    	{
	     			    		var valueX = this.innerHTML.substring(this.innerHTML.indexOf("id=\"")+4,this.innerHTML.length-9);
	    			    		
	      			    		$('.apis_checkbox').each(function(i, obj) 
	    		   				{	 
	      			    			var uncheck = $(obj).hasClass( "glyphicon-unchecked");
	      			    			
	      			    			if(valueX==obj.id && uncheck)
	    		    		    	{
	      			    				$(obj).attr('class','apis_checkbox apis_checkbox_glyphicon_glyphicon_ok glyphicon glyphicon-ok');
	    		    		    	}		    		    	
	    		    		    	else if(valueX==obj.id && !uncheck)
	    		    		    	{
	    		    		    		$(obj).attr('class','apis_checkbox apis_checkbox_glyphicon_glyphicon_unchecked glyphicon glyphicon-unchecked');
	    		    		    	}
	    		    		    	  			    			
	    		   				 });
	     			    		
	     			    		if($('.apis_checkbox_glyphicon_glyphicon_ok').length <=0)
		   		    		     {
		   			    			 	 var idProp = {idProp: 'id'};
		    				    		 idProp['id'] = "All";				    		 
		    				    		 dummyModel.push(idProp);
		    				    		 rootScope.updateDashboardFilters("APIs",dummyModel);
		    				    		 
		    				    		 scope.api="All";
		    				    		 
		    				    		 rootScope.ReLoadDashboardFromViewComboBox("APIs","All");
		   			    		 }
		   			    		 else
		   		    			 {
			   				    	$('.apis_checkbox_glyphicon_glyphicon_ok').each(function(i, obj) 
			   				    	{	 
			   				    		 var idProp = {idProp: 'id'};
			   				    		 idProp['id'] = obj.id;				    		 
			   				    		 dummyModel.push(idProp);	
			   				    	});
			   				    	
			   				    	rootScope.updateDashboardFilters("APIs",dummyModel);	    			 			
		    			 			scope.api=scope.getCommaSeparatedString(dummyModel);    			 			
						    		rootScope.ReLoadDashboardFromViewComboBox("APIs",scope.api);						    		
		   		    			 }
	     			    	}	
	     				});
	     			    
	     			    
	        	
			        	rootScope.backendCharttable = $('#backendViewGridId').dataTable({
							"serverSide": false,
							"processing": false,
					        "sAjaxSource": backendViewGridUrl,
					        "aoColumns": [

					                      {   "sTitle": "","mDataProp": null, "sWidth": "20px", "bSortable": false},
					                      {   "sTitle":"Backends","mDataProp": "backends","bSortable": true}					                     
					          ],
					        //"columns": [{"data": "backends","bSortable": true}],
					     "bAutoWidth": false,
					     "bScrollCollapse": false,
					     "bJQueryUI": true,
					     "search": {"caseInsensitive": true},
					     "sServerMethod": "POST",	     
					     "iDisplayLength": 5,
					     "bPaginate" : false,
					     "bInfo":false,
					     "lengthMenu": [5, 10, 25, 50, 100],
					     "sPaginationType": "full_numbers",
					     "order": [[ 0, "asc" ]],
					     //"bFilter": true,
					     "sScrollY" : "200",
					     	"fnCreatedRow": function( nRow, aData, iDataIndex ) 
					     	{

					     		var clientModel = rootScope.getDashboardFilterModel("Backends");
					     		
					     		var found = false;
					     		
			     				angular.forEach(clientModel, function (value) 
				                {
									 var idProp = value["id"];
									 
									if(aData.clients==idProp)
									{
										found=true; 
									}
				                });
					     		
			     				if(found)
			     				{
			     					$('td:eq(0)', nRow).html( '<span class="backend_checkbox backend_checkbox_glyphicon_glyphicon_ok glyphicon glyphicon-ok" id="'+aData.backends+'"></span>');
			     				}
			     				else
			     				{
			     					$('td:eq(0)', nRow).html( '<span class="backend_checkbox backend_checkbox_glyphicon_glyphicon_unchecked glyphicon glyphicon-unchecked" id="'+aData.backends+'"></span>');
			     				}
					     		
					     		
					     		
					     	}
					    });
	        	
			        	
	        	
	        			$('#backendViewGridId tbody').on('click', 'tr', function() 
	     			    {
	     			
	     			        var position = rootScope.backendCharttable.fnGetPosition(this); // getting the clicked row position
	     			        var contactId = rootScope.backendCharttable.fnGetData(position); // getting the value of the first (invisible) column
	     			        
	     			        if ($(this).hasClass('selected')) 
	     			        {
	     			            $(this).removeClass('selected');
	     			        } 
	     			        else
	     			        {
	     			        	rootScope.backendCharttable.$('tr.selected').removeClass('selected');
	     			            $(this).addClass('selected');
	     			        }
	     			    });	
	     	        			    
	     	        			    
	     			    $('#backendViewGridId tbody').on( 'click', 'td', function () 
	     				{
	     			    	var position = rootScope.backendCharttable.fnGetPosition(this); // getting the clicked row position
	     			    	//var aData = rootScope.combinedCharttable.fnGetData( position[0] );
	     			    	
	     			    	var dummyModel = [];
	     			    	
	     			    	 if(position[1]==1)// Backend cell clicked
	     			    	 {
	     			    		var valueX = this.innerHTML;
	     			    		 
     			    				$('.backend_checkbox').each(function(i, obj) 
    	    		   				{	 
    	      			    			var uncheck = $(obj).hasClass( "glyphicon-unchecked");
    	      			    			
    	      			    			if(valueX==obj.id && uncheck)
    	    		    		    	{
    	      			    				$(obj).attr('class','backend_checkbox backend_checkbox_glyphicon_glyphicon_ok glyphicon glyphicon-ok');
    	    		    		    	}		    		    	
    	    		    		    	else if(valueX==obj.id && !uncheck)
    	    		    		    	{
    	    		    		    		$(obj).attr('class','backend_checkbox backend_checkbox_glyphicon_glyphicon_unchecked glyphicon glyphicon-unchecked');
    	    		    		    	}
    	    		    		    	  			    			
    	    		   				 });
    	     			    		 
    	     			    		 if($('.backend_checkbox_glyphicon_glyphicon_ok').length <=0)
    		   		    		     {
    		   			    			 	 var idProp = {idProp: 'id'};
    		    				    		 idProp['id'] = "All";				    		 
    		    				    		 dummyModel.push(idProp);
    		    				    		 rootScope.updateDashboardFilters("Backends",dummyModel);
    		    				    		 scope.backend="All";
    		    				    		 rootScope.ReLoadDashboardFromViewComboBox("Backends","All");
    		   			    		 }
    		   			    		 else
    		   		    			 {
    	   			    		    	$('.backend_checkbox_glyphicon_glyphicon_ok').each(function(i, obj) 
    			   				    	{	 
    	   			    		    		 var idProp = {idProp: 'id'};
    			   				    		 idProp['id'] = obj.id;				    		 
    			   				    		 dummyModel.push(idProp);
    			   				    	});
    	   			    		    	
    	   			    		    	rootScope.updateDashboardFilters("Backends",dummyModel);	    			 			
    		    			 			scope.backend=scope.getCommaSeparatedString(dummyModel);    			 			
    						    		rootScope.ReLoadDashboardFromViewComboBox("Backends",scope.backend);
    		   		    			 } 
	     			    	 }
	     			    	else
	     			    	{
	     			    		
	     			    		var valueX = this.innerHTML.substring(this.innerHTML.indexOf("id=\"")+4,this.innerHTML.length-9);
	    			    		
	      			    		$('.backend_checkbox').each(function(i, obj) 
	    		   				{	 
	      			    			var uncheck = $(obj).hasClass( "glyphicon-unchecked");
	      			    			
	      			    			if(valueX==obj.id && uncheck)
	    		    		    	{
	      			    				$(obj).attr('class','backend_checkbox backend_checkbox_glyphicon_glyphicon_ok glyphicon glyphicon-ok');
	    		    		    	}		    		    	
	    		    		    	else if(valueX==obj.id && !uncheck)
	    		    		    	{
	    		    		    		$(obj).attr('class','backend_checkbox backend_checkbox_glyphicon_glyphicon_unchecked glyphicon glyphicon-unchecked');
	    		    		    	}
	    		    		    	  			    			
	    		   				 });
	     			    		 
	     			    		 if($('.backend_checkbox_glyphicon_glyphicon_ok').length <=0)
		   		    		     {
		   			    			 	 var idProp = {idProp: 'id'};
		    				    		 idProp['id'] = "All";				    		 
		    				    		 dummyModel.push(idProp);
		    				    		 rootScope.updateDashboardFilters("Backends",dummyModel);
		    				    		 scope.backend="All";
		    				    		 rootScope.ReLoadDashboardFromViewComboBox("Backends","All");
		   			    		 }
		   			    		 else
		   		    			 {
	   			    		    	$('.backend_checkbox_glyphicon_glyphicon_ok').each(function(i, obj) 
			   				    	{	 
	   			    		    		 var idProp = {idProp: 'id'};
			   				    		 idProp['id'] = obj.id;				    		 
			   				    		 dummyModel.push(idProp);
			   				    	});
	   			    		    	
	   			    		    	rootScope.updateDashboardFilters("Backends",dummyModel);	    			 			
		    			 			scope.backend=scope.getCommaSeparatedString(dummyModel);    			 			
						    		rootScope.ReLoadDashboardFromViewComboBox("Backends",scope.backend);
		   		    			 }
	     			    	}	
	     			    	 
	     			    	 
	     				});
		    
	};
	
	
	
	this.submitDashboard = function(scope,rootScope,http,url, params)
	{
		rootScope.launch('wait');		
    	var apitootlacount = http.post(url+params);
        apitootlacount.then(
            function(payload) 
            {
                rootScope.total_federated_apis = payload.data.result.total_federated_apis;
                rootScope.total_non_federated_apis = payload.data.result.total_non_federated_apis;
                rootScope.total_programs = payload.data.result.total_programs;
                rootScope.total_clients = payload.data.result.total_clients;
                rootScope.total_profiles = payload.data.result.total_profiles;
                rootScope.total_federated_bundles = payload.data.result.total_federated_bundles;
                rootScope.non_federeated_bundles = payload.data.result.non_federeated_bundles;
                rootScope.total_adapters = payload.data.result.total_adapters;
                
                rootScope.totalApis = parseInt(rootScope.total_federated_apis + rootScope.total_non_federated_apis);
               
                rootScope.total_federated_apis = parseInt(payload.data.result.total_federated_apis);
                rootScope.total_non_federated_apis = parseInt(payload.data.result.total_non_federated_apis);
                
                
                if(parseInt(payload.data.result.total_federated_apis) <= 0 &&  parseInt(payload.data.result.total_non_federated_apis) <= 0)
                {
                	rootScope.total_federated_apis=100;
                	rootScope.total_non_federated_apis=100;  
                	
                	 rootScope.donutChart1.setData([{
                         label: "NO Data",
                         value: rootScope.total_federated_apis
                     }, {
                         label: "No Data",
                         value: rootScope.total_non_federated_apis
                     }],true);
                }
                else
                {
                	 rootScope.donutChart1.setData([{
                         label: "Number of Federated Apis",
                         value: rootScope.total_federated_apis
                     }, {
                         label: "Number of Non Federated Apis",
                         value: rootScope.total_non_federated_apis
                     }],true);
                      
                }                
              
                var chartArea = http.get('/api360-service/exec-dashboard/api360/sig/consumer/for/chart.json?'+params);
                chartArea.then(
                function(payload) 
                {
                	rootScope.areaChart1.setData(payload.data.result);
                });
                
                
                 var combinedViewGridUrl = '/api360-service/exec-dashboard/api360/combined/view.json?limit=10000&'+params;
	           	 var clientViewGridUrl = '/api360-service/exec-dashboard/api360/client/view.json?'+params;
	           	 var programViewGridUrl = '/api360-service/exec-dashboard/api360/program/view.json?'+params;
	           	 var apiViewGridUrl = '/api360-service/exec-dashboard/api360/api/view.json?'+params;
	           	 var backendViewGridUrl = '/api360-service/exec-dashboard/api360/backend/view.json?'+params;
            	 
	           	if(rootScope.combinedCharttable!=undefined)
                {
	           		rootScope.combinedCharttable.api().ajax.url(combinedViewGridUrl).load(scope.combinedViewGridCallback); 
                }
            	
            	rootScope.clientCharttable.api().ajax.url(clientViewGridUrl).load(scope.clientViewGridCallback);
            	rootScope.programCharttable.api().ajax.url(programViewGridUrl).load(scope.programViewGridCallback);
            	rootScope.apiCharttable.api().ajax.url(apiViewGridUrl).load(scope.apiViewGridCallback);
            	rootScope.backendCharttable.api().ajax.url(backendViewGridUrl).load(scope.backendViewGridCallback);
            	
            	rootScope.$broadcast('dialogs.wait.complete');
            	
            });
	};
	
	
	
	
	
	
	
	this.submitViewDashboard = function(scope,rootScope,http,url, params,name,value)
	{
		rootScope.launch('wait');		
    	var apitootlacount = http.post(url+params);
        apitootlacount.then(
            function(payload) 
            {
                rootScope.total_federated_apis = payload.data.result.total_federated_apis;
                rootScope.total_non_federated_apis = payload.data.result.total_non_federated_apis;
                rootScope.total_programs = payload.data.result.total_programs;
                rootScope.total_clients = payload.data.result.total_clients;
                rootScope.total_profiles = payload.data.result.total_profiles;
                rootScope.total_federated_bundles = payload.data.result.total_federated_bundles;
                rootScope.non_federeated_bundles = payload.data.result.non_federeated_bundles;
                rootScope.total_adapters = payload.data.result.total_adapters;
                
                rootScope.totalApis = parseInt(rootScope.total_federated_apis + rootScope.total_non_federated_apis);
               
                rootScope.total_federated_apis = parseInt(payload.data.result.total_federated_apis);
                rootScope.total_non_federated_apis = parseInt(payload.data.result.total_non_federated_apis);
                
                
                if(parseInt(payload.data.result.total_federated_apis) <= 0 &&  parseInt(payload.data.result.total_non_federated_apis) <= 0)
                {
                	rootScope.total_federated_apis=100;
                	rootScope.total_non_federated_apis=100;  
                	
                	 rootScope.donutChart1.setData([{
                         label: "NO Data",
                         value: rootScope.total_federated_apis
                     }, {
                         label: "No Data",
                         value: rootScope.total_non_federated_apis
                     }],true);
                }
                else
                {
                	 rootScope.donutChart1.setData([{
                         label: "Number of Federated Apis",
                         value: rootScope.total_federated_apis
                     }, {
                         label: "Number of Non Federated Apis",
                         value: rootScope.total_non_federated_apis
                     }],true);
                      
                } 
                
                var chartArea = http.get('/api360-service/exec-dashboard/api360/sig/consumer/for/chart.json?'+params);
                chartArea.then(
                function(payload) 
                {
                	rootScope.areaChart1.setData(payload.data.result);
                });
              
                if(rootScope.combinedCharttable!=undefined)
                {
                  var combinedViewGridUrl = '/api360-service/exec-dashboard/api360/combined/view.json?limit=10000&'+params;
                  rootScope.combinedCharttable.api().ajax.url(combinedViewGridUrl).load(scope.combinedViewGridCallback); 
                }
                 
                 
                 if("Programs"!=name || value=="All")
                 {
                	 var programViewGridUrl = '/api360-service/exec-dashboard/api360/program/view.json?'+params;
    	           	 rootScope.programCharttable.api().ajax.url(programViewGridUrl).load(scope.programViewGridCallback); 
                 }
                 
                 if("Clients"!=name || value=="All")
                 {
                	 var clientViewGridUrl = '/api360-service/exec-dashboard/api360/client/view.json?'+params;
    	           	 rootScope.clientCharttable.api().ajax.url(clientViewGridUrl).load(scope.clientViewGridCallback); 
                 }
                 
                 if("APIs"!=name || value=="All")
                 {
                	 var apiViewGridUrl = '/api360-service/exec-dashboard/api360/api/view.json?'+params;
    	           	 rootScope.apiCharttable.api().ajax.url(apiViewGridUrl).load(scope.apiViewGridCallback);
                 }
                 
                 if("Backends"!=name || value=="All")
                 {
                	 var backendViewGridUrl = '/api360-service/exec-dashboard/api360/backend/view.json?'+params;
    	           	 rootScope.backendCharttable.api().ajax.url(backendViewGridUrl).load(scope.backendViewGridCallback);
                 }
	    		 
            	 rootScope.$broadcast('dialogs.wait.complete');
            	
            });
	};
	
	
    
});


