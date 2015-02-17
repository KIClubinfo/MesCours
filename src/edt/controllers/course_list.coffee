angular.module '%module%.edt'
.controller 'CourseListCtrl', (
  $scope
  $stateParams
  $mdDialog
  CourseFactory
  DepartmentListExtractor
) ->

  $scope.currentDepartment = null
  $scope.errorNoNetwork = false

  alertNoNetwork = $mdDialog.alert()
  .title('Erreur réseau')
  .content('Impossible de récupérer la liste des cours !')
  .ariaLabel('Network error')
  .ok('Dommage :(')

  $scope.loadCourses = () ->
    CourseFactory.findAll()
    .success (data) ->
      $scope.errorNoNetwork = false

      $scope.courses = data
      console.log "Found "+$scope.courses.length+" courses"

      $scope.departments = DepartmentListExtractor.extract $scope.courses
      console.log "Found "+$scope.departments.length+" departments"

      # Set the pre-selected department
      $scope.currentDepartment = $stateParams.dep

    .error () ->
      $mdDialog.show( alertNoNetwork )
      $scope.errorNoNetwork = true

  $scope.departmentFilter = (course) ->
    !$scope.currentDepartment or course.department == $scope.currentDepartment

  # Call the API
  $scope.loadCourses()
