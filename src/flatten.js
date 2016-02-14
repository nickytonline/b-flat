function isPrimitive(valueToCheck) {
    return valueToCheck === null || typeof valueToCheck !== `object`;
}

function flattenObject(objectToVisit, separator = `_`, flattenedObject = {}, keyBeingBuilt = ``, currentKey = ``) {
  if (currentKey !== ``) {
    keyBeingBuilt = `${keyBeingBuilt}${keyBeingBuilt !== `` ? separator : ``}${currentKey}`;
  }

  Object.keys(objectToVisit)
    .forEach(key => {
      if (typeof objectToVisit[key] === `object`) {
        flattenObject(objectToVisit[key], separator, flattenedObject, keyBeingBuilt, key);
      } else {
        let flattenedKey = keyBeingBuilt !== `` ? `${keyBeingBuilt}${separator}${key}` : key;
        flattenedObject[flattenedKey] = objectToVisit[key];
      }
    });

  return flattenedObject;
}

/**
 * Flattens an object. Keys within the object become flattened as well.
 *
 * @param  {object} objectToFlatten The object to flatten.
 * @param  {string} [separator=_] The separator for keys when flattening a key.
 *
 * @return {object} The flattened object.
 */
function flatten(objectToFlatten, separator = `_`) {
  if (isPrimitive(objectToFlatten)) {
    return objectToFlatten;
  }

  return flattenObject(objectToFlatten, separator);
}

export default flatten;
