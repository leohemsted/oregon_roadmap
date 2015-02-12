'use strict';
/* global EVENTS, $*/

var team = {
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
            var desiredIndex = Math.floor(Math.random() * this.resources.length);
            this.resources.splice(desiredIndex, 1);
            return '';
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

var tick = function() {
    // disable the next sprint button
    $('#tick').attr("disabled", true);

    var wild_encounter = random(EVENTS);
    $('#title').text(wild_encounter.title);
    $('#description').text(wild_encounter.description);
    wild_encounter.options.each(function(option) {
        debugger;
        $('#choices').append(
            $('<li>').text(option.text).click(function(){
                team.updateVals(option);
                resolve_event();
            })
        );
    });
};

var resolve_event = function() {
    $('#tick').removeAttr('disabled');
    $('#title').text('');
    $('description').text('');
    $('choices').text('');
};
