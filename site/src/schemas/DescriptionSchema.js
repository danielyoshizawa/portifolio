const DescriptionSchema = {
  fields : [
    {
      name       : "title",
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
  ]
}

export default DescriptionSchema
