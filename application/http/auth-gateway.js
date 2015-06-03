'use strict';

var ParentAuthGateway = require('synapse-common/http/auth-gateway');
var HttpError         = require('synapse-common/http/error');

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

        // Reject if error is from token endpoint
        if (path === this.config.oauth.token) {
            reject(new HttpError(responseData, response));
        }

        resolve({
            data    : responseData,
            headers : responseHeaders,
            status  : response.statusCode
        });
    }
});

module.exports = AuthGateway;
