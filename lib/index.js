/*
 * Copyright (C) Balena.io - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

const _ = require('lodash')

/**
 * A module for running assertions in Jellyfish.
 *
 * @module assert
 */

/**
 * @summary Create and return an error object
 * @function
 *
 * @param {Object} context - session context
 * @param {Object} error - base error
 * @param {String|Function} messageOrFunction - message or function to generate message
 * @param {Object} options - options
 * @returns {Object} built error object
 *
 * @example
 * throw createError(context, error, 'Custom error message', {
 *   expected: true
 * })
 */
const createError = (context, error, messageOrFunction, options = {}) => {
	const message = _.isFunction(messageOrFunction) ? messageOrFunction() : messageOrFunction

	// eslint-disable-next-line new-cap
	const instance = new error(message)
	instance.context = context

	if (options.expected) {
		instance.expected = true
	}

	return instance
}

/**
 * @summary Run assertion, possibly throwing an error with expected flag on
 * @function
 *
 * @param {Object} context - session context
 * @param {Boolean} expression - expression to assert
 * @param {Object} error - base error
 * @param {String|Function} messageOrFunction - message or function to generate message
 *
 * @example
 * exports.USER(context, input, errors.WorkerNoElement, 'Custom error details')
 */
exports.USER = (context, expression, error, messageOrFunction) => {
	if (expression) {
		return
	}

	throw createError(context, error, messageOrFunction, {
		expected: true
	})
}

/**
 * @summary Run assertion, possibly throwing an error with expected flag off
 * @function
 *
 * @param {Object} context - session context
 * @param {Boolean} expression - expression to assert
 * @param {Object} error - base error
 * @param {String|Function} messageOrFunction - message or function to generate message
 *
 * @example
 * exports.INTERNAL(context, version, errors.InvalidVersion, 'Custom error details')
 */
exports.INTERNAL = (context, expression, error, messageOrFunction) => {
	if (expression) {
		return
	}

	throw createError(context, error, messageOrFunction, {
		expected: false
	})
}
