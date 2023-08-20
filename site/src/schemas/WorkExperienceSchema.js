const WorkExperienceSchema = {
  fields : [
    {
      name       : "company",
      type       : "text",
      required   : true
    },
    {
      name       : "position",
      type       : "text",
      required   : true
    },
    {
      name       : "location",
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
      name       : "description",
      type       : "text",
      required   : true
    },
    {
      name       : "tags",
      type       : "array",
      required   : true
    },
    {
      name       : "fixed",
      type       : "text",
      required   : false
    }
  ]
}

export default WorkExperienceSchema
