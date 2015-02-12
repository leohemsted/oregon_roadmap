var Resource = React.createClass({
    render: function() {
        return (
            TODO
        );
    },
    getInitialState: function() {
        return {
            name: '',
            job: '',
            velocity: Math.random() * (RESOURCE_MAX_VELOCITY - RESOURCE_MIN_VELOCITY) + RESOURCE_MIN_VELOCITY
        }
    }
});
var Team = React.createClass({
    render: function() {
        return null;
    },
    getInitialState: function() {
        return {
            resources: [],
            morale: Math.random() * (MORALE_MAX - MORALE_MIN) + MORALE_MIN,
            story_points: 0,
            stories_completed: 0
        }
    }
});

var Game = React.createClass({
    render: function() {
        return (
            <b>Welcome to the game! (version {this.props.version})</b>
        );
    }
});

React.renderComponent(<Game version={VERSION} />, document.getElementById('container'));