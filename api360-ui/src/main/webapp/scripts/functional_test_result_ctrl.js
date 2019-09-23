'use strict'

/*created by Abhimanyu
 * created Date 4/14/2015
 */

function FunctionalTestResultCtrl($scope,$rootScope, $resource, $http, $location,$timeout,$modal,functionalTestResultService,$cookies){
	
	
	$scope.gridHeaderMessages="Functional Test Result";
	$rootScope.batchJobStatus =   $rootScope.getBatchJobDetail("functionalTestResultTaskLetJob",true);	
	$scope.batchJobStatusDetail=$rootScope.batchJobStatus.lastUpdated;
	
    $scope.funtestresultShowHideFilter = true;
	
	$scope.funtestresultShowHide= function()
	{
		if($scope.funtestresultShowHideFilter)
		{
			$( "#functionTestFilterId" ).fadeOut( "slow");
		}
		else
		{
			$( "#functionTestFilterId" ).fadeIn( "slow");
		}
		
		$timeout(function() {
	    	$( $.fn.dataTable.tables( true ) ).DataTable().columns.adjust().draw();		        
	    }, 1000);
		
	};
	
	
	$rootScope.renderGrid = function()
	{
		 functionalTestResultService.renderFunctionalTestResultGrid($scope,$rootScope,$http,$location);
		 $rootScope.submitDefaultFunctionalTestResultSearch();
	};
	
	
	
	$rootScope.submitDefaultFunctionalTestResultSearch = function()
	 {
	
		var url = '/api360-service/functional-test/reports.json?';
		   
		var params =null;
		
		if($rootScope.urlparams!=undefined)
		{
		
			
			params = 
			 'api=' + $rootScope.urlparams.APIs+ 			 
			 '&backend=' + $rootScope.urlparams.Backends+
			 '&pmt=' + $rootScope.urlparams.PMTs+
			 '&release=' + $rootScope.urlparams.Release+
			 '&bundle=' + $rootScope.urlparams.Bundles+
			 '&pid=' + $rootScope.urlparams.PIDs;
			
		}
		else
		{
			
			
			
			
			  params =  
			 'api=' + $scope.getCommaSeparatedString($rootScope.getFunTestResultGlobalFilterModel("APIs")) + 
			 '&backend=' + $scope.getCommaSeparatedString($rootScope.getFunTestResultGlobalFilterModel("Backends"))+
			 '&pmt=' + $scope.getCommaSeparatedString($rootScope.getFunTestResultGlobalFilterModel("PMTs"))+
			 '&release=' + $scope.getCommaSeparatedStringRelease($rootScope.getFunTestResultGlobalFilterModel("Release"))+
			 '&bundle=' + $scope.getCommaSeparatedString($rootScope.getFunTestResultGlobalFilterModel("Bundles"))+
			 '&pid=' + $scope.getCommaSeparatedString($rootScope.getFunTestResultGlobalFilterModel("PIDs"));
			
		}	
		
	   
		$rootScope.launch('wait');	
		
		$rootScope.funtestresultTable.ajax.url(url+params).load($scope.searchGridCallback);
	};
	 
	
	$rootScope.submitFunctionalTestResultSearch = function()
	{
		var url = '/api360-service/functional-test/reports.json?';
		   
		var params =null;
		
		/*if($rootScope.urlparams!=undefined)
		{
		
			
			params = 
			 'api=' + $rootScope.urlparams.APIs+ 			 
			 '&backend=' + $rootScope.urlparams.Backends+
			 '&pmt=' + $rootScope.urlparams.PMTs+
			 '&release=' + $rootScope.urlparams.Release+
			 '&bundle=' + $rootScope.urlparams.Bundles;
			 
			console.log("Inside if");
			
			
		}
		else
		{*/
			
			//console.log("Inside else");
			
			
			  params =  
			 'api=' + $scope.getCommaSeparatedString($rootScope.getFunTestResultFilterModel("APIs")) + 
			 '&backend=' + $scope.getCommaSeparatedString($rootScope.getFunTestResultFilterModel("Backends"))+
			 '&pmt=' + $scope.getCommaSeparatedString($rootScope.getFunTestResultFilterModel("PMTs"))+
			 '&release='+$scope.getCommaSeparatedString($rootScope.getFunTestResultFilterModel("Release"))+
			 '&bundle='+$scope.getCommaSeparatedString($rootScope.getFunTestResultFilterModel("Bundles"))+
			 '&pid=' + $scope.getCommaSeparatedString($rootScope.getFunTestResultFilterModel("PIDs"));
			
		//}	
		
	
		$rootScope.launch('wait');	
		
		
		$rootScope.funtestresultTable.ajax.url(url+params).load($scope.searchGridCallback);	

	};
	
	
	$scope.searchGridCallback = function ()
	{
		$rootScope.$broadcast('dialogs.wait.complete');
		
		$('#funtestresultID tbody tr td').each( function() 
	    {
		    this.setAttribute( 'title', $(this).text());
		});
	};
	
	
	
	
	
	$scope.getCommaSeparatedString = function(json) 
	{ 
		if(json==undefined || json==null)
		{
			return "All";
		}
		
		var result = "";
		var found =false;
		
		for (var dString in json) 
		{ 
			result += json[dString].id + ",";
			found=true;
		}
		
		
		var res = result.match(/All,/g);
		
		if(res!=null && result.split(",").length > 1)
		{
			result = result.replace("All,", "");
		}
				
		if(!found || result=="")
		{
			return "All";
		}
		
		return result.replace(/,(\s+)?$/, '');
	};
	
	
	
	$scope.getCommaSeparatedStringRelease = function(json) 
	{ 
		if(json==undefined || json==null)
		{
			return "2015.07";
		}
		
		var result = "";
		var found =false;
		
		for (var dString in json) 
		{ 
			result += json[dString].id + ",";
			found=true;
		}
		
		
		var res = result.match(/All,/g);
		
		if(res!=null && result.split(",").length > 1)
		{
			result = result.replace("All,", "");
		}
				
		if(!found || result=="")
		{
			return "All";
		}
		
		return result.replace(/,(\s+)?$/, '');
	};
	
	
	
	
	
	
	
	
	$('#funtestresultID tbody').on( 'click', 'tr', function () 
    {
		var position = table.fnGetPosition(this); // getting the clicked row position
		var contactId = table.fnGetData(position); // getting the value of the first (invisible) column
		//console.log(contactId.account_Type);
		
		if ( $(this).hasClass('selected') ) 
        {
            $(this).removeClass('selected');
        }
        else 
        {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    } );
	
	
	
	
	
	
	
	
		
	
	
	$rootScope.formatExtraInfo= function(resultNotes,fun_id){
		
        
         
		 var notes='' ;
		 var createdDate ='';
         var createdBy ='';
         var modifiedDate ='';
         var modifiedBy  ='';
         var notesText='';
		 
		
		  notes  = (resultNotes.data.result[0].notes) == 'NA' ? '': resultNotes.data.result[0].notes ; 
		  createdDate = (resultNotes.data.result[0].createddate) == 'NA' ? '': resultNotes.data.result[0].createddate ; 
          createdBy = (resultNotes.data.result[0].createdby) == 'NA'  ? '': resultNotes.data.result[0].createdby; 
          modifiedDate =( resultNotes.data.result[0].modifieddate) == 'NA' ? '' : resultNotes.data.result[0].modifieddate ;
          modifiedBy = (resultNotes.data.result[0].modifiedby) == 'NA' ? '' : resultNotes.data.result[0].modifiedby ;
          notesText=notes;
          
          
          if(notesText== null || notesText== 'null')
          {
        	  notesText='';
          }
           
         
         if(createdDate== null || createdDate== 'null')
         {
        	 createdDate='';
         }
         
         if(createdBy== null || createdBy== 'null'){
        	 createdBy='';
         }
         
         if(modifiedDate== null || modifiedDate== 'null'){
        	 
        	 modifiedDate='';
         }
         
         if(modifiedBy== null || modifiedBy== 'null'){
        	 modifiedBy='';
         }
         
     	
		var htmlStr= '<div class="container">'+ 
			         '<div class="row">'+
					 '<div class="col-md-12"><span style="padding:15px;"><strong>Created Date:</strong> '+createdDate+'</span><span style="padding:15px;"><strong>Created By:</strong> '+createdBy+'</span></div>'+ 
					 '</div>'+
					'<br>'+
					'<div class="row">'+
			        '<div class="col-md-12"><span style="padding:15px;"><strong>ModifiedDate:</strong> '+modifiedDate+'</span><span style="padding:15px;"><strong>Modified By:</strong> '+modifiedBy+'</span></div>'+
			        '</div>'+
			        '<div class="row">'+
			        '<div class="col-md-12"><div style="padding:15px;"><span><strong>Notes:</strong></span>'+
			        '<span><textarea id="notesId'+fun_id+'" style="width:30%" placeholder="Enter Notes">'+notesText+'</textarea></span></div></div>'+
			        '</div>'+
					'<div class="row">'+
					 '<div class="col-md-6"><span style="padding:15px;">'+
					    '<button  id="addButton'+fun_id+'"  name="addButton'+fun_id+'" data-funid="'+fun_id+'"  class="btn btn-primary myClass1">Add <i class="glyphicon glyphicon-plus"></i></button>&nbsp;&nbsp;'+
					    '<button  id="addButton'+fun_id+'"  name="viewButton'+fun_id+'" data-funid="'+fun_id+'"  class="btn btn-info myClass2">View History <i class="glyphicon glyphicon-eye-open"></i></button>'+
					 '<span></div>'+
					 '<div class="col-md-6">'+
					    '<div id="message'+fun_id+'" align="left" style="font-weight: bold;"></div>'+
					 '</div>'+
					'</div>'+
					 '</div>';
		
		
		// var htmlStr = '<button id="buttonclick" name="buttonclick">adds</button>';
		 return  htmlStr ;
		
	};
	
	
	
	
	
	
	
	
	
	
	  $scope.refreshGrid= function(){
		  
		  $rootScope.submitFunctionalTestResultSearch();
		  
	  }
	  
	  
	  
	  $rootScope.showSummaryDialog = function() {
		 	$scope.open();
		    
		};
		
		
		
		$scope.open = function() {
			
			var modalInstance = $modal
					.open({
						templateUrl : 'partials/functional_notes_summary.html',
						controller : 'ModalSummaryNotesInstanceCtrl',
						 dialogClass: 'modal myWindow',
					    resolve: {
					        foo: function(){
					            return $scope.funid ;
					        }
					    
						}
					}); // optional param;
		};

	
	
	
	
	
}