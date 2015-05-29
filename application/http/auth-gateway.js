'use strict';

var ParentAuthGateway = require('synapse-common/http/auth-gateway');

var AuthGateway = ParentAuthGateway.extend({

    handleSuccess : function(resolve, data, headers, statusCode)
    {
        resolve({
            data    : data,
            headers : headers,
            status  : statusCode
        });
    },

    handleError : function(
        response,
        responseData,
        resolve,
        reject,
        method,
        path,
        data,
        requestHeaders,
        options,
        responseHeaders
    ) {
        if (response.statusCode === 401) {
            return this.handle401(resolve, reject, method, path, data, requestHeaders);
        }

        resolve({
            data    : responseData,
            headers : responseHeaders,
            status  : response.statusCode
        });
    }
});

module.exports = AuthGateway;
