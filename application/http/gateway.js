'use strict';

var ParentHttpGateway = require('synapse-common/http/gateway');

var HttpGateway = ParentHttpGateway.extend({
    resolveResponse : function(resolve, data, headers, statusCode)
    {
        resolve({
            data    : data,
            headers : headers,
            status  : statusCode
        });
    },

    handleError : function(response, responseData, resolve, reject, method, path, data, headers, options)
    {
        if (response.statusCode === 401) {
            return this.handle401(resolve, reject, method, path, responseData, headers);
        }

        resolve({
            data    : responseData,
            headers : headers,
            status  : response.statusCode
        });
    }
});

module.exports = HttpGateway;
