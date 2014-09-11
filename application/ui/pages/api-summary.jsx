/** @jsx React.DOM */
'use strict';

var _          = require('underscore');
var React      = require('react');
var dispatcher = require('synapse-common/lib/dispatcher');

var SummaryPage       = require('./summary');

module.exports = React.createClass({

    displayName : 'ApiSummary',

    render : function()
    {
        return (
            <div className='panel__wrapper'>
                <div className='panel'>
                    <div className='panel__synopsis' dangerouslySetInnerHTML={{__html : this.props.config.summary}} />
                </div>
            </div>
        );
    }

});
