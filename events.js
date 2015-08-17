//the events database. store all events here.
var adultTrigger = 8;
var parentTrigger = 12;

var EventDB = [
    {
        index: 0, 
        notif: "You are starving", 
        choices: ["Ask your father for food"],
        reqs: [],
        results: [{
            notif: "He backhands you and takes another sip from the bottle",
            props: ["misery", "hunger"],
            values: [1, 3]
        }]
    },{
        index: 1,
        notif: "You are thirsty",
        choices: ["Ask your father for water", "Remain silent"],
        reqs: [],
        results: [{
            notif: "Your father grudginly passes you a cup, and tells you to fill it yourself",
            props: ["misery", "hunger"],
            values: [-2, -2]
        },{
            notif: "Nothing happens",
            props: ["hunger"],
            values: [3]
        }]
    },{
        index: 2,
        notif: "You wake up in the middle of the night from a nightmare",
        choices: ["Go back to sleep", "Stay awake"],
        reqs: [],
        results: [{
            notif: "You dream of the cold, the dark, and the misery",
            props: ["misery"],
            values: [3]
        },{
            notif: "The night isn't as scary as you thought",
            props: ["misery"],
            values: [-3]
        }]
    },{
        index: 3,
        notif: "Your father has left for the day",
        choices: ["Go outside", "Stay inside"],
        reqs: [],
        results: [{
            notif: "You play in the grass and the sunshine",
            props: ["misery"],
            values: [-4]
        },{
            notif: "You wait for your father's return",
            props: ["misery"],
            values: [1]
        }]
    },{
        index: 4,
        notif: "You see a puppy",
        choices: ["Touch it", "Feed it", "Hide"],
        reqs: [],
        results: [{
            notif: "It wags it's tail",
            props: ["misery", "hunger"],
            values: [-4, -1]
        },{
            notif: "It nibbles happily and licks you",
            props: ["misery"],
            values: [-5]
        },{
            notif: "You hid successfully",
            props: ["misery"],
            values: [0]
        }]
    },{
        index: 5,
        notif: "You see a dog",
        choices: ["Touch it", "Feed it", "Run away"],
        reqs: [],
        results: [{
            notif: "You got fleas on you",
            props: ["misery"],
            values: [2]
        },{
            notif: "It bites you in greed",
            props: ["misery"],
            values: [5]
        },{
            notif: "It chases after you",
            props: ["misery"],
            values: [0]
        }]
    },{
        index: 6,
        notif: "You see a ball",
        choices: ["Play", "Throw it at father", "Hide"],
        reqs: [],
        results: [{
            notif: "You played with it",
            props: ["misery"],
            values: [-1]
        },{
            notif: "Father got angry",
            props: ["misery"],
            values: [3]
        },{
            notif: "You hid successfully",
            props: ["misery"],
            values: [0]
        }]
    },{
        index: 7,
        notif: "Father passes you a ball",
        choices: ["Play", "Look at father", "Hide"],
        reqs: [],
        results: [{
            notif: "You accidentally kick the ball over the fence.",
            props: ["misery"],
            values: [2]
        },{
            notif: "Father scolds you for not playing",
            props: ["misery"],
            values: [1]
        },{
            notif: "You hid successfully",
            props: ["misery"],
            values: [0]
        }]
    }


/********************************************************

                        ADULT

********************************************************/


    ,{
        index: 8,
        notif: "You have reached your 18th birthday",
        choices: ["Wish yourself happy birthday"],
        reqs: [],
        results: [{
            notif: "You embark on the journey of life",
            props: ["misery"],
            values: [-4]
        }]
    },{
        index: 9,
        notif: "You are still jobless",
        choices: ["Look in the newspaper again", "Give up"],
        reqs: [],
        results: [{
            notif: "You find nothing",
            props: ["misery"],
            values: [1]
        },{
            notif: "You stare blankly at the wall",
            props: ["misery"],
            values: [2]
        }]
    },{
        index: 10,
        notif: "You pass by a store",
        choices: ["Look inside", "Keep your head down"],
        reqs: [],
        results: [{
            notif: "You see a happy family inside.",
            props: ["misery"],
            values: [2]
        },{
            notif: "Nothing changes",
            props: ["misery"],
            values: [0]
        }]
    },{
        index: 11,
        notif: "You wake up to another dark, dull day.",
        choices: ["Go digging for food", "Go back to sleep"],
        reqs: [],
        results: [{
            notif: "You find a small snack kiosk with a sympathetic owner.",
            props: ["misery", "hunger"],
            values: [-2, -3]
        },{
            notif: "Nothing means anything to you anymore.",
            props: ["misery", "hunger"],
            values: [5, 3]
        }]
    }

/********************************************************

                        PARENT

********************************************************/

    ,{
        index: 12,
        notif: "You see a kid on the sidewalk. Grovelling. Miserable. He reminds you of yourself.",
        choices: ["Bring him home", "Walk past him"],
        reqs: [],
        results: [{
            notif: "You have no idea what you're doing. But you feel the beginning of something",
            props: ["misery"],
            values: [-1]
        },{
            notif: "You return to a life of emptiness",
            props: ["misery"],
            values: [20]
        }]
    },{
        index: 13,
        notif: "The kid brings home a dead cat.",
        choices: ["Slap him", "Ignore him"],
        reqs: [],
        results: [{
            notif: "You throw out the dead cat afterwards.",
            props: ["misery"],
            values: [1],
            otherprops: ["misery"],
            othervalues:[4]
        },{
            notif: "The next day, he brings home a dead mouse.",
            props: ["misery"],
            values: [5],
            otherprops: ["misery"],
            othervalues:[-1]
        }]
    },{
        index: 14,
        notif: "The kid asks you for food.",
        choices: ["Slap him", "Explain to him"],
        reqs: [],
        results: [{
            notif: "You take a sip from your bottle afterwards.",
            props: ["misery", "hunger"],
            values: [1, -1],
            otherprops: ["misery", "hunger"],
            othervalues:[4, 1]
        },{
            notif: "We don't have food.",
            props: ["misery", "hunger"],
            values: [0, 1],
            otherprops: ["misery", "hunger"],
            othervalues:[1, 1]
        }]
    },{
        index: 15,
        notif: "The kid asks you for water.",
        choices: ["Pass him a cup", "Ignore him"],
        reqs: [],
        results: [{
            notif: "You give him your share.",
            props: ["hunger"],
            values: [3],
            otherprops: ["misery","hunger"],
            othervalues:[-2,-3]
        },{
            notif: "He's already had his share",
            props: ["hunger"],
            values: [-2],
            otherprops: ["misery","hunger"],
            othervalues:[3,3]
        }]
    },{
        index: 16,
        notif: "The kid passes you a ball.",
        choices: ["Pass it back", "Sell the ball"],
        reqs: [],
        results: [{
            notif: "You kick it too hard. He doubles over in pain.",
            props: ["misery"],
            values: [2],
            otherprops: ["misery"],
            othervalues:[4]
        },{
            notif: "There's enough food for the both of you tonight.",
            props: ["misery", "hunger"],
            values: [-1, -4],
            otherprops: ["misery", "hunger"],
            othervalues:[0, -4]
        }]
    },
];