//Global variables

//onEvent controls event firing
var onEvent = false;

//event timer initiation
var eventTimer = 40;

//rolls for event when eventTimer > eventMax
var eventMax = 120;

//used for debug
var debugText = "";

//initiate child and parent variables to hold persons
var child = new Person("defaultChild");
var parent = undefined;

// load function
$(document).ready(function(){
    //hiding and animating elements
    $("#parent-col").hide();
    $(".debug, .debug-label").hide();
    $("#main-content").hide();
    $("#main-content").fadeIn(); 
})

// Update function (every 10ms)
window.setInterval(function () {

    //if an event is not happening
    if(!onEvent){

        //tick down timer
    	eventTimer--;

        //age people
    	age(child);
    	if(parent !== undefined)
    		age(parent);

        //roll for events
        if(eventTimer <= 0){
        	eventTimer = eventMax;
        	rollEvent();
        }

    }
    //update UI every 10ms
    updateUI();

}, 10);

//increment age
function age(person){
    person.age += 0.01;
}

//update UI
function updateUI(){

    //update child UI elements
	$('.child.age').text(Math.floor(child.age));
	$('.child.misery').text(Math.floor(child.misery));
	$('.child.hunger').text(Math.floor(child.hunger));
	$('.child.notifications').html(embedNL(child.notifsHistory));
	$('.child.debug').text(debugText);

    //if parent exists, update parent UI elements
	if(parent !== undefined){
		$('.parent.age').text(Math.floor(parent.age));
		$('.parent.misery').text(Math.floor(parent.misery));        
		$('.parent.hunger').text(Math.floor(parent.hunger));        
		$('.parent.notifications').html(embedNL(parent.notifsHistory));
	}
}

//determines whether to fire a specific event, random event, or not at all
function rollEvent() {

    //generate a random number c for child, p for parent
    var cRand = Math.random();
    var pRand = Math.random();

    //check against the event thresholds
    if (Math.floor(child.age) == 18) {
        //fires transition to adult if 18yrs old
    	triggerEvent(child, adultTrigger); 

    } else if (Math.floor(child.age) == 26) {
        //fires transition to parent if 26yrs old
        triggerEvent(child, parentTrigger);

    } else if(cRand < child.eventThreshold){

    	triggerEvent(child, 0);    
    } else if(parent !== undefined && pRand < parent.eventThreshold) {
    	triggerEvent(parent, 0);
    } else {}
}

function triggerEvent(person, eventSelect){
	onEvent = true;
    var newEvent;

    //check if a particular event is selected
    if(eventSelect !== 0){

        //check if the adult transition is selected
        if(eventSelect === adultTrigger){
            //transition from child - adult, change all events to adult events
            person.allowableEvents = [9,10,11];
        }

        //trigger the selected event directly
        newEvent = EventDB[eventSelect];
    }

    //pick a random event from the list of allowable events.
    else if(eventSelect === 0 && person.allowableEvents.length > 0){

        //random selection
        var personIndex = Math.floor(Math.random() * person.allowableEvents.length);
        var randEventIndex = person.allowableEvents[personIndex];
        
        newEvent = EventDB[randEventIndex];  
    }

    //sometimes a bad event is selected
    if(newEvent !== undefined){

        //push the story
        pushNotif(person, newEvent.notif);

        //create the button
        createButtons(newEvent, person);

        //remove this event
        person.allowableEvents.splice(personIndex,1);

    } else {
        onEvent = false;
    }
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
	var state = "parent";
	var tmpDiv;
	var tmpBtn;
	if(person.age<27){
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
        if(person.age < 27){
            btnClickHandler(i, person, result, parent);
        } else {
            btnClickHandler(i, person, result, child);
        }
    }
}

//executed on button click
function btnClickHandler(i, person, result, otherPerson){
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

        if (result.otherprops !== undefined){
            for (var k = 0; k < result.otherprops.length; k++) {
                updatePerson(otherPerson, result.otherprops[k], result.othervalues[k]);
            }
        }

        //adult - parent transition
        if (result.notif == "You have no idea what you're doing. But you feel the beginning of something"){
            switchToParent();
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

//animation for first parent transition (child slides to left and becomes parent, new child appears)
function showParent(){
    /*
    //create a temporary div element
	var tmpDiv = $(document.createElement('div'));
	tmpDiv.addClass("animDiv col-xs-3");

    //remove the offset class in the child col and substitute with the temp div
	$("#child-col").removeClass("col-xs-offset-3").before(tmpDiv);
    */
    //hide the anim div while growing the parent col
    $("#child-col").hide();
	$(".animDiv").hide('slow', function(){});
	$("#parent-col").show();
    $("#child-col").show('slow',function(){});
}

//child to parent transition
function switchToParent(){

    //place child inside parent container
	parent = child;

    //create new child inside child container
    child = new Person("defaultChild");

    //animate process
	showParent();

    //set parent events
    parent.allowableEvents = [13, 14, 15, 16];
}

function skipAdult(){
    child.age = 17;
}

function skipParent(){
    child.age = 25;
}

//person prototype
function Person(name){
	this.name = name;
	this.age = 0;
	this.eventThreshold = 0.3;
	this.allowableEvents = [0,1,2,3,4,5,6,7];
    this.notifsHistory = [];
    this.misery = 0;
    this.hunger = 0;
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