/** @jsx React.DOM */
'use strict';

var React = require('react');

module.exports = React.createClass({

    displayName : 'Layout',

    render : function() {
        return (
            <div>
                <header>
                    <div className="header__container">
                        <div className="header__branding">
                            <a href="/">
                                <img className="branding" src="/images/logos/logomark.svg" alt="Lively" />
                            </a>
                        </div>
                    </div>
                </header>
                {this.props.children}
            </div>
        );
    }
});
