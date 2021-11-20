import * as assert from '../lib/index';
import { AssertError } from '../lib/types';

class TestError implements AssertError {
	name: string = 'TestError';
	message: string;
	expected: boolean = false;

	constructor(message: string) {
		this.message = message;
	}
}

test('.USER() does not throw error on passing assertion', () => {
	assert.USER({}, true, TestError, 'Custom error details');
});

test('.INTERNAL() does not throw error on passing assertion', () => {
	assert.INTERNAL({}, true, TestError, 'Custom error details');
});

test('.USER() throws an error on failing assertion', () => {
	try {
		assert.USER({}, false, TestError, 'Custom error details');
	} catch (error) {
		expect(error).toBeTruthy();
	}
});

test('.INTERNAL() throws an error on failing assertion', () => {
	try {
		assert.INTERNAL({}, false, TestError, 'Custom error details');
	} catch (error) {
		expect(error).toBeTruthy();
	}
});

test('.USER() thrown error has expected flag on', () => {
	try {
		assert.USER({}, false, TestError, 'Custom error details');
	} catch (error: any) {
		expect(error.expected).toBe(true);
	}
});

test('.INTERNAL() thrown error has expected flag off', () => {
	try {
		assert.INTERNAL({}, false, TestError, 'Custom error details');
	} catch (error: any) {
		expect(error.expected).toBe(false);
	}
});
