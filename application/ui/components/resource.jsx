/** @jsx React.DOM */
'use strict';

var React  = require('react');
var Method = require('./method');

module.exports = React.createClass({

    displayName : 'Resource',

    propTypes : {
        name    : React.PropTypes.string.isRequired,
        methods : React.PropTypes.array.isRequired
    },

    getMethodComponent : function(method)
    {
        return <Method key={method.name}
                       name={method.name}
                       synopsis={method.synopsis}
                       method={method.method}
                       uri={method.uri}
                       oauth={method.oauth}
                       params={method.params}
                       oauthStore={this.props.oauthStore} />;
    },

    render : function()
    {
        return (
            <div className="panel">
                <div className='panel__header'>
                    <h2>{this.props.name}</h2>
                </div>
                {this.props.methods.map(this.getMethodComponent)}
            </div>
        );
    }
});
