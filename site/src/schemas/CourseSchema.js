const CourseSchema = {
  fields : [
    {
      name       : "name",
      type       : "text",
      required   : true
    },
    {
      name       : "link",
      type       : "text",
      required   : true
    },
    {
      name       : "validation",
      type       : "text",
      required   : true
    },
    {
      name       : "institution",
      type       : "text",
      required   : true
    },
    {
      name       : "date",
      type       : "text",
      required   : true,
    },
    {
      name       : "fixed",
      type       : "text",
      required   : false
    }
  ]
}

export default CourseSchema
