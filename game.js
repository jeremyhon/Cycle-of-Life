//Global variables

//onEvent controls event firing
var onEvent = true;

//event timer initiation
var eventTimer = 40;

//rolls for event when eventTimer > eventMax
var eventMax = 120;

//age increment every 10 ms
var ageInc = 0.008;

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

    $( "<div>Warning: You are about to experience apathy, misery, and possibly starvation. Are you sure you wish to proceed?</div>" ).dialog({
        buttons: [{
          text: "Ok",
          click: function() {
            $( this ).dialog( "close" );
            onEvent = false;
          }
        }]
    });
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

    //checks if misery and hunger should be shown. If false, do not show, else if hidden and a number, show
    updateUIStat("child","misery");
    updateUIStat("child","hunger");
    if(parent !== undefined){
        updateUIStat("parent","misery");
        updateUIStat("parent","hunger");
    }

}

function updateUIStat(person, stat){
    var personObj;
    if(person === "child"){
        personObj = child;
    } else {
        personObj = parent;
    }

    if(personObj[stat] === false){
        $('.'+person+'.'+stat).hide();
        $('.'+person+'.'+stat+'-label').hide();
    } else if($('.'+person+'.'+stat).is(':hidden')){ 
        $('.'+person+'.'+stat).show('slow', function(){});
        $('.'+person+'.'+stat+'-label').show('slow', function(){});
    }
}

//determines whether to fire a specific event, random event, or not at all
function rollEvent() {

    //generate a random number c for child, p for parent
    var cRand = Math.random();
    var pRand = Math.random();

    //check against the event thresholds
    if (Math.floor(child.age) == 18) {
        console.log("triggering adult transition");
        //fires transition to adult if 18yrs old
    	triggerEvent(child, adultTrigger); 

    } else if (Math.floor(child.age) == 26) {
        console.log("triggering parent transition");
        //fires transition to parent if 26yrs old
        triggerEvent(child, parentTrigger);

    } else if(cRand < child.eventThreshold){
        console.log("triggering random child event");
    	triggerEvent(child, 0);    

    } else if(parent !== undefined && pRand < parent.eventThreshold) {
        console.log("triggering random parent event");
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

//increment age
function age(person){
    updatePerson(person, "age", ageInc);
}

//updates a person's property with a value.
function updatePerson(person, prop, value){
	person[prop] += value;
}

//animation for first parent transition (child slides to left and becomes parent, new child appears)
function animChildToParent(){

    //place child inside parent container
    parent = child;
    //create new child inside child container
    child = new Person("defaultChild");

    //hide child column, replace with parent column
    $("#child-col").hide();
    $("#parent-col").show();

    //fade out offset col while fading in child column
	$(".offsetDiv").hide('slow', function(){});
    $("#child-col").show('slow',function(){});
}

function animReplaceParent(){

    //fade out parent column
    $("#parent-col").hide('slow',function(){//callback once complete (otherwise will execute simultaneously)

        //place child inside parent container. child column still visible, still shows child
        parent = child;
        child = new Person("defaultChild");

        //replace child column with parent column. parent column visible, shows parent
        $("#parent-col").show();
        $("#child-col").hide();

        //fade in child column with new child
        $("#child-col").show('slow',function(){});
    });     
}

//child to parent transition
function switchToParent(){

    //check if this is the first transition
    if(parent !== undefined){
        animReplaceParent();
    } else {
        //for the first transition
        animChildToParent();
    }

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
    this.misery = false;
    this.hunger = false;
}

//get an object property name as a string
function propName(prop, value){
   for(var i in prop) {
       if (prop[i] == value){
            return i;
       }
   }
   return false;
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