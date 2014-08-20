'use strict';

var path = '../../application/util/param-helper';

jest.dontMock(path);

ParamHelper = require(path);

/**
 * Include data provider helper
 */
var dataProviderPath = '../../node_modules/synapse-common/lib/test-data-provider';
jest.dontMock(dataProviderPath);
var using = require(dataProviderPath);

var VARIOUS_STRINGS = ['foo', 'bar', 'really_long_string', '!@#$%^&*()_+-={}'];

describe('param-helper', function() {
    describe('getArrayType', function() {
        using('various strings', VARIOUS_STRINGS, function(string) {
            it('returns the string inside the brackets of "array[...]"', function() {
                var arrayType = 'array[' + string + ']';

                expect(
                    ParamHelper.getArrayType(arrayType)
                ).toBe(
                    string
                );
            });
        });
    });

    describe('isArrayParam', function() {
        using('various strings', VARIOUS_STRINGS, function(string) {
            it('returns true as long as the string begins with "array"', function() {
                var type = 'array' + string;

                expect(ParamHelper.isArrayParam(type)).toBe(true);
            });
        });
    });
});
