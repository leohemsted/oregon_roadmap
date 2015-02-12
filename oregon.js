'use strict';
/* global EVENTS, $*/
var TICKS = 0;

var team = {
    resources: {Alice: 10, Barry: 7, Chris: 12, Dan: 9, Englebert:9},
    story_points: 0,
    morale: 100,

    addResourcePoints: function() {
        this.story_points += Object.keys(this.resources).length;
    },

    updateVals: function(item) {
        if (item.morale !== undefined) {
            var val = randomNoise(item.morale, 7);
            this.morale += val;
        }
        if (item.story_points !== undefined) {
            var val = randomNoise(item.story_points, 4);
            this.story_points += val;
        }
        if (item.resources !== undefined) {
            if (item.resources > 0) {
                // chose a silly name
                var name = random(['Phil Pack', 'Jason Test', 'Shak.', 'Zool']);
                this.resources[name] = randomNoise(10, 4);
                return 'Please welcome ' + name + ' to the team!';
            } else if (item.resources < 0) {
                var keys = Object.keys(this.resources);
                var dead_employee = keys[Math.floor(keys.length * Math.random())];
                delete this.resources[dead_employee];
                return 'Farewell, ' + dead_employee + ', we hardly knew ye.';
            } // else i probably fucked up and wrote resources : 0 oh well
        }
    },

    isACompleteAndAbjectFailure: function() {
        return Object.keys(this.resources).length === 0 || this.morale <= 0 || this.story_points <= -50;
    },

    IsAGroupOfShiningGoldenGods: function() {
        return this.story_points >= 100;
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
    if (team.IsAGroupOfShiningGoldenGods()){
        return success();
    }
    if (team.isACompleteAndAbjectFailure() || TICKS > 20){
        return fail();
    }
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
    var music_src = "sound/title.mp3";
    if (wild_encounter.music) {
        music_src = "sound/" + wild_encounter.music;
        if ($('#music source').attr("src") !== music_src) {
            $('#music source').attr("src", music_src);
            $('#music').trigger('pause');
            $('#music').trigger('load');
            $('#music').trigger('play');
        }
    }
    var weather_descs = ['working','wheezing', 'working','broken']
    $('#weather_status').html(weather_descs[Math.round(Math.random() * (weather_descs.length))]);

    var story_points = Math.floor(team.story_points);
    var velocity_desc = '';
    if (story_points >= 10) {
        velocity_desc = 'bonuses++';
    }
    else if (story_points >= 5) {
        velocity_desc = 'industry leading';
    }
    else if (story_points >= 0) {
        velocity_desc = 'average';
    }
    else if (story_points >= -5) {
        velocity_desc = 'industry standard';
    }
    else if (story_points >= -10) {
        velocity_desc = 'sub-par';
    }
    else if (story_points >= -15) {
        velocity_desc = 'AWOL';
    }
    else {
        velocity_desc = 'unknown';
    }
    $('#velocity_status').html(velocity_desc);

    var morale = Math.floor(team.morale);
    var morale_desc = '';
    if (morale >= 115) {
        morale_desc = 'out of this <s>world</s> office';
    } else if (morale >= 110) {
        morale_desc = 'bouyant';
    } else if(morale >= 105) {
        morale_desc = 'above par';
    } else if (morale >= 100) {
        morale_desc = 'average';
    } else if (morale >= -5) {
        morale_desc = 'industry standard';
    } else if(morale >= -10) {
        morale_desc = 'sub-par';
    } else if(morale >= -15) {
        morale_desc = 'AWOL';
    } else {
        morale_desc = 'unknown';
    }
    $('#morale_status').html(morale_desc);

    var resource_level = Object.keys(team.resources).length;
    if (resource_level == 4 && Math.random() > 0.7) {
        $('#resource_status').html('4 DAYS TO USE BY DATE');
    } else {
        $('#resource_status').html(resource_level);
    }


    $('#team_status').show();
    $('#team').hide();
    wild_encounter.options.forEach(function(option) {
        $('#choices').append(
            $('<li>').text(option.text).click(function(){
                var txt = team.updateVals(option);
                team.addResourcePoints();
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

    $('#team_status').hide();
    $('#team').show();
};

var fail = function() {
    clean_up_dom();
    $('#title').text('GAME OVER').show();
    $('#controls').hide();
    $('#music source').attr("src", 'sound/sad.mp3');
    $('#music').trigger('pause');
    $('#music').trigger('load');
    $('#music').trigger('play');
    var txt = 'You lasted ' + TICKS + ' sprints, but had to throw in the towel. Out of money, out of time, ' +
        'and out of resources, the project is doomed to failure. Maybe you should change career and become a pioneer in ' +
        'northwest America.';
    $('#description').text(txt);
};

var success = function() {
    clean_up_dom();
    $('#title').text('YOUR WINNER!').show();
    $('#controls').hide();
    $('#music source').attr("src", 'sound/yay.mp3');
    $('#music').trigger('pause');
    $('#music').trigger('load');
    $('#music').trigger('play');
    var txt = 'Your project succeeded in only ' + TICKS + ' sprints! You have entered the pantheon of the greats, ' +
        'ready to go down in history as the greatest scrum team the world has ever known. Congratulations!';
    $('#description').text(txt);
};

window.addEventListener("keypress", checkKeys, false);

function checkKeys(e) {
    if (e.charCode === 32 || e.charCode === 13) {
        if ($('#controls').is(':visible')) {
            tick();
        }
    } else if (e.charCode >= 49 && e.charCode <= 51) {
        var index = e.charCode - 49;
        var choice = $('#choices').children('li')[index];
        if (choice) {
            choice.click();
        }
    }
}

// This is to fix a wierd bug in firefox whereby refreshing the page does not reset the button state
window.onload = function() {
    if (TICKS === 0) {
        $('#tick').attr("disabled", false);
    }
};
