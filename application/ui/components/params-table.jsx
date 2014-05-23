/** @jsx React.DOM */
'use strict';

var React = require('react');
var Param = require('./param');

module.exports = React.createClass({

    propTypes : {
        params : React.PropTypes.array.isRequired
    },

    getParamComponent : function(param)
    {
        return <Param name={param.name}
                      required={param.required}
                      type={param.type}
                      description={param.description}
                      defaultValue={param.defaultValue} />;
    },

    render : function()
    {
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
