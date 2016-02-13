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
