angular.module '%module%.edt'
.controller 'ParametersCtrl', (
    $scope
    $stateParams
    $mdDialog
    $mdSidenav
    localStorageService
  ) ->

  # Initialize the preferences
  prefs = localStorageService.get('prefs')
  if prefs
    $scope.prefs = prefs
  else
    $scope.prefs =
      hidePastCourses: true

  $scope.$watch 'prefs',  () ->
    localStorageService.set 'prefs', $scope.prefs
  , true

  $scope.toggleSidebar = () ->
    $mdSidenav('left').toggle()
