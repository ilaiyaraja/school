'use strict';

app.service('transactionTraceService', function()
{
	
	
	this.showHideFilter = function(scope,rootScope)
	{
		if(scope.transationTraceShowHideFilter)
		{
			$( "#transaction_trace_filters_id" ).fadeOut( "slow");
		}
		else
		{
			window.setTimeout(function()
			{
	            $(window).resize();
	            $(window).resize();
	        }, 1000);
			
			$( "#transaction_trace_filters_id" ).fadeIn( "slow");
		}
	};
	
	
	this.iframeLoadedCallBack = function(scope,rootScope)
	{	
		$("#transaction_trace_iframe").height( $( window ).height() - 150 );
	};
	
	
	this.loadTrace = function(scope,rootScope,http,interval)
	{	
		
		if(scope.trace_radio_model=="image_trace")
		{	
			if(scope.conversation_id==null || scope.conversation_id==undefined || scope.conversation_id=="")
			{
				this.loadDefaultImageTraceWithOutConvIdAPIs(scope,rootScope,http,interval);
			}
			else
			{
				this.loadDefaultImageTraceWithConvIdAPIs(scope,rootScope,http,interval);
			}
		}
		else
		{
			if(scope.conversation_id==null || scope.conversation_id==undefined || scope.conversation_id=="")
			{
				this.loadDefaultTextTraceWithOutConvIdAPIs(scope,rootScope,http,interval);
			}
			else
			{
				this.loadDefaultTextTraceWithConvIdAPIs(scope,rootScope,http,interval);
			}			
			
		}
	};
	
	
	this.loadDefaultImageTraceWithOutConvIdAPIs = function(scope,rootScope,http,interval)
	{
		if(scope.selected_interface!=null && scope.selected_versionsmodel !=null)
		{
			var tempURL;
			
			if(scope.selected_versionsmodel.id==undefined)
			{
				//tempURL = "http://hltv0577.hydc.sbc.com:8080/sigView?api="+scope.selected_interface+"&version="+scope.selected_version;
				tempURL = "/sigView?api="+scope.selected_interface+"&version="+scope.selected_version;				
			}
			else
			{
				//tempURL = "http://hltv0577.hydc.sbc.com:8080/sigView?api="+scope.selected_interface+"&version="+scope.selected_versionsmodel.id;
				tempURL = "/sigView?api="+scope.selected_interface+"&version="+scope.selected_versionsmodel.id;
			}
						
			$("#transaction_trace_iframe").show();
	  		$("#text_trace_id").hide();
	  		
	  		if(scope.image_trace_without_convID_url!=tempURL)
	  		{
	  			scope.image_trace_without_convID_url=tempURL;
	  			$("#transaction_trace_iframe").attr("src",scope.image_trace_without_convID_url);
	  		}
		}
		else
		{
			http.get("/atw-service/sig/apis.json")
			.success(function(data) 
			{
				scope.gridOptions.data = data.interfaceName;
				scope.selected_interface = data.interfaceName[0].interfaceName;								
				interval( function() {scope.gridApi.selection.selectRow(scope.gridOptions.data[0]);}, 0, 1);	
			});
		}
	};
	
	
	this.loadDefaultTextTraceWithOutConvIdAPIs = function(scope,rootScope,http,interval)
	{
		
		if(scope.selected_interface!=null && scope.selected_versionsmodel!=null)
		{
			var tempURL;
			
			if(scope.selected_versionsmodel.id==undefined)
			{
				tempURL = "/atw-service/sig/trace/interface.json?signature=&interfaceName="+scope.selected_interface+"&version="+scope.selected_version;
			}
			else
			{
				tempURL = "/atw-service/sig/trace/interface.json?signature=&interfaceName="+scope.selected_interface+"&version="+scope.selected_versionsmodel.id;
			}
			
			
			  $("#transaction_trace_iframe").hide();
			  $("#text_trace_id").show();
			  
			  if(scope.text_trace_without_convID_url!=tempURL)
			  {
			    scope.text_trace_without_convID_url=tempURL;
				  
				  http.get(scope.text_trace_without_convID_url)
				  .success(function(data)
				  {
					 var trace = data.trace;				 
					 $("#text_trace_id").html("<pre>"+trace+"</pre>");
				  });
			  }
		}
		else
		{
			http.get("/atw-service/sig/apis.json")
			.success(function(data) 
			{
				scope.gridOptions.data = data.interfaceName;
				scope.selected_interface = data.interfaceName[0].interfaceName;
				interval( function() {scope.gridApi.selection.selectRow(scope.gridOptions.data[0]);}, 0, 1);						
			});
		}
		
		
	};
	
	
	this.loadDefaultImageTraceWithConvIdAPIs = function(scope,rootScope,http,interval)
	{
		
		if(scope.selected_sigID!=null && scope.conversation_id!=null)
		{
			$("#transaction_trace_iframe").show();
		    $("#text_trace_id").hide();	
		    
		    //if(scope.image_trace_with_convID_url!="http://hltv0577.hydc.sbc.com:8080/sigView?sigId="+scope.selected_sigID+"&convId="+scope.conversation_id)
		    if(scope.image_trace_with_convID_url!="/sigView?sigId="+scope.selected_sigID+"&convId="+scope.conversation_id)
		    {
		    	//scope.image_trace_with_convID_url = "http://hltv0577.hydc.sbc.com:8080/sigView?sigId="+scope.selected_sigID+"&convId="+scope.conversation_id;
		    	scope.image_trace_with_convID_url = "/sigView?sigId="+scope.selected_sigID+"&convId="+scope.conversation_id;
				$("#transaction_trace_iframe").attr("src",scope.image_trace_with_convID_url);
		    }
		}
		else
		{
			http.get("/atw-service/sig/distinct/conv.json?conversationId="+scope.conversation_id)
			.success(function(data) 
			{
				
				if(data.sigLogItem.length <=0)
				{
					scope.no_record_found = "No Records Found!! Loaded default APIs";						
					this.loadTrace(scope,rootScope,http,interval);
				}
				else
				{	
					scope.gridOptions.data = data.sigLogItem;	
					interval( function() {scope.gridApi.selection.selectRow(scope.gridOptions.data[0]);}, 0, 1);					
				}
			});
		}
			
	};
	
	
	this.loadDefaultTextTraceWithConvIdAPIs = function(scope,rootScope,http,interval)
	{
		if(scope.selected_sigID!=null && scope.conversation_id!=null)
		{
			$("#transaction_trace_iframe").hide();
		    $("#text_trace_id").show();	
		   
		    if(scope.text_trace_with_convID_url!="/atw-service/sig/trace/conversation/sig.json?sigId="+scope.selected_sigID+"&version="+scope.selected_version)
		    {
		    	scope.text_trace_with_convID_url = "/atw-service/sig/trace/conversation/sig.json?sigId="+scope.selected_sigID+"&version="+scope.selected_version;
			  
			  http.get(scope.image_trace_with_convID_url)
			  .success(function(data)
			  {
				var trace = data.trace;
				$("#text_trace_id").html("<pre>"+trace+"</pre>");
			  }); 
		    } 
		}
		else
		{
			http.get("/atw-service/sig/distinct/conv.json?conversationId="+scope.conversation_id)
			.success(function(data) 
			{
				if(data.sigLogItem.length <=0)
				{
					scope.no_record_found = "No Records Found!! Loaded default APIs";						
					this.loadTrace(scope,rootScope,http,interval);
				}
				else
				{
				  scope.gridOptions.data = data.sigLogItem;
				  interval( function() {scope.gridApi.selection.selectRow(scope.gridOptions.data[0]);}, 0, 1);
				}
			});
		}
	};
	

	  this.fnOne = function($scope,$rootScope,$http,$interval,row,from)	 
	  {
		  $scope.selectedRow = row;

		  if($("#conversation_id").val()!=null && $("#conversation_id").val()!=undefined && $("#conversation_id").val()!="")
		  {
				 $scope.selected_versionsmodel = [];
				 $scope.versionsdata = [];
				
				  var sigId = row.entity.sigId;
				  var csiSourceVersion = row.entity.version; 
				 
				  
				  $scope.selected_sigID=sigId;
				  
				  if(row.entity.interfaceName==null || row.entity.interfaceName==undefined || row.entity.interfaceName=="")
				  {
					  $scope.selected_interface=row.entity.adapter;
				  }
				  else
				  {
					  $scope.selected_interface=row.entity.interfaceName;
				  }
				  
				  
				  
				  $scope.selected_versionsmodel = csiSourceVersion;
				  $scope.image_trace_version = csiSourceVersion;  
				  $rootScope.trace_header = $scope.selected_interface+"	"+row.entity.version;

				  $scope.selected_sigID = sigId;
				  $scope.selected_version = row.entity.version;
				  
				if($scope.trace_radio_model=="image_trace")
				{
					$("#transaction_trace_iframe").show();
					$("#text_trace_id").hide();						   
				    
					//if($scope.image_trace_with_convID_url!="http://hltv0577.hydc.sbc.com:8080/sigView?sigId="+$scope.selected_sigID+"&convId="+$scope.conversation_id+"&version="+$scope.selected_versionsmodel)
					if($scope.image_trace_with_convID_url!="/sigView?sigId="+$scope.selected_sigID+"&convId="+$scope.conversation_id+"&version="+$scope.selected_versionsmodel)
					{
						//$scope.image_trace_with_convID_url = "http://hltv0577.hydc.sbc.com:8080/sigView?sigId="+$scope.selected_sigID+"&convId="+$scope.conversation_id+"&version="+$scope.selected_versionsmodel;
						$scope.image_trace_with_convID_url = "/sigView?sigId="+$scope.selected_sigID+"&convId="+$scope.conversation_id+"&version="+$scope.selected_versionsmodel;				    
						$("#transaction_trace_iframe").attr("src",$scope.image_trace_with_convID_url);
					}
					  
				}  
				else
				{	
					$("#transaction_trace_iframe").hide();
					$("#text_trace_id").show();
					
					if($scope.text_trace_with_convID_url!="/atw-service/sig/trace/conversation/sig.json?sigId="+$scope.selected_sigID+"&version="+$scope.selected_version)
					{
					  $scope.text_trace_with_convID_url = "/atw-service/sig/trace/conversation/sig.json?sigId="+$scope.selected_sigID+"&version="+$scope.selected_version;
					
					  $http.get($scope.text_trace_with_convID_url)
					  .success(function(data)
					  {
						var trace = data.trace;
						$("#text_trace_id").html("<pre>"+trace+"</pre>");
					  });
					}
				}
			}				
			else
			{
				$scope.selected_interface=row.entity.interfaceName;					
				
				if($scope.trace_radio_model=="image_trace")
				{
					$("#transaction_trace_iframe").show();
			  		$("#text_trace_id").hide();
			  		
			  		if($scope.selected_version==null)
			  		{
						$http.get("/atw-service/sig/interface/versions.json?interfaceName="+row.entity.interfaceName)
						.success(function(data)
						{
							$scope.versionsdata =  data.versions;	
							$scope.selected_version = data.versions[0].id;
							$rootScope.trace_header = row.entity.interfaceName+"	"+data.versions[0].id;
							$scope.selected_interface = row.entity.interfaceName;
							
							//if($scope.image_trace_without_convID_url!="http://hltv0577.hydc.sbc.com:8080/sigView?api="+$scope.selected_interface+"&version="+data.versions[0].id)
							if($scope.image_trace_without_convID_url!="/sigView?api="+$scope.selected_interface+"&version="+data.versions[0].id)
							{
								//$scope.image_trace_without_convID_url = "http://hltv0577.hydc.sbc.com:8080/sigView?api="+$scope.selected_interface+"&version="+data.versions[0].id;
								$scope.image_trace_without_convID_url = "/sigView?api="+$scope.selected_interface+"&version="+data.versions[0].id;						
								$("#transaction_trace_iframe").attr("src",$scope.image_trace_without_convID_url);
							}
						});
			  		}
			  		else
			  		{
			  			$rootScope.trace_header = $scope.selected_interface+"	"+$scope.selected_version;
			  			
			  			//if($scope.image_trace_without_convID_url!="http://hltv0577.hydc.sbc.com:8080/sigView?api="+$scope.selected_interface+"&version="+$scope.selected_version)
			  			if($scope.image_trace_without_convID_url!="/sigView?api="+$scope.selected_interface+"&version="+$scope.selected_version)
						{
			  				//$scope.image_trace_without_convID_url = "http://hltv0577.hydc.sbc.com:8080/sigView?api="+$scope.selected_interface+"&version="+$scope.selected_version;
			  				$scope.image_trace_without_convID_url = "/sigView?api="+$scope.selected_interface+"&version="+$scope.selected_version;						
			  				$("#transaction_trace_iframe").attr("src",$scope.image_trace_without_convID_url);
						}
			  		}
					  
				}  
				else
				{	
					  $("#transaction_trace_iframe").hide();
					  $("#text_trace_id").show();
					  					
					  if($scope.selected_version==null)
				  	  {
						  $http.get("/atw-service/sig/interface/versions.json?interfaceName="+row.entity.interfaceName)
							.success(function(data)
							{
								$scope.versionsdata =  data.versions;	
								$scope.selected_version = data.versions[0].id;
								$rootScope.trace_header = row.entity.interfaceName+"	"+data.versions[0].id;
								$scope.selected_interface = row.entity.interfaceName;
														
								if($scope.text_trace_without_convID_url !="/atw-service/sig/trace/interface.json?signature=&interfaceName="+row.entity.interfaceName+"&version="+$scope.selected_version)
								{
									$scope.text_trace_without_convID_url = "/atw-service/sig/trace/interface.json?signature=&interfaceName="+row.entity.interfaceName+"&version="+$scope.selected_version;
									
									  $http.get($scope.text_trace_without_convID_url)
									  .success(function(data)
									  {
										  var trace = data.trace;
										  $("#text_trace_id").html("<pre>"+trace+"</pre>");
									  }); 
								}							
							});
				  		}
					 else
					 {
						 $rootScope.trace_header = $scope.selected_interface+"	"+$scope.selected_version;
						 
						 if($scope.text_trace_without_convID_url !="/atw-service/sig/trace/interface.json?signature=&interfaceName="+$scope.selected_interface+"&version="+$scope.selected_version)
						 {
							  $scope.text_trace_without_convID_url = "/atw-service/sig/trace/interface.json?signature=&interfaceName="+$scope.selected_interface+"&version="+$scope.selected_version;
								
							  $http.get($scope.text_trace_without_convID_url)
							  .success(function(data)
							  {
								  var trace = data.trace;
								  $("#text_trace_id").html("<pre>"+trace+"</pre>");
							  });
						 }
					 }
				}				
			}	  			 
	   };
	
	
});