/* global window */
'use strict';

var React = require('react');

module.exports = React.createClass({

    displayName : 'ApiSummary',

    propTypes : {
        apiConfig : React.PropTypes.object,
        apiAssets : React.PropTypes.shape({
            logo    : React.PropTypes.string,
            summary : React.PropTypes.string
        })
    },

    render : function()
    {
        var title = [this.props.apiConfig.name, 'Lively Docs'];
        window.document.title = title.join(' | ');

        return (
            <div className='panel__wrapper'>
                <div className='panel'>
                    <div className='panel__synopsis' dangerouslySetInnerHTML={{__html : this.props.apiAssets.summary}} />
                </div>
            </div>
        );
    }

});
