/** @jsx React.DOM */
'use strict';

var React      = require('react');
var Param      = require('./param');
var ArrayParam = require('./array-param');

module.exports = React.createClass({

    displayName : 'ParameterList',

    propTypes : {
        params : React.PropTypes.array.isRequired
    },

    getParamComponent : function(param)
    {
        if (param.type.substring(0, 5) === 'array') {
            return this.getArrayParamComponent(param);
        }

        return <Param ref={param.name}
                      key={param.name}
                      name={param.name}
                      required={param.required}
                      type={param.type}
                      description={param.description}
                      defaultValue={param.defaultValue}
                      enumValues={param.enumValues} />;
    },

    getArrayParamComponent : function(param)
    {
        var arrayType = param.type.match(/\[(.*?)\]/);

        arrayType = (arrayType === null) ? 'string' : arrayType[0];

        return <ArrayParam ref={param.name}
                  key={param.name}
                  name={param.name}
                  required={param.required}
                  type={arrayType}
                  description={param.description}
                  defaultValue={param.defaultValue}
                  enumValues={param.enumValues} />;
    },

    getValues : function()
    {
        var self   = this,
            values = {};

        this.props.params.forEach(function(param) {
            values[param.name] = self.refs[param.name].getValue();
        });

        return values;
    },

    render : function()
    {
        if (this.props.params.length === 0) {
            return <div />;
        }

        return (
            <table>
                <tr>
                    <th>Parameter</th>
                    <th>Value</th>
                    <th>Type</th>
                    <th>Description</th>
                </tr>
                {this.props.params.map(this.getParamComponent)}
            </table>
        );
    }
});
