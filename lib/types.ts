/*
 * Copyright (C) Balena.io - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

/**
 * Context passed to the assertion.
 */
export type AssertContext = object | null;

/**
 * Expression to assert.
 */
export type AssertExpression = any;

/**
 * A function that returns a string.
 */
export type StringGenerator = () => string;

/**
 * Either a string message or a function that returns a string message.
 */
export type AssertMessage = string | StringGenerator;

/**
 * Options used when creating an assertion error.
 */
export interface ErrorOptions {
	/** Is the error expected */
	expected?: boolean;
}

/**
 * An assertion error.
 */
export interface AssertError extends Error {
	/** Was the error expected */
	expected?: boolean;
	/** The session context associated with the error */
	context?: AssertContext;
}

/**
 * An assertion error class.
 */
export interface AssertErrorConstructor {
	/** constructor that accepts a string message */
	new (message: string): AssertError;
	readonly prototype: AssertError;
}

export type CreateError = (
	context: AssertContext,
	error: AssertErrorConstructor,
	message: AssertMessage,
	options?: ErrorOptions,
) => AssertError;

type AssertFunction = (
	context: AssertContext,
	expression: AssertExpression,
	error: AssertErrorConstructor,
	message: AssertMessage,
) => void;

export type AssertUser = AssertFunction;

export type AssertInternal = AssertFunction;
