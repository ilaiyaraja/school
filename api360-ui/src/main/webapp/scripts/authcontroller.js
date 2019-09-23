'use strict';

console.log("AuthenticateCtrl");
function AuthenticateCtrl($scope,$rootScope, $resource, $http, $location,$cookies) 
{

	$scope.getInclude = function()
	{
		
		if($rootScope.isInvalidUser)
		{
			return "partials/invalid_login.html";
		}
		else if(!$rootScope.isAuth)
	    {
	        return "authenticate.html";
	    }
		
	    
	    return "api360dashboard.html";
	};
	
	$scope.authenticate = function()
	{
		    
		    var attESSec= $cookies.attESSec;
		  
	
		    if(attESSec===null || attESSec==='' || attESSec===undefined)
		    {
		    	
		    	var host = $location.host();
		    	var port = $location.port();
		    	var protocol = $location.protocol();
		    	var isValidURL = false;
		    	
		    	var domainName = "www.e-access.sbc.com";		    	
		    	var SYS_NAME = "ctssched";
		    	
		    	if(host.indexOf("sbc")!=-1)
		    	{
		    		domainName = "www.e-access.sbc.com";
		    		isValidURL=true;
		    	}
		    	else if(host.indexOf("att")!=-1)
		    	{
		    		domainName = "www.e-access.att.com";
		    		isValidURL=true;
		    	}
		    	else
		    	{
		    		$rootScope.host = host;
		    		$rootScope.isInvalidUser = true;
		    		$location.path('/invalidlogin');
		    		isValidURL=false;
		    	}
		    		
		    	if(isValidURL)
		    	{
			        var params = $location.search();
			        var noCookieURL = null;
			        
			        var encReturnURL = null;
			    	
			    	if(port==null || port=="")
			    	{
			    		encReturnURL = protocol+"://"+host+"/"+$location.absUrl().split("/")[3]+"/";
			    	}
			    	else
			    	{
			    		encReturnURL = protocol+"://"+host+":"+port+"/"+$location.absUrl().split("/")[3]+"/";
			    	}
			        	        
			        if($location.url().indexOf("/otherwise")!=-1)
			        {
			        	noCookieURL = "https://" + domainName + "/empsvcs/hrpinmgt/pagLogin/?retURL=" + encReturnURL+escape("#")+"/otherwise"+escape("?")+ jQuery.param(params).replace(/&/g, "%26") + "&sysName=" + SYS_NAME;
			        }
			        else
		        	{
			        	noCookieURL = "https://" + domainName + "/empsvcs/hrpinmgt/pagLogin/?retURL=" + encReturnURL+escape("#")+$location.url() + "&sysName=" + SYS_NAME;
			        }	
			        
			        window.location = noCookieURL;
		    	}
		    }
		    else
		    {
		    	  $rootScope.isAuth = true;
	    		  var attESHr= $cookies.attESHr;	    		 
	    		  var attESHrEncoded = decodeURIComponent(attESHr);	    		  
	    		  var attESHrEncodedArray = attESHrEncoded.split("|");	    		 
	    		  $rootScope.loginuser = attESHrEncodedArray[0];
	    		  $rootScope.loginemailid = attESHrEncodedArray[2];
	    		  $rootScope.attuid  = attESHrEncodedArray[7];
		    }
	};
}