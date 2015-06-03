var onEvent = false;
var eventTimer = 40;
var eventMax = 80;
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
        eventTimer--;
        update(child);
        if(adult !== undefined)
            update(adult);

        //roll for events
        if(eventTimer <= 0){
            eventTimer = eventMax;
            rollEvent();
        }

    }
    debugText = eventTimer;

    updateUI();
}, 10);

function update(person){
    //increment age
    person.age += 0.003;
}

//update UI
function updateUI(){
    $('.child.age').text(Math.floor(child.age));
    $('.child.happiness').text(Math.floor(child.happiness));
    $('.child.notifications').html(embedNL(child.notifsHistory));
    $('.child.debug').text(debugText);

    if(adult !== undefined){
        $('.adult.age').text(Math.floor(adult.age));
        $('.adult.happiness').text(Math.floor(adult.happiness));        
        $('.adult.notifications').html(embedNL(adult.notifsHistory));
    }
}

function rollEvent() {
    //generate a random number
    var cRand = Math.random();
    var aRand = Math.random();
    console.log("cRand: "+cRand);
    console.log("aRand: "+aRand);
    //check against the event thresholds
    if(cRand < child.eventThreshold){
        triggerEvent(child);
    } else if(adult !== undefined && aRand < adult.eventThreshold) {
        triggerEvent(adult);
    } else {}
}

function triggerEvent(person){
    onEvent = true;
    //pick a random event from the list of allowable events.
    var randEventIndex = person.allowableEvents[Math.floor(Math.random() * person.allowableEvents.length)];
    //TODO: remove events from allowable after triggering
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
        //make a button and a parent div
        tmpDiv = $(document.createElement('div'));
        tmpBtn = $(document.createElement('button'));
        //add the button to the div
        tmpDiv.append(tmpBtn);

        //set the attribute of the div
        tmpDiv.addClass("tempDiv "+state);

        //set the attributes of the button
        tmpBtn.addClass("btn btn-default margin eventBtn-"+i).text(event.choices[i]);

        //add the button to correct event holder
        $(".event-holder."+state).append(tmpDiv);
        var result = event.results[i];

        //add the click handler function
        btnClickHandler(i, person, result);
    }
}

//executed on button click
function btnClickHandler(i, person, result){
    //add the event handler to body
    $("body").on("click.event",".eventBtn-"+i,function(){
        //turn off events
        onEvent=false;
        //push the result
        pushNotif(person, result.notif);
        //update the person with the results
        for (var j = 0; j < result.props.length; j++) {
            updatePerson(person, result.props[j], result.values[j]);
        }
        //remove the button container
        $('.tempDiv').remove();
        $("body").off("click.event");
        eventTimer = eventMax;
    });
}

//updates a person's property with a value.
function updatePerson(person, prop, value){
    person[prop] += value;
}

//took me so long to get this just right lol.
function showAdult(){
    var tmpDiv = $(document.createElement('div'));
    tmpDiv.addClass("animDiv col-xs-3");
    $("#child-col").removeClass("col-xs-offset-3").before(tmpDiv);
    $(".animDiv").hide('slow', function(){});
    $("#adult-col").show('slow',function(){});
}

//takes the properties in the children and puts inside the adult divisions.
function switchToAdult(){
    adult = child;
    if(adult.age < 25) adult.age = 25;
    showAdult();
    child = new Person("defaultChild");
}


//person prototype
function Person(name){
    this.name = name;
    this.age = 0;
    this.eventThreshold = 0.3;
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
    var tmpDiv = $(document.createElement('div'));
    for (var i = 0 ; i < lines.length ; i++) {
        htmls.push(tmpDiv.text(lines[i]).html());
    }
    return htmls.join("<br>");
}