"use strict";
var adultExists = false;
var onEvent = false;
var eventTimer = 100;
var eventMax = 10;
var debugText = "";
var child = new Person("defaultChild");

// load function
$(document).ready(function(){
    //hides adult col at first
    $("#adult-col").hide();
})

// Update function (every 10ms)
window.setInterval(function () {
    //if an event is not happening
    if(!onEvent){
        update(child);
    }
    eventTimer--;
    //update everything
    $('.child.age').text(Math.floor(child.age));
    $('.child.happiness').text(Math.floor(child.happiness));
    $('#child-debug').text(debugText);
    jQuery('#child-notifications').html(embedNL(child.notifsHistory));
}, 10);

function update(person){
    //increment age
    person.age += 0.01;
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
        //make a button and a adult div
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
        if(person.age<25){
            var holder = '#child-event-holder';
            $(holder).append(tmpDiv);
            tmpBtn.click( function() {
                evtClick(holder, event.results[i]);
            });
        } else {}
        //$('#adult-event-holder').append(tmpDiv);
    }
}

function evtClick(holder, result){
    onEvent=false;
    $('.tempDiv').remove();
}

//took me so long to get this just right lol.
function showAdult(){
    var tmpDiv = jQuery(document.createElement('div'));
    tmpDiv.addClass("animDiv col-md-4");
    $("#child-col").removeClass("col-md-offset-4").before(tmpDiv);
    $(".animDiv").hide('slow', function(){});
    $("#adult-col").show('slow',function(){});
}

function Person(name){
    this.name = name;
    this.age = 0;
    this.eventMultiplier = 0.1;
    var allowableEvents = [];
        for (var i = 0; i < EventDB.length; i++) {
            allowableEvents += [i];
        }
    this.allowableEvents = allowableEvents;
    this.notifsHistory = [];
    this.happiness = 0;
}

function embedNL(lines) {
    var htmls = [];
    var tmpDiv = jQuery(document.createElement('div'));
    for (var i = 0 ; i < lines.length ; i++) {
        htmls.push(tmpDiv.text(lines[i]).html());
    }
    return htmls.join("<br>");
}