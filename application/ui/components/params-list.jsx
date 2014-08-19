/** @jsx React.DOM */
'use strict';

var React                 = require('react');
var NestedPropertyHandler = require('../../util/nested-property-handler');
var RenderParamsMixin     = require('./render-params-mixin');
var ParamTypeMixin        = require('../../util/param-type-mixin');

module.exports = React.createClass({

    displayName : 'ParameterList',

    propTypes : {
        params       : React.PropTypes.array.isRequired,
        requestBody  : React.PropTypes.object,
        updateValues : React.PropTypes.func.isRequired
    },

    mixins : [
        RenderParamsMixin,
        ParamTypeMixin
    ],

    getChangeHandler : function(path)
    {
        var values    = this.props.requestBody,
            component = this;

        return function(value)
        {
            values = NestedPropertyHandler.set(values, path, value);

            component.props.updateValues(values);
        };
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
                 {this.props.params.map(this.renderParam)}
            </table>
        );
    }
});
