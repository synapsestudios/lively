'use strict';

module.exports = {
    isArray : function(type)
    {
        return type.substring(0, 5) === 'array';
    },

    isHash : function(type)
    {
        return type === 'hash';
    }
};
