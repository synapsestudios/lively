/** @jsx React.DOM */
'use strict';

var React = require('react');

module.exports = React.createClass({

    displayName : 'ApiList',

    render : function()
    {
        var links = this.props.list.map(function(api) {

            return (
                <a className="panel__link fa fa-github" href={'/' + api.slug}>
                    {api.name}
                </a>
            );
        });

        return (
            <div className='panel__wrapper panel__wrapper--full-width'>
                <div className='panel'>
                    <div className='panel__header'>
                        <h2>API List</h2>
                    </div>
                    {links}
                </div>
            </div>
        );
    }

});
