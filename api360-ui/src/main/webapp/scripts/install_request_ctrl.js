'use strict';

function InstallRequestCtrl($scope, $http, $rootScope, $cookies) {
	
	$scope.attuid = "";
	$scope.irvisible = false;
	$scope.othervisible = false;
	
	var counter = 0;
	$scope.questionelemnt = [ {
		id : counter,
		environment : '',
		ticket : '',
		inline : true
	}, {
		id : counter,
		environment : '',
		ticket : '',
		inline : true
	}, {
		id : counter,
		environment : '',
		ticket : '',
		inline : true
	} ];

	$scope.notifications = [ 'Q', 'Email' ];

	$scope.requestTypes = [ {
		value : 'irescalation',
		label : 'Install Request Escalation'
	}, {
		value : 'configchange',
		label : 'Env Config Change' 
	}, {
		value : 'workrequest',
		label : 'Work Request' 
	}, {
		value : 'troubleshooting',
		label : 'Troubleshooting Request' 
	} ];
	
	$scope.priorities = [ {
		value : 'sev911',
		label : 'Sev 911'
	}, {
		value : 'sev1',
		label : 'Sev 1' 
	}, {
		value : 'sev2',
		label : 'Sev 2' 
	}, {
		value : 'sev3',
		label : 'Sev 3' 
	} ];
	
	$scope.envSelection = [ {
		value : 'env',
		label : 'Env'
	} ];

	$scope.bundles = [ {
		value : 'bundle',
		label : 'Bundle'
	} ];
	
	/*$scope.environment_selection[ {
		value : 'environment',
		label : 'Environment'
	} ];*/
	
	$scope.bundleModel = [];
	$scope.environmentModel = [];
	$scope.ticketModel = [];
	$scope.ticketModelNonEscalated = [];
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
			environment : '',
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
		
		if($scope.request_type==''|| $scope.bundle_name ==''||$scope.selection==''){
			alert("Insufficient Data! Please provide complete information.");
		}else{
		
		var alertMessage = 'Install Request Escalation\n'
			.concat('Successfully submitted!\n\nDetails\n')
			.concat('ATTUID: ').concat($scope.attuid).concat('\n')
			.concat('BUNDLE: ').concat($scope.bundle_name.label).concat('\n')
			.concat('NOTIFICATION: ').concat($scope.selection).concat('\n\n');
			
		var notes = '';
		if(($scope.notes == '')||($scope.notes == undefined)){
			notes = '';
		}else{
			notes = $scope.notes;
		}
		
		for(var i = 0; i < $scope.questionelemnt.length; i++){
		
			var url = '/api360-service/install-request/insert/?'+
				'submitter=' + $scope.attuid +
				'&requesttype=' + $scope.request_type.value +
				'&bundle=' + $scope.bundle_name.label +
				'&notification=' + $scope.selection +
				'&environment=' + $scope.questionelemnt[i].environment.label +
				'&ticketnumber='  +$scope.questionelemnt[i].ticket +
				'&notes=' + notes;
			var response = $http.get(url);
			$http.dataType = "json";	
			
			
			if(($scope.questionelemnt[i].environment!='')&&($scope.questionelemnt[i].ticket!='')){
				alertMessage = alertMessage.concat('ENVIRONMENT: ').concat($scope.questionelemnt[i].environment.label).concat('\n')
				.concat('TICKET #: ').concat($scope.questionelemnt[i].ticket).concat('\n\n');
				
				//$scope.sendMessage(i);
			}
		}

		alertMessage = alertMessage.concat('NOTES: ').concat(notes);
		
		response.success(function(data) {
			
			var inputCounter = 0;
			for(var i = 0; i < $scope.questionelemnt.length; i++){
				if(($scope.questionelemnt[i].environment.label!='')&&($scope.questionelemnt[i].ticket!='')){
					inputCounter++;
				}
			}
			
			
			/*if($scope.dynamicCtrlisEmpty){
				alertMessage = "Insufficient Data! Please provide complete information.";
			}*/
			if(inputCounter<1){
				alert("Insufficient Data! Please provide complete information.");
			}else{
				$scope.sendMessage();
				alert(alertMessage);
				$scope.clearForm();
				$scope.refreshRemedy();
			}
			
		});
		}
	}
	
	
	
	$scope.getBundleFilter = function(){
		var url = "/api360-service/filter/lookup/All/0/All/All/All/All/All/All/All/All/All/All/allfilters.json";
        
        var loadFilters = $http.get(url);	 
		$http.dataType="json";
		
		loadFilters.success(function(data){
			//$scope.bundleModel = new Array(data.result.container_name[1]);
			angular.forEach(data.result.container_name, function(value, key) {
				if(value!="All"){
					$scope.bundleModel.push(value);
				}
		    });

		});
		
	}
	
	$scope.getEnvironmentFilter = function(){
		var url = "/api360-service/install-request/lookup/environment";
        
        var loadFilters = $http.get(url);	 
		$http.dataType="json";
		
		loadFilters.success(function(data){
			//$scope.bundleModel = new Array(data.result.container_name[1]);
			angular.forEach(data.result, function(value, key) {
				if(value!="All"){
					$scope.environmentModel.push(value);
				}
		    });

		});
		
	}
	
	$scope.getTickets = function(){
		var url = "/api360-service/install-request/lookup/remedy/escalated?submitter="+$scope.attuid;
        
        var loadFilters = $http.get(url);	 
		$http.dataType="json";
		
		loadFilters.success(function(data){
			//$scope.bundleModel = new Array(data.result.container_name[1]);
			angular.forEach(data.aaData, function(value, key) {
				if(value!="All"){
					$scope.ticketModel.push(value);
				}
		    });

		});
		
		url = "/api360-service/install-request/lookup/remedy/non-escalated?submitter="+$scope.attuid;
        
        loadFilters = $http.get(url);	 
		$http.dataType="json";
		
		loadFilters.success(function(data){
			//$scope.bundleModel = new Array(data.result.container_name[1]);
			angular.forEach(data.aaData, function(value, key) {
				if(value!="All"){
					$scope.ticketModelNonEscalated.push(value);
				}
		    });

		});
		
	}
	
	$scope.sendMessage = function(){
		var environment = "";
		var ticketNumber = "";
		for(var i = 0; i < $scope.questionelemnt.length; i++){
			if(($scope.questionelemnt[i].environment.label != '')&&($scope.questionelemnt[i].ticket != '')){
				environment = environment + $scope.questionelemnt[i].environment.label + "|";
				ticketNumber = ticketNumber + $scope.questionelemnt[i].ticket + "|";
			}
		}
		
		environment = environment.substring(0, environment.length-1);
		ticketNumber = ticketNumber.substring(0, ticketNumber.length-1);
		
		var notes = '';
		if(($scope.notes == '')||($scope.notes == undefined)){
			notes = '';
		}else{
			notes = $scope.notes;
		}
		
		var url = '/api360-service/q-bot/send/?'+
		'submitter=' + $scope.attuid +
		'&requesttype=' + $scope.request_type.value +
		'&bundle=' + $scope.bundle_name.label +
		'&notification=' + $scope.selection +
		'&environment=' + environment +
		'&ticketnumber='  +ticketNumber +
		'&notes=' + notes;
	var response = $http.get(url);
	}
	
	$scope.clearForm = function(){
		$scope.request_type = '';
		$scope.bundle_name = '';
		$scope.selection = '';
		
		for(var i = 0; i < $scope.questionelemnt.length; i++){
			$scope.questionelemnt[i].environment = '';
			$scope.questionelemnt[i].ticket = '';
		}
		
		$scope.notes = '';
	}
	
	$scope.refreshRemedy = function(){
		$scope.ticketModel = [];
		$scope.ticketModelNonEscalated = [];
		$scope.getTickets();
	}
	
	$scope.getUserId = function(){
		var attESHr = $cookies.attESHr;
		var eshr = attESHr.split("|");
		var eshrarr = eshr[7].split(",");
		var attuid = eshrarr[0];
		$scope.attuid = attuid;
	}
	
	$scope.init = function(){
		$scope.getUserId();
		$scope.getBundleFilter();
		$scope.getEnvironmentFilter();
		$scope.getTickets();
		$scope.render.iresc();
		$scope.render.other();
	}
	
	$scope.render = {
	  iresc: function() {
		if($scope.request_type.value == 'irescalation'){
			return true;
		}else{
			return false;
		}
	  },
	  other: function() {
		if($scope.request_type.value != 'irescalation'){
			return true;
		}else{
			return false;
		}
	  },
	  workreq: function() {
		if($scope.request_type.value == 'workrequest'){
			return true;
		}else{
			return false;
		}
	  },
	  trouble: function() {
		if($scope.request_type.value == 'troubleshooting'){
			return true;
		}else{
			return false;
		}
	  }
	}
	
	$scope.update = function(){
		if($scope.request_type.value == 'irescalation'){
			$scope.irvisible = true;
			$scope.othervisible = false;
		}else{
			$scope.irvisible = false;
			$scope.othervisible = true;
		}
	}
}