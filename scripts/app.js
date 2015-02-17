
/**
  @ngdoc module
  @name edt-demo
  @module edt-demo
  @description

  This module requires all submodules of your app
 */
angular.module('edt-demo', ['ngMaterial', 'edt-demo.utils', 'edt-demo.edt']);


/**
  @ngdoc module
  @name edt-demo.landing
  @module edt-demo.landing
  @description

  Landing page of the application.
 */
angular.module('edt-demo.edt', ['ng', 'ui.router', 'pascalprecht.translate']);


/**
  @ngdoc module
  @name boilerplate.utils
  @module boilerplate.utils
  @description

  This module contains helpers and global configuration required by your app
 */
angular.module('edt-demo.utils', ['ng', 'ui.router', 'pascalprecht.translate']);

angular.module('edt-demo.edt').controller('CourseListCtrl', function($scope, $stateParams, $mdDialog, CourseFactory, DepartmentListExtractor) {
  var alertNoNetwork;
  $scope.currentDepartment = null;
  $scope.currentDate = new Date();
  $scope.errorNoNetwork = false;
  alertNoNetwork = $mdDialog.alert().title('Erreur réseau').content('Impossible de récupérer la liste des cours !').ariaLabel('Network error').ok('Dommage :(');
  $scope.loadCourses = function() {
    return CourseFactory.findAll().success(function(data) {
      $scope.errorNoNetwork = false;
      $scope.courses = data;
      console.log("Found " + $scope.courses.length + " courses");
      $scope.departments = DepartmentListExtractor.extract($scope.courses);
      console.log("Found " + $scope.departments.length + " departments");
      return $scope.currentDepartment = $stateParams.dep;
    }).error(function() {
      $mdDialog.show(alertNoNetwork);
      return $scope.errorNoNetwork = true;
    });
  };
  $scope.departmentFilter = function(course) {
    return !$scope.currentDepartment || course.department === $scope.currentDepartment;
  };
  $scope.pastCourseFilter = function(course) {
    return !$scope.prefs.hidePastCourses || course.time_end > $scope.currentDate;
  };
  return $scope.loadCourses();
});

angular.module('edt-demo.edt').controller('ParametersCtrl', function($scope, $stateParams, $mdDialog, $mdSidenav, $timeout) {
  var hidePastCourses;
  $scope.prefs = hidePastCourses = false;
  return $scope.toggleSidebar = function() {
    return $mdSidenav('left').toggle();
  };
});

angular.module('edt-demo.edt').constant('BASE_API_URL', 'http://api-edt-ponts.securem.eu/');

angular.module('edt-demo.edt').config(function($stateProvider) {
  return $stateProvider.state('edt', {
    url: '/?dep',
    controller: 'CourseListCtrl',
    templateUrl: 'edt/views/view.html'
  });
});

angular.module('edt-demo.edt').config(function($translateProvider) {
  $translateProvider.translations('en', {
    HOME_TITLE: 'Welcome',
    HOME_TEXT: 'This is the beginning of an extraordinary app...'
  });
  return $translateProvider.translations('fr', {
    HOME_TITLE: 'Bienvenue',
    HOME_TEXT: 'Ceci est le commencement d\'une appli extraordinaire...'
  });
});

angular.module('edt-demo.edt').factory('CourseFactory', function($rootScope, $http, BASE_API_URL) {
  var findAll, findByDepartment;
  findAll = function(date) {
    var params;
    if (date == null) {
      date = null;
    }
    params = {
      date: date || moment().format('DD/MM/YYYY')
    };
    return $http({
      method: 'GET',
      url: BASE_API_URL + 'courses',
      params: params
    }).success(function(data) {
      return data;
    });
  };
  findByDepartment = function(departmentCode, date) {
    var params;
    if (date == null) {
      date = null;
    }
    params = {
      date: date || moment().format('DD/MM/YYYY'),
      department: departmentCode
    };
    return $http({
      method: 'GET',
      url: BASE_API_URL + 'courses',
      params: params
    }).success(function(data) {
      return data;
    });
  };
  return {
    findAll: findAll,
    findByDepartment: findByDepartment
  };
});

angular.module('edt-demo.edt').service('DepartmentListExtractor', function() {
  var extract;
  extract = function(courses) {
    var course, departments, _i, _len;
    departments = [];
    for (_i = 0, _len = courses.length; _i < _len; _i++) {
      course = courses[_i];
      if (departments.indexOf(course.department) === -1) {
        departments.push(course.department);
      }
    }
    return departments;
  };
  return {
    extract: extract
  };
});

angular.module('edt-demo.utils').config(function($translateProvider) {
  $translateProvider.fallbackLanguage('en');
  return $translateProvider.determinePreferredLanguage();
});

angular.module('edt-demo.utils').config(function($locationProvider) {
  $locationProvider.html5Mode(true);
  return $locationProvider.hashPrefix('!');
});


/**
  @ngdoc object
  @name storage
  @module edt-demo.utils
  @description

  This value object is an application-wide data-store.
  It's published in `$rootScope` for easy-access in views.
 */
angular.module('edt-demo.utils').value('storage', {}).run(function($rootScope, storage) {
  return $rootScope.storage = storage;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uY29mZmVlIiwiZWR0L21vZHVsZS5jb2ZmZWUiLCJ1dGlscy9tb2R1bGUuY29mZmVlIiwiZWR0L2NvbnRyb2xsZXJzL2NvdXJzZV9saXN0LmNvZmZlZSIsImVkdC9jb250cm9sbGVycy9wYXJhbWV0ZXJzLmNvZmZlZSIsImVkdC9jb25maWcvY29uZmlnLmNvZmZlZSIsImVkdC9jb25maWcvcm91dGVzLmNvZmZlZSIsImVkdC9jb25maWcvdHJhbnNsYXRpb25zLmNvZmZlZSIsImVkdC9zZXJ2aWNlcy9jb3Vyc2VfZmFjdG9yeS5jb2ZmZWUiLCJlZHQvc2VydmljZXMvZGVwYXJ0bWVudF9saXN0X2V4dHJhY3Rvci5jb2ZmZWUiLCJ1dGlscy9jb25maWcvaW5pdC10cmFuc2xhdGlvbnMuY29mZmVlIiwidXRpbHMvY29uZmlnL2luaXQtdXJscy5jb2ZmZWUiLCJ1dGlscy9jb25maWcvc3RvcmFnZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTs7Ozs7OztHQUFBO0FBQUEsT0FTTyxDQUFDLE1BQVIsQ0FBZ0IsVUFBaEIsRUFBMkIsQ0FDeEIsWUFEd0IsRUFFeEIsZ0JBRndCLEVBR3hCLGNBSHdCLENBQTNCLENBVEEsQ0FBQTs7QUNBQTtBQUFBOzs7Ozs7O0dBQUE7QUFBQSxPQVNPLENBQUMsTUFBUixDQUFnQixjQUFoQixFQUErQixDQUM1QixJQUQ0QixFQUU1QixXQUY0QixFQUc1Qix3QkFINEIsQ0FBL0IsQ0FUQSxDQUFBOztBQ0FBO0FBQUE7Ozs7Ozs7R0FBQTtBQUFBLE9BU08sQ0FBQyxNQUFSLENBQWdCLGdCQUFoQixFQUFpQyxDQUM5QixJQUQ4QixFQUU5QixXQUY4QixFQUc5Qix3QkFIOEIsQ0FBakMsQ0FUQSxDQUFBOztBQ0FBLE9BQU8sQ0FBQyxNQUFSLENBQWdCLGNBQWhCLENBQ0EsQ0FBQyxVQURELENBQ2EsZ0JBRGIsRUFDOEIsU0FDNUIsTUFENEIsRUFFNUIsWUFGNEIsRUFHNUIsU0FINEIsRUFJNUIsYUFKNEIsRUFLNUIsdUJBTDRCLEdBQUE7QUFRNUIsTUFBQSxjQUFBO0FBQUEsRUFBQSxNQUFNLENBQUMsaUJBQVAsR0FBMkIsSUFBM0IsQ0FBQTtBQUFBLEVBQ0EsTUFBTSxDQUFDLFdBQVAsR0FBeUIsSUFBQSxJQUFBLENBQUEsQ0FEekIsQ0FBQTtBQUFBLEVBRUEsTUFBTSxDQUFDLGNBQVAsR0FBd0IsS0FGeEIsQ0FBQTtBQUFBLEVBSUEsY0FBQSxHQUFpQixTQUFTLENBQUMsS0FBVixDQUFBLENBQ2pCLENBQUMsS0FEZ0IsQ0FDVCxlQURTLENBRWpCLENBQUMsT0FGZ0IsQ0FFUCw4Q0FGTyxDQUdqQixDQUFDLFNBSGdCLENBR0wsZUFISyxDQUlqQixDQUFDLEVBSmdCLENBSVosWUFKWSxDQUpqQixDQUFBO0FBQUEsRUFVQSxNQUFNLENBQUMsV0FBUCxHQUFxQixTQUFBLEdBQUE7V0FDbkIsYUFBYSxDQUFDLE9BQWQsQ0FBQSxDQUNBLENBQUMsT0FERCxDQUNTLFNBQUMsSUFBRCxHQUFBO0FBQ1AsTUFBQSxNQUFNLENBQUMsY0FBUCxHQUF3QixLQUF4QixDQUFBO0FBQUEsTUFFQSxNQUFNLENBQUMsT0FBUCxHQUFpQixJQUZqQixDQUFBO0FBQUEsTUFHQSxPQUFPLENBQUMsR0FBUixDQUFhLFFBQUEsR0FBUSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQXZCLEdBQStCLFVBQTVDLENBSEEsQ0FBQTtBQUFBLE1BS0EsTUFBTSxDQUFDLFdBQVAsR0FBcUIsdUJBQXVCLENBQUMsT0FBeEIsQ0FBZ0MsTUFBTSxDQUFDLE9BQXZDLENBTHJCLENBQUE7QUFBQSxNQU1BLE9BQU8sQ0FBQyxHQUFSLENBQWEsUUFBQSxHQUFRLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBM0IsR0FBbUMsY0FBaEQsQ0FOQSxDQUFBO2FBU0EsTUFBTSxDQUFDLGlCQUFQLEdBQTJCLFlBQVksQ0FBQyxJQVZqQztJQUFBLENBRFQsQ0FhQSxDQUFDLEtBYkQsQ0FhTyxTQUFBLEdBQUE7QUFDTCxNQUFBLFNBQVMsQ0FBQyxJQUFWLENBQWdCLGNBQWhCLENBQUEsQ0FBQTthQUNBLE1BQU0sQ0FBQyxjQUFQLEdBQXdCLEtBRm5CO0lBQUEsQ0FiUCxFQURtQjtFQUFBLENBVnJCLENBQUE7QUFBQSxFQTRCQSxNQUFNLENBQUMsZ0JBQVAsR0FBMEIsU0FBQyxNQUFELEdBQUE7V0FDeEIsQ0FBQSxNQUFPLENBQUMsaUJBQVIsSUFBNkIsTUFBTSxDQUFDLFVBQVAsS0FBcUIsTUFBTSxDQUFDLGtCQURqQztFQUFBLENBNUIxQixDQUFBO0FBQUEsRUErQkEsTUFBTSxDQUFDLGdCQUFQLEdBQTBCLFNBQUMsTUFBRCxHQUFBO1dBQ3hCLENBQUEsTUFBTyxDQUFDLEtBQUssQ0FBQyxlQUFkLElBQWlDLE1BQU0sQ0FBQyxRQUFQLEdBQWtCLE1BQU0sQ0FBQyxZQURsQztFQUFBLENBL0IxQixDQUFBO1NBbUNBLE1BQU0sQ0FBQyxXQUFQLENBQUEsRUEzQzRCO0FBQUEsQ0FEOUIsQ0FBQSxDQUFBOztBQ0FBLE9BQU8sQ0FBQyxNQUFSLENBQWdCLGNBQWhCLENBQ0EsQ0FBQyxVQURELENBQ2EsZ0JBRGIsRUFDOEIsU0FDMUIsTUFEMEIsRUFFMUIsWUFGMEIsRUFHMUIsU0FIMEIsRUFJMUIsVUFKMEIsRUFLMUIsUUFMMEIsR0FBQTtBQVM1QixNQUFBLGVBQUE7QUFBQSxFQUFBLE1BQU0sQ0FBQyxLQUFQLEdBQ0UsZUFBQSxHQUFrQixLQURwQixDQUFBO1NBR0EsTUFBTSxDQUFDLGFBQVAsR0FBdUIsU0FBQSxHQUFBO1dBQ3JCLFVBQUEsQ0FBWSxNQUFaLENBQWtCLENBQUMsTUFBbkIsQ0FBQSxFQURxQjtFQUFBLEVBWks7QUFBQSxDQUQ5QixDQUFBLENBQUE7O0FDQUEsT0FBTyxDQUFDLE1BQVIsQ0FBZ0IsY0FBaEIsQ0FDQSxDQUFDLFFBREQsQ0FDVyxjQURYLEVBQzJCLGtDQUQzQixDQUFBLENBQUE7O0FDQUEsT0FBTyxDQUFDLE1BQVIsQ0FBZ0IsY0FBaEIsQ0FDQSxDQUFDLE1BREQsQ0FDUSxTQUFDLGNBQUQsR0FBQTtTQUNOLGNBQ0EsQ0FBQyxLQURELENBQ1EsS0FEUixFQUVFO0FBQUEsSUFBQSxHQUFBLEVBQU0sT0FBTjtBQUFBLElBQ0EsVUFBQSxFQUFjLGdCQURkO0FBQUEsSUFFQSxXQUFBLEVBQWMscUJBRmQ7R0FGRixFQURNO0FBQUEsQ0FEUixDQUFBLENBQUE7O0FDQUEsT0FBTyxDQUFDLE1BQVIsQ0FBZ0IsY0FBaEIsQ0FDQSxDQUFDLE1BREQsQ0FDUSxTQUFDLGtCQUFELEdBQUE7QUFDTixFQUFBLGtCQUFrQixDQUFDLFlBQW5CLENBQWlDLElBQWpDLEVBQ0U7QUFBQSxJQUFBLFVBQUEsRUFBYSxTQUFiO0FBQUEsSUFDQSxTQUFBLEVBQVksa0RBRFo7R0FERixDQUFBLENBQUE7U0FJQSxrQkFBa0IsQ0FBQyxZQUFuQixDQUFpQyxJQUFqQyxFQUNFO0FBQUEsSUFBQSxVQUFBLEVBQWEsV0FBYjtBQUFBLElBQ0EsU0FBQSxFQUFZLHlEQURaO0dBREYsRUFMTTtBQUFBLENBRFIsQ0FBQSxDQUFBOztBQ0FBLE9BQU8sQ0FBQyxNQUFSLENBQWdCLGNBQWhCLENBQ0EsQ0FBQyxPQURELENBQ1UsZUFEVixFQUMwQixTQUN4QixVQUR3QixFQUV4QixLQUZ3QixFQUd4QixZQUh3QixHQUFBO0FBTXhCLE1BQUEseUJBQUE7QUFBQSxFQUFBLE9BQUEsR0FBVSxTQUFDLElBQUQsR0FBQTtBQUVSLFFBQUEsTUFBQTs7TUFGUyxPQUFPO0tBRWhCO0FBQUEsSUFBQSxNQUFBLEdBQ0U7QUFBQSxNQUFBLElBQUEsRUFBTSxJQUFBLElBQVEsTUFBQSxDQUFBLENBQVEsQ0FBQyxNQUFULENBQWlCLFlBQWpCLENBQWQ7S0FERixDQUFBO1dBR0EsS0FBQSxDQUNFO0FBQUEsTUFBQSxNQUFBLEVBQVcsS0FBWDtBQUFBLE1BQ0EsR0FBQSxFQUFXLFlBQUEsR0FBYyxTQUR6QjtBQUFBLE1BRUEsTUFBQSxFQUFXLE1BRlg7S0FERixDQUtBLENBQUMsT0FMRCxDQUtTLFNBQUMsSUFBRCxHQUFBO2FBQ1AsS0FETztJQUFBLENBTFQsRUFMUTtFQUFBLENBQVYsQ0FBQTtBQUFBLEVBYUEsZ0JBQUEsR0FBbUIsU0FBQyxjQUFELEVBQWlCLElBQWpCLEdBQUE7QUFFakIsUUFBQSxNQUFBOztNQUZrQyxPQUFPO0tBRXpDO0FBQUEsSUFBQSxNQUFBLEdBQ0U7QUFBQSxNQUFBLElBQUEsRUFBTSxJQUFBLElBQVEsTUFBQSxDQUFBLENBQVEsQ0FBQyxNQUFULENBQWlCLFlBQWpCLENBQWQ7QUFBQSxNQUNBLFVBQUEsRUFBWSxjQURaO0tBREYsQ0FBQTtXQUlBLEtBQUEsQ0FDRTtBQUFBLE1BQUEsTUFBQSxFQUFXLEtBQVg7QUFBQSxNQUNBLEdBQUEsRUFBVyxZQUFBLEdBQWMsU0FEekI7QUFBQSxNQUVBLE1BQUEsRUFBVyxNQUZYO0tBREYsQ0FLQSxDQUFDLE9BTEQsQ0FLUyxTQUFDLElBQUQsR0FBQTthQUNQLEtBRE87SUFBQSxDQUxULEVBTmlCO0VBQUEsQ0FibkIsQ0FBQTtTQTJCQTtBQUFBLElBQUEsT0FBQSxFQUFTLE9BQVQ7QUFBQSxJQUNBLGdCQUFBLEVBQWtCLGdCQURsQjtJQWpDd0I7QUFBQSxDQUQxQixDQUFBLENBQUE7O0FDQUEsT0FBTyxDQUFDLE1BQVIsQ0FBZ0IsY0FBaEIsQ0FDQSxDQUFDLE9BREQsQ0FDVSx5QkFEVixFQUNvQyxTQUFBLEdBQUE7QUFDbEMsTUFBQSxPQUFBO0FBQUEsRUFBQSxPQUFBLEdBQVUsU0FBQyxPQUFELEdBQUE7QUFFUixRQUFBLDZCQUFBO0FBQUEsSUFBQSxXQUFBLEdBQWMsRUFBZCxDQUFBO0FBQ0EsU0FBQSw4Q0FBQTsyQkFBQTtBQUNFLE1BQUEsSUFBRyxXQUFXLENBQUMsT0FBWixDQUFvQixNQUFNLENBQUMsVUFBM0IsQ0FBQSxLQUEwQyxDQUFBLENBQTdDO0FBQ0UsUUFBQSxXQUFXLENBQUMsSUFBWixDQUFpQixNQUFNLENBQUMsVUFBeEIsQ0FBQSxDQURGO09BREY7QUFBQSxLQURBO1dBTUEsWUFSUTtFQUFBLENBQVYsQ0FBQTtTQVVBO0FBQUEsSUFBQSxPQUFBLEVBQVMsT0FBVDtJQVhrQztBQUFBLENBRHBDLENBQUEsQ0FBQTs7QUNBQSxPQUFPLENBQUMsTUFBUixDQUFnQixnQkFBaEIsQ0FDQSxDQUFDLE1BREQsQ0FDUSxTQUFDLGtCQUFELEdBQUE7QUFDTixFQUFBLGtCQUFrQixDQUFDLGdCQUFuQixDQUFxQyxJQUFyQyxDQUFBLENBQUE7U0FDQSxrQkFBa0IsQ0FBQywwQkFBbkIsQ0FBQSxFQUZNO0FBQUEsQ0FEUixDQUFBLENBQUE7O0FDQUEsT0FBTyxDQUFDLE1BQVIsQ0FBZ0IsZ0JBQWhCLENBQ0EsQ0FBQyxNQURELENBQ1EsU0FBQyxpQkFBRCxHQUFBO0FBQ04sRUFBQSxpQkFBaUIsQ0FBQyxTQUFsQixDQUE0QixJQUE1QixDQUFBLENBQUE7U0FDQSxpQkFBaUIsQ0FBQyxVQUFsQixDQUE4QixHQUE5QixFQUZNO0FBQUEsQ0FEUixDQUFBLENBQUE7O0FDQUE7QUFBQTs7Ozs7Ozs7R0FBQTtBQUFBLE9BVU8sQ0FBQyxNQUFSLENBQWdCLGdCQUFoQixDQUNBLENBQUMsS0FERCxDQUNRLFNBRFIsRUFDa0IsRUFEbEIsQ0FHQSxDQUFDLEdBSEQsQ0FHSyxTQUFDLFVBQUQsRUFBYSxPQUFiLEdBQUE7U0FDSCxVQUFVLENBQUMsT0FBWCxHQUFxQixRQURsQjtBQUFBLENBSEwsQ0FWQSxDQUFBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiMjIypcbiAgQG5nZG9jIG1vZHVsZVxuICBAbmFtZSBlZHQtZGVtb1xuICBAbW9kdWxlIGVkdC1kZW1vXG4gIEBkZXNjcmlwdGlvblxuXG4gIFRoaXMgbW9kdWxlIHJlcXVpcmVzIGFsbCBzdWJtb2R1bGVzIG9mIHlvdXIgYXBwXG4jIyNcblxuYW5ndWxhci5tb2R1bGUgJ2VkdC1kZW1vJywgW1xuICAnbmdNYXRlcmlhbCdcbiAgJ2VkdC1kZW1vLnV0aWxzJ1xuICAnZWR0LWRlbW8uZWR0J1xuXVxuIiwiIyMjKlxuICBAbmdkb2MgbW9kdWxlXG4gIEBuYW1lIGVkdC1kZW1vLmxhbmRpbmdcbiAgQG1vZHVsZSBlZHQtZGVtby5sYW5kaW5nXG4gIEBkZXNjcmlwdGlvblxuXG4gIExhbmRpbmcgcGFnZSBvZiB0aGUgYXBwbGljYXRpb24uXG4jIyNcblxuYW5ndWxhci5tb2R1bGUgJ2VkdC1kZW1vLmVkdCcsIFtcbiAgJ25nJ1xuICAndWkucm91dGVyJ1xuICAncGFzY2FscHJlY2h0LnRyYW5zbGF0ZSdcbl1cbiIsIiMjIypcbiAgQG5nZG9jIG1vZHVsZVxuICBAbmFtZSBib2lsZXJwbGF0ZS51dGlsc1xuICBAbW9kdWxlIGJvaWxlcnBsYXRlLnV0aWxzXG4gIEBkZXNjcmlwdGlvblxuXG4gIFRoaXMgbW9kdWxlIGNvbnRhaW5zIGhlbHBlcnMgYW5kIGdsb2JhbCBjb25maWd1cmF0aW9uIHJlcXVpcmVkIGJ5IHlvdXIgYXBwXG4jIyNcblxuYW5ndWxhci5tb2R1bGUgJ2VkdC1kZW1vLnV0aWxzJywgW1xuICAnbmcnXG4gICd1aS5yb3V0ZXInXG4gICdwYXNjYWxwcmVjaHQudHJhbnNsYXRlJ1xuXVxuIiwiYW5ndWxhci5tb2R1bGUgJ2VkdC1kZW1vLmVkdCdcbi5jb250cm9sbGVyICdDb3Vyc2VMaXN0Q3RybCcsIChcbiAgJHNjb3BlXG4gICRzdGF0ZVBhcmFtc1xuICAkbWREaWFsb2dcbiAgQ291cnNlRmFjdG9yeVxuICBEZXBhcnRtZW50TGlzdEV4dHJhY3RvclxuKSAtPlxuXG4gICRzY29wZS5jdXJyZW50RGVwYXJ0bWVudCA9IG51bGxcbiAgJHNjb3BlLmN1cnJlbnREYXRlID0gbmV3IERhdGUoKVxuICAkc2NvcGUuZXJyb3JOb05ldHdvcmsgPSBmYWxzZVxuXG4gIGFsZXJ0Tm9OZXR3b3JrID0gJG1kRGlhbG9nLmFsZXJ0KClcbiAgLnRpdGxlKCdFcnJldXIgcsOpc2VhdScpXG4gIC5jb250ZW50KCdJbXBvc3NpYmxlIGRlIHLDqWN1cMOpcmVyIGxhIGxpc3RlIGRlcyBjb3VycyAhJylcbiAgLmFyaWFMYWJlbCgnTmV0d29yayBlcnJvcicpXG4gIC5vaygnRG9tbWFnZSA6KCcpXG5cbiAgJHNjb3BlLmxvYWRDb3Vyc2VzID0gKCkgLT5cbiAgICBDb3Vyc2VGYWN0b3J5LmZpbmRBbGwoKVxuICAgIC5zdWNjZXNzIChkYXRhKSAtPlxuICAgICAgJHNjb3BlLmVycm9yTm9OZXR3b3JrID0gZmFsc2VcblxuICAgICAgJHNjb3BlLmNvdXJzZXMgPSBkYXRhXG4gICAgICBjb25zb2xlLmxvZyBcIkZvdW5kIFwiKyRzY29wZS5jb3Vyc2VzLmxlbmd0aCtcIiBjb3Vyc2VzXCJcblxuICAgICAgJHNjb3BlLmRlcGFydG1lbnRzID0gRGVwYXJ0bWVudExpc3RFeHRyYWN0b3IuZXh0cmFjdCAkc2NvcGUuY291cnNlc1xuICAgICAgY29uc29sZS5sb2cgXCJGb3VuZCBcIiskc2NvcGUuZGVwYXJ0bWVudHMubGVuZ3RoK1wiIGRlcGFydG1lbnRzXCJcblxuICAgICAgIyBTZXQgdGhlIHByZS1zZWxlY3RlZCBkZXBhcnRtZW50XG4gICAgICAkc2NvcGUuY3VycmVudERlcGFydG1lbnQgPSAkc3RhdGVQYXJhbXMuZGVwXG5cbiAgICAuZXJyb3IgKCkgLT5cbiAgICAgICRtZERpYWxvZy5zaG93KCBhbGVydE5vTmV0d29yayApXG4gICAgICAkc2NvcGUuZXJyb3JOb05ldHdvcmsgPSB0cnVlXG5cbiAgJHNjb3BlLmRlcGFydG1lbnRGaWx0ZXIgPSAoY291cnNlKSAtPlxuICAgICEkc2NvcGUuY3VycmVudERlcGFydG1lbnQgb3IgY291cnNlLmRlcGFydG1lbnQgPT0gJHNjb3BlLmN1cnJlbnREZXBhcnRtZW50XG5cbiAgJHNjb3BlLnBhc3RDb3Vyc2VGaWx0ZXIgPSAoY291cnNlKSAtPlxuICAgICEkc2NvcGUucHJlZnMuaGlkZVBhc3RDb3Vyc2VzIG9yIGNvdXJzZS50aW1lX2VuZCA+ICRzY29wZS5jdXJyZW50RGF0ZVxuXG4gICMgQ2FsbCB0aGUgQVBJXG4gICRzY29wZS5sb2FkQ291cnNlcygpXG4iLCJhbmd1bGFyLm1vZHVsZSAnZWR0LWRlbW8uZWR0J1xuLmNvbnRyb2xsZXIgJ1BhcmFtZXRlcnNDdHJsJywgKFxuICAgICRzY29wZVxuICAgICRzdGF0ZVBhcmFtc1xuICAgICRtZERpYWxvZ1xuICAgICRtZFNpZGVuYXZcbiAgICAkdGltZW91dFxuICApIC0+XG5cbiAgIyBJbml0aWFsaXplIHRoZSBwcmVmZXJlbmNlc1xuICAkc2NvcGUucHJlZnMgPVxuICAgIGhpZGVQYXN0Q291cnNlcyA9IGZhbHNlXG5cbiAgJHNjb3BlLnRvZ2dsZVNpZGViYXIgPSAoKSAtPlxuICAgICRtZFNpZGVuYXYoJ2xlZnQnKS50b2dnbGUoKVxuIiwiYW5ndWxhci5tb2R1bGUgJ2VkdC1kZW1vLmVkdCdcbi5jb25zdGFudCAnQkFTRV9BUElfVVJMJywgJ2h0dHA6Ly9hcGktZWR0LXBvbnRzLnNlY3VyZW0uZXUvJyIsImFuZ3VsYXIubW9kdWxlICdlZHQtZGVtby5lZHQnXG4uY29uZmlnICgkc3RhdGVQcm92aWRlcikgLT5cbiAgJHN0YXRlUHJvdmlkZXJcbiAgLnN0YXRlICdlZHQnLFxuICAgIHVybDogJy8/ZGVwJ1xuICAgIGNvbnRyb2xsZXI6ICAnQ291cnNlTGlzdEN0cmwnXG4gICAgdGVtcGxhdGVVcmw6ICdlZHQvdmlld3Mvdmlldy5odG1sJ1xuIiwiYW5ndWxhci5tb2R1bGUgJ2VkdC1kZW1vLmVkdCdcbi5jb25maWcgKCR0cmFuc2xhdGVQcm92aWRlcikgLT5cbiAgJHRyYW5zbGF0ZVByb3ZpZGVyLnRyYW5zbGF0aW9ucyAnZW4nLFxuICAgIEhPTUVfVElUTEU6ICdXZWxjb21lJ1xuICAgIEhPTUVfVEVYVDogJ1RoaXMgaXMgdGhlIGJlZ2lubmluZyBvZiBhbiBleHRyYW9yZGluYXJ5IGFwcC4uLidcblxuICAkdHJhbnNsYXRlUHJvdmlkZXIudHJhbnNsYXRpb25zICdmcicsXG4gICAgSE9NRV9USVRMRTogJ0JpZW52ZW51ZSdcbiAgICBIT01FX1RFWFQ6ICdDZWNpIGVzdCBsZSBjb21tZW5jZW1lbnQgZFxcJ3VuZSBhcHBsaSBleHRyYW9yZGluYWlyZS4uLidcbiIsImFuZ3VsYXIubW9kdWxlICdlZHQtZGVtby5lZHQnXG4uZmFjdG9yeSAnQ291cnNlRmFjdG9yeScsIChcbiAgJHJvb3RTY29wZVxuICAkaHR0cFxuICBCQVNFX0FQSV9VUkxcbikgLT5cblxuICBmaW5kQWxsID0gKGRhdGUgPSBudWxsKSAtPlxuXG4gICAgcGFyYW1zID1cbiAgICAgIGRhdGU6IGRhdGUgb3IgbW9tZW50KCkuZm9ybWF0ICdERC9NTS9ZWVlZJ1xuXG4gICAgJGh0dHAoXG4gICAgICBtZXRob2Q6ICAgJ0dFVCdcbiAgICAgIHVybDogICAgICAgQkFTRV9BUElfVVJMKydjb3Vyc2VzJ1xuICAgICAgcGFyYW1zOiAgICBwYXJhbXNcbiAgICApXG4gICAgLnN1Y2Nlc3MgKGRhdGEpIC0+XG4gICAgICBkYXRhXG5cbiAgZmluZEJ5RGVwYXJ0bWVudCA9IChkZXBhcnRtZW50Q29kZSwgZGF0ZSA9IG51bGwpIC0+XG5cbiAgICBwYXJhbXMgPVxuICAgICAgZGF0ZTogZGF0ZSBvciBtb21lbnQoKS5mb3JtYXQgJ0REL01NL1lZWVknXG4gICAgICBkZXBhcnRtZW50OiBkZXBhcnRtZW50Q29kZVxuXG4gICAgJGh0dHAoXG4gICAgICBtZXRob2Q6ICAgJ0dFVCdcbiAgICAgIHVybDogICAgICAgQkFTRV9BUElfVVJMKydjb3Vyc2VzJ1xuICAgICAgcGFyYW1zOiAgICBwYXJhbXNcbiAgICApXG4gICAgLnN1Y2Nlc3MgKGRhdGEpIC0+XG4gICAgICBkYXRhXG5cbiAgZmluZEFsbDogZmluZEFsbFxuICBmaW5kQnlEZXBhcnRtZW50OiBmaW5kQnlEZXBhcnRtZW50XG4iLCJhbmd1bGFyLm1vZHVsZSAnZWR0LWRlbW8uZWR0J1xuLnNlcnZpY2UgJ0RlcGFydG1lbnRMaXN0RXh0cmFjdG9yJywgKCkgLT5cbiAgZXh0cmFjdCA9IChjb3Vyc2VzKSAtPlxuICAgICMgV2UgbmVlZCB0byBleHRyYWN0IHRoZSBkZXBhcnRtZW50IGxpc3QgZnJvbSB0aGUgY291cnNlcyBsaXN0XG4gICAgZGVwYXJ0bWVudHMgPSBbXVxuICAgIGZvciBjb3Vyc2UgaW4gY291cnNlc1xuICAgICAgaWYgZGVwYXJ0bWVudHMuaW5kZXhPZihjb3Vyc2UuZGVwYXJ0bWVudCkgaXMgLTFcbiAgICAgICAgZGVwYXJ0bWVudHMucHVzaCBjb3Vyc2UuZGVwYXJ0bWVudFxuXG4gICAgIyBSZXR1cm4gdGhlIGRlcGFydG1lbnRzIGxpc3RcbiAgICBkZXBhcnRtZW50c1xuXG4gIGV4dHJhY3Q6IGV4dHJhY3RcbiIsImFuZ3VsYXIubW9kdWxlICdlZHQtZGVtby51dGlscydcbi5jb25maWcgKCR0cmFuc2xhdGVQcm92aWRlcikgLT5cbiAgJHRyYW5zbGF0ZVByb3ZpZGVyLmZhbGxiYWNrTGFuZ3VhZ2UgJ2VuJ1xuICAkdHJhbnNsYXRlUHJvdmlkZXIuZGV0ZXJtaW5lUHJlZmVycmVkTGFuZ3VhZ2UoKVxuIiwiYW5ndWxhci5tb2R1bGUgJ2VkdC1kZW1vLnV0aWxzJ1xuLmNvbmZpZyAoJGxvY2F0aW9uUHJvdmlkZXIpIC0+XG4gICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSB0cnVlXG4gICRsb2NhdGlvblByb3ZpZGVyLmhhc2hQcmVmaXggJyEnXG4iLCIjIyMqXG4gIEBuZ2RvYyBvYmplY3RcbiAgQG5hbWUgc3RvcmFnZVxuICBAbW9kdWxlIGVkdC1kZW1vLnV0aWxzXG4gIEBkZXNjcmlwdGlvblxuXG4gIFRoaXMgdmFsdWUgb2JqZWN0IGlzIGFuIGFwcGxpY2F0aW9uLXdpZGUgZGF0YS1zdG9yZS5cbiAgSXQncyBwdWJsaXNoZWQgaW4gYCRyb290U2NvcGVgIGZvciBlYXN5LWFjY2VzcyBpbiB2aWV3cy5cbiMjI1xuXG5hbmd1bGFyLm1vZHVsZSAnZWR0LWRlbW8udXRpbHMnXG4udmFsdWUgJ3N0b3JhZ2UnLCB7fVxuXG4ucnVuICgkcm9vdFNjb3BlLCBzdG9yYWdlKSAtPlxuICAkcm9vdFNjb3BlLnN0b3JhZ2UgPSBzdG9yYWdlXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=