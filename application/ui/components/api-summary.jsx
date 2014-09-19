/** @jsx React.DOM */
'use strict';

var _          = require('underscore');
var React      = require('react');
var dispatcher = require('synapse-common/lib/dispatcher');

module.exports = React.createClass({

    displayName : 'ApiSummary',

    render : function()
    {
        var title = [this.props.config.name, 'Lively Docs'];
        window.document.title = title.join(' | ');
        return (
            <div className='panel__wrapper'>
                <div className='panel'>
                    <div className='panel__synopsis' dangerouslySetInnerHTML={{__html : this.props.config.summary}} />
                </div>
            </div>
        );
    }

});