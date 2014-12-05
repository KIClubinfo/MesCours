angular.module '%module%.edt'
.controller 'CourseListCtrl', (
  $scope
  CourseFactory
) ->

  CourseFactory.findAll()
  .success (data) ->
    $scope.courses = data
