'use strict'

/*created by Abhimanyu(av257f)
 * created Date 5/18/2015
 */

function ETETestResultCtrl($scope,$rootScope, $resource, $http, $location,$timeout,ETETestResultService,$cookies){
	
	
	$scope.gridHeaderMessages="ETE Test Result";
	/*$rootScope.batchJobStatus =   $rootScope.getBatchJobDetail("functionalTestResultTaskLetJob",true);	
	$scope.batchJobStatusDetail=$rootScope.batchJobStatus.lastUpdated;*/
	
	$scope.etetestresultShowHideFilter = true;
	
	$scope.etetestresultShowHide= function()
	{
		if($scope.etetestresultShowHideFilter)
		{
			$( "#eteTestFilterId" ).fadeOut( "slow");
		}
		else
		{
			$( "#eteTestFilterId" ).fadeIn( "slow");
		}
		
		$timeout(function() {
	    	$( $.fn.dataTable.tables( true ) ).DataTable().columns.adjust().draw();		        
	    }, 1000);
		
	};
	
	$rootScope.renderGrid = function()
	{
		 ETETestResultService.renderETETestResultGrid($scope,$rootScope,$http,$location);
		 $rootScope.submitDefaultETETestResultSearch();
	};
	
	$rootScope.submitEteTestResultSearch = function()
	{
		var url = '/api360-service/ete-test/reports.json?';
		   
		var params =null;
		
			
			
			  params =  
			 'testname=' + $scope.getCommaSeparatedString($rootScope.getEteTestResultFilterModel("Testnames")) + 
			 '&release=' + $scope.getCommaSeparatedString($rootScope.getEteTestResultFilterModel("Releases"))+
			 '&pmt=' + $scope.getCommaSeparatedString($rootScope.getEteTestResultFilterModel("PMTs"))+
			 '&pid=' + $scope.getCommaSeparatedString($rootScope.getEteTestResultFilterModel("PIDs"));
			
		//}	
		
	
		$rootScope.launch('wait');	
		
		
		$rootScope.ETEtestresultTable.ajax.url(url+params).load($scope.searchGridCallback);

	};
	
	$rootScope.submitDefaultETETestResultSearch = function()
	 {
	
		var url = '/api360-service/ete-test/reports.json?';
		   
		 var params = 'testname=All'  + 
			 '&release=All' + 
			 '&pmt=All' + 
			 '&pid=All';
		
	   
		$rootScope.launch('wait');	
		
		$rootScope.ETEtestresultTable.ajax.url(url+params).load($scope.searchGridCallback);
	};
	 
	
	
	
	
	$scope.searchGridCallback = function ()
	{
		$rootScope.$broadcast('dialogs.wait.complete');
		
		$('#etetestresultID tbody tr td').each( function() 
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
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	  
	  
	
	
	
	
	
}