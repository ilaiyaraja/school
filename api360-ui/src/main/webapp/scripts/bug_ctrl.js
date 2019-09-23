 'use strict';


function bugCtrl($scope,$rootScope, $resource, $http, $location) 
{

	 // Requires jQuery!
	jQuery.ajax({
	    url: "https://itrack.web.att.com/s/d41d8cd98f00b204e9800998ecf8427e/en_USbfm66p-1988229788/6160/43/1.4.3/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector-embededjs/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector-embededjs.js?collectorId=a708f597",
	    type: "get",
	    cache: true,
	    dataType: "script"
	});

	window.ATL_JQ_PAGE_PROPS =  
	{
	"triggerFunction": function(showCollectorDialog) 
	{
		//Requries that jQuery is available! 
		jQuery("#reportbug").click(function(e) 
		{
			e.preventDefault();
			showCollectorDialog();
			
			//$("#fullname").val("Gaurav Sharma");
			
		});
	}};
}