/** @jsx React.DOM */
'use strict';

var React     = require('react');

module.exports = React.createClass({
    displayName : 'ResumableUpload',

    // Not relevant for this input type, but it needs to return something
    getValue: function()
    {
        return null;
    },

    render: function()
    {
        return (
            <button ref='uploadButton'>{'Upload'}</button>
        );
    },

    componentDidMount: function()
    {
        this.props.resumableUploadCallback(this.refs.uploadButton.getDOMNode());
    }
});
