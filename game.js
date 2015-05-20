"use strict";
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
    debugText=onEvent;
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
    //check against the event multiplier
    if(newRandom < person.eventMultiplier){
        //jackpot!
        triggerEvent(person);
    }
}

function triggerEvent(person){
    onEvent = true;
    //pick a random event from the list of allowable events.
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
    //for each choice in the event
    for(var i = 0; i<event.choices.length; i++){
        //make a button and a parent div
        var tmpDiv = jQuery(document.createElement('div'));
        var tmpBtn = jQuery(document.createElement('button'));
        //add the button to the div
        tmpDiv.append(tmpBtn);

        //set the attribute of the div
        tmpDiv.addClass("tempDiv");

        //set the attributes of the button
        tmpBtn.addClass("btn btn-default");
        tmpBtn.text(event.choices[i]);

        //add the holder and the event click handler function
        if(person.currentAge<25){
            var holder = '#child-event-holder';
            $(holder).append(tmpDiv);
            tmpBtn.click( function() {
                evtClick(holder,event.results);
            });
        } else {}
        //$('#adult-event-holder').append(tmpDiv);
    }
}

function evtClick(holder, result){
    onEvent=false;
    $('.tempDiv').remove();
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