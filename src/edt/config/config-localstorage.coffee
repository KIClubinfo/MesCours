angular.module '%module%.edt'
.config (localStorageServiceProvider) ->
  localStorageServiceProvider.setPrefix('edt')
