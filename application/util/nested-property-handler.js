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
    },

    get : function(object, path)
    {
        var pathCopy = path.slice(),
            item     = object,
            nextSegment;

        while (pathCopy.length > 0) {
            nextSegment = pathCopy.shift();

            item = item[nextSegment];
        }

        return item;
    }
};
