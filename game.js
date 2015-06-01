"use strict";
var adultExists = false;
var onEvent = false;
var eventTimer = 100;
var eventMax = 10;
var debugText = "";
var child = new Person("defaultChild");
var adult = undefined;

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
    jQuery('.child.notifications').html(embedNL(child.notifsHistory));
    $('.child.debug').text(debugText);

    if(adult !== undefined){
        $('.adult.age').text(Math.floor(adult.age));
        $('.adult.happiness').text(Math.floor(adult.happiness));        
        jQuery('.adult.notifications').html(embedNL(adult.notifsHistory));
    }
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

    pushNotif(person, newEvent.notif);

    //create the button
    createButtons(newEvent, person);
}

function pushNotif(person, notif){
    //push the new notification into the queue
    person.notifsHistory.push(notif);
    //trim the notifications
    if(person.notifsHistory.length > 5){
        person.notifsHistory.shift();
    }
}

function createButtons(event, person){
    var state = "adult";
    var tmpDiv;
    var tmpBtn;
    if(person.age<25){
        state = "child";
    }
    //for each choice in the event
    for(var i = 0; i<event.choices.length; i++){
        //make a button and a adult div
        tmpDiv = jQuery(document.createElement('div'));
        tmpBtn = jQuery(document.createElement('button'));
        //add the button to the div
        tmpDiv.append(tmpBtn);

        //set the attribute of the div
        tmpDiv.addClass("tempDiv "+state);

        //set the attributes of the button
        tmpBtn.addClass("btn btn-default eventBtn-"+i);
        tmpBtn.text(event.choices[i]);

        //add the button to correct event holder
        $(".event-holder."+state).append(tmpDiv);
        var result = event.results[i];

        //add the click handler function
        btnClickHandler(i, person, result);
    }
}

//executed on button click
function btnClickHandler(i, person, result){
    $(".eventBtn-"+i).click(function(){
        onEvent=false;
        pushNotif(person, result.notif);
        for (var j = 0; j < result.props.length; j++) {
            updatePerson(person, result.props[j], result.values[j]);
        }
        $('.tempDiv').remove();
    })
}

//updates a person's property with a value.
function updatePerson(person, prop, value){
    person[prop] += value;
}

//took me so long to get this just right lol.
function showAdult(){
    var tmpDiv = jQuery(document.createElement('div'));
    tmpDiv.addClass("animDiv col-md-4");
    $("#child-col").removeClass("col-md-offset-4").before(tmpDiv);
    $(".animDiv").hide('slow', function(){});
    $("#adult-col").show('slow',function(){});
}

//takes the properties in the children and puts inside the adult divisions.
function switchToAdult(){
    adult = child;
    showAdult();
    child = new Person("defaultChild");
}


//person prototype
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

//handle adding new lines inside the notif div
function embedNL(lines) {
    var htmls = [];
    var tmpDiv = jQuery(document.createElement('div'));
    for (var i = 0 ; i < lines.length ; i++) {
        htmls.push(tmpDiv.text(lines[i]).html());
    }
    return htmls.join("<br>");
}