function deepClone(obj) {
  // Error when the object is a Date or String or anything other than an object
  // Note: An Array is instanceOf Object.
  if (
    !(obj instanceof Object) ||
    obj instanceof Date ||
    obj instanceof String
  ) {
    throw new Error("Only supports Objects and Arrays");
  }

  // If the object is an Array, initialize clone woth Array else Object
  const clone = obj instanceof Array ? [] : {};
  for (const key in obj) {
    const val = obj[key];
    // Check the value is instance of Object or Array and not of Date or String
    // Also check the property belongs to the defined Object and not to Object Prototype
    if (
      val instanceof Object &&
      !(val instanceof Date) &&
      !(val instanceof String) &&
      obj.hasOwnProperty(key)
    ) {
      clone[key] = deepClone(val);
    } else {
      clone[key] = val;
    }
  }
  return clone;
}

// Use deepClone
const sourceObject = {
  a: 1,
  b: 2,
  c: { x: 8, y: 9, z: [90, 80, { test: 22, test2: 33 }] },
};

const targetObject = deepClone(sourceObject);
targetObject.c.x = 99;
targetObject.c.z[2].test2 = 99;

console.log("source object: ", sourceObject);
// {
//   a: 1,
//   b: 2,
//   c: { x: 8, y: 9, z: [90, 80, { test: 22, test2: 33 }] },
// };
console.log("Clone target object: ", targetObject);
// {
//   a: 1,
//   b: 2,
//   c: { x: 99, y: 9, z: [90, 80, { test: 22, test2: 99 }] },
// };
