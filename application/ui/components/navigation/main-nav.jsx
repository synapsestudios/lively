/** @jsx React.DOM */
'use strict';

var React = require('react');

module.exports = React.createClass({

    displayName : 'MainNav',

    render : function() {
        var logo = this.props.logo ? this.props.logo : '/images/logos/logomark.svg';

        return (
            <div className="main-nav__wrapper">
                <div className="header__back-link">
                    <a className="back-link" href="/">&lt; Back to API List</a>
                </div>
                <div className="header__branding">
                    <a href={'/' + this.props.slug}>
                        <img className="branding" src={logo} alt={this.props.name} />
                    </a>
                </div>
                <ul className="main-nav">
                    <a className="main-nav__link" onClick=""><li className="main-nav__item main-nav__item--bold">Overview</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Media Types</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">OAuth</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">OAuth Authorizations API</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">OAuth Authentication Methods</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Troubleshooting</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Versions</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item main-nav__item--bold">Activity</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Events</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Event Types</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Feeds</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Notifications</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Starring</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Watching</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item main-nav__item--bold">Gists</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Comments</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item main-nav__item--bold">Git Data</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Blobs</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Commits</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">References</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Tags</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Trees</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item main-nav__item--bold">Issues</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Assignees</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Comments</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Events</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Labels</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Milestones</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item main-nav__item--bold">Miscellaneous</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Emojis</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Gitignore</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Markdown</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Meta</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Rate Limit</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item main-nav__item--bold">Organizations</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Members</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Teams</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item main-nav__item--bold">Pull Requests</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Review Comments</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item main-nav__item--bold">Repositories</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Collaborators</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Comments</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Commits</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Contents</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Deploy Keys</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Deployments</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Downloads</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Forks</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Hooks</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Mergins</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Pages</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Releases</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Statistics</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Statuses</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item main-nav__item--bold">Search</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Repositories</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Code</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Issues</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Users</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Legacy Search</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item main-nav__item--bold">Users</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Emails</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Followers</li></a>
                    <a className="main-nav__link" onClick=""><li className="main-nav__item">Public Keys</li></a>
                </ul>

            </div>
        );
    }
});
