'use strict';

console.log("app.js");
function TestDataCtrl($scope,$rootScope,$resource, $http, $location) 
{
	//$scope.generalMessages= "This section will show general messages/alerts.";
	$scope.gridHeaderMessages= "TestData Self-Service: Select TestCase and Click on Run button!!!";
	
	$scope.filterModels = function()
	 {
		 $scope.accountTypesModel = [];
		 $scope.customerTypesModel = [];
		 $scope.noOfSubscribersModel = [];		  
		 $scope.liabilityTypesModel = [];		 
		 $scope.installmentTermsModel = [];
		 $scope.installmentPlanStatusModel = []; 
		 $scope.balanceModel = [];		 
		 $scope.pastDueModel = [];		 
		 $scope.paymentOptionsModel = [];		
		 $scope.paymentProfileModel = [];		
		 $scope.billPDFModel = [];			
	 }
	 
	 $scope.filterData = function()
	 {
		 $scope.accountTypesData = [];	
		 $scope.customerTypesData = [];	
		 $scope.noOfSubscribersData = [];
		 $scope.liabilityTypesData = [];
		 $scope.installmentTermsData = [];
		 $scope.installmentPlanStatusData = [];	
		 $scope.balanceData = [];
		 $scope.pastDueData = [];	
		 $scope.paymentOptionsData = [];	
		 $scope.paymentProfileData = [];	
		 $scope.billPDFData = [];	
	 }
	 
	 
	 $scope.filterSettings = function ()
	 {
		
		 $scope.accountTypesSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true}; 
		 $scope.accountTypesCustomTexts = {buttonDefaultText: 'AccountTypes'};
		 
		 $scope.customerTypesSettings 	= {enableSearch: true,scrollable: true}; 
		 $scope.customerTypesCustomTexts = {buttonDefaultText: 'CustomerTypes'};
		 
		 
		 $scope.noOfSubscribersSettings 	= {enableSearch: true,scrollable: true}; 
		 $scope.noOfSubscribersCustomTexts = {buttonDefaultText: 'NoOfSubscribers'};
		 
		 $scope.liabilityTypesSettings 	= {enableSearch: true,scrollable: true}; 
		 $scope.liabilityTypesCustomTexts = {buttonDefaultText: ' LiabilityTypes'};
		 
		 $scope.installmentTermsSettings 	= {enableSearch: true,scrollable: true}; 
		 $scope.installmentTermsCustomTexts = {buttonDefaultText: 'InstallmentTerms'};
		 
		 $scope.installmentPlanStatusSettings 	= {enableSearch: true,scrollable: true}; 
		 $scope.installmentPlanStatusCustomTexts = {buttonDefaultText: ' InstallmentPlanStatus'};
		 
		 $scope.balanceSettings 	= {enableSearch: true,scrollable: true}; 
		 $scope.balanceCustomTexts = {buttonDefaultText: 'Balances'};
		 
		 $scope.pastDueSettings 	= {enableSearch: true,scrollable: true}; 
		 $scope.pastDueCustomTexts = {buttonDefaultText: 'PastDues'};
		 
		 $scope.paymentOptionsSettings 	= {enableSearch: true,scrollable: true}; 
		 $scope.paymentOptionsCustomTexts = {buttonDefaultText: 'PaymentOptions'};
		 
		 $scope.paymentProfileSettings 	= {enableSearch: true,scrollable: true}; 
		 $scope.paymentProfileCustomTexts = {buttonDefaultText: 'PaymentProfiles'};
		 
		 $scope.billPDFSettings 	= {enableSearch: true,scrollable: true}; 
		 $scope.billPDFCustomTexts = {buttonDefaultText: 'BillPDFs'};		 
	 }
	 
	 
	 var url = "account_Type=All";
	 url = url + "&customer_Type=All";
	 url = url + "&no_of_Subscribers=All";
	 url = url + "&liability_Type=All";
	 url = url + "&installment_Terms=All";
	 url = url + "&installment_Plan_Status=All";
	 url = url + "&balance=All";
	 url = url + "&past_Due=All";
	 url = url + "&payment_Options=All";
	 url = url + "&payment_Profile=All";
	 url = url + "&bill_PDF=All";	
	 
	 /*
	 $('#testDataGrid tfoot th').each( function () 
     {
 		var title = $('#testDataGrid thead th').eq( $(this).index() ).text();
 		
 		if(title!="checkbox")
        $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
	        
	 });
	 */
	
	 
	var table = $('#testDataGrid').dataTable({
		"serverSide": false,
		//"processing": true,
        //"ajax": "/testdata-service/test-data/loadtestdata.json?"+url,		
        "columns": [
					{
					    data:   "checkbox",
					    "bSortable":false,
					    render: function ( data, type, row ) 
					    {
					        if ( type === 'display' ) 
					        {
					            return '<input type="checkbox" class="editor-active" value="'+ data.checkbox+'">';
					        }
					        
					        return data;
					    },
					    className: "dt-body-center"
					},
					{ "data": "testCase_Name"},
                    { "data": "account_Type"},                    
				     { "data": "customer_Type" },
				     { "data": "no_of_Subscriber" },
				     { "data": "liability_Type" },
				     { "data": "installment_Term" },
				     { "data": "installment_Plan" },				     
				     { "data": "balance" },
				     { "data": "past_Due" },
				     { "data": "payment_Option" },
				     { "data": "payment_Profile" },
				     { "data": "bill_PDF" }
                ],
    "bAutoWidth": false,
    "bScrollCollapse": true,
    "bJQueryUI": true,
    "search": {"caseInsensitive": true}
    });
	
	
	
	
	
	$('#testDataGrid tbody').on( 'click', 'tr', function () 
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
			result += json[dString].id + ", ";
			found=true;
		}
		
		if(!found)
		{
			return "All";
		}
		
		return result;
	}
	
	
	
	$scope.submitSearch = function() 
	{  
		
		 var url = "account_Type="+$scope.getCommaSeparatedString($scope.accountTypesModel);
		 url = url + "&customer_Type="+$scope.getCommaSeparatedString($scope.customerTypesModel);
		 url = url + "&no_of_Subscribers="+$scope.getCommaSeparatedString($scope.noOfSubscribersModel);
		 url = url + "&liability_Type="+$scope.getCommaSeparatedString($scope.liabilityTypesModel);
		 url = url + "&installment_Terms="+$scope.getCommaSeparatedString($scope.installmentTermsModel);
		 url = url + "&installment_Plan_Status="+$scope.getCommaSeparatedString($scope.installmentPlanStatusModel);
		 url = url + "&balance="+$scope.getCommaSeparatedString($scope.balanceModel);
		 url = url + "&past_Due="+$scope.getCommaSeparatedString($scope.pastDueModel);
		 url = url + "&payment_Options="+$scope.getCommaSeparatedString($scope.paymentOptionsModel);
		 url = url + "&payment_Profile="+$scope.getCommaSeparatedString($scope.paymentProfileModel);
		 url = url + "&bill_PDF="+$scope.getCommaSeparatedString($scope.billPDFModel);	
		 
		$rootScope.launch('wait');		
		table.api().ajax.url("/testdata-service/test-data/loadtestdata.json?"+url).load($scope.searchGridCallback);
	};
	
	$scope.searchGridCallback = function ()
	{
		$rootScope.$broadcast('dialogs.wait.complete');
		
		$('#testDataGrid tbody tr td').each( function() 
	    {
		    this.setAttribute( 'title', $(this).text());
		});
		
	}
	
	 $scope.filterModels();
	 $scope.filterData();
	 $scope.filterSettings();	
	
	 $scope.loadComboBox= function() 
	 {
		 var loadFilters = $http.get('/testdata-service/test-data/filters.json');
		 loadFilters.then(function(payload) 
	     {
			$scope.accountTypesData = payload.data.result.account_Types;
			$scope.customerTypesData = payload.data.result.customer_Types;	
			$scope.noOfSubscribersData = payload.data.result.no_of_Subscribers;
			$scope.liabilityTypesData = payload.data.result.liability_Types;
			$scope.installmentTermsData = payload.data.result.installment_Terms;
			$scope.installmentPlanStatusData = payload.data.result.installment_Plans;
			$scope.balanceData = payload.data.result.balances;
			$scope.pastDueData = payload.data.result.past_Dues;
			$scope.paymentOptionsData = payload.data.result.payment_Options;
			$scope.paymentProfileData = payload.data.result.payment_Profiles;
			$scope.billPDFData = payload.data.result.bill_PDFs;
	     });	
     }
	 
	 $scope.resetFilters = function()
	 {
		 $scope.filterModels();		
	 }
	 
	 $('input[name="Check All"]').click(function() 
     { 	
		 
		    var nNodes = $('input', table.fnGetNodes());
			
			for ( var i=0 ; i<nNodes.length ; i++ )
			{
				var contactId = table.fnGetData(i); // getting the value of the first (invisible) column
				//console.log(contactId.testCase_Name);
			}
			
	 	// a button with Check All as its value
	 	if(this.value=="unchecked")
	    {
	    	$('#testDataGrid input[type=checkbox]').prop('checked', true);
	    	this.value="checked";
	    }
	    else
	    {
	    	$('#testDataGrid input[type=checkbox]').prop('checked', false);
	    	this.value="unchecked";
	    }	 	
	 });
}






