/** @jsx React.DOM */
'use strict';

var React    = require('react');

module.exports = React.createClass({

    displayName : 'SummaryPage',

    propTypes : {
        summaryHtml : React.PropTypes.string
    },

    render : function()
    {
        return (
            <div className="panel summary__panel" dangerouslySetInnerHTML={{__html : this.props.summaryHtml}} />
        );
    }

});
