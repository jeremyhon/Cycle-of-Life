//the events database. store all events here.
var EventDB = [
    {
        index: 0, 
        notif: "You are starving", 
        choices: ["Ask your father for food"],
        reqs: [],
        results: [{
            notif: "He backhands you and takes another sip from the bottle",
            props: ["happiness", "hunger"],
            values: [-1, -1]
        }]
    },{
        index: 1,
        notif: "You are thirsty",
        choices: ["Ask your father for water", "Remain silent"],
        reqs: [],
        results: [{
            notif: "Your father grudginly passes you a cup, and tells you to fill it yourself",
            props: ["happiness", "hunger"],
            values: [2, 2]
        },{
            notif: "Nothing happens",
            props: ["happiness", "hunger"],
            values: [0, -1]
        }]
    },{
        index: 2,
        notif: "You wake up in the middle of the night from a nightmare",
        choices: ["Go back to sleep", "Stay awake"],
        reqs: [],
        results: [{
            notif: "You dream of the cold, the dark, and the misery",
            props: ["happiness"],
            values: [-3]
        },{
            notif: "The night isn't as scary as you thought",
            props: ["happiness"],
            values: [3]
        }]
    },{
        index: 3,
        notif: "Your father has left for the day",
        choices: ["Go outside", "Stay inside"],
        reqs: [],
        results: [{
            notif: "You play in the grass and the sunshine",
            props: ["happiness", "hunger"],
            values: [4, -1]
        },{
            notif: "You wait for your father's return",
            props: ["happiness"],
            values: [-1]
        }]
    },{
        index: 4,
        notif: "You see a puppy",
        choices: ["Touch it", "Feed it", "Hide"],
        reqs: [],
        results: [{
            notif: "It wags it's tail",
            props: ["happiness", "hunger"],
            values: [4, -1]
        },{
            notif: "It nibbles happily and licks you",
            props: ["happiness"],
            values: [5]
        },{
            notif: "You hid successfully",
            props: ["happiness"],
            values: [0]
        }]
    },{
        index: 5,
        notif: "You see a dog",
        choices: ["Touch it", "Feed it", "Run away"],
        reqs: [],
        results: [{
            notif: "You got fleas on you",
            props: ["happiness"],
            values: [-2]
        },{
            notif: "It bites you in greed",
            props: ["happiness"],
            values: [-5]
        },{
            notif: "It chases after you",
            props: ["happiness"],
            values: [0]
        }]
    },{
        index: 6,
        notif: "You see a ball",
        choices: ["Play", "Throw it at father", "Hide"],
        reqs: [],
        results: [{
            notif: "You played with it",
            props: ["happiness"],
            values: [-2]
        },{
            notif: "Father got angry",
            props: ["happiness"],
            values: [-3]
        },{
            notif: "You hid successfully",
            props: ["happiness"],
            values: [0]
        }]
    },{
        index: 7,
        notif: "Father passes you a ball",
        choices: ["Play", "Look at father", "Hide"],
        reqs: [],
        results: [{
            notif: "Father kicked the ball at you",
            props: ["happiness"],
            values: [-2]
        },{
            notif: "Father scolds you for not playing",
            props: ["happiness"],
            values: [-1]
        },{
            notif: "You hid successfully",
            props: ["happiness"],
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
            props: ["happiness"],
            values: [10]
        }]
    },{
        index: 9,
        notif: "You are still jobless",
        choices: ["Look in the newspaper again", "Give up"],
        reqs: [],
        results: [{
            notif: "You find nothing",
            props: ["happiness"],
            values: [-1]
        },{
            notif: "You stare blankly at the wall",
            props: ["happiness"],
            values: [-2]
        }]
    },{
        index: 10,
        notif: "You pass by a store",
        choices: ["Look inside", "Keep your head down"],
        reqs: [],
        results: [{
            notif: "You see a happy family inside.",
            props: ["happiness"],
            values: [-2]
        },{
            notif: "Nothing changes",
            props: ["happiness"],
            values: [0]
        }]
    },{
        index: 11,
        notif: "You see a kid on the sidewalk. Grovelling. Miserable. He reminds you of yourself.",
        choices: ["Bring him home", "Walk past him"],
        reqs: [],
        results: [{
            notif: "You have no idea what you're doing. But you feel the beginning of something",
            props: ["happiness"],
            values: [1]
        },{
            notif: "You return to a life of emptiness",
            props: ["happiness"],
            values: [-20]
        }]
    }
];