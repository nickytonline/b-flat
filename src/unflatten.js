function isKeyPartAnArrayIndex(keyPart) {
  // It is assumed that key parts that are a number are an array index.
  return (/^\d+$/.test(keyPart));
}

function unflattenKey(keyParts, unflattenedObject, value) {
  let currentObject = unflattenedObject;

  keyParts.forEach(function (keyPart, index) {
    if (index !== keyParts.length - 1) {
      if (!(keyPart in currentObject)) {
        currentObject[keyPart] = isKeyPartAnArrayIndex(keyParts[index + 1]) ? [] : {};
      }

      currentObject = currentObject[keyPart];
    } else {
      currentObject[keyPart] = value;
    }
  });

  return unflattenedObject[keyParts[0]];
}

/**
 * Unflattens a flattened object.
 *
 * @param  {object} objectToUnflatten The object to unflatten.
 * @param  {string} [separator=_] The separator for keys when unflattening a key.
 *
 * @return {object} The unflattened object.
 */
function unflatten(objectToUnflatten, separator = `_`) {
  const unflattenedObject = {};
  const unflattenedCopy = Object.assign({}, unflattenedObject);

  Object.keys(objectToUnflatten).forEach(function (key) {
    const keyParts = key.split(separator);
    const keyValue = objectToUnflatten[key];
    const rootKey = keyParts[0];

    unflattenedObject[rootKey] = keyParts.length === 1 ? keyValue : unflattenKey(keyParts, unflattenedCopy, keyValue);
  });

  return unflattenedObject;
}

export default unflatten;
