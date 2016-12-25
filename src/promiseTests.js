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

	describe('resolve', function() {

		it('resolve a promise by calling the resolve function, the first argument of the executor', function(done) {
			let promise = new Promise((resolve) => {
				setTimeout(resolve, 250);
			});

			promise
				.then(() => done())
				.catch(() => done(new Error('Expected promise to be resolved.')));
		});

		it('resolve accepts a value, which is passed to the \"then\" callback', function(done) {
			let promise = new Promise((resolve) => {
				setTimeout(() => { resolve("foo") }, 250);
			});

			promise
				.then(value => { assert.deepEqual("foo", value); done(); } )
				.catch(() => done(new Error('Expected promise to be resolved with value of \"foo\".')));
		});

	});

	describe('reject', function() {

		it('reject a promise by calling reject function, the second parameter of the executor', function(done) {
			let promise = new Promise((resolve, reject) => {
				setTimeout(reject, 250);
			});

			promise
				.then(() => done(new Error('Expected promise to be rejected.')))
				.catch(() => done());
		});

		it('reject accepts a value, which is passed to the \"catch\" callback', function(done) {
			let promise = new Promise((resolve, reject) => {
				setTimeout(() => { reject("bar") }, 250);
			});
			promise
				.then(() => done(new Error('Expected promise to be rejected with value of \"bar\".')))
				.catch(value => { assert.deepEqual("bar", value); done(); } );
		});

	});

});