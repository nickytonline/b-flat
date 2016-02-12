/**
 * Flattens an object. Keys within the object become flattened as well.
 * @param  {object} objectToVisit The current object to visit for flattening.
 * @param  {string} [separator=_] The separator for keys when flattening a key.
 * @param  {object} [flattenedObject={}] The object being flattened.
 * @param  {string} [keyBeingBuilt=] The current key being flattened.
 * @param  {string} [currentKey=] The current key to flatten.
 *
 * @return {object} The flattened object.
 */
function flatten(objectToVisit, separator = `_`, flattenedObject = {}, keyBeingBuilt = ``, currentKey = ``) {
  if (currentKey !== '') {
    keyBeingBuilt = `${keyBeingBuilt}${keyBeingBuilt !== `` ? separator : ``}${currentKey}`;
  }

  Object.keys(objectToVisit)
    .forEach(key => {
      if (typeof objectToVisit[key] === `object`) {
        flatten(objectToVisit[key], separator, flattenedObject, keyBeingBuilt, key);
      } else {
        let flattenedKey = keyBeingBuilt !== '' ? `${keyBeingBuilt}${separator}${key}` : key;
        flattenedObject[flattenedKey] = objectToVisit[key];
      }
    });

  return flattenedObject;
}

export default flatten;
