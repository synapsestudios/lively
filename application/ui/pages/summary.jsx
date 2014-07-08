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
            <div className='panel panel--padded'>
                <div className='panel__summary' dangerouslySetInnerHTML={{__html : this.props.summaryHtml}} />
            </div>
        );
    }

});
