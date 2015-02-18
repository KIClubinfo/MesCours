angular.module '%module%.edt'
.service 'DepartmentListExtractor', (localStorageService) ->
  extract = (courses) ->

    # First, check in the localStorage if the list is already present
    departments = localStorageService.get('departments')

    if not departments
      # We need to extract the department list from the courses list
      console.log 'Extracting departments...'

      departments = []
      for course in courses
        if departments.indexOf(course.department) is -1
          departments.push course.department

      # Store the list in the localStorage
      localStorageService.set('departments', departments)

    # Return the departments list
    departments

  extract: extract
