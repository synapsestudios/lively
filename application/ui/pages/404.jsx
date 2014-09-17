/** @jsx React.DOM */
'use strict';

var React = require('react');

module.exports = React.createClass({

    displayName : '404',

    render : function() {
        return (
            <div className='panel__wrapper panel__wrapper--full-width'>
                <div className='panel'>
                    <h1>404 Not Found</h1>
                </div>
            </div>
        );
    }
});
