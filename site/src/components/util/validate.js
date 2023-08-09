function validateMinLength(value, field) {
  return !( field.hasOwnProperty("minLength") && value < field.minLength )
}

function validateMaxLength(value, field) {
  return !( field.hasOwnProperty("maxLength") && value > field.maxLength)
}

function validateOptions(value ,field) {
  return !(field.hasOwnProperty("options") && !(field.options.includes(value)))
}

function validateText(value, field) {
    if (!validateMinLength(value.length, field)) {
      return false;
    }
    if (!validateMaxLength(value.length, field)) {
      return false;
    }
    if (!validateOptions(value, field)) {
      return false;
    }

    return true;
}

function validateNumber(value, field) {
  if (!validateMinLength(value, field)) {
    return false;
  }
  if (!validateMaxLength(value, field)) {
    return false;
  }
  if (!validateOptions(value, field)) {
    return false;
  }

  return true;
}

function validateBoolean(value, field) {
  if (typeof value !== 'boolean') {
    return false
  }
  if (!validateOptions(value, field)) {
    return false;
  }

  return true;
}

function validateArray(value, field) {
  let valid = true;
  if (Array.isArray(value) === false) {
    return false
  }

  value.map((item) => {
    if (validateText(item, {...field, type : "text"}) === false) {
      valid = false;
    }
    return item
  })
  return valid;
}

function validateRequired(value) {
  return !(value === undefined || value === null || value === "")
}

function validate(obj, schema) {
  // TODO : Refine errors
  let response = {
    valid : true,
    status : "valid",
    error  : []
  }
  const fields = schema.fields; // Array of elements of the schema
  fields.map((field) => {
    const name = field.name
    if (
      field.hasOwnProperty('required')
      && field.required === true
      && obj.hasOwnProperty(name) === false
    ) {
      response.valid = false
      response.status = "invalid"
      response.error.push(`Field "${name}" is required but was not defined`)
      return response
    }

    // If the obj has the field we need to test
    if (obj.hasOwnProperty(name)) {
      const objValue = obj[name]
      // If required we need to check if its not null
      if (field.required === true) {
        if (validateRequired(objValue) === false)
        {
          response.valid = false
          response.status = "invalid"
          response.error.push(`Field "${name}" is required was set, however was defined but is null or undefined`)
        }
      }

      if (field.type === "text") {
        if (validateText(objValue, field) === false) {
          response.valid = false
          response.status = "invalid"
          response.error.push(`Field "${name}" of type "${field.type}" with value "${objValue}" is invalid`)
        }
      }
      if (field.type === "number") {
        if (validateNumber(objValue, field) === false) {
          response.valid = false
          response.status = "invalid"
          response.error.push(`Field "${name}" of type "${field.type}" with value "${objValue}" is invalid`)
        }
      }
      if (field.type === "boolean") {
        if (validateBoolean(objValue, field) === false) {
          response.valid = false
          response.status = "invalid"
          response.error.push(`Field "${name}" of type "${field.type}" with value "${objValue}" is invalid`)
        }
      }
      // All elements will be treated as text for now
      if (field.type === "array") {
        if (validateArray(objValue, field) === false) {
          response.valid = false
          response.status = "invalid"
          response.error.push(`Field "${name}" of type "${field.type}" with value "${objValue}" is invalid`)
        }
      }
    }
    return field
  })

  return response;
}

export default validate
