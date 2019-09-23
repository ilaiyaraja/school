'use strict';

function SubscriptionsCtrl($scope, $http, $rootScope, $cookies, $timeout) {

	$scope.showProgramView = true;
	$scope.showBundleView = true;
	$scope.showAPIView = true;
	
	$scope.bundleModel = [];
	/*$scope.environmentModel = [];*/
	$scope.apiModel = [];
	$scope.backendModel = [];
	
	$scope.apiSubscriptions = [];
	$scope.bundleSubscriptions = [];
	$scope.backendSubscriptions = [];
	
	$scope.recentActivity = [];
	
	$scope.levelSelected = {};
	$scope.backendSelected = [];
	$scope.bundleSelected = [];
	$scope.apiSelected = [];
	$scope.envSelected = [];
	
	$scope.attuid = '';
	$scope.username = '';
	
	$scope.levels = [ {
		id : 1,
		value : 'api',
		label : 'API'
	}, {
		id : 2,
		value : 'backend',
		label : 'Backend'
	}, {
		id : 3,
		value : 'bundle',
		label : 'Bundle'
	}];
	
	$scope.environmentModel = [{
		id : 1,
		value : 'D122',
		label : 'D122'
	},{
		id : 2,
		value : 'D124',
		label : 'D124'
	},{
		id : 3,
		value : 'D126',
		label : 'D126'
	},{
		id : 4,
		value : 'D127',
		label : 'D127'
	},{
		id : 5,
		value : 'D128',
		label : 'D128'
	},{
		id : 6,
		value : 'D129',
		label : 'D129'
	},{
		id : 7,
		value : 'D130',
		label : 'D130'
	},{
		id : 8,
		value : 'D1A',
		label : 'D1A'
	},{
		id : 9,
		value : 'D1B',
		label : 'D1B'
	},{
		id : 10,
		value : 'D2A',
		label : 'D2A'
	},{
		id : 11,
		value : 'D2B',
		label : 'D2B'
	},{
		id : 12,
		value : 'D3A',
		label : 'D3A'
	},{
		id : 13,
		value : 'D3B',
		label : 'D3B'
	},{
		id : 14,
		value : 'D4A',
		label : 'D4A'
	},{
		id : 15,
		value : 'D4B',
		label : 'D4B'
	},{
		id : 16,
		value : 'D5A',
		label : 'D5A'
	},{
		id : 17,
		value : 'D5B',
		label : 'D5B'
	},{
		id : 18,
		value : 'D6A',
		label : 'D6A'
	},{
		id : 19,
		value : 'D6B',
		label : 'D6B'
	},{
		id : 20,
		value : 'Q102',
		label : 'Q102'
	},{
		id : 21,
		value : 'Q10A',
		label : 'Q10A'
	},{
		id : 22,
		value : 'Q10B',
		label : 'Q10B'
	},{
		id : 23,
		value : 'Q113',
		label : 'Q113'
	},{
		id : 24,
		value : 'Q11A',
		label : 'Q11A'
	},{
		id : 25,
		value : 'Q11B',
		label : 'Q11B'
	},{
		id : 26,
		value : 'Q122',
		label : 'Q122'
	},{
		id : 27,
		value : 'Q124',
		label : 'Q124'
	},{
		id : 28,
		value : 'Q129',
		label : 'Q129'
	},{
		id : 29,
		value : 'Q12A',
		label : 'Q12A'
	},{
		id : 30,
		value : 'Q12B',
		label : 'Q12B'
	},{
		id : 31,
		value : 'Q13',
		label : 'Q13'
	},{
		id : 32,
		value : 'Q130',
		label : 'Q130'
	},{
		id : 33,
		value : 'Q134',
		label : 'Q134'
	},{
		id : 34,
		value : 'Q136',
		label : 'Q136'
	},{
		id : 35,
		value : 'Q137',
		label : 'Q137'
	},{
		id : 36,
		value : 'Q138',
		label : 'Q138'
	},{
		id : 37,
		value : 'Q13A',
		label : 'Q13A'
	},{
		id : 38,
		value : 'Q13B',
		label : 'Q13B'
	},{
		id : 39,
		value : 'Q14',
		label : 'Q14'
	},{
		id : 40,
		value : 'Q14A',
		label : 'Q14A'
	},{
		id : 41,
		value : 'Q14B',
		label : 'Q14B'
	},{
		id : 42,
		value : 'Q15A',
		label : 'Q15A'
	},{
		id : 43,
		value : 'Q15ADEV',
		label : 'Q15ADEV'
	},{
		id : 44,
		value : 'Q15AIST',
		label : 'Q15AIST'
	},{
		id : 45,
		value : 'Q16',
		label : 'Q16'
	},{
		id : 46,
		value : 'Q17',
		label : 'Q17'
	},{
		id : 47,
		value : 'Q18A',
		label : 'Q18A'
	},{
		id : 48,
		value : 'Q19A',
		label : 'Q19A'
	},{
		id : 49,
		value : 'Q19B',
		label : 'Q19B'
	},{
		id : 50,
		value : 'Q2',
		label : 'Q2'
	},{
		id : 51,
		value : 'Q200',
		label : 'Q200'
	},{
		id : 52,
		value : 'Q205',
		label : 'Q205'
	},{
		id : 53,
		value : 'Q206',
		label : 'Q206'
	},{
		id : 54,
		value : 'Q20A',
		label : 'Q20A'
	},{
		id : 55,
		value : 'Q20B',
		label : 'Q20B'
	},{
		id : 56,
		value : 'Q21',
		label : 'Q21'
	},{
		id : 57,
		value : 'Q22',
		label : 'Q22'
	},{
		id : 58,
		value : 'Q22A',
		label : 'Q22A'
	},{
		id : 59,
		value : 'Q22B',
		label : 'Q22B'
	},{
		id : 60,
		value : 'Q23A',
		label : 'Q23A'
	},{
		id : 61,
		value : 'Q23B',
		label : 'Q23B'
	},{
		id : 62,
		value : 'Q23C',
		label : 'Q23C'
	},{
		id : 63,
		value : 'Q23F',
		label : 'Q23F'
	},{
		id : 64,
		value : 'Q24A',
		label : 'Q24A'
	},{
		id : 65,
		value : 'Q24B',
		label : 'Q24B'
	},{
		id : 66,
		value : 'Q25',
		label : 'Q25'
	},{
		id : 67,
		value : 'Q25A',
		label : 'Q25A'
	},{
		id : 68,
		value : 'Q25B',
		label : 'Q25B'
	},{
		id : 69,
		value : 'Q26A',
		label : 'Q26A'
	},{
		id : 70,
		value : 'Q26B',
		label : 'Q26B'
	},{
		id : 71,
		value : 'Q26C',
		label : 'Q26C'
	},{
		id : 72,
		value : 'Q26F',
		label : 'Q26F'
	},{
		id : 73,
		value : 'Q27A',
		label : 'Q27A'
	},{
		id : 74,
		value : 'Q27B',
		label : 'Q27B'
	},{
		id : 75,
		value : 'Q28',
		label : 'Q28'
	},{
		id : 76,
		value : 'Q28A',
		label : 'Q28A'
	},{
		id : 77,
		value : 'Q28B',
		label : 'Q28B'
	},{
		id : 78,
		value : 'Q29',
		label : 'Q29'
	},{
		id : 79,
		value : 'Q29A',
		label : 'Q29A'
	},{
		id : 80,
		value : 'Q29B',
		label : 'Q29B'
	},{
		id : 81,
		value : 'Q29C',
		label : 'Q29C'
	},{
		id : 82,
		value : 'Q30',
		label : 'Q30'
	},{
		id : 83,
		value : 'Q30A',
		label : 'Q30A'
	},{
		id : 84,
		value : 'Q30B',
		label : 'Q30B'
	},{
		id : 85,
		value : 'Q31A',
		label : 'Q31A'
	},{
		id : 86,
		value : 'Q34',
		label : 'Q34'
	},{
		id : 87,
		value : 'Q44',
		label : 'Q44'
	},{
		id : 88,
		value : 'Q45',
		label : 'Q45'
	},{
		id : 89,
		value : 'Q46',
		label : 'Q46'
	},{
		id : 90,
		value : 'Q51',
		label : 'Q51'
	},{
		id : 91,
		value : 'Q52',
		label : 'Q52'
	}];
	
	$scope.backends = [];
	$scope.bundles = [];
	$scope.apis = [];
	
	$scope.backendSelect = false;
	$scope.bundleSelect = false;
	$scope.apiSelect = true;
	
	$scope.longDropdownSettings = {
			selectionLimit : 1,
			enableSearch : true,
			displayProp : 'label',
			externalIdProp : '',
			showCheckAll : false,
			showUncheckAll : false,
			closeOnSelect : true,
			closeOnDeselect : true,
			scrollable : true,
			smartButtonMaxItems : 1,
			smartButtonTextConverter : function(itemText, originalItem) {
				return itemText;
			},
			buttonClasses : 'btn btn-default custombtn'
		};
	
	$scope.multiSelectDropdownSettings = {
			displayProp : 'label',
			externalIdProp: '',
			enableSearch : true,
			showCheckAll : false,
			showUncheckAll : true,
			scrollable : true,
			smartButtonMaxItems : 1,
			buttonClasses : 'btn btn-default custombtn'
		};
	
	$scope.levelCustomTexts = {
			buttonDefaultText : 'Select Level'
		};
	
	$scope.bundleCustomTexts = {
			buttonDefaultText : 'Select Bundle'
		};
	
	$scope.backendCustomTexts = {
			buttonDefaultText : 'Select Backend'
		};
	
	$scope.apiCustomTexts = {
			buttonDefaultText : 'Select API'
		};
	
	$scope.environmentCustomTexts = {
			buttonDefaultText : 'Select Environment'
		};
	
	$scope.levelSelectEvent = {
			onItemSelect : function(item) {
				if (item.value == 'api') {
					$scope.backendSelect = false;
					$scope.bundleSelect = false;
					$scope.apiSelect = true;
				} else if (item.value == 'backend') {
					$scope.backendSelect = true;
					$scope.bundleSelect = false;
					$scope.apiSelect = false;
				} else{
					$scope.backendSelect = false;
					$scope.bundleSelect = true;
					$scope.apiSelect = false;
				}

			}
		}
	
	$scope.getBundleFilter = function() {
		var url = "/api360-service/filter/lookup/All/0/All/All/All/All/All/All/All/All/All/All/allfilters.json";

		var loadFilters = $http.get(url);
		$http.dataType = "json";

		loadFilters.success(function(data) {
			// $scope.bundleModel = new Array(data.result.container_name[1]);
			angular.forEach(data.result.container_name, function(value, key) {
				if (value.label != 'All') {
					$scope.bundleModel.push(value);
				}
			});
			
			$scope.bundleModel.push({"id":"APIPlatform_EthernetTest","label":"APIPlatform_EthernetTest"});
			
			$scope.sortFilters();

		});
	}
	
	$scope.sortFilters = function(){
		//added 4222015
		
		$scope.bundleModel.sort(function(a, b){
			var nameA=a.label.toLowerCase(), nameB=b.label.toLowerCase()
		    if(nameA < nameB) return -1;
		    if(nameA > nameB) return 1;
		    return 0;
		});
		
		//alert("test");
	}
	
	$scope.getOtherFilters = function(){
		var url = "/api360-service/filter/lookup/returnjson/api_portfolio_filters.json";
		
		var loadFilters = $http.get(url);
		$http.dataType = "json";

		loadFilters.success(function(data) {
			// $scope.bundleModel = new Array(data.result.container_name[1]);
			angular.forEach(data.result.api_name, function(value, key) {
				if (value.label != 'All') {
					$scope.apiModel.push(value);
				}
			});
			
			angular.forEach(data.result.adapter, function(value, key) {
				if (value.label != 'All') {
					$scope.backendModel.push(value);
				}
			});

		});
	}
	
	$scope.init = function() {
		$scope.getBundleFilter();
		$scope.getOtherFilters();
		$scope.getUserId();
		$scope.getSubscriptions();
		$scope.getRecentActivity();
	}
	
	$scope.getSubscriptions = function() {
		var url = "/api360-service/subscriptions/get/api?attuid="
				+ $scope.attuid;

		var loadFilters = $http.get(url);
		$http.dataType = "json";

		loadFilters.success(function(data) {
			// $scope.bundleModel = new Array(data.result.container_name[1]);
			angular.forEach(data, function(value, key) {
				if (value != 'All') {
					$scope.apiSubscriptions.push(value);
				}
			});

		});
		
		url = "/api360-service/subscriptions/get/backend?attuid="
			+ $scope.attuid;

		loadFilters = $http.get(url);
		$http.dataType = "json";
	
		loadFilters.success(function(data) {
			// $scope.bundleModel = new Array(data.result.container_name[1]);
			angular.forEach(data, function(value, key) {
				if (value != 'All') {
					$scope.backendSubscriptions.push(value);
				}
			});
	
		});
		
		url = "/api360-service/subscriptions/get/bundle?attuid="
			+ $scope.attuid;

		loadFilters = $http.get(url);
		$http.dataType = "json";
	
		loadFilters.success(function(data) {
			// $scope.bundleModel = new Array(data.result.container_name[1]);
			angular.forEach(data, function(value, key) {
				if (value != 'All') {
					$scope.bundleSubscriptions.push(value);
				}
			});
	
		});

	}
	
	$scope.getRecentActivity = function() {
		var url = "/api360-service/subscriptions/get/activity?attuid="
				+ $scope.attuid;

		var loadFilters = $http.get(url);
		$http.dataType = "json";

		loadFilters.success(function(data) {
			// $scope.bundleModel = new Array(data.result.container_name[1]);
			angular.forEach(data, function(value, key) {
				if (value != 'All') {
					$scope.recentActivity.push(value);
				}
			});

		});

	}
	
	$scope.getUserId = function() {
		var attESHr = $cookies.attESHr;
		var eshr = attESHr.split("|");

		// get attuid
		var eshrarr = eshr[7].split(",");
		var attuid = eshrarr[0];

		// username
		var firstarr = eshr[0].split("+");
		var first = "";

		for (var i = 0; i < firstarr.length; i++) {
			first = first + firstarr[i] + " ";
		}
		var username = first + eshr[1];
		$scope.attuid = attuid;
		$scope.username = username;
	}
	
	$scope.submitSubscription = function($event) {
		//alert($scope.bundleSelected.length + " \n" + $scope.envSelected.length);
		/*for(var i = 0; i < $scope.bundleSelected.length; i++){
			alert($scope.bundleSelected[i].label);
		}
		for(var i = 0; i < $scope.envSelected.length; i++){
			alert($scope.envSelected[i].label);
		}*/
		
		var url = '/api360-service/subscriptions/insert?'
			+ 'attuid=' + $scope.attuid 
			+ '&level=' + $scope.levelSelected.label;
		
		var subscriptionItem = '';
		
		if($scope.levelSelected.label == 'API'){
			var levelLength = $scope.apiSelected.length;
			var envLength = $scope.envSelected.length;
			var overAllLength = levelLength * envLength;
			var lengthCounter = 0;
			for(var i = 0; i < $scope.apiSelected.length; i++){
				for(var j = 0; j < $scope.envSelected.length; j++){
					//alert($scope.envSelected[i].label);
					var url = '/api360-service/subscriptions/insert?'
						+ 'attuid=' + $scope.attuid 
						+ '&level=' + $scope.levelSelected.label;
					url = url + '&subscription=' + $scope.apiSelected[i].label + '&environment=' + $scope.envSelected[j].label;
					var response = $http.get(url);
					subscriptionItem = subscriptionItem + "\n" + $scope.apiSelected[i].label + " - " + $scope.envSelected[j].label;
					$http.dataType = "json";
					response.success(function(data) {
						lengthCounter++;
						//IF LAST ONE
						if(lengthCounter == overAllLength){
							//alert('lastOne');
							$scope.refreshSubscriptions();
							$scope.getSubscriptions();
							$scope.getRecentActivity();
						}
					});
				}
			}
			
			//refresh
			//$scope.refreshSubscriptions();
			alert('You have successfully subscribed to ' + $scope.levelSelected.label  + '(s) \n\n' + subscriptionItem);
			$('#exampleModal').modal('hide');
			//$scope.getSubscriptions();
			//$scope.getRecentActivity();
			
			
		}else if($scope.levelSelected.label == 'Bundle'){
			var levelLength = $scope.bundleSelected.length;
			var envLength = $scope.envSelected.length;
			var overAllLength = levelLength * envLength;
			var lengthCounter = 0;
			for(var i = 0; i < $scope.bundleSelected.length; i++){
				for(var j = 0; j < $scope.envSelected.length; j++){
					//alert($scope.envSelected[i].label);
					var url = '/api360-service/subscriptions/insert?'
						+ 'attuid=' + $scope.attuid 
						+ '&level=' + $scope.levelSelected.label;
					url = url + '&subscription=' + $scope.bundleSelected[i].label + '&environment=' + $scope.envSelected[j].label;
					var response = $http.get(url);
					subscriptionItem = subscriptionItem + "\n" + $scope.bundleSelected[i].label + " - " + $scope.envSelected[j].label;
					$http.dataType = "json";
					response.success(function(data) {
						lengthCounter++;
						//IF LAST ONE
						if(lengthCounter == overAllLength){
							//alert('lastOne');
							$scope.refreshSubscriptions();
							$scope.getSubscriptions();
							$scope.getRecentActivity();
						}
					});
				}
			}
			
			//refresh
			//$scope.refreshSubscriptions();
			alert('You have successfully subscribed to ' + $scope.levelSelected.label  + '(s) \n\n' + subscriptionItem);
			$('#exampleModal').modal('hide');
			//$scope.getSubscriptions();
			//$scope.getRecentActivity();
			
			
		}else if($scope.levelSelected.label == 'Backend'){
			var levelLength = $scope.backendSelected.length;
			var envLength = $scope.envSelected.length;
			var overAllLength = levelLength * envLength;
			var lengthCounter = 0;
			for(var i = 0; i < $scope.backendSelected.length; i++){
				for(var j = 0; j < $scope.envSelected.length; j++){
					//alert($scope.envSelected[i].label);
					var url = '/api360-service/subscriptions/insert?'
						+ 'attuid=' + $scope.attuid 
						+ '&level=' + $scope.levelSelected.label;
					url = url + '&subscription=' + $scope.backendSelected[i].label + '&environment=' + $scope.envSelected[j].label;
					var response = $http.get(url);
					subscriptionItem = subscriptionItem + "\n" + $scope.backendSelected[i].label + " - " + $scope.envSelected[j].label;
					$http.dataType = "json";
					response.success(function(data) {
						lengthCounter++;
						//IF LAST ONE
						if(lengthCounter == overAllLength){
							//alert('lastOne');
							$scope.refreshSubscriptions();
							$scope.getSubscriptions();
							$scope.getRecentActivity();
						}
					});
				}
			}
			
			//refresh
			//$scope.refreshSubscriptions();
			alert('You have successfully subscribed to ' + $scope.levelSelected.label  + '(s) \n\n' + subscriptionItem);
			$('#exampleModal').modal('hide');
			
			//$scope.getSubscriptions();
			//$scope.getRecentActivity();
			
		}
		
		//commented out for testing
		/*var url = '/api360-service/subscriptions/insert?'
			+ 'attuid=' + $scope.attuid 
			+ '&level=' + $scope.levelSelected.label 
			+ '&environment=' + $scope.envSelected.label;
		
		var subscriptionItem = '';
		
		if($scope.levelSelected.label == 'API'){
			url = url + '&subscription=' + $scope.apiSelected.label;
			subscriptionItem = $scope.apiSelected.label;
		}else if($scope.levelSelected.label == 'Bundle'){
			url = url + '&subscription=' + $scope.bundleSelected.label;
			subscriptionItem = $scope.bundleSelected.label;
		}else if($scope.levelSelected.label == 'Backend'){
			url = url + '&subscription=' + $scope.backendSelected.label;
			subscriptionItem = $scope.backendSelected.label;
		}
		
		var response = $http.get(url);
		$http.dataType = "json";
		response.success(function(data) {
			//refresh
			$scope.refreshSubscriptions();
			$scope.getSubscriptions();
			$scope.getRecentActivity();
			alert('You have successfully subscribed to ' + $scope.levelSelected.label  + ' - ' + subscriptionItem);
			$('#exampleModal').modal('hide');
		});*/
	}
	
	$scope.removeSubscription = function($event, subItem) {
		var r = confirm("Are you sure you want to unsubscribe to " + subItem.level + " - " + subItem.subscription);
		if (r == true) {
			
			var url = '/api360-service/subscriptions/update?'
				+ 'attuid=' + subItem.attuid 
				+ '&level=' + subItem.level
				+ '&subscription=' + subItem.subscription
				+ '&environment=' + subItem.environment;
			
			var response = $http.get(url);
			$http.dataType = "json";
			response.success(function(data) {
				//refresh
				$scope.refreshSubscriptions();
				$scope.getSubscriptions();
				$scope.getRecentActivity();
				alert("You have successfully unsubscribed to " + subItem.level + " - " + subItem.subscription);
				
			});
		} 
	}
	
	$scope.refreshSubscriptions = function() {
		$scope.apiSubscriptions = [];
		$scope.bundleSubscriptions = [];
		$scope.backendSubscriptions = [];
		$scope.recentActivity = [];
	}
}