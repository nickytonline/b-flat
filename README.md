# ♭-flat

[![build status](https://travis-ci.org/nickytonline/b-flat.svg?branch=master)](https://travis-ci.org/nickytonline/b-flat)
[![npm version](https://img.shields.io/npm/v/b-flat.svg?style=flat-square)](https://www.npmjs.com/package/b-flat)

A simple object flattener.

Installation
------------
`npm install b-flat`

Usage
-----

Via ES6 import from module
```
const flatten from 'b-flat';

flatten({ a: 1, b: { c: `Hello` } }); // { a: 1, b_c: "Hello" }
```

Via require
```
const flatten = require('b-flat').default;

flatten({ a: 1, b: { c: `Hello` } });
```
