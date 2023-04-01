import {
	AssertError,
	AssertUser,
	AssertInternal,
	CreateError,
	AssertContext,
	AssertExpression,
	AssertErrorConstructor,
	AssertMessage,
} from './types';

export {
	AssertContext,
	AssertExpression,
	AssertErrorConstructor,
	AssertMessage,
};

/**
 * Create and return an error object
 *
 * @param context - session context
 * @param error - error class
 * @param message - message or function to generate message
 * @param options - options
 * @returns built error object
 *
 * @example
 * ```typescript
 * throw createError(context, error, 'Custom error message', {
 *   expected: true
 * })
 * ```
 */
const createError: CreateError = (
	context,
	error,
	message,
	options = {},
): AssertError => {
	const msg = typeof message === 'function' ? message() : message;

	const instance = new error(msg);
	instance.context = context;

	if (options.expected) {
		instance.expected = true;
	}

	return instance;
};

/**
 * Run assertion, possibly throwing an error with expected flag on
 *
 * @param context - session context
 * @param expression - expression to assert
 * @param error - error class
 * @param message - message or function to generate message
 *
 * @example
 * ```typescript
 * exports.USER(context, input, errors.WorkerNoElement, 'Custom error details')
 * ```
 */
export const USER: AssertUser = (context, expression, error, message) => {
	if (expression) {
		return;
	}

	throw createError(context, error, message, {
		expected: true,
	});
};

/**
 * Run assertion, possibly throwing an error with expected flag off
 *
 * @param context - session context
 * @param expression - expression to assert
 * @param error - error class
 * @param message - message or function to generate message
 *
 * @example
 * ```typescript
 * exports.INTERNAL(context, version, errors.InvalidVersion, 'Custom error details')
 * ```
 */
export const INTERNAL: AssertInternal = (
	context,
	expression,
	error,
	message,
) => {
	if (expression) {
		return;
	}

	throw createError(context, error, message, {
		expected: false,
	});
};
