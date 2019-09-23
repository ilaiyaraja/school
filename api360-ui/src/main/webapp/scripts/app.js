'use strict';

/* App Module */
console.log("app.js");

var app = angular.module('testdata-app', ['ngRoute', 
                                          'ngResource',
                                          'angularjs-dropdown-multiselect',
                                          'angularjs-dropdown-multiselect-new',
                                          'hljs',
                                          'ui.bootstrap',
                                          'angular-loading-bar', 
                                          'ngAnimate',
                                          'dialogs.main',
                                          'ui.grid', 
                                          'ui.grid.resizeColumns',
                                          'ui.grid.paging',
                                          'ui.grid.selection',
                                          'ui.grid.cellNav',
                                          'ui.grid.pinning',
                                          'ngSanitize',
                                          'ngCookies',
                                          'ui.bootstrap.modal',
                                          'ui.grid.exporter',
                                          'angucomplete'
                                          ])
.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) 
{
    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.includeSpinner = true;
  }])
.config(function ($httpProvider) {
	  $httpProvider.responseInterceptors.push('myHttpInterceptor');

	  var spinnerFunction = function spinnerFunction(data, headersGetter) 
	  {
		return data;
	  };

	  $httpProvider.defaults.transformRequest.push(spinnerFunction);
})
.config(['$routeProvider','$locationProvider', '$compileProvider','cfpLoadingBarProvider',function(
				$routeProvider, 
				$locationProvider,
				cfpLoadingBarProvider,
				$timeout,
				dialogs,
				$cookies) 
{
  $locationProvider.html5Mode(false);
     
	$routeProvider.
	when('/otherwise', {templateUrl: 'partials/please_wait.html', controller: QueryParamsHandlerCtrl }).
	when('/api_portfolio', { templateUrl: 'partials/portfolios/api_portfolio.html', controller: APIPortfolioCtrl }).
	when('/dashboard', { templateUrl: 'partials/portfolios/dashboard.html', controller: ExecDashboardCtrl }).
	when('/authenticate', { templateUrl: 'authenticate.html', controller: AuthenticateCtrl }).
	when('/project_portfolio', { templateUrl: 'partials/portfolios/project_portfolio.html', controller: ProjectPortfolioCtrl }).
	when('/installed_bundle_versions', { templateUrl: 'partials/portfolios/installed_bundle_versions.html', controller: BundleVersionCtrl }).
	when('/api_schema', { templateUrl: 'partials/api_schema/api_schema.html', controller: APISchemaSearchCtrl }).
	when('/performance_test_results', { templateUrl: 'page_under_construction.html', controller: PageUnderConstructionCtrl }).
	when('/test_data', { templateUrl: 'page_under_construction.html', controller: PageUnderConstructionCtrl }).
	when('/func_test_exec_status', { templateUrl: 'partials/test_tools/func_test_execution_status.html', controller: FunctionalTestResultCtrl }).
	when('/security_analysis', { templateUrl: 'page_under_construction.html', controller: PageUnderConstructionCtrl }).
	when('/signature_capture', { templateUrl: 'page_under_construction.html', controller: PageUnderConstructionCtrl }).
	when('/environment_configurations', { templateUrl: 'partials/debug/environment_configurations.html', controller: EnvironmentConfigurationsCtrl }).
	when('/transaction_trace', { templateUrl: 'partials/debug/transaction_trace.html', controller: TransactionTraceCtrl }).
	when('/api_usage', { templateUrl: 'page_under_construction.html', controller: PageUnderConstructionCtrl }).
	when('/ror_deltas', { templateUrl: 'page_under_construction.html', controller: PageUnderConstructionCtrl }).
	when('/warnings', { templateUrl: 'page_under_construction.html', controller: PageUnderConstructionCtrl }).
	when('/open_risks', { templateUrl: 'page_under_construction.html', controller: PageUnderConstructionCtrl }).
	when('/defects', { templateUrl: 'partials/prioritization/defects.html', controller: DefectReportCtrl }).
	when('/install_requirements', { templateUrl: 'partials/prioritization/install_requirements.html', controller: InstallRequestCtrl }).
	when('/reportabug', { templateUrl: 'help.html', controller: bugCtrl }).	
	when('/release_risks',{ templateUrl: 'page_under_construction.html', controller: PageUnderConstructionCtrl }).
	when('/adapter_inventory', { templateUrl: 'partials/portfolios/adapter_inventory.html', controller: AdapterInventoryCtrl }).
	when('/api_taxonomy', { templateUrl: 'partials/portfolios/api_taxonomy.html', controller: APITaxonmyCtrl }).
	when('/resource_allocation', { templateUrl: 'page_under_construction.html', controller: PageUnderConstructionCtrl }).
	when('/cstem_engagement', { templateUrl: 'partials/prioritization/cstem_engagement.html', controller: CstemEngagementCtrl }).
	when('/subscriptions', { templateUrl: 'partials/subscriptions.html', controller: SubscriptionsCtrl }).
	when('/api_search', { templateUrl: 'partials/portfolios/api_search.html', controller: PageUnderConstructionCtrl }).
	when('/api_search_tab', { templateUrl: 'partials/portfolios/api_search_tab.html', controller: ApiSearchCtrl }).
	when('/search_service_in_bundle_tab', { templateUrl: 'partials/portfolios/search_service_in_bundle_tab.html', controller: ApiSearchCtrl }).
	when('/search_adapter_in_bundle_tab', { templateUrl: 'partials/portfolios/search_adapter_in_bundle_tab.html', controller: ApiSearchCtrl }).
	when('/invalidlogin', { templateUrl: 'partials/invalid_login.html', controller: PageUnderConstructionCtrl }).
	when('/quicksearch', { templateUrl: 'partials/quick_search.html', controller: QuckSearchCtrl }).
	when('/qc_coverage_report', { templateUrl: 'partials/test_tools/federated_qc_coverage.html', controller: FederatedQcCoverageCtrl }).
	when('/process_model_viewer', { templateUrl: 'partials/debug/transaction_trace.html', controller: TransactionTraceCtrl }).
	when('/api_resource_finder', { templateUrl: 'partials/api_resource_finder/api_resource_finder.html', controller: ApiResourceFinderCtrl }).
	when('/ete_test_result', { templateUrl: 'partials/ete_test_result.html', controller: ETETestResultCtrl }).
	when('/api_artifact_page', { templateUrl: 'partials/api_artifact.html', controller: APIArtifactCtrl }).
	
	otherwise({redirectTo: '/otherwise'});
  
}]).controller('dialogCtrl',function($scope,$rootScope,$timeout,dialogs){
	
	//-- Variables --//
	
	$scope.lang = 'en-US';
	$scope.language = 'English';

	var _progress = 100;
	
	$scope.name = '';
	$scope.confirmed = 'No confirmation yet!';
	
	$scope.custom = {
		val: 'Initial Value'
	};
	
	
	
	//-- Listeners & Watchers --//

	$scope.$watch('lang',function(val,old){
		switch(val){
			case 'en-US':
				$scope.language = 'English';
				break;
			case 'es':
				$scope.language = 'Spanish';
				break;
		}
	});

	//-- Methods --//

	$scope.setLanguage = function(lang)
	{
		$scope.lang = lang;
		$translate.use(lang);
	};

	$rootScope.launch = function(which){
		switch(which){
			case 'error':
				dialogs.error();
				break;
			case 'wait':
				var dlg = dialogs.wait(undefined,undefined,_progress);
				//_fakeWaitProgress();
				break;
			case 'customwait':
				var dlg = dialogs.wait('Custom Wait Header','Custom Wait Message',_progress);
				//_fakeWaitProgress();
				break;
			case 'notify':
				dialogs.notify();
				break;
			case 'confirm':
				var dlg = dialogs.confirm();
				dlg.result.then(function(btn){
					$scope.confirmed = 'You confirmed "Yes."';
				},function(btn){
					$scope.confirmed = 'You confirmed "No."';
				});
				break;
			case 'custom':
				var dlg = dialogs.create('/dialogs/custom.html','customDialogCtrl',{},{size:'lg',keyboard: true,backdrop: false,windowClass: 'my-class'});
				dlg.result.then(function(name){
					$scope.name = name;
				},function(){
					if(angular.equals($scope.name,''))
						$scope.name = 'You did not enter in your name!';
				});
				break;
			case 'custom2':
				var dlg = dialogs.create('/dialogs/custom2.html','customDialogCtrl2',$scope.custom,{size:'lg'});
				break;
			case 'custom3':
				var dlg = dialogs.notify('Message','All is not supported, Please select interface(s)/version(s) to fetch real time federated coverage report.');
				break;
			case 'custom4':
				var dlg = dialogs.confirm('Message','You are about to fetch real time federated coverage report.This may take sometime!!!.');
				dlg.result.then(function(btn){
					$scope.confirmed = 'You confirmed "Yes."';
				},function(btn){
					$scope.confirmed = 'You confirmed "No."';
				});
				break;
			case 'custom5':
				var dlg = dialogs.notify('Success','Request has been successfully processed.');
				break;
			case 'custom7':
				var dlg = dialogs.notify('Success','Job has been successfully submitted.');
				break;
			case 'custom8':
				var dlg = dialogs.notify('Message','Please select one release at a time.');
				break; 				
			case 'custom9':
				var dlg = dialogs.notify('Message','Please select an API.');
				break; 
			case 'custom10':
				var dlg = dialogs.notify('Message','Please select a Version.');
				break; 
			case 'custom11':
				var dlg = dialogs.notify('Error','Please Fill in All Required Fields!');
				break; 
			case 'custom12':
				var dlg = dialogs.notify('Error','Bundle Versions are Different! Please Check the Remedy Tickets and Try Again.');
				break; 
		}
	}; // end launch
	
	var _fakeWaitProgress = function()
	{
		$timeout(function()
		{
			if(_progress < 100)
			{
				_progress += 33;
				$rootScope.$broadcast('dialogs.wait.progress',{'progress' : _progress});
				_fakeWaitProgress();
			}
			else
			{
				$rootScope.$broadcast('dialogs.wait.complete');
				_progress = 0;
			}
		},1000);
	};
}).controller('APISearchTABCtrl', function ($scope) 
{
	$scope.tabManager = {};

    $scope.tabManager.tabItems = [];

    $scope.tabManager.checkIfMaxTabs = function()
    {
        var max = 4;
        var i = $scope.tabManager.tabItems.length;
        
        if(i > max)
        {
            return true;
        }
        
        return false;
    };

    $scope.tabManager.getTitle = function(tabInfo)
    {
        //console.log("[ title ] -> ",tabInfo.title);
        tabInfo.title.substr(0,10);
    };

    $scope.tabManager.resetSelected = function(){
        angular.forEach($scope.tabManager.tabItems, function(pane) {
            pane.selected = false;
        });
    };

    $scope.tabManager.addTab = function(){
        if($scope.tabManager.checkIfMaxTabs())
        {
            alert("[Max Tabs] You have opened max tabs for this page.");
            return;
        }
        
        $scope.tabManager.resetSelected();
        var i = ($scope.tabManager.tabItems.length +1);
        
        
        $scope.tabManager.tabItems.push({
            title: "Tab No: " + i,
            content: "Lores sum ep sum news test [" + i +"]",
            selected: true
        });
    };
    
    //to select the tab
    $scope.tabManager.select = function(i) 
    {
        angular.forEach($scope.tabManager.tabItems, function(tabInfo) 
        {
            tabInfo.selected = false;
        });
        
        $scope.tabManager.tabItems[i].selected = true;
    };
    
    
    $scope.tabManager.tabItems.push({
        title: "General Search",
        content: "partials/portfolios/api_search_tab.html",
        selected: false
    });
    
    $scope.tabManager.tabItems.push({
        title: "Search Service in Bundle",
        content: "partials/portfolios/search_service_in_bundle_tab.html",
        selected: false
    });
    
    $scope.tabManager.tabItems.push({
        title: "Search Adapter in Bundle",
        content: "partials/portfolios/search_adapter_in_bundle_tab.html",
        selected: false
    });
   
    // init the first active tab
    $scope.tabManager.select(0);
	
}).controller('ModalInstanceCtrl', function ($scope,$rootScope, $resource, $http, $location,$interval, $modalInstance, items) 
{
	
	$scope.$scope = $scope;
	
	//https://github.com/darylrowland/angucomplete
	$scope.selectedObject = null;
	$scope.mins=180;
	$scope.rows=1000;
	
	$scope.loadDefaultAPIs = function()
	{
		$http.get("/atw-service/sig/apis.json")
		.success(function(data) 
		{
			$scope.apiCombo = data.interfaceName;		
		});			
	};
	
	$scope.loadDefaultAPIs();
	
	$scope.search = function()
	{
		$http.get("/admin-service/getsigconsumer.json?interfaceName="+$("#apiSearchId_value").val()+"&mins="+$scope.mins+"&rows="+$scope.rows)
		.success(function(data) 
		{
			$scope.convGridOptions.data = data.conversationID;			
		});	
	};
	
	$http.get("/admin-service/getsigconsumer.json?interfaceName=&mins="+$scope.mins+"&rows="+$scope.rows)
	.success(function(data) 
	{
		$scope.convGridOptions.data = data.conversationID;			
	});	
	  
	//http://ui-grid.info/docs/#/tutorial/206_exporting_data
	$scope.convGridOptions = 
	{
		enableRowSelection: true,
	    columnDefs : [
		    {
				name : 'conversationId',displayName: 'ConversationId',width:420
			},
			{
				name : 'interfaceName',displayName: 'APIs',width:200
			},{
				name : 'containerName',displayName: 'Bundle',width:300
			}
		]
	};
	
	$scope.convGridOptions.onRegisterApi = function(gridApi)
	{
		  //set gridApi on scope
		  $scope.gridApi = gridApi;
		  gridApi.selection.on.rowSelectionChanged($scope,function(row)
	     {
		    //var msg = 'row selected ' + row.isSelected;
			  $scope.selectedObject = row.entity.conversationId;
		  });
		};

		$scope.convGridOptions.multiSelect = false;
		$scope.convGridOptions.enableFiltering = true;
		$scope.convGridOptions.showGridFooter = true;
		$scope.convGridOptions.showColumnFooter = true;	
		
		  $scope.ok = function () 
		  {
			  if($scope.selectedObject!=null)
			  {
				//  $rootScope.conversation_id = $scope.selectedObject;
				  $rootScope.onEnterConversationIdFromOutside($scope.selectedObject);
				  $modalInstance.dismiss('cancel');
			  }
			  
		  };
	  
		  $scope.cancel = function () 
		  {
		    $modalInstance.dismiss('cancel');
		  };
	}).controller('ModalSummaryNotesInstanceCtrl', function ($scope,$rootScope, $resource, $http, $location,$interval, $modalInstance,foo) 
			{
		
	      $scope.$scope = $scope;
	      $scope.foo = foo;
	    
	      
	      
	      $http.get("/api360-service/functional-test/all/history/reports.json?fun_id="+$scope.foo)
		  	.success(function(data) 
		  	{
		  		$scope.sumGridOptions.data = data.result;			
		  	});	
	      
	     
	        
	     $scope.sumGridOptions = 
	  	{
	  		enableRowSelection: true,
	  	    columnDefs : [
	  		    {
	  				name : 'notes',displayName: 'Notes',width:300
	  			},
	  			{
	  				name : 'createddate',displayName: 'Date',width:150
	  			},{
	  				name : 'createdby',displayName: 'Attuid',width:80
	  			}
	  		]
	  	};
	      
	      
		  $scope.cancel = function () 
		  {
		    $modalInstance.dismiss('cancel');
		  };
	}).controller('ModalEnvironmentConfigInstanceCtrl', function ($scope,$rootScope, $resource, $http, $location,$interval, $modalInstance,release,enviro,adapters,adapterBundles,serviceBundles,versions,environments,vtierhostnames)
	   {
		
		
		$scope.$scope = $scope;
        $scope.releaseparam = release;
        $scope.environment = enviro;
	    $scope.enviromentArray=$scope.environment.split(",");
	    $scope.adapters=adapters ;
	    $scope.adapterBundles=adapterBundles ;
	    $scope.serviceBundles=serviceBundles ;
	    $scope.versions=versions ;
	    $scope.environments=environments ;
	    $scope.vtierhostnames=vtierhostnames ;
	    
	    
	   $scope.submittEnvironmentMapping=function(){
		   
		   /*if (!confirm("You'll be notified by email once configurations extract is complete.\nAre you sure you want to proceed?")){
   			return;
   		   }*/
		   
	    	var environmentmapping = [];

	    		for(var i in $scope.enviromentArray) {
	    		    var item = $scope.enviromentArray[i];
	    		    var valTextBox=$("#"+$scope.enviromentArray[i]).val(); 
	    		    environmentmapping.push({ 
	    		        "key" : item,
	    		        "value"  : encodeURIComponent(valTextBox)
	    		       
	    		    });
	    		}
	    		
	    		
	    		console.log(JSON.stringify(environmentmapping));
	    		
	    		$scope.cancel();
	    		
	    		var url = '/api360-service/environment_configuration/extract-configs?';
	 		   
	    		var params = 'adapters=' + $scope.adapters + 
	    			 '&adapterBundles=' + $scope.adapterBundles + 
	    			 '&serviceBundles='+$scope.serviceBundles +			
	    			 '&release='+$scope.releaseparam+
	    			 '&versions='+$scope.versions +
	    			 '&environments='+$scope.environments +
	    			 '&vtierhostnames='+$scope.vtierhostnames+
	    		     '&environmentmapping='+JSON.stringify(environmentmapping) ;
	    		
	    		var loadFilters = $http.get(url+params);
	    		$http.dataType="json";
	    		loadFilters.then(function(payload) {
	    			$scope.cancel();	    			
	    		});	
	    		
	    		
	    		
	     
		    
		    
	    }
	    
		
		
	    $scope.cancel = function () 
		  {
		    $modalInstance.dismiss('cancel');
		  };
	   })
.controller('MenuCtrl',function($scope,$rootScope,$timeout,dialogs, $location)
{
	$rootScope.screenName="Executive Dashboard";
	
	$rootScope.contactUs= function()
	{
		var link = "mailto:TestToolsDev@list.att.com?subject=API360&body=Please send us suggestions or feature enhancements or defect. If possible, please send us the steps to replicate any defect.";
		window.location.href = link;
	};
	
	$scope.emptyMenuClick= function(value,name)
	{
		if(name=="Wiki")
		{
			window.open(value);
		}
		else if(name=="Contact Us")
		{
			$rootScope.contactUs();
		}
		else if(name=="Qbot Splunk Log Download")
		{
			window.open(value);
		}
		else
		{
			$rootScope.screenName=name;			
			$scope.updatebreadcrumb(value);
			
			$rootScope.copySelectedFilters(value);
			$location.path(value);
		}
	};
	
	
	
	$rootScope.impAlerts= function()
	{
		
	};
	
	$scope.tabs = {
			
			 "Development/Architecture": [{
	            	
	        	 link: "/adapter_inventory",
	             name: "API Adapter Inventory"
	                 	
	            },{
	            	 link: "/api_artifact_page",
	                 name: " API Artifacts"
	           },
	           
	            {
	            	 link: "/api_search",
	                 name: "API Conceptual Path"
	           },
	           {
	            	 link: "/api_portfolio",
	                 name: "API Portfolio"
	           },	           
	           {
	            	 link: "/api_taxonomy",
	                 name: "API Taxonomy"
	            },
	            {
	            	 link: "/api_schema",
	                 name: "API Schema"
	            },{
	                link: "/process_model_viewer",
	                name: "Process Model Viewer"
	            }],
	          
	            
	            "Test": [
	         			{
	                     	 link: "/defects",
	                          name: "Defects"
	                     },{
	                     	 link: "/ete_test_result",
	                          name: "ETE Test Results"
	                        	  
	                     },
	                     {
	                     	 link: "/func_test_exec_status",
	                          name: "Functional Test Results"
	                        	  
	                     },
	                     {
	                         link: "/performance_test_results",
	                         name: "Performance Test Results"
	                     },
	                     {
 	                    	 link: "/qc_coverage_report",
 	                         name: "QC Coverage Report"
  	                     },
  	                   
	                     {
	                     	 link: "qto://talk/triage.qcattachlog2@acsi.att.com",
	                          name: "Qbot Splunk Log Download"
	                     },
  	                     {
	                     	link: "/security_analysis",
	                         name: "Security Analysis"
	                     }, {
	                     	 link: "/test_data",
	                          name: "Test Data"
	                         
	                     },
	                     {
	     	                link: "/transaction_trace",
	     	                name: "Transaction Trace"
	     	            }],
	                     
	                     "Operations" :[
										
	                        			{
	                                    	 link: "/api_usage",
	                                         name: "API Production Hit Count "
	                                       
	                                    },
	                        			{
	                                    	 link: "/cstem_engagement",
	                                         name: "CSTEM Engagement"
	                                       
	                                    },
	                        			{
	                                    	 link: "/environment_configurations",
	                                         name: "Environment Configurations "
	                                       
	                                    },
	                        			{
	                                    	 link: "/installed_bundle_versions",
	                                         name: "Installed Bundle Versions "
	                                       
	                                    }	
	                        			
	                        			],         
	                     
	                     
	                        			"Project Management" :[
	                        			           			
        			           			{
        			                           	link: "/project_portfolio",
        			                               name: "Project Portfolio"
        			                       },
        			           			{
        			                           	link: "/release_risks",
        			                               name: "Release Risks"
        			                       },
        			           			   {
        			                           	link: "/resource_allocation",
        			                               name: "Resource Allocation"
        			                       },
        			                       {
       			                           	link: "/api_resource_finder",
       			                               name: "Resource Finder"
        			                       },
        			           			{
        			                           	link: "/ror_deltas",
        			                               name: "ROR Deltas"
        			                       },
        			           			{
        			                           	link: "/warnings",
        			                               name: "Warnings"
        			                       }
	                        			           			
	                        			           			],
			            "Help": [
			            {
			                link: "http://wiki.web.att.com/display/CSTest/API360",
			                name: "Wiki"
			            }, {
			                link: "/contact_us",
			                name: "Contact Us"
			            },
			            {
			                link: "/reportabug",
			                name: "Report a Bug/Request a Feature"
			            },
			            {
			                link: "/quicksearch",
			                name: "Quick Search"
			            }]
        };

	
        if (!Object.keys) 
        {
            Object.keys = function(obj) 
            {
                var keys = [];

                for (var i in obj) {
                    if (obj.hasOwnProperty(i)) {
                        keys.push(i);
                    }
                }

                return keys;
            };
            $scope.keyList = Object.keys($scope.tabs);
        } else
        {
            $scope.keyList = Object.keys($scope.tabs);
        }
        
        $scope.updatebreadcrumb = function(path)
        {
        	var currentURL = $location.path();
        	
        	if(path!=undefined)
        	{
        	 currentURL = path;
        	}
        		
        	
        	if(currentURL=="/dashboard")
            {
            	$rootScope.screenName = "Executive Dashboard";
            	$rootScope.parentMenu = "Home";
            }
        	/*else if(currentURL=="/quicksearch")
            {
            	$rootScope.screenName = "Quick Search";
            	$rootScope.parentMenu = "Home";
            }*/
            else
            {
            	var found = false;
            	
    	        angular.forEach($scope.keyList, function(value, key) 
    	        {
    	        	if(!found)
    	        	{
	    	        	$rootScope.parentMenu = value;
	    	        	
	    	    	    angular.forEach($scope.tabs[value], function(value, key) 
	    		        {
	    	    	    	if(currentURL==value.link)
	    	    	    	{
	    	    	    		$rootScope.screenName=value.name;
	    	    	    		found=true;
	    	    	    	}	        	  
	    		        });
    	        	}
    	        });
            }
        };
        
        $scope.updatebreadcrumb();
	
});


app.factory('myHttpInterceptor', function ($q, $window) 
{
	  return function (promise) 
	  {
	    return promise.then(function (response) 
	    {
	      return response;
	    }, 
	    function (response) 
	    {	
	      return $q.reject(response);
	    });
	  };
});



app.directive('a', function() {
    return {
        restrict: 'E',
        link: function(scope, elem, attrs) {
        	
            if(attrs.ngClick || attrs.href === '' || attrs.href === '#'){
            	
                elem.on('click', function(e){
                	
                    e.preventDefault();
                });
            }
        }
   };
});

app.directive('blink', function($timeout) {
	return {
	    restrict: 'E',
	    transclude: true,
	    scope: {},
	    controller: function($scope,$rootScope, $element) {
	        function showElement() 
	        {
	            //$element.css("glyphicon glyphicon-bell blue");
	        	$rootScope.show_bell=true;
	            $timeout(hideElement, 100);
	        }

	        function hideElement() 
	        {
	        	$rootScope.show_bell=false;
	            //$element.css("glyphicon glyphicon-bell");
	            $timeout(showElement, 100);
	        }
	        
	        showElement();
	    },
	    template: '<span ng-transclude></span>',
	    replace: true
	};
});

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});

app.directive('iframeOnload', [function(){
	return {
	    scope: {
	        callBack: '&iframeOnload'
	    },
	    link: function(scope, element, attrs){
	        element.on('load', function()
	        {
	        	return scope.callBack();
	        });
	    }
	}}]);


app.run(['$route', function($route)  {
	  $route.reload();
}]);


app.directive('tabs', function() {
    return {
        restrict: 'A',
        transclude: true,
        scope: {},
        controller: function($scope,$rootScope, $element) 
        {
            var panes = $scope.panes = [];
            
            $scope.clickTab = function(index) 
            {
            	$rootScope.redrawDatatable();
            };

            $scope.select = function(pane) 
            {
            	angular.forEach(panes, function(pane) 
                {
                    pane.selected = false;
                });
                
                pane.selected = true;
            };

            this.addPane = function(pane) 
            {
                if (panes.length === 0) $scope.select(pane);
                
                panes.push(pane);
            };
        },
        template:
            '<div class="tabbable">' +
                '<ul class="nav nav-tabs">' +
                '<li ng-repeat="pane in panes" ng-class="{active:pane.$parent.tabInfo.selected}">'+
                '<a href="" ng-click="pane.$parent.tabManager.select($index);clickTab($index)">{{pane.title}}</a>' +
                '</li>' +
                '</ul>' +
                '<div class="tab-content" ng-transclude></div>' +
                '</div>',
        replace: true
    };
});

app.directive('pane', function() {
    return {
        require: '^tabs',
        restrict: 'A',
        transclude: true,
        scope: { title: '@' },
        link: function(scope, element, attrs, tabsCtrl) {
            tabsCtrl.addPane(scope);
        },
        template:
            '<div class="tab-pane" ng-class="{active: $parent.tabInfo.selected}" ng-transclude>' +
                '</div>',
        replace: true
    };
});

//filters

app.filter('limit', function() 
{
	return function (input, value) 
	{
		return input.substr(0,value);
	}
});


app.filter('orderObjectBy', function() {
	  return function(items, field, reverse) {
	    var filtered = [];
	    angular.forEach(items, function(item) {
	      filtered.push(item);
	    });
	    filtered.sort(function (a, b) {
	      return (a[field] > b[field] ? 1 : -1);
	    });
	    if(reverse) filtered.reverse();
	    return filtered;
	  };
	});

app.filter('fromNow', function() {
	return function(date) {
		if (date==null){
			return "Not Available"
		}
		return moment(date).fromNow();
	}
});

//yourApp.run(['$route', angular.noop]);