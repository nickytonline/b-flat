# ♭-flat

[![build status](https://travis-ci.org/nickytonline/b-flat.svg?branch=master)](https://travis-ci.org/nickytonline/b-flat)
[![npm version](https://img.shields.io/npm/v/b-flat.svg?style=flat-square)](https://www.npmjs.com/package/b-flat)

A simple object flattener. Objects that are n levels deep get their keys concatenated using a separator (default separator is "_") and all key/value pairs end up at the top level of the object.

e.g.

```
{
  a: 1
  b: {
    c: 2,
    d: {
      e: 3
    }    
  }
}
```

becomes

```
{
  a: 1,
  b_c: 2,
  b_d_e: 3
}
```
