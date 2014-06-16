/** @jsx React.DOM */
'use strict';

var React     = require('react');

module.exports = React.createClass({
    displayName : 'ResumableUpload',

    render: function()
    {
        return (
            <button ref="uploadButton">Upload</button>
        );
    },

    componentDidMount: function()
    {
        this.props.resumableUploadCallback(this.refs.uploadButton.getDOMNode());
    }
});
