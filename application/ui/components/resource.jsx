/** @jsx React.DOM */
'use strict';

var React  = require('react');
var Method = require('./method');

module.exports = React.createClass({

    propTypes : {
        name    : React.PropTypes.string.isRequired,
        methods : React.PropTypes.array.isRequired
    },

    getMethodComponent : function(method)
    {
        return <Method name={method.name}
                       synopsis={method.synopsis}
                       method={method.method}
                       uri={method.uri}
                       oauth={method.oauth}
                       params={method.params}
            />;
    },

    render : function()
    {
        return (
            <div className="panel__wrapper">
                <div className="panel">
                    <div className="panel__header">
                        <h2>{this.props.name}</h2>
                    </div>
                    {this.props.methods.map(this.getMethodComponent)}
                </div>
            </div>
        );
    }
});
