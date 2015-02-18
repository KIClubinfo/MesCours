###*
  @ngdoc module
  @name %module%
  @module %module%
  @description

  This module requires all submodules of your app
###

'use strict'

angular.module '%module%', [
  'ngMaterial'
  'LocalStorageModule'
  '%module%.utils'
  '%module%.edt'
]
