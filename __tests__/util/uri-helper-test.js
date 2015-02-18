/* global jest, describe, it, expect */
'use strict';

var path = '../../application/util/uri-helper';

jest.dontMock(path);
jest.dontMock('underscore');

var UriHelper = require(path);

describe('uri-helper', function() {
    describe('isParameterNameInUri', function() {
        it('checks if parameter name is tokenized in uri string', function() {
            var uri,
                paramName,
                result;

            uri = '/hello/there/:id';
            paramName = 'id';
            result = UriHelper.isParameterNameInUri(paramName, uri);

            expect(result).toEqual(true);
        });

        it('does not match if the token extends beyond the parameter name', function() {
            var uri,
                paramName,
                result;

            uri = '/hello/there/:idOfSomething';
            paramName = 'id';
            result = UriHelper.isParameterNameInUri(paramName, uri);

            expect(result).toEqual(false);
        });
    });

    describe('injectValueIntoUri', function() {
        it('injects parameter value into uri', function() {
            var uri,
                paramName,
                value,
                expectedResult,
                result;

            expectedResult = '/hello/there/test';
            uri = '/hello/there/:id';
            paramName = 'id';
            value = 'test';

            result = UriHelper.injectValueIntoUri(paramName, uri, value);

            expect(result).toEqual(expectedResult);
        });

        it('does not inject parameter value into uri if token does not match', function() {
            var uri,
                paramName,
                value,
                result;

            uri = '/hello/there/:idOfSomethingElse';
            paramName = 'id';
            value = 'test';

            result = UriHelper.injectValueIntoUri(paramName, uri, value);

            expect(result).toEqual(uri);
        });
    });
});
