'use strict';
/* global EVENTS, $*/
var TICKS = 0;

var team = {
    //name: velocity
    resources: {Alice: 10, Barry: 7, Chris: 12, Dan: 9, Englebert:9},
    //velocity: 47
    story_points: 0,
    morale: 100,

    updateVals: function(item) {
        if (item.morale !== undefined) {
            this.morale += randomNoise(item.morale, 10);
        }
        if (item.story_points !== undefined) {
            this.story_points += randomNoise(item.story_points, 5);
        }
        if (item.resources !== undefined) {
            var keys = Object.keys(this.resources);
            var dead_employee = keys[Math.floor(keys.length * Math.random())];
            delete this.resources[dead_employee];
            return 'Farewell, ' + dead_employee + ', we hardly knew ye.';

        }
    }
};

var randomNoise = function(val, max_deviance) {
    return val + (
        (Math.random() * max_deviance * 2 - max_deviance) +
        (Math.random() * max_deviance * 2 - max_deviance) +
        (Math.random() * max_deviance * 2 - max_deviance)
        ) / 3;
};

var random = function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
};

var teamStatus = function() {
    $('#morale').text(Math.floor(team.morale));
    $('#story_points').text(Math.floor(team.story_points));
    for (var name in team.resources) {
        $('#resources').append($('<li>').text(name));
    }
};

var tick = function() {
    TICKS++;
    if (TICKS > 0) {
        $('#title').hide();
    }
    // disable the next sprint button
    $('#tick').attr("disabled", true);

    var wild_encounter = random(EVENTS);
    $('#title').text(wild_encounter.title);
    $('#description').text(wild_encounter.description);
    wild_encounter.options.forEach(function(option) {
        $('#choices').append(
            $('<li>').text(option.text).click(function(){
                team.updateVals(option);
                teamStatus();
                clean_up_dom();
            })
        );
    });
};

var clean_up_dom = function() {
    $('#tick').removeAttr('disabled');
    $('#title').empty();
    $('#description').empty();
    $('#choices').empty();
};

// This is to fix a wierd bug in firefox whereby refreshing the page does not reset the button state
window.onload = function() {
    if (TICKS == 0) {
        $('#tick').attr("disabled", false);
    }
}