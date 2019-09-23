'use strict';

function TransactionTraceCtrl($scope, $rootScope, $resource, $http, $location,
		$timeout, $interval, $modal, transactionTraceService) {

	$scope.selected_versionsmodel = [];
	$scope.versionsdata = [];
	
	$scope.programviewerDropDown=false;
	$scope.gridExtraColumnHide=true;
		
	
	if("/process_model_viewer"==$location.path())
	{
		$scope.programviewerDropDown=true;
		$scope.gridExtraColumnHide=false;
	}
	
	
	

	$scope.downloadLog = function()
	{
		if($scope.conversation_id!=null && $scope.conversation_id!=undefined && $scope.conversation_id!="")
		{
			window.open("/atw-service/log/splunklog.json?conversationId="+$scope.conversation_id);
		}
	};
	
	$scope.apiTraceVersionsettings = {
		scrollable : true,
		selectionLimit : 1,
		dynamicTitle : true,
		enableSearch : true,
		showCheckAll : false,
		smartButtonMaxItems : 1
	};
	$scope.apiTraceVersioncustomTexts = {
		buttonDefaultText : 'Select Version'
	};
	
	$scope.resizeWindow = function() 
	{
		
		
		
	};

	$scope.traceEvents = {
		onItemDeselect : function(item) {

		},
		onItemSelect : function(item) 
		{
			
			$scope.selected_version = item.id;
			$rootScope.trace_header = $scope.selected_interface + "	"
					+ $scope.selected_version;

			transactionTraceService.loadTrace($scope, $rootScope, $http,
					$interval);
		}
	};

	$scope.selected_version = null;

	// http://hltd425.hydc.sbc.com:8203/atw-service/sig/download/xpdl/api.json?api=InquireFiberServiceQualification&version=92.0.1..94144
	// http://hltd425.hydc.sbc.com:8220/atw-service/sig/download/xpdl/convid.json?sigId=2994&version=92.0.1..94144&convId=buyonline~CNG-CSI~d22880fb-5339-4bd4-b167-ccc75868f9e4
	//http://localhost:8080/atw-service/sig/conv.json?conversationId=cbus~CNG-CSI~79fb88ff-7e95-4239-bef6-1a61c94faad5
	//pepstore~CNG-CSI~a5e06584-fa95-4638-8b92-00e523f4840f	
	//http://hltd425.hydc.sbc.com:8220/atw-service/sig/download/xpdl/convid.json?sigId=3050&version=92.0.0..93718&convId=pepstore~CNG-CSI~a5e06584-fa95-4638-8b92-00e523f4840f
	//http://http//hvdivd05cas0343.itservices.sbc.com:8080/atw-service/log/splunklog.json?conversationId=pepstore~CNG-CSI~a5e06584-fa95-4638-8b92-00e523f4840f
	
	//http://hltd425.hydc.sbc.com:8220/atw-service/sig/download/xpdl/convid.json?sigId=3050&version=92.0.0..93718&convId=pepstore~CNG-CSI~a5e06584-fa95-4638-8b92-00e523f4840f
	
	//http://hltd425.hydc.sbc.com:8220/atw-service/sig/download/xpdl/convid.json?sigId=210379&convId=cbus~CNG-CSI~b5d543d8-71e7-4046-924b-bbcf3745e9a7&version=92.0.2..98054

	$scope.$scope = $scope;

	$scope.no_record_found = "";
	$scope.selected_sigID = null;

	$scope.selected_interface = null;
	$scope.image_trace_version = null;

	$rootScope.trace_header = "";

	$scope.trace_radio_model = "image_trace";
	// $scope.conversation_id="bidonline~CNG-CSI~f1fd251f-2b89-41bb-905d-f96f2f280fbf";
	$scope.selectedRow = null;

	$scope.transationTraceShowHideFilter = true;

	$scope.initCtrl = function() 
	{
		transactionTraceService.loadTrace($scope, $rootScope, $http, $interval);
		
	};

	$scope.showHideFilter = function() {
		transactionTraceService.showHideFilter($scope, $rootScope);
	};

	$scope.iframeLoadedCallBack = function() {
		transactionTraceService.iframeLoadedCallBack($scope, $rootScope);
	};

	$scope.onRadioButtonClick = function() 
	{
		if ($scope.trace_radio_model == "image_trace") {
			$scope.trace_radio_model = "text_trace";
		} else {
			$scope.trace_radio_model = "image_trace";
		}

		if ($scope.selectedRow != null) 
		{
			if($scope.selected_versionsmodel!=null && $scope.selected_versionsmodel.id!=undefined && $scope.selected_versionsmodel.id!=null)
			{
				$scope.selected_version = $scope.selected_versionsmodel.id;
			}
			
			transactionTraceService.fnOne($scope, $rootScope, $http, $interval,$scope.selectedRow, 'radio');
		}
	};

	$scope.clearConvIdSearchDialog = function() {
		if ($("#conversation_id").val() != null
				&& $("#conversation_id").val() != "") {
			$scope.conversation_id = null;
			$("#conversation_id").val(null);
			$scope.no_record_found = "";
			$scope.versionsdata = [];
			$scope.selected_versionsmodel = [];
			$scope.selected_interface = null;
			$scope.image_trace_version = null;
			$scope.selected_sigID = null;
			$scope.selected_version = null;
			$scope.onEnterConversationId();
		}
	};

	$scope.showConvIdSearchDialog = function() {
		$scope.open('lg');
	};

	$scope.onChangeConvIdText = function() {
		if ($("#conversation_id").val() != null
				&& $("#conversation_id").val() != "") {
			$scope.conversation_id = $("#conversation_id").val();
			$scope.onEnterConversationId();
		}
	};

	function rowTemplate() {
		return '<div class="grid_div" style="cursor: pointer;" title="{{row.entity.interfaceName}}" ng-click="getExternalScopes().fnOne(row)" ng-repeat="col in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ui-grid-cell></div>';
	}

	$scope.onChangeVersionDropdown = function() {
		transactionTraceService.loadTrace($scope, $rootScope, $http, $interval);
		$rootScope.trace_header = $scope.selected_interface + "	"
				+ $scope.selected_versionsmodel.id;
	};

	$scope.buildGridColumns = function() {
		if("/process_model_viewer"==$location.path()){
			$scope.programviewerDropDown=true; 
			
		}		
		$scope.gridOptions.columnDefs = $scope.columnDefs;
		
	};

	
	$scope.columnDefs = [ {
		name : 'interfaceName',
		displayName : 'Service',
		width : '40%',
		allowCellFocus : false,
		cellTemplate: '<div class="ui-grid-cell-contents" title="{{row.entity.interfaceName}}">{{row.entity.interfaceName}}</div>'
	}, 
	{
		name : 'adapter',
		displayName : 'Adapter',
		//width : '10%',
		allowCellFocus : false,
		cellTemplate: '<div class="ui-grid-cell-contents" title="{{row.entity.adapter}}">{{row.entity.adapter}}</div>' ,
		visible : $scope.gridExtraColumnHide 			
	},
	{
		name : 'adapterMethod',
		displayName : 'Method',
		//width : '10%',
		allowCellFocus : false,
		cellTemplate: '<div class="ui-grid-cell-contents" title="{{row.entity.adapterMethod}}">{{row.entity.adapterMethod}}</div>' ,
		visible : $scope.gridExtraColumnHide 	
	},
	{
		name : 'sigId',
		displayName : 'SigId',
		//width : '10%',
		allowCellFocus : false,
		cellTemplate: '<div class="ui-grid-cell-contents" title="{{row.entity.sigId}}">{{row.entity.sigId}}</div>' ,
		visible : $scope.gridExtraColumnHide 	
	},		
	{
		name : 'type',
		displayName : 'Type',
		//width : '10%',
		allowCellFocus : false,
		cellTemplate: '<div class="ui-grid-cell-contents" title="{{row.entity.type}}">{{row.entity.type}}</div>' ,
		visible :$scope.gridExtraColumnHide 	
	},
	{
		name : 'conversationId',
		displayName : 'conversationId',
		visible : false
	},{
		name : 'version',
		displayName : 'Version',
		visible : false
	},
	{
		name : 'timeStamp',
		displayName : 'TimeStamp',
		visible : false
	}];

	$scope.gridOptions = {
		enableRowSelection : true,
		enableColumnResize : true,
		columnDefs : $scope.columnDefs
	};

	$scope.gridOptions.onRegisterApi = function(gridApi) {
		// set gridApi on scope
		$scope.gridApi = gridApi;

		gridApi.selection.on.rowSelectionChanged($scope, function(row) 
		{
			$scope.selected_version=null;
			transactionTraceService.fnOne($scope, $rootScope, $http, $interval,row, 'grid');
			$scope.mySelectedRows = row;
		});
	};

	$scope.gridOptions.multiSelect = false;
	$scope.gridOptions.enableFiltering = true;
	$scope.gridOptions.lateBoundColumns = false;	

			$scope.open = function(size) {
				var modalInstance = $modal
						.open({
							templateUrl : 'partials/debug/transaction_trace_convid_search.html',
							controller : 'ModalInstanceCtrl',
							size : size,
							resolve : {
								items : function() {
									return $scope.items;
								}
							}
						});

				modalInstance.result.then(function(selectedItem) {
					$scope.selected = selectedItem;
				}, function() {
					// $log.info('Modal dismissed at: ' + new Date());
				});
			};

	$rootScope.onEnterConversationIdFromOutside = function(convId) {
		$scope.conversation_id = convId;

		$("#conversation_id").val(convId);

		$scope.no_record_found = "";
		$scope.versionsdata = [];
		$scope.selected_versionsmodel = [];
		$scope.selected_interface = null;
		$scope.image_trace_version = null;
		$scope.selected_sigID = null;
		$scope.selected_version = null;

		transactionTraceService.loadTrace($scope, $rootScope, $http, $interval);
	};

	$scope.onEnterConversationId = function() {
		$scope.conversation_id = $("#conversation_id").val();
		$scope.no_record_found = "";
		$scope.versionsdata = [];
		$scope.selected_versionsmodel = [];
		$scope.selected_interface = null;
		$scope.image_trace_version = null;
		$scope.selectedRow = null;
		$scope.selected_sigID = null;
		$scope.selected_version = null;

		transactionTraceService.loadTrace($scope, $rootScope, $http, $interval);
	};
	
	
	

};