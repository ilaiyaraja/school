'use strict';

app.service('apiartifactService', function()
{
    
	this.renderAPIArtifactReportGrid = function(scope,rootScope,http)
	{
		
		
		
		rootScope.apiartifactreporttable = $('#apiartifactGridID').DataTable({
		    "sDom": 'T<"clear">lfrtip',
			"serverSide": false,
			"processing": false,
			"responsive":true,
	        "sAjaxSource": "",		
	        "columns": [{ "data": "api" },
	                    { "data": "bundle" },
	                    { "data": "version" },
	                    {
	                    	// "sTitle" : "chatroom",
	                    	"bCssPosition" : "center",
	                    	"data" : null,
	                    	render : function(data,type, row) {
	                       
	                        
	                        var xpdlUrl="https://aod.web.att.com/cgi-bin/viewvc.cgi/m2e_csi/M2E-CSI/bundles/"+data.bundle+"/branches/"+data.version+"/"+data.api+"/service/src/main/xpdl/"+data.api+".xpdl?download";
	                       
	                     
	                        var	xpdlHTML='<a href= "'
	    	                    	+ xpdlUrl
	    	                    	+ '" target="blank" class="editControl"><img src="images/xpdl.jpg"></a>';
	                        
	                    	return xpdlHTML;
	                       }
	                    },
	                    {
	                    	// "sTitle" : "chatroom",
	                    	"bCssPosition" : "center",
	                    	"data" : null,
	                    	 render : function(data,type, row) {
	                       
	                    		// https://aod.web.att.com/cgi-bin/viewvc.cgi/csi/trunk/CommonServices/Documentation/v97/InterfaceSpecifications/CSI-InquireUnifiedCustomerLoginProfile-AID.docx  
	                        var aidlUrl="https://aod.web.att.com/cgi-bin/viewvc.cgi/csi/trunk/CommonServices/Documentation/v"+data.version.split(".")[0]+"/InterfaceSpecifications/"+data.domain+"-"+data.api+"-"+data.doctype+"?download";
	                        
	                       
	                      
	                        var aidHTML='<a href= "'
	    	                    	+ aidlUrl
	    	                    	+ '" target="blank" class="editControl"><img src="images/aiddocimg.jpg"></a>';
	                      
	                    	return aidHTML;
	                      }
	                    	
	                    },
	                    {
	                    	// "sTitle" : "chatroom",
	                    	"bCssPosition" : "center",
	                    	"data" : null,
	                    	 render : function(data,type, row) {
	                       
	                    		// https://aod.web.att.com/cgi-bin/viewvc.cgi/csi/trunk/CommonServices/Documentation/v97/InterfaceSpecifications/CSI-InquireUnifiedCustomerLoginProfile-AID.docx  
	                        var xsdlUrlRequest="https://aod.web.att.com/cgi-bin/viewvc.cgi/csi/branches/R"+data.version.split(".")[0]+"_0/CommonServices/Schemas/v"+data.version.split(".")[0]+"/CSI/Container/Public/"+data.api+"Request.xsd?download";
	                        var xsdlUrlResponse="https://aod.web.att.com/cgi-bin/viewvc.cgi/csi/branches/R"+data.version.split(".")[0]+"_0/CommonServices/Schemas/v"+data.version.split(".")[0]+"/CSI/Container/Public/"+data.api+"Response.xsd?download";
	                        
	                         
	                      
	                        var	xsdHTML='<a href= "'
	    	                    	+ xsdlUrlRequest
	    	                    	+ '" target="blank" class="editControl"><img src="images/api360xsdReq.jpg"></a>&nbsp;&nbsp;&nbsp;&nbsp;<a href= "'
	    	                    	+ xsdlUrlResponse
	    	                    	+ '" target="blank" class="editControl"><img src="images/api360xsdRes.jpg"></a>';
	                      
	                        	
	                        	
	                        	return xsdHTML;
	                    
	                       }
	                    }
	                    
	                    //https://aod.web.att.com/cgi-bin/viewvc.cgi/csi/branches/R97_0/CommonServices/Schemas/v97/CSI/Container/Public/SendManagerialNotificationRequest.xsd
	                    
					    	
					   
					    
	                ],
	    "bAutoWidth": false,
	    "bScrollCollapse": false,
	    "bJQueryUI": true,
	    "search": {"caseInsensitive": true},
	    "sServerMethod": "GET",	     
	     "iDisplayLength": 10,
	     "bPaginate" : true,
	     "bInfo":true,
	     "lengthMenu": [10, 25, 50, 100],
	     "sPaginationType": "full_numbers",
	     "scrollY": $( window ).height() - 340,
	     "scrollX": "100%",	   
	     'sScrollXInner': '100%',
	      "oTableTools": {
	    	  "sSwfPath": "swf/copy_csv_xls_pdf.swf",
	    	    "aButtons": [ /*{
				                    "sExtends": "copy",				                    
				                    "oSelectorOpts": { filter: 'applied', order: 'current' }
				               },*/
	    	                  
	    	                 
	    	                  {
			                    "sExtends": "xls",
			                    "sToolTip": "Save as XLS",
			                    "sFileName": "apiartifactreport.csv",
			                    "oSelectorOpts": { filter: 'applied', order: 'current' }
			                   
			                    
			                   } , {
				                    "sExtends": "csv",
				                    "sToolTip": "Save as csv",
				                    "sFileName": "apiartifactreport.csv",
				                    "oSelectorOpts": { filter: 'applied', order: 'current' }
				                   
				                    
				                   } ,
			                   {
				                    "sExtends": "pdf",
				                    "sButtonText":"Pdf",
				                    "sPdfOrientation": "landscape",
				                    "sFileName": "apiartifactreport.pdf",
				                    "sToolTip": "download as pdf",
				                    "oSelectorOpts": { filter: 'applied', order: 'current' },
				                   
				                    //"oSelectorOpts": {  filter: 'applied', order: 'current',page: "current" },
				                    "sTitle": "API Artifact Report"
				               }
	    	                   /*{
				    	    	"sExtends": "print",
				    	    	"sButtonText":"Print",
			                    "bShowAll": false,
			                    "sInfo": "Please press escape to exit!!!",
			                    "oSelectorOpts": { filter: 'applied', order: 'current' }
			                     
			                    }*/
			                    
				               
				               
				               
				                   
			                   
	    	                  
	    	                  ]                 
	        }
	    });
		
		
	};		
	
	
});


