'use strict';

module.exports = {
    set : function(object, path, value)
    {
        if (path.length === 0) {
            return value;
        }

        var nextSegment = path.shift();

        object[nextSegment] = this.set(object[nextSegment], path, value);

        return object;
    }
};
