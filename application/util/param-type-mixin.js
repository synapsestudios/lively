'use strict';

module.exports = {
    isArrayParam : function(type)
    {
        return type.substring(0, 5) === 'array';
    }
};
