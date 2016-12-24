var assert = require('assert');

describe('Promise', function() {

	it('expects a function as a parameter', function() {
		const func = function() {};
		assert.doesNotThrow( () => { new Promise(func); } );
	});

	it('throws an error if wrong parameter type', function() {
		const parameter = "foo";
		assert.throws( () => { new Promise(parameter); } );
	});

	it('throws an error if no parameter passed', function() {
		assert.throws( () => { new Promise(); } );
	});

});