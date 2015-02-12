var Resource = React.createClass({
    render: function() {
        return (
            <div>{this.props.name}: {this.props.job}</div>
        );
    },
    getInitialState: function() {
        return {
            velocity: Math.random() * (RESOURCE_MAX_VELOCITY - RESOURCE_MIN_VELOCITY) + RESOURCE_MIN_VELOCITY
        }
    }
});
var Team = React.createClass({
    createResources: function() {
        var temp = []
        for (var i=0; i<5; i++) {
            temp.push(this.refs['res_name'+ i.toString()].getDOMNode().value);
        }
        this.setState({resource_names: temp});
    },
    render: function() {
        if (this.state.resource_names.length == 5) {
            return (
                <div>
                    <h2>Leo please add details</h2>
                    <Resource ref="res0" name={this.state.resource_names[0]} job="Team Lead" />
                    <Resource ref="res1" name={this.state.resource_names[1]} job="Developer" />
                    <Resource ref="res2" name={this.state.resource_names[2]} job="Tester" />
                    <Resource ref="res3" name={this.state.resource_names[3]} job="Developer" />
                    <Resource ref="res4" name={this.state.resource_names[4]} job="Hipster Dev Ops" />
                </div>
                );
        } else {
            return (
                    <div>
                        <p><h2>Team: {this.props.name}</h2>
                        Please add 5 resources:</p>
                        <table>
                            <tr><td>Resource #1</td><td><input ref="res_name0" /></td></tr>
                            <tr><td>Resource #2</td><td><input ref="res_name1" /></td></tr>
                            <tr><td>Resource #3</td><td><input ref="res_name2" /></td></tr>
                            <tr><td>Resource #4</td><td><input ref="res_name3" /></td></tr>
                            <tr><td>Resource #5</td><td><input ref="res_name4" /></td></tr>
                            <tr><td colspan="2"><button onClick={this.createResources}>Create</button></td></tr>
                        </table>
                    </div>
            );
        }
    },
    getInitialState: function() {
        return {
            resource_names: [],
            morale: Math.random() * (MORALE_MAX - MORALE_MIN) + MORALE_MIN,
            story_points: 0,
            stories_completed: 0
        }
    }
});

var Game = React.createClass({
    createTeam: function() {
        this.setState({aex: this.refs.team_name.getDOMNode().value || TEAM_DEFAULT_NAME});
        this.tick();
    },
    tick: function() {
        this.setState({status: this.state.status+1});
    },
    render: function() {
        if (this.state.status == GAME_NOT_STARTED) {
            return (
                <div><b>Welcome to the game! (version {this.props.version})</b>

                <p><button onClick={this.tick}>Start the game</button></p></div>
            );
        }
        else if (this.state.status == CREATE_TEAM) {
            return (
                    <table>
                        <tr><td>Team name</td><td><input ref="team_name" placeholder={TEAM_DEFAULT_NAME} type="text" /></td></tr>
                        <tr><td colspan="2"><button onClick={this.createTeam}>Create</button></td></tr>
                    </table>
            );
        } else {
            return (
                <div><Team ref="team" name={this.state.aex}  /></div>
            );
        }
    },
    getInitialState: function() {
        return {
            team: null,
            status: GAME_NOT_STARTED
        }
    }
});

GLOBAL_GAME = React.render(<Game version={VERSION} />, document.getElementById('container'));
