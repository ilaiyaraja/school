'use strict';

function QuckSearchCtrl($scope,$rootScope, $resource, $http, $location,$timeout,$modal,quickSearchService) 
{
			
	$scope.quickSearchTerm=null;
	$rootScope.resultHeader="API Portfolio";
		
	$scope.quickSearchClick = function()
	{
		if($scope.quickSearchTerm!=null && $scope.quickSearchTerm!="")
		{
			if($location.path()!="/quicksearch")
			{
				$location.path("/quicksearch");
				$rootScope.quickSearchTermGlobal = $scope.quickSearchTerm;
				$scope.renderReport(true);
			}
			else
			{
				$rootScope.quickSearchTermGlobal = $scope.quickSearchTerm;					
				$scope.renderReport(true);
			}
		}		
	};	
	
	
	$scope.renderReport = function (fromSearch)
	{
		$scope.showGrid($scope.highLevelResults[0].id,$scope.highLevelResults[0].label);
		
		$timeout(function() 
		{
			angular.forEach($scope.highLevelResults,function(value,key)
			{	
				if(!value.display)
				{
					$('#'+value.divid).hide();
				}
				else
				{
					$('#'+value.divid).show();
				}
				
				if(fromSearch)
				{
					$('#'+value.loadingid).show();
					$scope.onHighLevelResultClick(value.id,value.url,value.callback);
				}
			});		        
	    }, 1000);	
	};
		
	
	$scope.updateHighLevelResultTotal = function (id,count)
	{
		angular.forEach($scope.highLevelResults,function(value,key)
		{	
			if(id==value.id)
			{
				value.total=count;
			};
		});
	};
	
	$scope.hideAllGrids = function ()
	{
		angular.forEach($scope.highLevelResults,function(value,key)
		{	
			$('#'+value.divid).hide();
		});
	};
	
	$scope.showGrid = function (id,label)
	{
		$scope.hideAllGrids();
		$('#'+id).show();
		
		$rootScope.resultHeader=label;
		
		$timeout(function() 
		{
	    	$( $.fn.dataTable.tables( true ) ).DataTable().columns.adjust().draw();
	    }, 1000);
	};
		
	
	$scope.onHighLevelResultClick = function(id,url,callback)
	{
		if($rootScope.quickSearchTermGlobal!=null && $rootScope.quickSearchTermGlobal!="")
		{
			$('#'+id).dataTable().api().ajax.url(url+$rootScope.quickSearchTermGlobal).load(callback);
		}
	};	
	
	$scope.apisearchGridCallback = function ()
	{
		quickSearchService.apisearchGridCallback($scope,$rootScope);
	};
	
	$scope.projectportfolioGridCallback = function ()
	{
		quickSearchService.projectportfolioGridCallback($scope,$rootScope);
	};
	
	
	$scope.apiPortfoioGridCallback = function ()
	{
		quickSearchService.apiPortfoioGridCallback($scope,$rootScope);
	};
	
	///////abhi////
	
	$scope.functionalTestResultGridCallback = function ()
	{
		quickSearchService.functionalTestResultGridCallback($scope,$rootScope);
	};
	
	$scope.eteTestResultGridCallback = function ()
	{
		quickSearchService.eteTestResultGridCallback($scope,$rootScope);
	};
	
	
	$scope.envConfigGridCallback = function ()
	{
		quickSearchService.envConfigGridCallback($scope,$rootScope);
	};
	
	
	$scope.adapterInventoryGridCallback = function ()
	{
		quickSearchService.adapterInventoryGridCallback($scope,$rootScope);
	};
	
	$scope.adapterInventoryGridCallback = function ()
	{
		quickSearchService.adapterInventoryGridCallback($scope,$rootScope);
	};
	
	$scope.defectGridCallback = function ()
	{
		quickSearchService.defectGridCallback($scope,$rootScope);
	};
	
	$scope.bundleVersionGridCallback = function ()
	{
		quickSearchService.bundleVersionGridCallback($scope,$rootScope);
	};
	
	$scope.renderAPIServiceGrid = function ()
	{
		quickSearchService.renderAPIServiceGrid($scope,$rootScope);
	};
	
	$scope.renderAPIPorfolioGrid = function ()
	{
		quickSearchService.renderAPIPorfolioGrid($scope,$rootScope);
	};
	
	$scope.renderAdapterInventoryGrid = function ()
	{
		quickSearchService.renderAdapterInventoryGrid($scope,$rootScope);
	};
	
	$scope.renderProjectPortfoioGrid = function ()
	{
		quickSearchService.renderProjectPortfoioGrid($scope,$rootScope);
	};
	
	/////////Abhi/////
	
	$scope.renderFunctionalTestResultGrid = function ()
	{
		quickSearchService.renderFunctionalTestResultGrid($scope,$rootScope,$http);
	};
	
	$scope.renderEteTestResultGrid = function ()
	{
		quickSearchService.renderEteTestResultGrid($scope,$rootScope);
	};
	
	$scope.renderEnvironmentConfigGrid = function ()
	{
		quickSearchService.renderEnvironmentConfigGrid($scope,$rootScope,$http);
	};
	
	
	
	$scope.renderAPITaxonomyGrid = function ()
	{
		quickSearchService.renderAPITaxonomyGrid($scope,$rootScope);
	};
	
	$scope.renderDefectGrid = function ()
	{
		quickSearchService.renderDefectGrid($scope,$rootScope,$http);
	};
	
	$scope.renderBundleVersionGrid = function ()
	{
		quickSearchService.renderBundleVersionGrid($scope,$rootScope);
	};

	$scope.renderDiscoveryApiGrid = function ()
	{
		quickSearchService.renderDiscoveryApiGrid($scope,$rootScope);
	};

	
	$scope.highLevelResults = 
	[
	 	{id:"apiportfoliogridid",divid:"apiportfoliogriddivid",loadingid:"apiportfolioloadingid",label:"API Portfolio",total:0,display:true,url:"/api360-service/api-portfolio/qucksearch/report.json?text=",callback:$scope.apiPortfoioGridCallback},
	 	{id:"apisearchgridid",divid:"apisearchgriddivid",loadingid:"apisearchloadingid",label:"API Conceptual Path",total:0,display:false,url:"/atw-service/search/api360/quick/general.json?text=",callback:$scope.apisearchGridCallback},
	 	{id:"adapterinventoryquicksearchgridid",divid:"adapterinventorygriddivid",loadingid:"adapterinventoryloadingid",label:"Adapter Inventory",total:0,display:false,url:"/api360-service/adapter_inventory/quicksearch/report.json?text=",callback:$scope.adapterInventoryGridCallback},
	 	{id:"projectportfoliogridid",divid:"projectportfoliogriddivid",loadingid:"projectportfolioloadingid",label:"Project Portfolio",total:0,display:false,url:"/api360-service/project-portfolio/quicksearch/report.json?text=",callback:$scope.projectportfolioGridCallback},
	 	{id:"apitaxonomygridid",divid:"apitaxonomygriddivid",loadingid:"apitaxonomyloadingid",label:"API Taxonomy",total:0,display:false,url:"/api360-service/api-taxonomy/quicksearch/report.json?text=",callback:$scope.adapterInventoryGridCallback},
	 	{id:"defectgridid",divid:"defectgriddivid",loadingid:"defectgridloadingid",label:"Defects",total:0,display:false,url:"/api360-service/qc-defect/quicksearch/report.json?text=",callback:$scope.defectGridCallback},
	 	{id:"bundleversiongridid",divid:"bundleversiongriddivid",loadingid:"bundleversiongridloadingid",label:"Installed  Bundle Version",total:0,display:false,url:"/api360-service/bundle-version/quicksearch/report.json?text=",callback:$scope.bundleVersionGridCallback},
	 	{id:"discoveryapigridid",divid:"discoveryapigriddivid",loadingid:"discoveryapigridloadingid",label:"API Schema",total:0,display:false,url:"/api360-service/dapi/report.json?text=",callback:$scope.discoveryApiGridCallback},
	 	{id:"environmentconfiggridid",divid:"environmentconfiggriddivid",loadingid:"environmentconfiggridloadingid",label:"Environment Configurations",total:0,display:false,url:"/api360-service/environment_configuration/quicksearch/report.json?text=",callback:$scope.envConfigGridCallback},
	 	{id:"functionaltestresultgridid",divid:"functionaltestresultgriddivid",loadingid:"functionaltestresultgridloadingid",label:"Functional Test Result",total:0,display:false,url:"/api360-service/functional-test/quicksearch/report.json?text=",callback:$scope.functionalTestResultGridCallback},
	 	{id:"etetestresultgridid",divid:"etetestresultgriddivid",loadingid:"etetestresultgridloadingid",label:"ETE Test Report",total:0,display:false,url:"/api360-service/ete-test/quicksearch/report.json?text=",callback:$scope.eteTestResultGridCallback}
	];
	
	$scope.renderAllGrids = function()
	{
		$scope.renderAPIServiceGrid();
		$scope.renderAPIPorfolioGrid();
		$scope.renderAdapterInventoryGrid();
		$scope.renderProjectPortfoioGrid();
		$scope.renderAPITaxonomyGrid();
		$scope.renderDefectGrid();
		$scope.renderBundleVersionGrid();
		$scope.renderDiscoveryApiGrid();
		$scope.renderEnvironmentConfigGrid();
		$scope.renderFunctionalTestResultGrid();
		$scope.renderEteTestResultGrid();
		
	};
	
		
	if($location.path()=="/quicksearch")
	{
		$scope.renderAllGrids();
		
		$timeout(function() 
		{
			if($rootScope.quickSearchTermGlobal!=null && $rootScope.quickSearchTermGlobal!=undefined && $rootScope.quickSearchTermGlobal!="")
			{
				$scope.quickSearchTerm = $rootScope.quickSearchTermGlobal;		
				$scope.renderReport(true);
			}
			else
			{
				$scope.renderReport(false);	
			}		
	    }, 1000);
	};
	

	/*$scope.formatExtraInfo= function(desc,release,text)
	{
		var hightDesc=$scope.textBgColor(desc,text);
		
		return '<div class="row"><div class="col-md-1"><strong>Release:</strong></div><div class="col-md-11 desc">'+release.release+'</div></div><br><div class="row"><div class="col-md-1"><strong>Summary:</strong></div><div class="col-md-11 desc">'+hightDesc+'</div></div>';
	};*/
	
	

	$rootScope.formatExtraInfo= function(desc,release,text){
		var summary="";
		var comments="";
		var hightDesc="";
		   if(desc !=""){
			     summary=desc.split("{=}")[0];
			     hightDesc=$scope.textBgColor(summary,text);
			    comments=desc.split("{=}")[1];
		   }
		  return '<div class="row"><div class="col-md-1"><strong>Release:</strong></div><div class="col-md-11 desc">'+release.release+'</div></div><br><div class="row"><div class="col-md-1"><strong>Summary:</strong></div><div class="col-md-11 desc">'+hightDesc+'</div><div class="col-md-1"><strong>Comments:</strong></div><div class="col-md-11"><code><strong>'+comments.trim()+'</strong></code></div></div>';
		
	};
	
	
	
	$scope.formatExtraInfoEnv = function(data,text){
		
		var html = '';
		for(var j=0;data!=null && j<data.length;j++){
			html +='<div style="padding:15px;">' +
				'<span style="padding:15px;"><strong>Release:</strong> '+data[j].release+'</span>' +
				'<span style="padding:15px;"><strong>Version:</strong> '+data[j].version+'</span>' +
				'<span style="padding:15px;"><strong>Environment:</strong> '+data[j].environment+'</span>' +
				'<span style="padding:15px;"><strong>VTier Hostname:</strong> '+data[j].vtierhostname+'</span>'+				
				'<div style="padding-top:15px;">';
				if (data[j].config==null){
					html +='<pre><code>Configuration is not available</code></pre>';
				} else {
					html +='<pre><code>'+data[j].config+'</code></pre>';
				}
				html +='</div>' +
			'</div>';				
		}
		if (html==''){
			html = '<div style="padding:15px;text-align:center;">' +
			'<span style="padding:15px;">Configuration not available</span>';
		}
		
		return html;
		 
	
	}
	
	
	$scope.formatExtraInfoFunctionalTestResult= function(resultNotes,fun_id){
		
        
        
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
					    '<button  id="addButton'+fun_id+'"  name="viewButton'+fun_id+'" data-funid="'+fun_id+'"  class="btn btn-info myClass2">View History <i class="glyphicon glyphicon-eye-open"></i></button>'+
					 '<span></div>'+
					'</div>'+
					 '</div>';
		
		
		// var htmlStr = '<button id="buttonclick" name="buttonclick">adds</button>';
		 return  htmlStr ;
		
	};
	
	
	 $scope.showSummaryDialog = function() {
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
	
	
	  
	
	
	
	
	
	$scope.textBgColor=function(str,text){
		
		name=str.match( new RegExp( text , 'gi' ) )[0]
		str = str.replace(name, "<span style='background-color: yellow;'>"+name+"</span>");
		return str ;
		
		
	};
	
	
};