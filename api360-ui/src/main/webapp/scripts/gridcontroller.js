'use strict';

// http://ui-grid.info/docs/#/tutorial/306_expandable_grid
//http://ui-grid.info/docs/#/tutorial/210_selection

//http://angular-ui.github.io/ng-grid/

function GridCtrl($scope, $rootScope, $resource, $http, $location) {

	$scope.gridOptions = {
		pagingPageSizes : [ 25, 50, 75 ],
		pagingPageSize : 25,
		enableColumnResizing : true,
		enableRowSelection: true,
		enableSelectAll: true,
		selectionRowHeaderWidth: 35,
		columnDefs : [ {
			name : 'testCase_Name',width:200
		}, {
			name : 'account_Type',width:200
		}, {
			name : 'customer_Type'
		}, {
			name : 'no_of_Subscriber'
		}, {
			name : 'liability_Type'
		}, {
			name : 'installment_Term'
		}, {
			name : 'installment_Plan'
		}, {
			name : 'balance'
		}, {
			name : 'past_Due'
		}, {
			name : 'payment_Option'
		}, {
			name : 'payment_Profile'
		}, {
			name : 'bill_PDF'
		} ]
	};

	$scope.gridOptions.multiSelect = true;
	$scope.gridOptions.enableFiltering = true;
	
	
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

	$http.get("/testdata-service/test-data/loadtestdata.json?" + url).success(
			function(data) 
			{
				$scope.gridOptions.data = data.data;
			});

}