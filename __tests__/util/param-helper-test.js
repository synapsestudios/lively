'use strict';

var path = '../../application/util/param-helper';

jest.dontMock(path);
jest.dontMock('underscore');

ParamHelper = require(path);

/**
 * Include data provider helper
 */
var dataProviderPath = '../../node_modules/synapse-common/lib/test-data-provider';
jest.dontMock(dataProviderPath);
var using = require(dataProviderPath);

var variousStrings = ['foo', 'bar', 'really_long_string', '!@#$%^&*()_+-={}'];

var stringParam = {
    name         : 'string_param',
    type         : 'string',
    defaultValue : 'foo'
};

var enumParam = {
    name       : 'enum_param',
    type       : 'enum',
    enumValues : ['bar', 'baz']
};

var hashParam = {
    name   : 'hash_param',
    type   : 'hash',
    params : [
        {
            name : 'a',
            type : 'string',
            defaultValue : 'a default'
        },
        {
            name : 'b',
            type : 'string'
        }
    ]
};

describe('param-helper', function() {
    describe('getArrayType', function() {
        using('various strings', variousStrings, function(string) {
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
        using('various strings', variousStrings, function(string) {
            it('returns true as long as the string begins with "array"', function() {
                var type = 'array' + string;

                expect(ParamHelper.isArrayParam(type)).toBe(true);
            });
        });
    });

    describe('getDefaultValuesForParams', function() {
        it('returns an object with properties for each param that have the correct defaults', function() {
            var params = [
                stringParam,
                enumParam,
                hashParam
            ];

            expect(
                ParamHelper.getDefaultValuesForParams(params)
            ).toEqual(
                {
                    string_param : 'foo',
                    enum_param   : 'bar',
                    hash_param   : {
                        a : 'a default',
                        b : null
                    }
                }
            );
        });
    });

    describe('getDefaultValueForParam', function() {
        it('returns the defaultValue property if defined', function() {
            var defaultValue = 'foo',
                param        = {defaultValue : defaultValue};

            expect(
                ParamHelper.getDefaultValueForParam(param)
            ).toBe(defaultValue);
        });

        it('returns an empty array if param is an array param', function() {
            var param = {type : 'array'};

            expect(
                ParamHelper.getDefaultValueForParam(param)
            ).toEqual([]);
        });

        it('returns the first enumerated value if param is an enum param', function() {
            var param = {
                type       : 'enum',
                enumValues : ['foo', 'bar', 'baz']
            };

            expect(
                ParamHelper.getDefaultValueForParam(param)
            ).toBe('foo');
        });

        it('returns an object whose properties have the correct defaults if param is a hash', function() {
            var param = {
                type   : 'hash',
                params : [
                    stringParam,
                    enumParam
                ]
            };

            expect(
                ParamHelper.getDefaultValueForParam(param)
            ).toEqual(
                {
                    string_param : 'foo',
                    enum_param   : 'bar'
                }
            );
        });

        it('returns null if the param type is not supported', function() {
            var param = {type : 'some-unsupported-type'};

            expect(
                ParamHelper.getDefaultValueForParam(param)
            ).toBe(null);
        });
    });
});
