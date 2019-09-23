'use strict';

app.service('defectreportFilterService', function()
{
	
	this.updateScopeFiltersWithDefaultValues = function(scope,rootScope)
	{	
		
		scope.defectstatus = 'All';
		scope.asstoapp = 'All';
		scope.asstoteam='All';
		scope.pmt='All';
		scope.pid='All';
		scope.release='All';
		scope.severity='All';
		scope.detectionFromDate = new Date();
		scope.detectionFromDate.setMonth(scope.detectionFromDate.getMonth()-1);
		scope.detectionToDate = new Date();
		
    };
    
    
    this.updateScopeFiltersWithUrlParamsValues = function(scope,rootScope)
	{
    	
    	scope.defectstatus = 'All';
		scope.asstoapp = 'All';
		scope.asstoteam='All';
		scope.pmt='All';
		scope.pid='All';
		scope.release='All';
		scope.severity='All';
		scope.detectionFromDate = new Date();
		scope.detectionFromDate.setMonth(scope.detectionFromDate.getMonth()-1);
		scope.detectionToDate = new Date();
    	
    	
    };
	
	this.emptyFilterModels = function(scope,rootScope)
	{
		scope.defectstatusQCReportModel = [];
		scope.defectreportasstoappModel = [];		
		scope.defectreportasstoteamModel = [];
		scope.defectreportpmtModel = [];	
		scope.defectreportreleaseModel= [];	
		scope.defectreportseverityModel= [];
		scope.defectreportpidModel = [];
		
		
	};
	
	this.emptyFilterData = function(scope,rootScope)
	{
		scope.defectstatusQCReportData = [];
		scope.defectreportasstoappData = [];		
		scope.defectreportasstoteamData = [];
		scope.defectreportpmtData = [];	
		scope.defectreportreleaseData= [];
		scope.defectreportseverityData= [];
		scope.defectreportpidData = [];	
	};
	
	
	this.addFilterSettings = function(scope,rootScope)
	{	
		 
		 scope.defectstatusQCReportSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:1,selectionLimit:30}; 
		 scope.defectstatusQCReportCustomTexts = {buttonDefaultText: 'DefectStatus'};
		 
		 scope.defectreportasstoappSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:3,selectionLimit:30}; 
		 scope.defectreportasstoappCustomTexts = {buttonDefaultText: 'AssignedToAPP'};
		 
		 scope.defectreportasstoteamSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:3,selectionLimit:30}; 
		 scope.defectreportasstoteamCustomTexts = {buttonDefaultText: 'AssignedToTeam'};
		 
		 
		 scope.defectreportpmtSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:3,selectionLimit:30}; 
		 scope.defectreportpmtCustomTexts = {buttonDefaultText: 'PMT'};
		 
		 scope.defectreportreleaseSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:3,selectionLimit:30}; 
		 scope.defectreportreleaseCustomTexts = {buttonDefaultText: 'Release'};
		 
		 
		 scope.defectreportseveritySettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:3,selectionLimit:30}; 
		 scope.defectreportseverityCustomTexts = {buttonDefaultText: 'Severity'};
		 
		 scope.defectreportpidSettings 	= {enableSearch: true,scrollable: true,closeOnBlur:true, showCheckAll:true, showUncheckAll:true,smartButtonMaxItems:3,selectionLimit:30}; 
		 scope.defectreportpidCustomTexts = {buttonDefaultText: 'PID'};
		 
	};
	    
	    
	    
	    
	    
	    
	    
	    this.loadComboBox= function(scope,rootScope,http,url,pagelocation) 
		{
	    	 
	    	this.emptyFilterModels(scope,rootScope);
			this.emptyFilterData(scope,rootScope);
			this.addFilterSettings(scope,rootScope);
			
			 var loadFilters = http.get(url);	 
			 http.dataType="json";
			 
			 loadFilters.then(function(payload) 
		     {
				 
						    
			    scope.defectQCReportData = payload.data.result.defect_id;
				scope.defectstatusQCReportData = payload.data.result.defect_status;
				var result=[];
				
				for (var dString in scope.defectstatusQCReportData) 
				{ 
					var id = scope.defectstatusQCReportData[dString].id;
					if (id == 'All' || id == 'Closed' ||id == 'Cancelled' || id == 'Deferred'){
						continue;
					}
					
					result.push(scope.defectstatusQCReportData[dString]); //+ ",";
					
				}
				
				
				
				scope.defectreportasstoappData = payload.data.result.asstoapp;	
				scope.defectreportasstoteamData = payload.data.result.asstoteam;
				scope.defectreportpmtData = payload.data.result.pmt;
				scope.defectreportreleaseData= payload.data.result.release;
				scope.defectreportseverityData= payload.data.result.severity;
				
				var sevresult=[];
				
				for (var dString in scope.defectreportseverityData) 
				{ 
					var id = scope.defectreportseverityData[dString].id;
					if (id == 'All' || id == 'Severity 3' || id == 'severity 3'){
						continue;
					}
					
					sevresult.push(scope.defectreportseverityData[dString]); //+ ",";
					
				}
				
				scope.defectreportpidData = payload.data.result.pid;
			   			    
			    if(rootScope.urlparams!=undefined)
				{
			    	
			      
			    				    	
			    	
			    	if(rootScope.urlparams!=undefined && rootScope.urlparams.DefectStatus!=undefined && rootScope.urlparams.DefectStatus!=null)
			    	{
			    		console.log("here");
			    		var APIsArray = rootScope.urlparams.DefectStatus.split(",");
			    		console.log("here2");
				    	for(var i=0; i < APIsArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = APIsArray[i];
							scope.defectstatusQCReportModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		
			    		scope.defectstatusQCReportModel = new Array(payload.data.result.defect_status[0]);
			    		
			    		
			    	}
			    	
			    				    	
			    	
			    	if(rootScope.urlparams!=undefined && rootScope.urlparams.AssignedToAPP!=undefined && rootScope.urlparams.AssignedToAPP!=null)
			    	{
			    		var BackendsArray = rootScope.urlparams.AssignedToAPP.split(",");
				    	for(var i=0; i < BackendsArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = BackendsArray[i];
							scope.defectreportasstoappModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.defectreportasstoappModel = new Array(payload.data.result.asstoapp[0]);			    		
			    	}
			    	
			    	
			    	
					if(rootScope.urlparams!=undefined && rootScope.urlparams.AssignedToTeam!=undefined && rootScope.urlparams.AssignedToTeam!=null)
			    	{
			    		var PIDArray = rootScope.urlparams.AssignedToTeam.split(",");	
			    		
				    	for(var i=0; i < PIDArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = PIDArray[i];
							scope.defectreportasstoteamModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.defectreportasstoteamModel = new Array(payload.data.result.asstoteam[0]);			    		
			    	}
					
					
					
				 	if(rootScope.urlparams!=undefined && rootScope.urlparams.PMT!=undefined && rootScope.urlparams.PMT!=null)
			    	{
			    		var ReleaseArray = rootScope.urlparams.PMT.split(",");	
			    		
				    	for(var i=0; i < ReleaseArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = ReleaseArray[i];
							scope.defectreportpmtModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.defectreportpmtModel = new Array(payload.data.result.pmt[0]);			    		
			    	}
				 	
				 	
				 	
				 	if(rootScope.urlparams!=undefined && rootScope.urlparams.Severity!=undefined && rootScope.urlparams.Severity!=null)
			    	{
			    		var SeverityArray = rootScope.urlparams.Severity.split(",");	
			    		
				    	for(var i=0; i < SeverityArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = ProgramArray[i];
							scope.defectreportseverityModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.defectreportseverityModel = new Array(payload.data.result.severity[0]);			    		
			    	}
				 	
				 	
				 	if(rootScope.urlparams!=undefined && rootScope.urlparams.PID!=undefined && rootScope.urlparams.PID!=null)
			    	{
			    		var ReleaseArray = rootScope.urlparams.PID.split(",");	
			    		
				    	for(var i=0; i < ReleaseArray.length; i++)
				    	{
				    		var idProp = {idProp: 'id'};
				    		idProp['id'] = ReleaseArray[i];
							scope.defectreportpidModel.push(idProp);			    		
				    	}
			    	}
			    	else
			    	{
			    		scope.defectreportpidModel = new Array(payload.data.result.pid[0]);			    		
			    	}
				 	
				 	
				}
			    else
			    {
			    	
					   
					
					    
					    
						/*scope.defectstatusQCReportModel =  new Array(payload.data.result.defect_status[1],payload.data.result.defect_status[5],payload.data.result.defect_status[6],payload.data.result.defect_status[7]
						,payload.data.result.defect_status[8],payload.data.result.defect_status[9],payload.data.result.defect_status[10],payload.data.result.defect_status[11],payload.data.result.defect_status[12]
						,payload.data.result.defect_status[13],payload.data.result.defect_status[14],payload.data.result.defect_status[15],payload.data.result.defect_status[16]);*/
					    scope.defectstatusQCReportModel = result;
					    
					   
					    
						scope.defectreportasstoappModel =  new Array(payload.data.result.asstoapp[0]);	
						scope.defectreportasstoteamModel =  new Array(payload.data.result.asstoteam[0]);
						scope.defectreportpmtModel =  new Array(payload.data.result.pmt[0]);
						scope.defectreportreleaseModel=  new Array(payload.data.result.release[0]);
						scope.defectreportseverityModel=  sevresult;
						scope.defectreportpidModel =  new Array(payload.data.result.pid[0]);
					
					
					
					
					
			    }
		     }); 
	    };
	    
	    
	    
	    
	   
	   
	   
	   this.reloadComboBoxDefectReport= function(scope,rootScope,http,url,ignore) 
		 {
	    	
		  
	    	 var loadFilters = http.get(url);		 
			 http.dataType="json";
			 
			 loadFilters.then(function(payload) 
		     {
				 			
					
					if("DefectStatus"!=ignore)
					{
						var local = scope.defectstatusQCReportModel;
						
						
						
						scope.defectstatusQCReportModel = [];
						scope.defectstatusQCReportData = payload.data.result.defect_status;

						if(local!=null && local.length > 0)
						{
							angular.forEach(local, function (value) 
			                {
								 var idProp = {idProp: 'id'};
					    		 idProp['id'] = value["id"];
					             
					    		 scope.defectstatusQCReportModel.push(idProp);
			                });	
						}
						else
						{
							scope.defectstatusQCReportModel = new Array(payload.data.result.defect_status[0]);
						}
					}					
					
					if("AssignedToAPP"!=ignore)
					{
						var local = scope.defectreportasstoappModel;
						
						scope.defectreportasstoappModel = [];
						scope.defectreportasstoappData = payload.data.result.asstoapp;
						
						if(local!=null && local.length > 0)
						{
							angular.forEach(local, function (value) 
			                {
								 var idProp = {idProp: 'id'};
					    		 idProp['id'] = value["id"];
								scope.defectreportasstoappModel.push(idProp);
			                });	
						}
						else
						{
							scope.defectreportasstoappModel = new Array(payload.data.result.asstoapp[0]);
						}
					}
					
					
					if("AssignedToTeam"!=ignore)
					{
						var local = scope.defectreportasstoteamModel;
						
						scope.defectreportasstoteamModel = [];
						scope.defectreportasstoteamData = payload.data.result.asstoteam;
						
						if(local!=null && local.length > 0)
						{
							angular.forEach(local, function (value) 
			                {
								 var idProp = {idProp: 'id'};
					    		 idProp['id'] = value["id"];
								 scope.defectreportasstoteamModel.push(idProp);
			                });	
						}
						else
						{
							scope.defectreportasstoteamModel = new Array(payload.data.result.asstoteam[0]);
						}
					}
					
					if("PMT"!=ignore)
					{
						var local = scope.defectreportpmtModel;
						
						scope.defectreportpmtModel = [];
						scope.defectreportpmtData = payload.data.result.pmt;
						
						if(local!=null && local.length > 0)
						{
							angular.forEach(local, function (value) 
			                {
								 var idProp = {idProp: 'id'};
					    		 idProp['id'] = value["id"];
								 scope.defectreportpmtModel.push(idProp);
			                });	
						}
						else
						{
							scope.defectreportpmtModel = new Array(payload.data.result.pmt[0]);
						}
					}
					
					if("Release"!=ignore)
					{
						var local = scope.defectreportreleaseModel;
						
						scope.defectreportreleaseModel = [];
						scope.defectreportreleaseData = payload.data.result.release;
						
						if(local!=null && local.length > 0)
						{
							angular.forEach(local, function (value) 
			                {
								 var idProp = {idProp: 'id'};
					    		 idProp['id'] = value["id"];
								 scope.defectreportreleaseModel.push(idProp);
			                });	
						}
						else
						{
							scope.defectreportreleaseModel = new Array(payload.data.result.release[0]);
						}
					}
					
					
					if("Severity"!=ignore)
					{
						var local = scope.defectreportseverityModel;
						
						scope.defectreportseverityModel = [];
						scope.defectreportseverityData = payload.data.result.severity;
						
						if(local!=null && local.length > 0)
						{
							angular.forEach(local, function (value) 
			                {
								 var idProp = {idProp: 'id'};
					    		 idProp['id'] = value["id"];
								 scope.defectreportseverityModel.push(idProp);
			                });	
						}
						else
						{
							scope.defectreportseverityModel = new Array(payload.data.result.severity[0]);
						}
					}
					
					if("PID"!=ignore)
					{
						var local = scope.defectreportpidModel;
						
						scope.defectreportpidModel = [];
						scope.defectreportpidData = payload.data.result.pid;
						
						if(local!=null && local.length > 0)
						{
							angular.forEach(local, function (value) 
			                {
								 var idProp = {idProp: 'id'};
					    		 idProp['id'] = value["id"];
								 scope.defectreportpidModel.push(idProp);
			                });	
						}
						else
						{
							scope.defectreportpidModel = new Array(payload.data.result.pid[0]);
						}
					}
				
		     });
	   };
	   
	   
	   
	   
	   
	   this.dashboardFilterReload=function(scope,rootScope,name,value)
		{
			
			
		   if("DefectStatus"==name)
	 		{
		 		
		 		if(scope.defectstatusQCReportModel.length==1 && scope.defectstatusQCReportModel[0].id=="All")
	 			{
		 			scope.defectstatus = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.defectstatusQCReportModel.length > 1)
	 				{
		 				scope.defectstatus = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.defectstatusQCReportModel.splice(0,scope.defectstatusQCReportModel.length);
			    		 scope.defectstatusQCReportModel.push(idProp); 
		 			}
		 			else if(scope.defectstatusQCReportModel.length > 1 && scope.defectstatusQCReportModel[0].id=="All")
		 			{
		 				scope.defectstatusQCReportModel.splice(0,1);
		 				scope.defectstatus = scope.getCommaSeparatedStringStatus(scope.defectstatusQCReportModel);
		 			}
		 			else
	 				{
		 				scope.defectstatus = scope.getCommaSeparatedString(scope.defectstatusQCReportModel);
		 			}
		 		}
	 		}
		 	else if("AssignedToTeam"==name)
	 		{
		 		if(scope.defectreportasstoteamModel.length==1 && scope.defectreportasstoteamModel[0].id=="All")
	 			{
		 			scope.asstoteam = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.defectreportasstoteamModel.length > 1)
	 				{
		 				scope.asstoteam = "All";	
		 				
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 
			    		 scope.defectreportasstoteamModel.splice(0,scope.defectreportasstoteamModel.length);
			    		 scope.defectreportasstoteamModel.push(idProp);
		 			}
		 			else if(scope.defectreportasstoteamModel.length > 1 && scope.defectreportasstoteamModel[0].id=="All")
		 			{
		 				scope.defectreportasstoteamModel.splice(0,1);
		 				scope.asstoteam = scope.getCommaSeparatedString(scope.defectreportasstoteamModel);
		 			}
		 			else
	 				{
		 				scope.asstoteam = scope.getCommaSeparatedString(scope.defectreportasstoteamModel);
		 			}
		 		}			
	 		}			
		 	else if("AssignedToAPP"==name)	
	 		{
		 		
		 		if(scope.defectreportasstoappModel.length==1 && scope.defectreportasstoappModel[0].id=="All")
	 			{
		 			scope.asstoapp = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.defectreportasstoappModel.length > 1)
	 				{
		 				 scope.asstoapp = "All";
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 scope.defectreportasstoappModel.splice(0,scope.defectreportasstoappModel.length);
			    		 scope.defectreportasstoappModel.push(idProp);		 				 
		 			}
		 			else if(scope.defectreportasstoappModel.length > 1 && scope.defectreportasstoappModel[0].id=="All")
		 			{
		 				scope.defectreportasstoappModel.splice(0,1);
		 				scope.asstoapp = encodeURIComponent(scope.getCommaSeparatedString(scope.defectreportasstoappModel));		 					
		 			}
		 			else
	 				{
		 				scope.asstoapp = encodeURIComponent(scope.getCommaSeparatedString(scope.defectreportasstoappModel));
		 			}
		 		}
	 		}else if("PMT"==name)	
	 		{
		 		
		 		if(scope.defectreportpmtModel.length==1 && scope.defectreportpmtModel[0].id=="All")
	 			{
		 			scope.pmt = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.defectreportpmtModel.length > 1)
	 				{
		 				 scope.pmt = "All";
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 scope.defectreportpmtModel.splice(0,scope.defectreportpmtModel.length);
			    		 scope.defectreportpmtModel.push(idProp);		 				 
		 			}
		 			else if(scope.defectreportpmtModel.length > 1 && scope.defectreportpmtModel[0].id=="All")
		 			{
		 				scope.defectreportpmtModel.splice(0,1);
		 				scope.pmt = scope.getCommaSeparatedString(scope.defectreportpmtModel);		 					
		 			}
		 			else
	 				{
		 				scope.pmt = scope.getCommaSeparatedString(scope.defectreportpmtModel);
		 			}
		 		}
	 		}else if("Release"==name)	
	 		{
		 		
	 			
		 		if(scope.defectreportreleaseModel.length==1 && scope.defectreportreleaseModel[0].id=="All")
	 			{
		 			scope.release = "All";
		 		}
		 		else
	 			{
		 			
		 			if(value=="All" && scope.defectreportreleaseModel.length > 1)
	 				{
		 				 scope.release = "All";
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 scope.defectreportreleaseModel.splice(0,scope.defectreportreleaseModel.length);
			    		 scope.defectreportreleaseModel.push(idProp);		 				 
		 			}
		 			else if(scope.defectreportreleaseModel.length > 1 && scope.defectreportreleaseModel[0].id=="All")
		 			{
		 				scope.defectreportreleaseModel.splice(0,1);
		 				scope.release = scope.getCommaSeparatedString(scope.defectreportreleaseModel);		 					
		 			}
		 			else
	 				{
		 				scope.release = scope.getCommaSeparatedString(scope.defectreportreleaseModel);
		 			}
		 		}
	 		}else if("Severity"==name)	
	 		{
		 		
	 			
		 		if(scope.defectreportseverityModel.length==1 && scope.defectreportseverityModel[0].id=="All")
	 			{
		 			scope.severity = "All";
		 		}
		 		else
	 			{
		 			
		 			if(value=="All" && scope.defectreportseverityModel.length > 1)
	 				{
		 				 scope.severity = "All";
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 scope.defectreportseverityModel.splice(0,scope.defectreportseverityModel.length);
			    		 scope.defectreportseverityModel.push(idProp);		 				 
		 			}
		 			else if(scope.defectreportseverityModel.length > 1 && scope.defectreportseverityModel[0].id=="All")
		 			{
		 				scope.defectreportseverityModel.splice(0,1);
		 				scope.severity = scope.getCommaSeparatedStringSeverity(scope.defectreportseverityModel);		 					
		 			}
		 			else
	 				{
		 				scope.severity = scope.getCommaSeparatedString(scope.defectreportseverityModel);
		 			}
		 		}
	 		}else if("PID"==name)	
	 		{
		 		
		 		if(scope.defectreportpidModel.length==1 && scope.defectreportpidModel[0].id=="All")
	 			{
		 			scope.pid = "All";
		 		}
		 		else
	 			{
		 			if(value=="All" && scope.defectreportpidModel.length > 1)
	 				{
		 				 scope.pid = "All";
		 				 var idProp = {idProp: 'id'};
			    		 idProp['id'] = "All";
			    		 scope.defectreportpidModel.splice(0,scope.defectreportpidModel.length);
			    		 scope.defectreportpidModel.push(idProp);		 				 
		 			}
		 			else if(scope.defectreportpidModel.length > 1 && scope.defectreportpidModel[0].id=="All")
		 			{
		 				scope.defectreportpidModel.splice(0,1);
		 				scope.pid = scope.getCommaSeparatedString(scope.defectreportpidModel);		 					
		 			}
		 			else
	 				{
		 				scope.pid = scope.getCommaSeparatedString(scope.defectreportpidModel);
		 			}
		 		}
	 		}
		};
	   
	    
	    
	   function KeyValueModel (key, value) 
		{
		    this.key = key;
		    this.value = value;
		}
		 
		KeyValueModel.prototype.getKey = function() 
		{
		    return this.key;
		};

		KeyValueModel.prototype.getValue = function() 
		{
		    return this.key;
		};
});