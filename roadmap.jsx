'use strict';
var GANTT_LEFT = 332;
var GANTT_WIDTH = 64;

var ProgressBar = React.createClass({
    render: function() {
        var style = {
            left: GANTT_LEFT + (GANTT_WIDTH * this.props.sprint)
        };
        return (
            <div id="progress_bar" style={style}></div>
        );
    }
});


React.renderComponent(<ProgressBar sprint={count} />, document.getElementById('progress'));
