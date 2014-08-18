/* global jest, describe, it, expect */
'use strict';

var path = '../../application/util/nested-property-setter';

jest.dontMock(path);

var NestedPropertySetter = require(path);

describe('nested-property-setter', function() {
    describe('set', function() {
        it('sets property as expected', function() {
            var oldVal = 6,
                newVal = 7,
                expectedResult,
                object,
                result;

            object = {
                foo : {
                    bar : {
                        baz : [
                            {qux : oldVal}
                        ]
                    }
                }
            };

            expectedResult = {
                foo : {
                    bar : {
                        baz : [
                            {qux : newVal}
                        ]
                    }
                }
            };

            result = NestedPropertySetter.set(object, ['foo', 'bar', 'baz', 0, 'qux'], newVal);

            expect(result).toEqual(expectedResult);
        });
    });
});
