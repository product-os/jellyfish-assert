/*
 * Copyright (C) Balena.io - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

const ava = require('ava')
const assert = require('./index')
const typedErrors = require('typed-errors')

const exampleError = typedErrors.makeTypedError('InvalidAction')

ava('.USER() does not throw error on passing assertion', (test) => {
	assert.USER({}, true, exampleError, 'Custom error details')
	test.pass()
})

ava('.INTERNAL() does not throw error on passing assertion', (test) => {
	assert.INTERNAL({}, true, exampleError, 'Custom error details')
	test.pass()
})

ava('.USER() throws an error on failing assertion', (test) => {
	try {
		assert.USER({}, false, exampleError, 'Custom error details')
	} catch (error) {
		test.pass()
	}
})

ava('.INTERNAL() throws an error on failing assertion', (test) => {
	try {
		assert.INTERNAL({}, false, exampleError, 'Custom error details')
	} catch (error) {
		test.pass()
	}
})

ava('.USER() thrown error has expected flag on', (test) => {
	try {
		assert.USER({}, false, exampleError, 'Custom error details')
	} catch (error) {
		if (error.expected) {
			test.pass()
		}
	}
})

ava('.INTERNAL() thrown error has expected flag off', (test) => {
	try {
		assert.INTERNAL({}, false, exampleError, 'Custom error details')
	} catch (error) {
		if (!error.expected) {
			test.pass()
		}
	}
})
