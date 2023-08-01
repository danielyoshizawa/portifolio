// Receive a schema and an object,
// check one against the other

// Schema template
// {
//   fields : [
//     {
//       name       : "",
//       type       : "",
//       required   : "",
//       minLenght  : 0, // optional
//       maxLenght  : 0, // optional
//       options    : [], // optional
//     },
//   ]
// }

// Object example (Education.js)
// {
//   field1 : "",
//   field2 : 0,
//   field3 : true,
//   field4 : [],
// }
function validateText(value, field) {
    // minLenght
    if (
      field.hasOwnProperty("minLength")
      && value.length < field.minLength
    ) {
      return false;
    }
    if (
      field.hasOwnProperty("maxLength")
      && value.length > field.maxLength
    ) {
      return false;
    }
    let validOptions = false;
    if (field.hasOwnProperty("options")) {
      field.options.map((opt) => {
        if (opt === value) {
          validOptions = true;
          return
        }
      })
    }
    return validOptions;
}

function validateNumber(value, field) {
  // minLenght
  if (
    field.hasOwnProperty("minLength")
    && value < field.minLength
  ) {
    return false;
  }
  if (
    field.hasOwnProperty("maxLength")
    && value > field.maxLength
  ) {
    return false;
  }
  if (field.hasOwnProperty("options")) {
    let validOptions = false;
    field.options.map((opt) => {
      if (opt === value) {
        validOptions = true;
        return
      }
    })
    return validOptions;
  }
  return true;
}

function validateBoolean(value, field) {
  if (typeof value !== 'boolean') {
    return false
  }

  if (field.hasOwnProperty("options")) {
    let validOptions = false;
    field.options.map((opt) => {
      if (opt === value) {
        validOptions = true;
        return
      }
    })
    return validOptions;
  }
  return true;
}

function validateArray(value, field) {
  let valid = true;
  if (typeof Array.isArray(value) === false) {
    return false
  }

  value.map((item) => {
    if (validateText(item, {...field, type : "text"}) == false) {
      valid = false;
    }
  })
  return valid;
}

function validateRequired(value) {
  return !(value === undefined || value === null )
}

function validate(obj, schema) {

  const fields = schema.fields; // Array of elements of the schema
  let valid = true; // Will be valid until provem guilt
  fields.map((field) => {
    const name = field.name
    if (
      field.hasOwnProperty('required')
      && field.required === true
      && obj.hasOwnProperty(name) === false
    ) {
      console.log("REQUIRED FAIL")
      return false
    }

    // If the obj has the field we need to test
    if (obj.hasOwnProperty(name)) {
      const objValue = obj[name]
      // If required we need to check if its not null
      if (field.required === true) {
        if (validateRequired(objValue) === false)
        {
          valid = false;
        }
        // Leaving space here because I want to return all the invalid fields
      }

      if (field.type === "text") {
        if (validateText(objValue, field) === false) {
          valid = false;
        }
      }
      if (field.type === "number") {
        if (validateNumber(objValue, field) === false) {
          valid = false
        }
      }
      if (field.type === "boolean") {
        if (validateBoolean(objValue, field) === false) {
          valid = false
        }
      }
      // All elements will be treated as text for now
      if (field.type === "array") {
        if (validateArray(objValue, field) === false) {
          valid = false
        }
      }
    }
  })

  return valid;
}

export default validate
