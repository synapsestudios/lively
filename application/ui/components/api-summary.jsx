/* global window */
'use strict';

var React      = require('react');

module.exports = React.createClass({

    displayName : 'ApiSummary',

    render : function()
    {
        var title = [this.props.apiConfig.name, 'Lively Docs'];
        window.document.title = title.join(' | ');
        return (
            <div className='panel__wrapper'>
                <div className='panel'>
                    <div className='panel__synopsis' dangerouslySetInnerHTML={{__html : this.props.apiConfig.summary}} />
                </div>
            </div>
        );
    }

});
