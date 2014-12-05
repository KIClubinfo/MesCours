angular.module '%module%.edt'
.config ($stateProvider) ->
  $stateProvider
  .state 'edt',
    url: '/'
    controller:  'CourseListCtrl'
    templateUrl: 'edt/views/view.html'
