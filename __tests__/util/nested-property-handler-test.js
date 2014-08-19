/* global jest, describe, it, expect */
'use strict';

var path = '../../application/util/nested-property-handler';

jest.dontMock(path);
jest.dontMock('underscore');

var NestedPropertyHandler = require(path);

describe('nested-property-handler', function() {
    describe('set', function() {
        it('sets property as expected', function() {
            var oldVal = 6,
                newVal = 7,
                expectedResult,
                object,
                result;

            object         = {foo : {bar : {baz : [{qux : oldVal}]}}};
            expectedResult = {foo : {bar : {baz : [{qux : newVal}]}}};

            result = NestedPropertyHandler.set(object, ['foo', 'bar', 'baz', 0, 'qux'], newVal);

            expect(result).toEqual(expectedResult);
        });

        it('sets property even if the path is not yet created', function() {
            var result, expectedResult;

            result         = NestedPropertyHandler.set(undefined, ['foo', 'bar', 'baz'], 'qux');
            expectedResult = {foo : {bar : {baz : 'qux'}}};

            expect(result).toEqual(expectedResult);
        });
    });

    describe('get', function() {
        it('gets property as expected', function() {
            var expectedResult = 'test',
                object,
                result;

            object = {foo : {bar : {baz : [{qux : expectedResult}]}}};
            result = NestedPropertyHandler.get(object, ['foo', 'bar', 'baz', 0, 'qux']);

            expect(result).toEqual(expectedResult);
        });

        it('returns undefined if the property does not exists', function() {
            expect(
                NestedPropertyHandler.get(undefined, ['foo', 'bar'])
            ).toEqual(undefined);

            expect(
                NestedPropertyHandler.get({foo : {}}, ['foo', 'bar', 'baz'])
            ).toEqual(undefined);
        });
    });

    describe('remove', function() {
        it('removes properties as expected', function() {
            var expectedResult, object, result;

            object         = {foo : {bar : {baz : [{qux : expectedResult}]}}};
            expectedResult = {foo : {bar : {}}};

            result = NestedPropertyHandler.remove(object, ['foo', 'bar', 'baz']);

            expect(result).toEqual(expectedResult);
        });
    });
});
