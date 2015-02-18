angular.module '%module%.edt'
.config ($stateProvider, $urlRouterProvider) ->
  $stateProvider
  .state 'edt',
    url: '/?dep'
    controller:  'CourseListCtrl'
    templateUrl: 'edt/views/view.html'

  $urlRouterProvider.otherwise '/'
