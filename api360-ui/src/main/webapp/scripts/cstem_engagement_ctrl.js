'use strict';

function CstemEngagementCtrl($scope, $http, $rootScope, $cookies, $timeout) {

	
	//button
	$scope.submitDisabled = false;
	// irescalator
	$scope.requestSelected = {};
	$scope.bundleSelected = {};
	$scope.devPresent = true;
	$scope.versions = [];
	$scope.bundleInTicket = [];
	
	$scope.otherbundlevisible = false;

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
		buttonClasses : 'btn btn-default custombtn',
	};

	$scope.environmentsettings = {
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
		buttonClasses : 'btn btn-default envbtn'
	};

	$scope.requestTypeEvent = {
		onItemSelect : function(item) {
			if (item.value == 'irescalation') {
				$scope.irvisible = true;
				$scope.othervisible = false;
				$scope.otherbundlevisible = false;
			} else {
				$scope.irvisible = false;
				$scope.othervisible = true;
				if(item.value != 'CHANGE REQUEST'){
					$scope.otherbundlevisible = true;
				}else{
					$scope.otherbundlevisible = false;
				}
			}

		}
	}
	
	$scope.environmentEvent = {
		onItemSelect : function(){
			var count = 0;
			for (var i = 0; i < $scope.questionelemnt.length; i++) {
				
				//alert($scope.questionelemnt.length + "\n " + $scope.questionelemnt[0].environment.label + "\n " + $scope.questionelemnt[1].environment.label + "\n " + $scope.questionelemnt[2].environment.label);
				if(typeof $scope.questionelemnt[i].environment.label != 'undefined'){
					//alert($scope.questionelemnt[i].environment.label);
					if ($scope.questionelemnt[i].environment.label.substring(0,1) == 'D'){
						count++;
						//$scope.devPresent = true;
						
					}else{
						//$scope.devPresent = false;
					}
				  }
				}
			
			if(count > 0){
				$scope.devPresent = true;
			}else{
				$scope.devPresent = false;
			}
		}
	}

	$scope.example5customTexts = {
		buttonDefaultText : 'Select Request Type'
	};

	$scope.bundleCustomText = {
		buttonDefaultText : 'Select Bundle'
	};

	$scope.environmentCustomText = {
		buttonDefaultText : 'Select Environment'
	};
	
	$scope.releaseCustomText = {
			buttonDefaultText : 'Select Release'
	};

	$scope.filters = {
		x : false,
		company : '',
		search : ''
	};

	$scope.searchf = '';

	$scope.dropdownname = 'Request Type';

	$scope.attuid = "";
	$scope.username = "";
	$scope.irvisible = true;
	$scope.othervisible = false;

	var counter = 0;
	$scope.questionelemnt = [ {
		id : counter,
		environment : {},
		ticket : '',
		inline : true
	}, {
		id : counter,
		environment : {},
		ticket : '',
		inline : true
	}, {
		id : counter,
		environment : {},
		ticket : '',
		inline : true
	} ];

	$scope.notifications = [ 'Q', 'Email' ];

	$scope.releases = [{
		id : 1,
		value : '201502',
		label : '2015.02'
	},{
		id : 2,
		value : '201503',
		label : '2015.03'
	},{
		id : 3,
		value : '201504',
		label : '2015.04'
	},{
		id : 4,
		value : '201505',
		label : '2015.05'
	},{
		id : 5,
		value : '201506',
		label : '2015.06'
	},{
		id : 6,
		value : '201507',
		label : '2015.07'
	},{
		id : 7,
		value : '201508',
		label : '2015.08'
	},{
		id : 8,
		value : '201509',
		label : '2015.09'
	},{
		id : 9,
		value : '201510',
		label : '2015.10'
	},{
		id : 10,
		value : '201511',
		label : '2015.11'
	},{
		id : 11,
		value : '201512',
		label : '2015.12'
	}];
	
	$scope.requestTypes = [ {
		id : 1,
		value : 'irescalation',
		label : 'Install Request Escalation'
	}, {
		id : 2,
		value : 'TROUBLESHOOTING',
		label : 'Env Config Change'
	}, {
		id : 3,
		value : 'WORK REQUEST',
		label : 'Work Request'
	}, {
		id : 4,
		value : 'TROUBLESHOOTING',
		label : 'Troubleshooting Request'
	} ];

	/*
	 * $scope.environment_selection[ { value : 'environment', label :
	 * 'Environment' } ];
	 */

	$scope.bundleModel = [];
	$scope.environmentModel = [];
	$scope.ticketModel = [];
	$scope.ticketModelEscalated = [];
	$scope.ticketModelNonEscalated = [];
	$scope.releaseModel = [];
	// selected
	$scope.selection = [];

	// toggle selection
	$scope.toggleSelection = function toggleSelection(notificationName) {
		var idx = $scope.selection.indexOf(notificationName);

		// is currently selected
		if (idx > -1) {
			$scope.selection.splice(idx, 1);
		}

		// is newly selected
		else {
			$scope.selection.push(notificationName);
		}
	};

	$scope.newItem = function($event) {
		counter++;
		$scope.questionelemnt.push({
			id : counter,
			environment : {},
			ticket : '',
			inline : true
		});
		$event.preventDefault();
	}
	$scope.inlinef = function($event, inlinecontrol) {
		var checkbox = $event.target;
		if (checkbox.checked) {
			$('#' + inlinecontrol).css('display', 'inline');
		} else {
			$('#' + inlinecontrol).css('display', '');
		}

	}
	$scope.showitems = function($event) {
		$('#displayitems').css('visibility', 'none');
	}

	$scope.submitIR = function($event) {

		$("#selectRequest").removeClass("has-error");
		$("#checkboxNotification").removeClass("has-error");
		$("#pmtField").removeClass("has-error");
		$("#envTicketField").removeClass("has-error");
		
		//start validation
		var valid = true;
		if ($scope.requestSelected.label == undefined) {
			$("#selectRequest").addClass("has-error");
			valid = false;
		}
		if($scope.selection.length == 0){
			$("#checkboxNotification").addClass("has-error");
			valid = false;
			
		}
		if($scope.pmt == '' || $scope.pmt == null){
			$("#pmtField").addClass("has-error");
			valid = false;
		}
		
		var inputticketCounter = 0;
		for (var i = 0; i < $scope.questionelemnt.length; i++) {
			if (($scope.questionelemnt[i].environment.label != '')
					&& ($scope.questionelemnt[i].ticket != '')) {
				inputticketCounter++;
			}
		}
		if (inputticketCounter < 1) {
			//alert("Insufficient Data! Please provide complete information. Enter an environment and Ticket#");
			//"envTicketField"
			$("#envTicketField").addClass("has-error");
			valid = false;
		}
		
		//end validation
		
		if (!valid) {
			//alert("Insufficient Data! Please select a request type.");
			$rootScope.launch("custom11");
			//$("#selectRequest").addClass("has-error");
		}else {

			var alertMessage = 'Install Request Escalation\n'.concat(
					'Successfully submitted!\n\nDetails\n').concat(
					'SUBMITTER: ').concat($scope.username).concat('\n')
					.concat('\n').concat('NOTIFICATION: ').concat(
							$scope.selection).concat('\n').concat('PMT: ')
					.concat($scope.pmt).concat('\n\n');

			var notes = '';
			if (($scope.notes == '') || ($scope.notes == undefined)) {
				notes = '';
				
				if($scope.autoInstall){
					notes = notes + "Dev Auto Install ";
				}
			} else {
				notes = $scope.notes;
				
				if($scope.autoInstall){
					notes = notes + " | Dev Auto Install ";
				}
			}
			
			
			
			if($scope.cstApproved){
				notes = notes + "| CST Approved ";
			}
			
			if($scope.ccbApproved){
				notes = notes + "| CCB Approved : CCB No. "+$scope.ccbNumber;
			}
			
			//fix#
			notes = notes.replace(/#/g,'');
			
			var chatr = $scope.chatroom;
			var chatx = "";
			if(chatr != undefined){
				if(chatr.indexOf("qto://meeting/") > -1){
					chatx = chatr.substring(14, 41);
				}else{
					chatx = chatr.substring(0, 27);
				}
			}
			
			$scope.submitDisabled = true;
			
			var ticketCtr = 0;
			for (var i = 0; i < $scope.questionelemnt.length; i++) {
				if($scope.questionelemnt[i].ticket != ''){
					ticketCtr++;
					//alert('ctr' + ticketCtr);
				}
			}
			
			
			//check versions
			var tixCheck = 0;
			for (var i = 0; i < $scope.questionelemnt.length; i++) {
				if($scope.questionelemnt[i].ticket != ''){
					var tickurl = "/api360-service/install-request/lookup/version?ticket=" + $scope.questionelemnt[i].ticket;

					var loadFilters = $http.get(tickurl);
					$http.dataType = "json";
					var summaryArr = [];
					loadFilters.success(function(data) {
						$scope.bundleInTicket.push(data.result[1]);
						$scope.versions.push(data.result[2]);
						angular.forEach(data.result, function(value, key) {
							//$scope.summaryCons.push(value);
							summaryArr.push(value);
						});
						
						//alert(summaryArr[0]);
						//alert(summaryArr[1]);
						//alert(summaryArr[2]);
						
						//$scope.versions.push(summaryArr[2]);
						
						tixCheck++;
						//alert('txchk' + tixCheck);
						if(tixCheck == ticketCtr){
							//alert('lastOne');
							
							//for(var j = 0; j < $scope.summaryCons.length; j++){
							//	alert('cons');
							//	alert($scope.summaryCons[j]);
							//}
							
							var versionFlag = true;
							for(var j = 0; j < $scope.versions.length; j++){
								var verOne = $scope.versions[0];
								var verTwo = $scope.versions[j];
								if(verOne != verTwo){
									//alert(verOne + '!=' + verTwo);
									versionFlag = false;
								}
							}
							
							if(versionFlag){
								//alert('same versions');
								for (var i = 0; i < $scope.questionelemnt.length; i++) {

									var url = '/api360-service/install-request/insert/?'
											+ 'submitter=' + $scope.username + '&requesttype='
											+ $scope.requestSelected.value + '&bundle='
											+ $scope.bundleInTicket[0] + '&notification='
											+ $scope.selection + '&environment='
											+ $scope.questionelemnt[i].environment.label
											+ '&ticketnumber=' + $scope.questionelemnt[i].ticket
											+ '&notes=' + notes + '&attuid=' + $scope.attuid
											+ '&pmt=' + $scope.pmt
											+ '&chatroom=' + chatx;
									var response = $http.get(url);
									$http.dataType = "json";

									if (($scope.questionelemnt[i].environment != '')
											&& ($scope.questionelemnt[i].ticket != '')) {
										alertMessage = alertMessage.concat('ENVIRONMENT: ').concat(
												$scope.questionelemnt[i].environment.label).concat(
												'\n').concat('TICKET #: ').concat(
												$scope.questionelemnt[i].ticket).concat('\n\n');

										// $scope.sendMessage(i);
									}
								}

								alertMessage = alertMessage.concat('NOTES: ').concat(notes);

								response.success(function(data) {

											var inputCounter = 0;
											for (var i = 0; i < $scope.questionelemnt.length; i++) {
												if (($scope.questionelemnt[i].environment.label != '')
														&& ($scope.questionelemnt[i].ticket != '')) {
													inputCounter++;
												}
											}

											/*
											 * if($scope.dynamicCtrlisEmpty){ alertMessage =
											 * "Insufficient Data! Please provide complete
											 * information."; }
											 */
											if (inputCounter < 1) {
												//alert("Insufficient Data! Please provide complete information. Enter an environment and Ticket#");
												$rootScope.launch("custom11");
											} else {
												$scope.sendMessage();
												alert(alertMessage);
												$scope.clearForm();
												$scope.versions = [];
												$scope.bundleInTicket = [];
												$scope.refreshRemedy();
												$scope.submitDisabled = false;
											}

										});
							}else{
								//alert('versions are not the same!');
								$rootScope.launch("custom12");
								$scope.submitDisabled = false;
								$scope.versions = [];
								$scope.bundleInTicket = [];
							}
							
						}
					});
				}
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

			$scope.bundleModel.push({"id":"Not Available","label":"Not Available"});
			
			$scope.bundleModel.push({"id":"APIPlatform_EthernetTest","label":"APIPlatform_EthernetTest"});
			
			$scope.sortFilters();
		});
		
		var url = "/api360-service/filter/lookup/All/All/All/adapter_inventory_filters.json";

		var loadFilters = $http.get(url);
		$http.dataType = "json";

		loadFilters.success(function(data) {
			// $scope.bundleModel = new Array(data.result.container_name[1]);
			angular.forEach(data.result.container_name, function(value, key) {
				if (value.label != 'All') {
					$scope.bundleModel.push(value);
				}
			});

		});

		
	}

	$scope.getEnvironmentFilter = function() {
		/*var url = "/api360-service/install-request/lookup/environment";

		var loadFilters = $http.get(url);
		$http.dataType = "json";

		loadFilters.success(function(data) {
			// $scope.bundleModel = new Array(data.result.container_name[1]);
			angular.forEach(data.result, function(value, key) {
				if (value != 'All') {
					$scope.environmentModel.push(value);
				}
			});

		});*/
		
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

	}

	$scope.getTickets = function() {
		var url = "/api360-service/install-request/lookup/remedy/escalated?submitter="
				+ $scope.username;

		var loadFilters = $http.get(url);
		$http.dataType = "json";

		loadFilters.success(function(data) {
			// $scope.bundleModel = new Array(data.result.container_name[1]);
			angular.forEach(data.aaData, function(value, key) {
				if (value != 'All') {
					$scope.ticketModel.push(value);
				}
			});

		});
		
		url = "/api360-service/install-request/lookup/remedy/escalated/non-user?submitter="
			+ $scope.username;

		var loadFilters = $http.get(url);
		$http.dataType = "json";
	
		loadFilters.success(function(data) {
			// $scope.bundleModel = new Array(data.result.container_name[1]);
			angular.forEach(data.aaData, function(value, key) {
				if (value != 'All') {
					$scope.ticketModelEscalated.push(value);
				}
			});
	
		});

		url = "/api360-service/install-request/lookup/remedy/non-escalated?submitter="
				+ $scope.username;

		loadFilters = $http.get(url);
		$http.dataType = "json";

		loadFilters.success(function(data) {
			// $scope.bundleModel = new Array(data.result.container_name[1]);
			angular.forEach(data.aaData, function(value, key) {
				if (value != "All") {
					$scope.ticketModelNonEscalated.push(value);
				}
			});

		});

	}

	$scope.sendMessage = function() {
		var environment = "";
		var ticketNumber = "";
		for (var i = 0; i < $scope.questionelemnt.length; i++) {
			if (($scope.questionelemnt[i].environment.label != '')
					&& ($scope.questionelemnt[i].ticket != '')) {
				environment = environment
						+ $scope.questionelemnt[i].environment.label + "|";
				ticketNumber = ticketNumber + $scope.questionelemnt[i].ticket
						+ "|";
			}
		}

		environment = environment.substring(0, environment.length - 1);
		ticketNumber = ticketNumber.substring(0, ticketNumber.length - 1);

		var notes = '';
		if (($scope.notes == '') || ($scope.notes == undefined)) {
			notes = '';
			if($scope.autoInstall){
				notes = notes + "Dev Auto Install ";
			}
			
			if($scope.cstApproved){
				notes = notes + "| CST Approved ";
			}
			
			if($scope.ccbApproved){
				notes = notes + "| CCB Approved CCB No."+$scope.ccbNumber;
			}
			
		} else {
			var lines = $('#notesTextArea').val().split('\n');
			for(var i = 0;i < lines.length;i++){
			    //code here using lines[i] which will give you each line
				notes = notes + lines[i];
				
				if((i+1)!=lines.length){
					notes = notes + " | ";
				}
			}
			
			if($scope.autoInstall){
				notes = notes + " | Dev Auto Install ";
			}
			
			if($scope.cstApproved){
				notes = notes + "| CST Approved ";
			}
			
			if($scope.ccbApproved){
				notes = notes + "| CCB Approved CCB No."+$scope.ccbNumber;
			}
			//notes = $scope.notes;
			
		}

		//fix#
		notes = notes.replace(/#/g,'');
		
		var url = '/api360-service/q-bot/send/?' + 'submitter='
				+ $scope.username + '&requesttype='
				+ $scope.requestSelected.value + '&bundle='
				+ $scope.bundleInTicket[0] + ':' +$scope.versions[0] + '&notification='
				+ $scope.selection + '&environment=' + environment
				+ '&ticketnumber=' + ticketNumber + '&notes=' + notes
				+ '&attuid=' + $scope.attuid + '&pmt=' + $scope.pmt;
		var response = $http.get(url);
	}

	$scope.clearForm = function() {
		//$scope.request_type = '';
		//$scope.bundleSelected = {};
		//$scope.versions = [];
		$scope.bundleSelected = {};
		$scope.selection = [];
		$scope.pmt = '';
		$scope.chatroom = '';
		$scope.ccbNumber = '';
		$scope.ccbApproved = false;
		$scope.cstApproved = false;
		$scope.autoInstall = false;
		
		for (var i = 0; i < $scope.questionelemnt.length; i++) {
			$scope.questionelemnt[i].environment = {};
			$scope.questionelemnt[i].ticket = '';
		}
		
		/*$scope.questionelemnt = [ {
			id : counter,
			environment : {},
			ticket : '',
			inline : true
		}, {
			id : counter,
			environment : {},
			ticket : '',
			inline : true
		}, {
			id : counter,
			environment : {},
			ticket : '',
			inline : true
		} ];*/

		$scope.notes = '';
	}

	$scope.refreshRemedy = function() {
		$scope.ticketModel = [];
		$scope.ticketModelEscalated = [];
		$scope.ticketModelNonEscalated = [];
		$scope.getTickets();
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

	$scope.init = function() {
		$scope.getUserId();
		$scope.getBundleFilter();
		$scope.getEnvironmentFilter();
		$scope.getTickets();
		$scope.render.iresc();
		$scope.render.other();
		
	}

	$scope.render = {
		iresc : function() {
			if ($scope.requestSelected.value == 'irescalation') {
				return true;
			} else {
				return false;
			}
		},
		other : function() {
			if ($scope.requestSelected.value != 'irescalation') {
				return true;
			} else {
				return false;
			}
		},
		workreq : function() {
			if ($scope.requestSelected.value == 'workrequest') {
				return true;
			} else {
				return false;
			}
		},
		trouble : function() {
			if ($scope.requestSelected.value == 'troubleshooting') {
				return true;
			} else {
				return false;
			}
		}
	}

	$scope.update = function() {
		if ($scope.requestSelected.value == 'irescalation') {
			$scope.irvisible = true;
			$scope.othervisible = false;
		} else {
			$scope.irvisible = false;
			$scope.othervisible = true;
			
		}
	}

	// other engagements
	$scope.otherEnvironment = {};
	$scope.priorityModel = {};
	$scope.bundleModel = [];
	$scope.bundleSelectedOther = {};

	$scope.priorityCustomText = {
		buttonDefaultText : 'Select Priority'
	};

	$scope.priorities = [ {
		id : 1,
		value : '911',
		label : 'Sev 911'
	}, {
		id : 2,
		value : '1',
		label : 'Sev 1'
	}, {
		id : 3,
		value : '2',
		label : 'Sev 2'
	}, {
		id : 4,
		value : '3',
		label : 'Sev 3'
	} ];

	$scope.submitOther = function($event) {

		$("#selectRequest").removeClass("has-error");
		$("#otherEnvironmentId").removeClass("has-error");
		$("#otherReleaseId").removeClass("has-error");
		$("#otherBundleId").removeClass("has-error");
		$("#otherPriorityId").removeClass("has-error");
		$("#cbNotif").removeClass("has-error");
		$("#otherDescription").removeClass("has-error");
		$("#inputErrorCode").removeClass("has-error");
		
		//start validation
		var valid = true;
		
		if($scope.requestSelected.label == undefined) {
			$("#selectRequest").addClass("has-error");
			valid = false;
		}
		if($scope.otherEnvironment.label == undefined){
			$("#otherEnvironmentId").addClass("has-error");
			valid = false;
		}
		if($scope.releaseModel.label == undefined){
			$("#otherReleaseId").addClass("has-error");
			valid = false;
		}
		if($scope.bundleSelectedOther.label == undefined){
			$("#otherBundleId").addClass("has-error");
			valid = false;
		}
		if($scope.priorityModel.label == undefined){
			$("#otherPriorityId").addClass("has-error");
			valid = false;
		}
		if($scope.selection.length == 0){
			$("#cbNotif").addClass("has-error");
			valid = false;
		}
		if($scope.description==''||$scope.description==null){
			$("#otherDescription").addClass("has-error");
			valid = false;
		}
		if($scope.errorcode == '' || $scope.errorcode==null){
			$("#inputErrorCode").addClass("has-error");
			valid = false;
		}
		//end validation
		
		if(!valid){
			$rootScope.launch('custom11');
		}else{
		
			// invoke REST API HERE...
			var summary = $scope.otherEnvironment.label.concat('_Error').concat(
					$scope.errorcode).concat('_').concat($scope.bundleSelectedOther.label);
	
			var release = $scope.releaseModel.label;
			var email = $scope.attuid.concat('@att.com');
	
			var chatr = $scope.chatroomOther;
			var chatx = "";
			if(chatr != undefined){
				if(chatr.indexOf("qto://meeting/") > -1){
					chatx = chatr.substring(14, 41);
				}else{
					chatx = chatr.substring(0, 27);
				}
			}
			
			var conversationId = $scope.convid;
			if(conversationId == undefined){
				conversationId = '';
			}
			
			var descFixed = $scope.description;
			//fix#
			descFixed = descFixed.replace(/#/g,'');
			
			var url = '/api360-service/arsys/remedy/service/create?' + 'summary='
					+ summary + '&description=' + descFixed + '&team=EEM'
					+ '&application=CSI' + '&release=' + release + '&reason='
					+ $scope.requestSelected.value + '&environment='
					+ $scope.otherEnvironment.label + '&priority='
					+ $scope.priorityModel.value + '&requester=' + $scope.username
					+ '&email=' + email + '&pmt=' + $scope.otherpmt + '&notification=' + $scope.selection
					+ '&attuid=' + $scope.attuid + '&convid=' + conversationId +'&bundle='+ $scope.bundleSelectedOther.label + '&chatroom=' + chatx
					+ '&requesttype=' + $scope.requestSelected.label;
			
			/*url = '/api360-service/arsys/remedy/service/create?summary='+summary+
			'&description='+$scope.description+
			'&team=EEM&application=CSI&release='+release+
			'&reason='+$scope.requestSelected.value+
			'&environment='+$scope.otherEnvironment.label+
			'&priority='+$scope.priorityModel.value+
			'&requester=TEST'+
			'&email='+email+
			'&pmt='+$scope.pmt;*/
			
			$scope.submitDisabled = true;
			
			var response = $http.get(url);
	
			var case1 = '';
			// var test = [];
			// var test2 = '';
			$http.dataType = "json";
	
			response.success(function(data) {
				/*
				 * angular.forEach(data.aaData, function(value, key) { test2 =
				 * value;
				 * 
				 * test.push(value); });
				 */
	
				case1 = data.case_id;
	
				if (case1 != null) {
	
					var alertMessage = ($scope.requestSelected.label).concat('\n')
							.concat('Successfully submitted!\n\n').concat(case1)
							.concat('\n\nDetails\n').concat('SUBMITTER: ').concat(
									$scope.username).concat('\n').concat(
									'ERROR CODE: ').concat($scope.errorcode)
							.concat('\n').concat('CONVERSATION ID: ').concat(
									conversationId).concat('\n').concat(
									'ENVIRONMENT: ').concat(
									$scope.otherEnvironment.label).concat('\n')
							.concat('DESCRIPTION: ').concat(descFixed)
							.concat('\n').concat('PRIORITY: ').concat(
									$scope.priorityModel.label).concat('\n');
	
					var description = '';
					if($scope.description != undefined){
						var lines = $('#descriptionTextArea').val().split('\n');
						for(var i = 0;i < lines.length;i++){
						    //code here using lines[i] which will give you each line
							description = description + lines[i];
							
							if((i+1)!=lines.length){
								description = description + " | ";
							}
						}
					}
					
					//fix
					description = description.replace(/#/g,'');
					
					var pmtOther = '';
					if($scope.otherpmt != undefined){
						pmtOther = $scope.otherpmt;
					}
					
					var otherSelectedBundle = '';
					if($scope.bundleSelectedOther.label != undefined){
						otherSelectedBundle = $scope.bundleSelectedOther.label;
					}
					
					var qurl = '/api360-service/q-bot/request/send/?request='
							+ $scope.requestSelected.label + '&ticket=' + case1
							+ '&environment=' + $scope.otherEnvironment.label
							+ '&priority=' + $scope.priorityModel.label
							+ '&attuid=' + $scope.attuid
							+ '&pmt=' + pmtOther
							+ '&description=' + description
							+ '&convid='+ $scope.convid
							+ '&bundle='+ otherSelectedBundle
							+ '&errorcode='+ $scope.errorcode;
	
					var qresponse = $http.get(qurl);
	
					$scope.refreshRemedy();
					alert(alertMessage);
					$scope.clearOtherEngagements();
					$scope.submitDisabled = false;
				}
			});

		// var testmessage = test[0].case_id;
		// test2 =

		// alert('1'+testmessage+'\n2'+case1+'\n3'+test2);

		// var case2 = case1.case_id;
		}
	}

	$scope.clearOtherEngagements = function() {
		$scope.selection = [];
		$scope.errorcode = '';
		$scope.convid = '';
		$scope.otherEnvironment = {};
		$scope.description = '';
		$scope.releaseModel = {};
		$scope.priorityModel = {};
		$scope.otherpmt = '';
		$scope.bundleSelectedOther = {};
		$scope.chatroomOther = '';
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

}