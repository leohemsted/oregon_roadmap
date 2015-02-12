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
            var val = randomNoise(item.morale, 10);
            console.log('morale: ' + val);
            this.morale += val;
        }
        if (item.story_points !== undefined) {
            var val = randomNoise(item.story_points, 6);
            console.log('story points: ' + val);
            this.story_points += val;
        }
        if (item.resources !== undefined) {
            if (item.resources > 0) {
                // chose a silly name
                var name = random(['Phil Pack', 'Jason Test', 'Shak.', 'Zool']);
                this.resources[name] = randomNoise(10, 4);
                return 'Please welcome ' + name + 'to the team!';
            } else if (item.resources < 0) {
                var keys = Object.keys(this.resources);
                var dead_employee = keys[Math.floor(keys.length * Math.random())];
                delete this.resources[dead_employee];
                console.log(this.resources)
                return 'Farewell, ' + dead_employee + ', we hardly knew ye.';
            } // else i probably fucked up and wrote resources : 0 oh well
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
    $('#resources').empty();
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
    //$('#tick').attr("disabled", true);
    $('#controls').hide();

    var wild_encounter = random(EVENTS);
    $('#event_name').text(wild_encounter.title);
    $('#description').text(wild_encounter.description);
    wild_encounter.options.forEach(function(option) {
        $('#choices').append(
            $('<li>').text(option.text).click(function(){
                var txt = team.updateVals(option);
                teamStatus();
                clean_up_dom();
                if (txt) {
                    $("#description").text(txt);
                }
            })
        );
    });
};

var clean_up_dom = function() {
    // $('#tick').removeAttr('disabled');
    $('#controls').show();
    $('#title').empty();

    // the event bits:
    $('#event_name').empty();
    $('#description').empty();
    $('#choices').empty();
};

window.addEventListener("keypress", checkKeys, false);

function checkKeys(e) {
    if (e.charCode == "32" || e.charCode == "13") {
        if ($('#controls').is(':visible')) {
            tick();
        }
    }
}

// This is to fix a wierd bug in firefox whereby refreshing the page does not reset the button state
window.onload = function() {
    if (TICKS == 0) {
        $('#tick').attr("disabled", false);
    }
}
