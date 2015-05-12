var adultExists = false;
var onEvent = false;
var eventTimer = 100;
var eventMax = 10;
var debugText = "";
var child = new Person("defaultChild", 0, 0.1,[]);

// Run UI update code every 10ms
window.setInterval(function () {
    //if an event is not happening
    if(!onEvent){
        update(child);
    }
    eventTimer--;
    //update everything
    $('#child-age-display').text(Math.floor(child.currentAge));
    $('#debug').text(debugText);
    jQuery('#child-notifications').html(embedNL(child.notifsHistory));
}, 10);

function update(person){
    //increment age
    person.currentAge += 0.01;
    //roll for events
    if(eventTimer < 0){
        eventTimer = eventMax;
        rollEvent(person);
    }
}

function rollEvent(person) {
    //generate a random number
    var newRandom = Math.random();
    debugText = newRandom;
    //check against the event multiplier
    if(newRandom < person.eventMultiplier){
        //jackpot!
        triggerEvent(person);
    }
}

function triggerEvent(person){
    person.onEvent = true;
    //pick a random event from the list of allowable events.
    //TODO: trim the list of allowable events! Right now it allows everything lol
    var randEventIndex = person.allowableEvents[Math.floor(Math.random() * person.allowableEvents.length)];
    var newEvent = EventDB[randEventIndex];

    //push the new notification into the queue
    person.notifsHistory.push(newEvent.notif);
    //trim the notifications
    if(person.notifsHistory.length > 5){
        person.notifsHistory.shift();
    }
    //create the button
    createButtons(newEvent, person);
}

function createButtons(event, person){
    //the button to add
    var test = $('<button/>',
    {
        text: 'Test',
        click: function () { alert('hi'); }
    });

    //create a div and insert the button inside
    var parent = $('<div></div>').children().append(test).end();
    //add the div to the event holder.
    if(person.currentAge<25){
        $('#child-event-holder').append(parent);
    } else {
        //$('#adult-event-holder').append(parent);
    }
}

function Person(name, currentAge, eventMultiplier, allowableEvents){
    this.name = name;
    this.currentAge = currentAge;
    this.eventMultiplier = 0.1;
    //if allowableEvents is empty, insert everything
    if(allowableEvents.length == 0){
        for (var i = 0; i < EventDB.length; i++) {
            allowableEvents += [i];
        };
    }
    this.allowableEvents = allowableEvents;
    this.notifsHistory = [];
}

function embedNL(lines) {
    var htmls = [];
    var tmpDiv = jQuery(document.createElement('div'));
    for (var i = 0 ; i < lines.length ; i++) {
        htmls.push(tmpDiv.text(lines[i]).html());
    }
    return htmls.join("<br>");
}