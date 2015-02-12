'use strict';CHOICE_EVENTS
var NO_CHOICE_EVENTS = [
    {
        title: 'Bonus Day!',
        description: 'Your resources have been awarded bonuses for their hard work! Morale improves.',
        music: 'yay.mp3',
        options: [{
            text: 'ok',
            morale: 5
        }]
    },
    {
        title: 'A call from A&E...',
        description: '"I\'m very sorry sir, your employee fell in front of the Gokhan Express at Hammersmith"',
        music: 'sad.mp3',
        options: [{
            text: 'ok',
            resources: -1
        }]
    },
    {
        title: 'A call from A&E...',
        description: '"I\'m very sorry sir, your developer has died of dysentry"',
        music: 'sad.mp3',
        options: [{
            text: 'ok',
            resources: -1
        }]
    },
    {
        title: 'A small kerfuffle',
        description: 'After an intense debate about timezones with Nick, your employee is found in the ' +
            '7th floor toilets with a kukri knife embedded in their spine. They were pronounced dead on arrival at A&E.',
        music: 'sad.mp3',
        options: [{
            text: 'ok',
            resources: -1
        }]
    },
    {
        title: 'Innovation Day!',
        description: 'An innovation day is scheduled; your workers eat pizza and experiment with bullshit js libraries. ' +
            'They seem pretty happy about that.',
        options: [{
            text: 'ok',
            morale: 5
        }]
    },
    {
        title: 'Blamestorming',
        description: 'Unhappy at your team\'s progress, the senior management arrange a meeting to find out what has gone '+
            'wrong. Your team emerges unscathed but they don\'t look to pleased about the entire affair.',
        options: [{
            text: 'ok',
            morale: -3
        }]
    },
    {
        title: 'Surprise inspection!',
        description: 'Your client arrives at your office to ensure that everything is running smoothly and progressing ' +
        'ahead of speed and under budget. Their CEO gets hit square in the nose by a Nerf dart from one of your workers\' ' +
        'strategic war games. An ultimatum is promptly delivered to your boss.',
        options: [{
            text: 'ok',
            resource: -1
        }]
    },
    {
        title: 'Technical Debt overload!',
        description: 'Your technical debt is running away from you, and the spaghetti code and poor OO practices in your ' +
        'codebase are making your developers weep. Someone hands your team a box of tissues, it doesn\'t seem to help much.',
        options: [{
            text: 'ok',
            morale: -5
        }]
    },
    {
        title: 'Cleanup on aisle 3',
        description: 'An odorous liquid seeps out of the crack under the bathroom door. The cause? A wad of tissues thrown '+
        'into the urinals by an unknown assailant. Everyone has to climb up several flights of stairs to the only working '+
        'toilets in Landmark House. Morale decreases.',
        options: [{
            text: 'ok',
            morale: -5
        }]
    },
    {
        title: 'Product release!',
        description: 'Congratulations! Your product has finally made its way into the hands of the client! No doubt they\'ll ' +
            'have lots of feedback to give you, but for now your team is just glad that they\'ve got a version out the door.',
        music: 'yay.mp3',
        options: [{
            text: 'ok',
            morale: 8
        }]
    },
    {
        title: 'Customer feedback',
        description: 'Your client loves the latest build! They can\'t stop telling you how your sublime UI gently guides '+
        'their decisions and increases their productivity ten-fold. Your team feels great and you get a lot of valulable '+
        'information for your next sprint planning.',
        options: [{
            text: 'ok',
            morale: 5,
            story_points: 5
        }]
    },
    {
        title: 'Customer feedback',
        description: 'Your client hates the latest build! They don\'t understand why it doesn\'t function the same as '+
        'the product they hired you to replace, and send a pretty blunt email directly to your devs saying so. The team '+
        'doesn\'t feel great but at least you have a clue what they actually want now.',
        options: [{
            text: 'ok',
            morale: -5,
            story_points: 5
        }]
    },
    {
        title: 'Dev roadmap',
        description: 'The product team present an idea for an awesome new product, the devs love it and you gain some cool '+
        'ideas for how to further your own task.',
        options: [{
            text: 'ok',
            morale: 3,
            story_points: 2
        }]
    },
    {
        title: 'Karaoke!',
        description: 'You and your team head out to a local karaoke bar to let off some steam. Despite scaring off the '+
        'locals, your rendition of Jolene inspires your team, and everyone walks home with a warm fuzzy feeling that '+
        'is in no way related to the alcohol consumed.',
        options: [{
            text: 'ok',
            morale: 5
        }]
    },
    {
        title: 'The many-headed hydra',
        description: 'Your worst fears are confirmed - a multithreading bug with deadlocks and things! It might even '+
        'involve websockets! Oh god! You exhaust stackoverflow but the issue consumes most of your sprint anyway.',
        options: [{
            text: 'ok',
            morale: -5,
            story_points: -5
        }]
    },
    {
        title: 'Blocker',
        description: 'A blocker appears! This nasty bug appears unreliably and completely destroys everything '+
        'you\'ve ever worked to create. A nasty setback indeed.',
        options: [{
            text: 'ok',
            story_points: -5
        }]
    },
    {
        title: 'Testers rejoice!',
        description: 'You have reached the zenith of testing - after every commit a comprehensive suite of '+
        'automated tests are fired off and pass within seconds - you\'ll surely be able to get some more ' +
        'work done with these in place!',
        options: [{
            text: 'ok',
            story_points: 5
        }]
    },
    {
        title: 'Atlassian cockup',
        description: 'Hipchat goes down! Now your developers have nothing to do inbetween meetings! '+
        'They\'re moping around looking miserable at the moment.',
        music: 'sad.mp3',
        options: [{
            text: 'ok',
            morale: -5
        }]
    },
    {
        title: 'Network failure!',
        description: 'A rat gnaws through some vital cables that your company relies on for internet, '+
        'and all of your code is hosted on the cloud. You twiddle your thumbs for a few hours.',
        options: [{
            text: 'ok',
            story_points: -5
        }]
    },
    {
        title: 'Timeboxing is a myth',
        description: 'Despite your best efforts, you and your team get draw into a protracted debate '+
        'about the meaning of estimation in a post-waterfall world. Several hours pass and everyone '+
        'just wants to go home and cry.',
        options: [{
            text: 'ok',
            morale: -5
        }]
    },

// Your company makes a huge sale (Gain morale)
// You create a break out area (Gain morale)
    {
        title: 'It can strike anytime',
        description: 'One of your developers has dysentry.',
        options: [{
            text: 'ok',
            story_points: -5
        }]
    },
    {
        title: 'En vacance sur la mer',
        description: 'One of your team is off for a week. They come back with a warm glow from '+
        'all the sunshine they got, although in their absence everything descended into chaos ' +
        'and nothing got done.',
        options: [{
            text: 'ok',
            morale: 5,
            story_points: -5
        }]
    },
    {
        title: 'The contract was signed!',
        description: 'A key contract was signed and your company is clean sailing again! '+
        'Everyone\'s pretty happy about it.',
        music: 'yay.mp3',
        options: [{
            text: 'ok',
            morale: 6
        }]
    },
    {
        title: '',
        description: '',
        options: [{
            text: 'ok',
            morale: 5
        }]
    },
];

var CHOICE_EVENTS = [
    {
        title: 'Decide your meeting agenda',
        description: 'What are we here to do?',
        options: [
            {
                text: 'Fuck spiders',
                story_points: -5
            },
            {
                text: 'Something else',
                story_points: 3
            }
        ]
    },
];

var EVENTS = CHOICE_EVENTS.concat(NO_CHOICE_EVENTS);


/*    Hiring:

10 attempts to hire resources (devs, testers, project managers, devops)
50% chance of success
Player gets to pick names
On failure (Bad interview, turned out to be a serial killer, etc)
Start with however many you manage to hire
Each resource has some stat that contributes to how many story points you can spend a sprint
If you don't have at least one of each type of team member, you get half the story points per sprint
Start with random morale

Random Events:


Random choice events:

What are we here to do?:
1. Fuck spiders (Lose story points)
2. Something else (Gain story points)
Retrospective time! Actions:
1. You start estimating in hours! (Lose story points)
2. Get your ducks in a row (Gain story points)
3. Drink the Kool-Aid (Lose morale)
Backlog Grooming time! Actions:
1. Estimate points (Gain story points)
2. Coffee card! (Gain morale)
3. Bio Break? (No effect)
Time for a change up! Do you:
1. Touch base to productise your efficiencies (No effect)
2. Implement change management going forward (No effect)
3. Paradigm shift by opening the kimono (No effect)
Who touched base in my thought shower?:
1. ??? (No effect)
2. ?!?! (No effect)
Company values go!:
1. Ingenuity (Gain story points)
2. Simplicity (No effect)
3. Quality (Gain morale)
Air con is busted! Do you:
1. Send everyone home (Lose story points)
2. Do nothing (Lose morale)
All the meeting rooms are booked! Do you:
1. Reorganise for next week (Lose story points)
2. Have the meeting in the pub (No effect)
The customer wants a new feature right now! Do you:
1. Get it done ASAP (Lose morale)
2. Push back (Lose story points)
The team gets some extra budget! Do you:
1. Try to hire a new resource? (50% chance to get a random resource)
2. Outsource an old project (Gain story points)
3. Buy a coffee machine (Gain morale)
The team has their budget cut! Do you:
1. Fire a resource
2. Lower salary (Lose morale)

Low Morale events:

Resource leaves
Low motivation (Lose story points)

Sprint planning:

Spend story points to do work (More resources = more story points per sprint)
Work includes features, bugs and technical debt
Technical debt doesn't get you points, but it increases morale


Game ends after a certain number of sprints (6?)
Random number of events per sprint
Score is based on how much work you get done and the team morale
If you get below a certain score, the company goes bankrupt*/
