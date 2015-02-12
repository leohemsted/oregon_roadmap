'use strict';
/* global EVENTS, $*/
var TICKS = 0;
var MAX_TICKS = 25;

var team = {
    resources: ['Alice', 'Barry', 'Chris', 'Dan', 'Englebert'],
    story_points: 0,
    story_points_last_tick: 0,
    morale: 100,

    addResourcePoints: function() {
        this.story_points += randomNoise(this.resources.length, 5);
    },

    updateVals: function(item) {
        if (item.morale !== undefined) {
            if (item.morale < 0) {
                // make the game a bit harder
                item.morale -= 2;
            }
            this.morale += randomNoise(item.morale, 7);
        }
        if (item.story_points !== undefined) {
            if (item.story_points < 0) {
                // make the game a bit harder
                item.story_points -= 2;
            }
            team.story_points_last_tick = team.story_points;
            var added_pts = randomNoise(item.story_points, 4);
            this.story_points += added_pts;
        }
        if (item.resources !== undefined) {
            if (item.resources > 0) {
                // chose a silly name
                var name = random(['Phil Pack', 'Jason Test', 'Shak.', 'Zool', 'Barry White']);
                this.resources.push(name);
                return 'Please welcome ' + name + ' to the team!';
            } else if (item.resources < 0) {
                var bad_index = Math.floor(this.resources.length * Math.random());
                var dead_employee = this.resources[bad_index];
                this.resources.splice(bad_index, 1);
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
        ) / 3.0;
};

var random = function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
};

var teamStatus = function() {
    $('#morale').text(Math.floor(team.morale));
    $('#story_points').text(Math.floor(team.story_points));
    $('#resources').empty();
    team.resources.forEach(function(name) {
        $('#resources').append($('<li>').text(name));
    });
};

var set_weather_desc = function() {
    var weather_descs = ['working','wheezing', 'working','broken'];
    $('#weather_status').html(random(weather_descs));
};

var set_velocity_desc = function(story_points) {
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
        velocity_desc = 'going backwards';
    }
    $('#velocity_status').html(velocity_desc);
};

var set_morale_desc = function(morale) {
    var morale_desc = '';
    if (morale >= 115) {
        morale_desc = 'out of this <s>world</s> office';
    } else if (morale >= 110) {
        morale_desc = 'bouyant';
    } else if(morale >= 105) {
        morale_desc = 'above par';
    } else if (morale >= 100) {
        morale_desc = 'average';
    } else if (morale >= 90) {
        morale_desc = 'could be better';
    } else if(morale >= 80) {
        morale_desc = 'industry standard';
    } else if(morale >= 70) {
        morale_desc = 'could be worse';
    } else if(morale >= 60) {
        morale_desc = 'like a sinking ship';
    } else {
        morale_desc = 'time to quit';
    }
    $('#morale_status').html(morale_desc);
};

var set_resource_desc = function(resource_level) {
    if (resource_level === 4 && Math.random() > 0.7) {
        $('#resource_status').html('4 DAYS TO USE BY DATE');
    } else {
        $('#resource_status').html(resource_level);
    }
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

var play_music = function(filename) {
    var music_src = "sound/" + filename;
    if ($('#music source').attr("src") !== music_src) {
        $('#music source').attr("src", music_src);
        $('#music').trigger('pause');
        $('#music').trigger('load');
        $('#music').trigger('play');
    }
};

var fail = function() {
    clean_up_dom();
    $('#title').text('GAME OVER').show();
    $('#controls').hide();
    play_music('sad.mp3');
    var txt = 'You lasted ' + TICKS + ' sprints, but had to throw in the towel. Out of money, out of time, ' +
        'and out of resources, the project is doomed to failure. Maybe you should change career and become a pioneer in ' +
        'northwest America.';
    $('#description').text(txt);
};

var success = function() {
    clean_up_dom();
    $('#title').text('YOUR WINNER!').show();
    $('#controls').hide();
    play_music('yay.mp3');
    var txt = 'Your project succeeded in only ' + TICKS + ' sprints! You have entered the pantheon of the greats, ' +
        'ready to go down in history as the greatest scrum team the world has ever known. Congratulations!';
    $('#description').text(txt);
};

var tick = function() {
    if (team.IsAGroupOfShiningGoldenGods()){
        return success();
    }
    if (team.isACompleteAndAbjectFailure() || TICKS >= MAX_TICKS){
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
    play_music(wild_encounter.music || "title.mp3");

    set_weather_desc();
    set_velocity_desc(team.story_points - team.story_points_last_tick);
    set_morale_desc(team.morale);
    set_resource_desc(team.resources.length);

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

window.addEventListener("keypress", checkKeys, false);

// This is to fix a wierd bug in firefox whereby refreshing the page does not reset the button state
window.onload = function() {
    if (TICKS === 0) {
        $('#tick').attr("disabled", false);
    }
};
