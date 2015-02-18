angular.module '%module%.edt'
.controller 'ParametersCtrl', (
    $scope
    $stateParams
    $mdDialog
    $mdSidenav
    $timeout
  ) ->

  # Initialize the preferences
  $scope.prefs =
    hidePastCourses: true

  $scope.toggleSidebar = () ->
    $mdSidenav('left').toggle()
