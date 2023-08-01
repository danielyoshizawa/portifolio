const EducationSchema = {
  fields : [
    {
      name       : "name",
      type       : "text",
      required   : true
    },
    {
      name       : "course",
      type       : "text",
      required   : true
    },
    {
      name       : "start",
      type       : "text",
      required   : true
    },
    {
      name       : "end",
      type       : "text",
      required   : true
    },
    {
      name       : "type",
      type       : "text",
      required   : true,
      options    : ['Bachelor', 'Graduated Course', 'Technologist', 'Exchange Program'],
    },
    {
      name       : "fixed",
      type       : "text",
      required   : false
    }
  ]
}

export default EducationSchema
