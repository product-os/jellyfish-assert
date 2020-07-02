# Jellyfish assert

This library contains custom assert-related utilities for use in Jellyfish.

The Jellyfish system distinguishes between two types of errors:
- Internal errors, which are unexpected and should be fixed as soon as possible
- User errors, which are the responsibility of the user and are usually the result of bad user usage of the system

This module provides a handy set of functions to write concise assertions for
both types of errors, and remove the amount of error handling `if` conditionals
throughout the code

# Usage

Below is an example how to use this library:

```js
const assert = require('@balena/jellyfish-assert')

assert.INTERNAL(context, version, errors.InvalidVersion, 'Custom error details')
assert.USER(context, input, errors.WorkerNoElement, 'Custom error details')
```

# Documentation

A module for running assertions in Jellyfish.


* [assert](#module_assert)
    * _static_
        * [.USER(context, expression, error, messageOrFunction)](#module_assert.USER)
        * [.INTERNAL(context, expression, error, messageOrFunction)](#module_assert.INTERNAL)
    * _inner_
        * [~createError(context, error, messageOrFunction, options)](#module_assert..createError) ⇒ <code>Object</code>

<a name="module_assert.USER"></a>

### assert.USER(context, expression, error, messageOrFunction)
**Kind**: static method of [<code>assert</code>](#module_assert)  
**Summary**: Run assertion, possibly throwing an error with expected flag on  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Object</code> | session context |
| expression | <code>Boolean</code> | expression to assert |
| error | <code>Object</code> | base error |
| messageOrFunction | <code>String</code> \| <code>function</code> | message or function to generate message |

**Example**  
```js
exports.USER(context, input, errors.WorkerNoElement, 'Custom error details')
```
<a name="module_assert.INTERNAL"></a>

### assert.INTERNAL(context, expression, error, messageOrFunction)
**Kind**: static method of [<code>assert</code>](#module_assert)  
**Summary**: Run assertion, possibly throwing an error with expected flag off  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Object</code> | session context |
| expression | <code>Boolean</code> | expression to assert |
| error | <code>Object</code> | base error |
| messageOrFunction | <code>String</code> \| <code>function</code> | message or function to generate message |

**Example**  
```js
exports.INTERNAL(context, version, errors.InvalidVersion, 'Custom error details')
```
<a name="module_assert..createError"></a>

### assert~createError(context, error, messageOrFunction, options) ⇒ <code>Object</code>
**Kind**: inner method of [<code>assert</code>](#module_assert)  
**Summary**: Create and return an error object  
**Returns**: <code>Object</code> - built error object  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Object</code> | session context |
| error | <code>Object</code> | base error |
| messageOrFunction | <code>String</code> \| <code>function</code> | message or function to generate message |
| options | <code>Object</code> | options |

**Example**  
```js
throw createError(context, error, 'Custom error message', {
  expected: true
})
```
