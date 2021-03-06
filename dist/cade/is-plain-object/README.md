# is-plain-object [![NPM version](https://badge.fury.io/js/is-plain-object.svg)](http://badge.fury.io/js/is-plain-object)

> Returns true if an object was created by the `Object` constructor.

Use [isobject](https://github.com/jonschlinkert/isobject) if you only want to check if the value is an object and not an array or null.

## Install

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i is-plain-object --save
```

## Usage

```js
var isPlainObject = require('is-plain-object');
```

**true** when created by the `Object` constructor.

```js
isPlainObject(Object.create({}));
//=> true
isPlainObject(Object.create(Object.prototype));
//=> true
isPlainObject({foo: 'bar'});
//=> true
isPlainObject({});
//=> true
```

**false** when not created by the `Object` constructor.

```js
isPlainObject(1);
//=> false
isPlainObject(['foo', 'bar']);
//=> false
isPlainObject([]);
//=> false
isPlainObject(new Foo);
//=> false
isPlainObject(null);
//=> false
isPlainObject(Object.create(null));
//=> false
```

## Related projects

* [assign-deep](https://github.com/jonschlinkert/assign-deep): Deeply assign the enumerable properties of source objects to a destination object.
* [extend-shallow](https://github.com/jonschlinkert/extend-shallow): Extend an object with the properties of additional objects. node.js/javascript util.
* [for-own](https://github.com/jonschlinkert/for-own): Iterate over the own enumerable properties of an object, and return an object with properties… [more](https://github.com/jonschlinkert/for-own)
* [for-in](https://github.com/jonschlinkert/for-in): Iterate over the own and inherited enumerable properties of an objecte, and return an object… [more](https://github.com/jonschlinkert/for-in)
* [is-plain-object](https://github.com/jonschlinkert/is-plain-object): Returns true if an object was created by the `Object` constructor.
* [isobject](https://github.com/jonschlinkert/isobject): Returns true if the value is an object and not an array or null.
* [kind-of](https://github.com/jonschlinkert/kind-of): Get the native type of a value.
* [merge-deep](https://github.com/jonschlinkert/merge-deep): Recursively merge values in a javascript object.

## Running tests

Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Author

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2015 Jon Schlinkert
Released under the MIT license.

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on May 28, 2015._
