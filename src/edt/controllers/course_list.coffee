angular.module '%module%.edt'
.controller 'CourseListCtrl', (
  $scope
  $stateParams
  $mdDialog
  CourseFactory
  DepartmentListExtractor
  localStorageService
) ->

  $scope.currentDepartment = null
  $scope.currentDate = new Date()
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
      setDepartment()

    .error () ->
      $mdDialog.show( alertNoNetwork )
      $scope.errorNoNetwork = true

  $scope.departmentFilter = (course) ->
    !$scope.currentDepartment or course.department == $scope.currentDepartment

  $scope.pastCourseFilter = (course) ->
    !$scope.prefs.hidePastCourses or new Date(Date.parse(course.time_end)) > $scope.currentDate

  # Call the API
  $scope.loadCourses()

  setDepartment = () ->
    $scope.currentDepartment = $stateParams.dep or localStorageService.get('currentDepartment') or null

    # Watch the currentDepartment to store it
    $scope.$watch 'currentDepartment',  () ->
      localStorageService.set 'currentDepartment', $scope.currentDepartment
    , true
