var Resource = React.createClass({
    render: function() {
        return 'TODO';
    },
    getInitialState: function() {
        return {
            name: '',
            job: '',
            velocity: Math.random() * (RESOURCE_MAX_VELOCITY - RESOURCE_MIN_VELOCITY) + RESOURCE_MIN_VELOCITY
        }
    },
    setName: function(name) {
        this.name = name;
    },
    setJob: function(job) {
        this.job = job;
    }
});
var Team = React.createClass({
    
});

var Game = React.createClass({
    render: function() {
        return 'Welcome to the game';
    }
})

React.render()