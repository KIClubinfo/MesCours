angular.module '%module%.edt'
.factory 'CourseFactory', (
  $rootScope
  $http
  BASE_API_URL
) ->

  findAll = () ->
    $http(
      method:   'GET'
      url:       BASE_API_URL+'courses'
    )
    .success (data) ->
      data

  findByDepartment = (departmentCode) ->
    $http(
      method:   'GET'
      url:       BASE_API_URL+'courses?department='+departmentCode
    )
    .success (data) ->
      data

  findAll: findAll
  findByDepartment: findByDepartment
