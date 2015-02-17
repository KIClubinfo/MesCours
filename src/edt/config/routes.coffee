angular.module '%module%.edt'
.config ($stateProvider) ->
  $stateProvider
  .state 'edt',
    url: '/?dep'
    controller:  'CourseListCtrl'
    templateUrl: 'edt/views/view.html'
