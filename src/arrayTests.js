var assert = require('assert');

describe('Array', function() {

	describe('Array.from() - creates a new Array instance from an array-like or iterable object', function() {

		it('call "Array.from" with a string', function() {
			const fooString = "foo";
			assert.deepEqual(["f", "o", "o"], Array.from(fooString));
		});

		it('call "Array.from" with a set', function() {
			const set = new Set(["foo", "bar", 0, 1]);
			assert.deepEqual(["foo", "bar", 0, 1], Array.from(set));
		});

		it('call "Array.from" with a map', function() {
			const map = new Map([["foo", "bar"], [0, 1]]);
			assert.deepEqual([["foo", "bar"], [0, 1]], Array.from(map));
		});

		it('call "Array.from" with an array-like object (arguments)', function() {
			let f = function() {
				assert.deepEqual(["foo", "bar", 0, 1], Array.from(arguments));
			}

			f("foo", "bar", 0 ,1);
		});

		it('modify an elements value using a map function as the second parameter', function() {
			const array = ["foo", "bar"];
			assert.deepEqual(["FOO", "BAR"], Array.from(array, value => value.toUpperCase()));
		});

		it('get an arrayLikes key using a map function as the second parameter', function() {
			const arrayLike = { 0: "foo", 1: "bar", length: 2};
			assert.deepEqual(["1 = FOO", "2 = BAR"], Array.from(arrayLike, (value, key) => key + 1 + " = " + value.toUpperCase()));
		});

		it('throws an error if no parameter passed', function() {
			assert.throws(() => { Array.from(); });
		});

		it('throws an error if null or undefined parameter passed', function() {
			assert.throws(() => { Array.from(null); });
		});

	});

	describe('Array.of() - creates a new Array instance with a variable number of arguments, regardless of number or type of the arguments', function() {

		it('shouldnt be confused with the Array constructor, which creates an array of x length', function() {
			const array = Array.of("foo");
			assert.deepEqual(["foo"], array);
		});

		it('puts all arguments into an array', function() {
			const array = Array.of("foo", "bar", 0 , 1);
			assert.deepEqual(["foo", "bar", 0, 1], array);
		});

	});

	describe('Array.prototype.copyWithin() - shallow copies part of an array to another location in the same array', function() {

		describe('target parameter', function() {

			it('modifies an array without changing its length', function() {
				let array = ["foo", "bar", 0 , 1];
				assert.deepEqual(["foo", "bar", "foo", "bar"], array.copyWithin(2));
			});

			it('if negative it counts from the end of the array', function() {
				let array = ["foo", "bar", 0 , 1];
				assert.deepEqual(["foo", "bar", "foo", "bar"], array.copyWithin(-2));
			});

			it('if greater then the length nothing will be copied', function() {
				let array = ["foo", "bar", 0 , 1];
				assert.deepEqual(["foo", "bar", 0 , 1], array.copyWithin(5));
			});

		});

		describe('start parameter', function() {

			it('index at which to start copying elements from', function() {
				let array = ["foo", "bar", 0 , 1];
				assert.deepEqual([0, 1, 0, 1], array.copyWithin(0, 2));
			});

			it('if negative it counts from the end of the array', function() {
				let array = ["foo", "bar", 0 , 1];
				assert.deepEqual([0, 1, 0, 1], array.copyWithin(0, -2));
			});

			it('if target is after start the copied elements will be trimmed to the length', function() {
				let array = ["foo", "bar", 0 , 1];
				assert.deepEqual(["foo", "bar", "bar", 0], array.copyWithin(2, 1));
			});

		});

		describe('end parameter', function() {

			it('index at which to end copying elements from', function() {
				let array = ["foo", "bar", 0 , 1];
				assert.deepEqual(["bar", "bar", 0, 1], array.copyWithin(0, 1, 2));
			});

			it('if negative it counts from the end of the array', function() {
				let array = ["foo", "bar", 0 , 1];
				assert.deepEqual(["bar", 0, 0, 1], array.copyWithin(0, 1, -1));
			});
			
		});
		
	});

	describe('Array.prototype.fill() - fills all the elements of an array from a start index to an end index', function() {

		describe('value parameter', function() {

			it('modifies the original arrays elements', function() {
				let array = ["foo", "bar", 0 , 1];
				assert.deepEqual(["foo", "foo", "foo", "foo"], array.fill("foo"));
			});

		});

		describe('start parameter', function() {

			it('index at which to start filling elements', function() {
				let array = ["foo", "bar", 0 , 1];
				assert.deepEqual(["foo", "bar", "foo" , "foo"], array.fill("foo", 2));
			});

			it('if negative it counts from the end of the array', function() {
				let array = ["foo", "bar", 0 , 1];
				assert.deepEqual(["foo", "bar", "foo" , "foo"], array.fill("foo", -2));
			});

		});

		describe('end parameter', function() {

			it('index at which to end filling elements', function() {
				let array = ["foo", "bar", 0 , 1];
				assert.deepEqual(["foo", "foo", 0 , 1], array.fill("foo", 1, 2));
			});

			it('if negative it counts from the end of the array', function() {
				let array = ["foo", "bar", 0 , 1];
				assert.deepEqual(["foo", "foo", 0 , 1], array.fill("foo", 1, -2));
			});
			
		});

	});

	describe('Array.prototype.find() - returns the first element in the array that satisfies the provided testing function', function() {

		describe('testing function - first parameter element', function() {

			it('returns the first matching value', function() {
				let array = ["foo", "bar", 0, 1];
				assert.deepEqual("foo", array.find(element => typeof element === "string"));
			});

			it('returns undefined if no match', function() {
				let array = ["foo", "bar", 0, 1];
				assert.deepEqual(void 0, array.find(element => element === "foobar"));
			});

		});

		describe('testing function - second parameter index', function() {

			it('returns the first matching value', function() {
				let array = ["foo", "bar", 0, 1];
				assert.deepEqual("bar", array.find((element, index) => index > 0));
			});

			it('returns undefined if no match', function() {
				let array = ["foo", "bar", 0, 1];
				assert.deepEqual(void 0, array.find((element, index)=> index > 5));
			});

		});

		describe('testing function - third parameter array', function() {

			it('returns the first matching value', function() {
				let array = ["foo", "bar", 0, 1];
				assert.deepEqual("foo", array.find((element, index, array) => element === array[0]));
			});

			it('returns undefined if no match', function() {
				let array = ["foo", "bar", 0, 1];
				assert.deepEqual(void 0, array.find((element, index, array)=> index > array.length));
			});

		});

	});

	describe('Array.prototype.findIndex() - returns an index of the first element in the array that satisfies the provided testing function', function() {

		describe('testing function - first parameter element', function() {

			it('returns the index of the first matching value', function() {
				let array = ["foo", "bar", 0, 1];
				assert.deepEqual(0, array.findIndex(element => typeof element === "string"));
			});

			it('returns -1 if no match', function() {
				let array = ["foo", "bar", 0, 1];
				assert.deepEqual(-1, array.findIndex(element => element === "foobar"));
			});

		});

		describe('testing function - second parameter index', function() {

			it('returns the index of the first matching value', function() {
				let array = ["foo", "bar", 0, 1];
				assert.deepEqual(1, array.findIndex((element, index) => index > 0));
			});

			it('returns -1 if no match', function() {
				let array = ["foo", "bar", 0, 1];
				assert.deepEqual(-1, array.findIndex((element, index)=> index > 5));
			});

		});

		describe('testing function - third parameter array', function() {

			it('returns the index of the first matching value', function() {
				let array = ["foo", "bar", 0, 1];
				assert.deepEqual(0, array.findIndex((element, index, array) => element === array[0]));
			});

			it('returns -1 if no match', function() {
				let array = ["foo", "bar", 0, 1];
				assert.deepEqual(-1, array.findIndex((element, index, array)=> index > array.length));
			});

		});

	});

});