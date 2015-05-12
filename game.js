var adultExists = false;
var onEvent = false;
var child = new Person("defaultChild");

// Run UI update code every 10ms
window.setInterval(function () {
    //if an event is not happening
    if(!onEvent){
        update(child);
    }
    
    //update everything
    $('#child-age-display').text(Math.floor(child.currentAge));
}, 10);

function update(person){
    //increment age
    person.currentAge += 0.01;
    //roll for events
    rollEvent(person);
}

function rollEvent(person) {
    //generate a random number
    var newRandom = Math.random();
    //check against the event multiplier
    if(newRandom < eventMultiplier){
        //jackpot!
        triggerEvent(person);
    }
}

function triggerEvent(person){
    //pick a random event from the list of allowable events.
    //TODO: trim the list of allowable events! Right now it allows everything lol
    var randEventIndex = allowableEvents[Math.random() * person.allowableEvents.length];
    var newEvent = EventDB[randEventIndex];

    //pull the previous text
    var prevNotifs = $('#notifications').text();
    var newNotifs = prevNotifs + "\n\n" + newEvent.notif;
}

function Event(index, notif, choices, reqs){
    this.index = index;
    this.notif = notif;
    // choices and reqs should be arrays. Please pass arrays into these parameters.
    this.choices = choices;
    this.reqs = reqs;
}

function Person(name, currentAge = 0, eventMultiplier = 0.1, allowableEvents = []){
    this.name = name;
    this.currentAge = currentAge;
    this.eventMultiplier = 0.1;
    //if allowableEvents is default, insert everything
    if(allowableEvents.length == 0){
        for (var i = 0; i <EventDB.length - 1; i++) {
            allowableEvents += [i];
        };
    }
    this.notifsHistory = "";
}

//the events database. store all events here.
var EventDB = [
    new Event(0, 
        "This is a sample event.", 
        ["Default choice here"])
]

