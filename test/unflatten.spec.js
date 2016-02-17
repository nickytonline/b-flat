import chai from 'chai';
import unflatten from '../src/unflatten';

const assert = chai.assert;

chai.should();

describe(`WHEN a flat object is unflattened`, () => {
  it(`SHOULD unflatten`, () => {
    // arrange
    const flattenedObject = {
      a_b_c: 1,
      a_b_d: true,
      a_b_e: `Hello!`,
      b: `One Level`,
      c_d: false
    };

    // act
    const unflattedObject = unflatten(flattenedObject);

    // assert
    unflattedObject.a.b.c.should.equal(flattenedObject.a_b_c);
    unflattedObject.a.b.d.should.equal(flattenedObject.a_b_d);
    unflattedObject.a.b.e.should.equal(flattenedObject.a_b_e);
    unflattedObject.c.d.should.equal(flattenedObject.c_d);
    unflattedObject.b.should.equal(flattenedObject.b);
  });
});

describe(`WHEN a flat object that contains a flattened array is unflattened`, () => {
  it(`SHOULD unflatten as an array.`, () => {
    // arrange
    const flattenedObject = {
      a_0: `yo`,
      a_1: `bye`,
      a_2: `Hello!`
    };

    // act
    const unflattedObject = unflatten(flattenedObject);

    // assert
    assert(Array.isArray(unflattedObject.a));
    unflattedObject.a[0].should.equal(flattenedObject.a_0);
    unflattedObject.a[1].should.equal(flattenedObject.a_1);
    unflattedObject.a[2].should.equal(flattenedObject.a_2);
  });
});

describe(`WHEN a flat object that contains a flattened array two levels deep is unflattened`, () => {
  it(`SHOULD unflatten as an array on the property that is two levels deep.`, () => {
    // arrange
    const flattenedObject = {
      a_b_0: `yo`,
      a_b_1: `bye`,
      a_b_2: `Hello!`
    };

    // act
    const unflattedObject = unflatten(flattenedObject);

    // assert
    assert(Array.isArray(unflattedObject.a.b));
    unflattedObject.a.b[0].should.equal(flattenedObject.a_b_0);
    unflattedObject.a.b[1].should.equal(flattenedObject.a_b_1);
    unflattedObject.a.b[2].should.equal(flattenedObject.a_b_2);
  });
});

describe(`WHEN no separator is specified`, () => {
  it(`SHOULD use the default separator _`, () => {
    // arrange
    const flattenedObject = {
      a_b: `yo`
    };

    // act
    const unflattenedObject = unflatten(flattenedObject);

    // assert
    assert(`a` in unflattenedObject);
    assert(`b` in unflattenedObject[`a`]);
    unflattenedObject.a.b.should.equal(flattenedObject.a_b);
  });
});

describe(`WHEN a separator is specified`, () => {
  it(`SHOULD use the specified separator`, () => {
    // arrange
    const separator = `~~__~~`;
    const flattenedObject = {};
    const key = `a${separator}b`;

    flattenedObject[key] = `yo`;

    // act
    const unflattenedObject = unflatten(flattenedObject, separator);

    // assert
    assert(`a` in unflattenedObject);
    assert(`b` in unflattenedObject[`a`]);
    unflattenedObject.a.b.should.equal(flattenedObject[key]);
  });
});

describe(`WHEN a flattened object constains undefined as a value`, () => {
  it(`SHOULD unflatten the key and set it's value to undefined.`, () => {
    // arrange
    const flattenedObject = {
      a_b_c: undefined
    };

    // act
    const unflattedObject = unflatten(flattenedObject);

    // assert
    assert(`a` in unflattedObject);
    assert(`b` in unflattedObject.a);
    assert(`c` in unflattedObject.a.b);
    assert(unflattedObject.a.b.c === undefined);
  });
});

describe(`WHEN a flattened object constains null as a value`, () => {
  it(`SHOULD unflatten the key and set it's value to null.`, () => {
    // arrange
    const flattenedObject = {
      a_b_c: null
    };

    // act
    const unflattedObject = unflatten(flattenedObject);

    // assert
    assert(`a` in unflattedObject);
    assert(`b` in unflattedObject.a);
    assert(`c` in unflattedObject.a.b);
    assert(unflattedObject.a.b.c === null);
  });
});
