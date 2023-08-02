import validate from './validate'

const MOCK_SCHEMA = {
  fields : [
    {
      name       : "field1",
      type       : "text",
      required   : true,
      minLength  : 0, // optional
      maxLength  : 20, // optional
      options    : ['Test', 'test', '123'], // optional values
    },
    {
      name       : "field2",
      type       : "number",
      required   : false, // Will only fail if the value is out of range, in this case the value can be null
      minLength  : 0, // optional - For numbers it defines a range, if min is ommited we assume zero
      maxLength  : 100, // optional -
    },
    {
      name       : "field3",
      type       : "boolean",
      required   : true,
      options    : [true], // optional - This could be a mandatory checkbox
    },
    {
      name       : "field4",
      type       : "array", // In case of array, treat each element with the same rules, only text type for now
      required   : true,
      options    : ['Test', 'test', '123'], // optional values
    },
  ]
}

// TODO : Implement nested objects
const MOCK_OBJECT_TEXT_PASS = {
  field1 : "Test",
  field3 : true,
  field4 : ['Test']
}

const MOCK_OBJECT_TEXT_FAIL = {
  field1 : "Test2",
  field3 : true,
  field4 : ['Test']
}

const MOCK_OBJECT_NUMBER_PASS = {
  field1 : "Test",
  field2 : 42,
  field3 : true,
  field4 : ['Test']
}

const MOCK_OBJECT_NUMBER_FAIL = {
  field1 : "Test",
  field2 : 9000,
  field3 : true,
  field4 : ['Test']
}

const MOCK_OBJECT_BOOLEAN_PASS = {
  field1 : '123',
  field3 : true,
  field4 : ['Test']
}

const MOCK_OBJECT_BOOLEAN_FAIL = {
  field1 : '123',
  field3 : false,
  field4 : ['Test']
}

const MOCK_OBJECT_ARRAY_PASS = {
  field1 : '123',
  field3 : true,
  field4 : ['Test', 'test', '123']
}

const MOCK_OBJECT_ARRAY_FAIL = {
  field1 : '123',
  field3 : true,
  field4 : ['Not', 'Gonna', 'Pass']
}

const MOCK_OBJECT_PASS = {
  field1 : "Test",
  field2 : 0,
  field3 : true,
  field4 : ['test', '123'],
}

const MOCK_OBJECT_FAIL = {
  field1 : "Test2",
  field2 : 120,
  field3 : false,
  field4 : ['test', 'Test', '123'],
}

test('Check validate helper', () => {
  // Testing text validation
  expect(validate(MOCK_OBJECT_TEXT_PASS, MOCK_SCHEMA).valid).toBe(true)
  expect(validate(MOCK_OBJECT_TEXT_FAIL, MOCK_SCHEMA).valid).toBe(false)

  // Testing number validation
  expect(validate(MOCK_OBJECT_NUMBER_PASS, MOCK_SCHEMA).valid).toBe(true)
  expect(validate(MOCK_OBJECT_NUMBER_FAIL, MOCK_SCHEMA).valid).toBe(false)

  // Testing boolean validation
  expect(validate(MOCK_OBJECT_BOOLEAN_PASS, MOCK_SCHEMA).valid).toBe(true)
  expect(validate(MOCK_OBJECT_BOOLEAN_FAIL, MOCK_SCHEMA).valid).toBe(false)

  // Testing array validation
  expect(validate(MOCK_OBJECT_ARRAY_PASS, MOCK_SCHEMA).valid).toBe(true)
  expect(validate(MOCK_OBJECT_ARRAY_FAIL, MOCK_SCHEMA).valid).toBe(false)

  // Testing generic objects
  expect(validate(MOCK_OBJECT_PASS, MOCK_SCHEMA).valid).toBe(true)
  expect(validate(MOCK_OBJECT_FAIL, MOCK_SCHEMA).valid).toBe(false)
})
