angular.module '%module%.edt'
.service 'DepartmentListExtractor', () ->
  extract = (courses) ->
    # We need to extract the department list from the courses list
    departments = []
    for course in courses
      if departments.indexOf(course.department) is -1
        departments.push course.department

    # Return the departments list
    departments

  extract: extract
