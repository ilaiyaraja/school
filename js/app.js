// create the module and name it scotchApp
	var scotchApp = angular.module('scotchApp', ['ngRoute']);    


	// configure our routes
	scotchApp.config(function($routeProvider) {
         console.log("app.js routprovider");
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'templates/home.html',
				controller  : 'homecontroller'
			})
            .when('/ourschool', {
                    templateUrl : 'templates/our-school.html',
                    controller  : 'ourschoolcontroller'
                })
			// route for the about page
			.when('/academy', {
				templateUrl : 'templates/academy.html',
				controller  : 'academycontroller'
			})

			// route for the contact page
			.when('/admission', {
				templateUrl : 'templates/admission.html',
				controller  : 'admissioncontroller'
			})
           .when('/events', {
                    templateUrl : 'templates/event.html',
                    controller  : 'eventcontroller'
                })
            .when('/gallery', {
                    templateUrl : 'templates/gallery.html',
                    controller  : 'gallerycontroller'
                })
            .when('/contactus', {
                    templateUrl : 'templates/contact-us.html',
                    controller  : 'viewapicontroller'
                });
	});

	// create the controller and inject Angular's $scope
	scotchApp.controller('mainController', function($scope) {
         console.log("app.js main controller");
		// create a message to display in our view
		$scope.message = 'mainController';
	});

	scotchApp.controller('ourschoolcontroller', function($scope) {
         console.log("app.js ourschoolcontroller");
		$scope.message = 'searchresultcontroller';
	});

	scotchApp.controller('academycontroller', function($scope) {
         console.log("app.js academycontroller");
		$scope.message = 'academycontroller';
	});

    scotchApp.controller('admissioncontroller', function($scope) {
         console.log("app.js admissioncontroller");
		$scope.message = 'admissioncontroller';
	});
    scotchApp.controller('eventcontroller', function($scope) {
         console.log("app.js eventcontroller");
		$scope.message = 'eventcontroller';
	});

	scotchApp.controller('gallerycontroller', function($scope) {
         console.log("app.js gallerycontroller");
		$scope.message = 'gallerycontroller';
	});
    
    scotchApp.controller('contactuscontroller', function($scope) {
              console.log("app.js contactuscontroller");
            
    });

