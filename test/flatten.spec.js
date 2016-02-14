import chai from 'chai';
import flatten from '../src/flatten';

const assert = chai.assert;

chai.should();

describe(`WHEN an object only contains primitives`, () => {
  it(`SHOULD not flatten the object`, () => {
    // arrange
    const a = `Hello, is it me you're looking for?`;
    const b = 1;
    const c = false;

    const objectToFlatten = {
      a,
      b,
      c
    };

    // act
    const didNotFlatten = flatten(objectToFlatten);

    // assert
    didNotFlatten.a.should.equal(a);
    didNotFlatten.b.should.equal(b);
    didNotFlatten.c.should.equal(c);
  });
});

describe(`WHEN a value is undefined in an object to be flattened`, () => {
  it(`SHOULD return the flattened object with the undefined values for the flattened keys`, () => {
    // arrange
    const objectToFlatten = { a: undefined, b: { c: undefined, d: { e: undefined } }};

    // act
    const flattenedObject = flatten(objectToFlatten);

    // assert
    assert(`a` in flattenedObject);
    assert(flattenedObject.a === undefined);

    assert(`b_c` in flattenedObject);
    assert(flattenedObject.b_c === undefined);

    assert(`b_d_e` in flattenedObject);
    assert(flattenedObject.b_d_e === undefined);
  });
});

describe(`WHEN a value is null in an object to be flattened`, () => {
  it(`SHOULD return the flattened object with the null values for the flattened keys`, () => {
    // arrange
    const objectToFlatten = { a: null, b: { c: null, d: { e: null } }};

    // act
    const flattenedObject = flatten(objectToFlatten);

    // assert
    assert(`a` in flattenedObject);
    assert(flattenedObject.a === null);

    assert(`b_c` in flattenedObject);
    assert(flattenedObject.b_c === null);

    assert(`b_d_e` in flattenedObject);
    assert(flattenedObject.b_d_e === null);
  });
});

describe(`WHEN an object contains nested object`, () => {
  it(`SHOULD flatten`, () => {
    // arrange
    const objectToFlatten = {
      a: 1,
      b: {
        c: 2
      }
    };

    // act
    const flattened = flatten(objectToFlatten);

    // assert
    flattened.a.should.equal(1);
    flattened.b_c.should.equal(2);
  });
});

describe(`WHEN flattening an array`, () => {
  it(`SHOULD return an object whose keys are array indices`, () => {
    // arrange
    const objectToFlatten = [1, 2, 3];

    // act
    const flattened = flatten(objectToFlatten);

    // assert
    objectToFlatten.forEach((value, index) => {
      flattened[`${index}`].should.equal(value);
    })
  });
})

describe(`WHEN an object contains an array as a value for a top-level key`, () => {
  it(`SHOULD flatten the keys using the array indices`, () => {
    // arrange
    const objectToFlatten = {
      a: [1, 2, 3]
    };

    // act
    const flattened = flatten(objectToFlatten);

    // assert
    flattened.a_0.should.equal(1);
    flattened.a_1.should.equal(2);
    flattened.a_2.should.equal(3);
  });
});

describe(`WHEN an object contains nested object that has an array as a value at a second level`, () => {
  it(`SHOULD flatten the keys using the array indices`, () => {
    // arrange
    const objectToFlatten = {
      a: {
        b: [1, 2, 3]
      }
    };

    // act
    const flattened = flatten(objectToFlatten);

    // assert
    flattened.a_b_0.should.equal(1);
    flattened.a_b_1.should.equal(2);
    flattened.a_b_2.should.equal(3);
  });
});


describe(`WHEN an object contains nested object that has an array as a value at a third level`, () => {
  it(`SHOULD flatten the keys using the array indices`, () => {
    // arrange
    const objectToFlatten = {
      a: {
        b: {
          c: [{
            d: 1,
            e: 2,
            f: 3
          }, {
            d: 1,
            e: 2,
            f: 3
          }]
        }
      }
    };

    // act
    const flattened = flatten(objectToFlatten);

    // assert
    flattened.a_b_c_0_d.should.equal(1);
    flattened.a_b_c_0_e.should.equal(2);
    flattened.a_b_c_0_f.should.equal(3);

    flattened.a_b_c_1_d.should.equal(1);
    flattened.a_b_c_1_e.should.equal(2);
    flattened.a_b_c_1_f.should.equal(3);
  });
});

describe(`WHEN an object contains nested object that has an array as a value whose array values are object themselves`, () => {
  it(`SHOULD flatten the keys using the array indices as well as the object keys in the array values`, () => {
    // arrange
    const objectToFlatten = {
      a: {
        b: {
          c: [1, 2, 3]
        }
      }
    };

    // act
    const flattened = flatten(objectToFlatten);

    // assert
    flattened.a_b_c_0.should.equal(1);
    flattened.a_b_c_1.should.equal(2);
    flattened.a_b_c_2.should.equal(3);
  });
});

describe(`WHEN no key flattening concatenation separator is specified`, () => {
  it(`SHOULD use the default separator`, () => {
    // arrange
    const defaultSeparator = `_`;
    const objectToFlatten = {
      a: {
        b: 1
      }
    };

    // act
    const flattened = flatten(objectToFlatten);

    // assert
    const keyHasProperSeparator = Object.keys(flattened).filter(key => key = `a${defaultSeparator}b`).length === 1;
    assert(keyHasProperSeparator);
  });
});


describe(`WHEN a key flattening concatenation separator is specified`, () => {
  it(`SHOULD use the specified separator`, () => {
    // arrange
    const separator = `~`;
    const objectToFlatten = {
      a: {
        b: 1
      }
    };

    // act
    const flattened = flatten(objectToFlatten, separator);

    // assert
    const keyHasProperSeparator = Object.keys(flattened).filter(key => key = `a${separator}b`).length === 1;
    assert(keyHasProperSeparator);
  });
});

describe(`WHEN a boolean is flattened`, () => {
  it(`SHOULD return the same boolean value`, () => {
    // arrange
    const primitiveValuesToFlatten = [
      true,
      false
    ];

    // act
    const flattenedPrimitives = primitiveValuesToFlatten.map(value => flatten(value));

    // assert
    // assert is used instead of should.equal because of null and undefined.
    primitiveValuesToFlatten.forEach((expected, index) => {
      let actual = flattenedPrimitives[index];

      assert(expected === actual);
    });
  });
});

describe(`WHEN a string is flattened`, () => {
  it(`SHOULD return the same string value`, () => {
    // arrange
    const primitiveValuesToFlatten = [
      ``,
      `some string`,
      `🏻 🙇🏻 🙌🏻 🙏🏻 🚶🏻 🏃🏻 💃🏻 💪🏻 👈🏻 👉🏻 ☝️🏻 👆🏻 🖕🏻 👇🏻 ✌️🏻 🖖🏻 🤘🏻 🖐🏻 ✊🏻 ✋🏻 👊🏻 👌🏻 👍🏻 👎🏻 👋🏻 👏🏻 👐🏻 ✍🏻 💅🏻 👂🏻 👃🏻 🚣🏻 🛀🏻 🏄🏻 🏇🏻 🏊🏻 ⛹🏻 🏋🏻 🚴🏻 🚵🏻`,
      `\n\r\f\t`
    ];

    // act
    const flattenedPrimitives = primitiveValuesToFlatten.map(value => flatten(value));

    // assert
    // assert is used instead of should.equal because of null and undefined.
    primitiveValuesToFlatten.forEach((expected, index) => {
      let actual = flattenedPrimitives[index];

      assert(expected === actual);
    });
  });
});

describe(`WHEN a number is flattened`, () => {
  it(`SHOULD return the same number`, () => {
    // arrange
    const primitiveValuesToFlatten = [
      0,
      1,
      -1,
      1.4444,
      44.0,
      12.,
      -1.4444,
      -44.0
      -12.,
      1.8618464013789647e+187,
      -1.8618464013789647e+187
    ];

    // act
    const flattenedPrimitives = primitiveValuesToFlatten.map(value => flatten(value));

    // assert
    // assert is used instead of should.equal because of null and undefined.
    primitiveValuesToFlatten.forEach((expected, index) => {
      let actual = flattenedPrimitives[index];

      assert(expected === actual);
    });
  });
});

describe(`WHEN a NaN is flattened`, () => {
  it(`SHOULD return NaN`, () => {
    // arrange
    const nanBeforeFlatten = NaN;

    // act
    const flattenedNan = flatten(nanBeforeFlatten);

    // assert
    assert(Number.isNaN(flattenedNan));
  });
});

describe(`WHEN null is flattened`, () => {
  it(`SHOULD return null`, () => {
    // arrange
    const objectToFlatten = null;

    // act
    const flattenedObject = flatten(objectToFlatten);

    // assert
    assert(objectToFlatten === flattenedObject);
  });
});

describe(`WHEN undefined is flattened`, () => {
  it(`SHOULD return undefined`, () => {
    // arrange
    const objectToFlatten = undefined;

    // act
    const flattenedObject = flatten(objectToFlatten);

    // assert
    assert(flattenedObject === objectToFlatten);
  });
});
