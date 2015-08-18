//the events database. store all events here.
var adultTrigger = 9;
var parentTrigger = 14;

var EventDB = [
    {
        index: 0, 
        notif: "I am starving", 
        choices: ["Ask father for food"],
        reqs: [],
        results: [{
            notif: "He backhands me and takes another sip from the bottle",
            props: ["misery", "hunger"],
            values: [3, 3]
        }]
    },{
        index: 1,
        notif: "I am thirsty",
        choices: ["Ask your father for water", "Remain silent"],
        reqs: [],
        results: [{
            notif: "Father grudginly passes me a cup, and tells me to fill it myself",
            props: ["misery", "hunger"],
            values: [-2, -2]
        },{
            notif: "Nothing happens",
            props: ["misery","hunger"],
            values: [2,3]
        }]
    },{
        index: 2,
        notif: "I wake up in the middle of the night from a nightmare",
        choices: ["Go back to sleep", "Stay awake"],
        reqs: [],
        results: [{
            notif: "I dream of the cold, the dark, and the misery",
            props: ["misery"],
            values: [5]
        },{
            notif: "The night isn't as scary as I thought",
            props: ["misery"],
            values: [-2]
        }]
    },{
        index: 3,
        notif: "Father has left for the day",
        choices: ["Go outside", "Stay inside"],
        reqs: [],
        results: [{
            notif: "I play in the grass and the sunshine",
            props: ["misery"],
            values: [-4]
        },{
            notif: "I wait for father's return",
            props: ["misery"],
            values: [1]
        }]
    },{
        index: 4,
        notif: "I see a puppy",
        choices: ["Touch it", "Feed it", "Hide"],
        reqs: [],
        results: [{
            notif: "It wags its tail",
            props: ["misery"],
            values: [-3]
        },{
            notif: "It nibbles happily and licks me",
            props: ["misery"],
            values: [-5]
        },{
            notif: "I hid successfully",
            props: ["misery"],
            values: [0]
        }]
    },{
        index: 5,
        notif: "I see a dog",
        choices: ["Touch it", "Feed it", "Run away"],
        reqs: [],
        results: [{
            notif: "I got fleas on myself",
            props: ["misery"],
            values: [2]
        },{
            notif: "It bit me! Ow...",
            props: ["misery"],
            values: [5]
        },{
            notif: "It chased after me",
            props: ["misery"],
            values: [0]
        }]
    },{
        index: 6,
        notif: "I see a ball",
        choices: ["Play", "Throw it at father", "Hide"],
        reqs: [],
        results: [{
            notif: "I played with it",
            props: ["misery"],
            values: [-1]
        },{
            notif: "Father got angry",
            props: ["misery"],
            values: [3]
        },{
            notif: "I hid successfully",
            props: ["misery"],
            values: [0]
        }]
    },{
        index: 7,
        notif: "Father passes me a ball",
        choices: ["Play", "Look at father", "Hide"],
        reqs: [],
        results: [{
            notif: "I accidentally kick the ball over the fence.",
            props: ["misery"],
            values: [2]
        },{
            notif: "Father scolds me for not playing",
            props: ["misery"],
            values: [1]
        },{
            notif: "I hid successfully",
            props: ["misery"],
            values: [0]
        }]
    },{
        index: 8,
        notif: "My stomach grumbles loudly",
        choices: ["Dig in the dirt", "Look at father", "Do nothing"],
        reqs: [],
        results: [{
            notif: "Worms are tasty.",
            props: ["misery","hunger"],
            values: [2,-3]
        },{
            notif: "Father glares at me.",
            props: ["misery","hunger"],
            values: [3, 3]
        },{
            notif: "I feel hungry",
            props: ["misery","hunger"],
            values: [0,5]
        }]
    }


/********************************************************

                        ADULT

********************************************************/


    ,{
        index: 9,
        notif: "You have reached your 18th birthday",
        choices: ["Wish yourself happy birthday"],
        reqs: [],
        results: [{
            notif: "You embark on the journey of life",
            props: ["misery"],
            values: [-4]
        }]
    },{
        index: 10,
        notif: "You are still jobless",
        choices: ["Look in the newspaper again", "Give up"],
        reqs: [],
        results: [{
            notif: "You find nothing",
            props: ["misery","hunger"],
            values: [5,5]
        },{
            notif: "You stare blankly at the wall",
            props: ["misery","hunger"],
            values: [2,2]
        }]
    },{
        index: 11,
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
        index: 12,
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
    },{
        index: 13,
        notif: "You see a ball at your feet.",
        choices: ["Kick it away", "Try to sell it"],
        reqs: [],
        results: [{
            notif: "It rolls to the feet of a small child.",
            props: ["misery", "hunger"],
            values: [-2, 3]
        },{
            notif: "No one will take it off your hands.",
            props: ["misery", "hunger"],
            values: [2, 3]
        }]
    }

/********************************************************

                        PARENT

********************************************************/

    ,{
        index: 14,
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
        index: 15,
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
        index: 16,
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
        index: 17,
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
        index: 18,
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