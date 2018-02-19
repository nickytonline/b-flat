# ♭-flat

[![Greenkeeper badge](https://badges.greenkeeper.io/nickytonline/b-flat.svg)](https://greenkeeper.io/)

[![build status](https://travis-ci.org/nickytonline/b-flat.svg?branch=master)](https://travis-ci.org/nickytonline/b-flat)
[![npm version](https://img.shields.io/npm/v/b-flat.svg?style=flat-square)](https://www.npmjs.com/package/b-flat)

A simple object flattener/unflattener. 

Installation
------------
`npm install b-flat`

Usage
-----

Via ES6 import from module
```
const { flatten, unflatten } from 'b-flat';

const flattenedObject = flatten({a: [1,2,3]});
console.log(flattenedObject);
console.log(unflatten(flattenedObject));
```

Via require
```
const flatten = require('b-flat').flatten;
const unflatten = require('b-flat').unflatten;

const flattenedObject = flatten({a: [1,2,3]});
console.log(flattenedObject);
console.log(unflatten(flattenedObject));
```
