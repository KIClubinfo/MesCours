angular.module '%module%.edt'
.factory 'CourseFactory', (
  $rootScope
  $http
  BASE_API_URL
) ->

  findAll = (date = null) ->

    params =
      date: date or moment().format 'DD/MM/YYYY'

    $http(
      method:   'GET'
      url:       BASE_API_URL+'courses'
      params:    params
    )
    .success (data) ->
      data

  findByDepartment = (departmentCode, date = null) ->

    params =
      date: date or moment().format 'DD/MM/YYYY'
      department: departmentCode

    $http(
      method:   'GET'
      url:       BASE_API_URL+'courses'
      params:    params
    )
    .success (data) ->
      data

  findAll: findAll
  findByDepartment: findByDepartment
