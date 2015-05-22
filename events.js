//the events database. store all events here.
var EventDB = [
    {
        index: 0, 
        notif: "This is a sample event.", 
        choices: ["Default choice here"],
        reqs: [],
        results: [{
            notif: "You chose the default.",
            props: ["happiness"],
            values: [-1]
        }]
    },{
        index: 1,
        notif: "This is another event",
        choices: ["Choice 1", "Choice 2"],
        reqs: [],
        results: [{
            notif: "Choice 1 is good.",
            props: ["happiness"],
            values: [3]
        },{
            notif: "Choice 2 is not so good.",
            props: ["happiness"],
            values: [1]
        }]
    }
];