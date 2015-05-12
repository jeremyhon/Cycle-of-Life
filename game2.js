$traceurRuntime.ModuleStore.getAnonymousModule(function() {
  "use strict";
  var adultExists = false;
  var onEvent = false;
  var child = new Person("defaultChild");
  window.setInterval(function() {
    if (!onEvent) {
      $('#debug').text(100);
      update(child);
    }
    $('#debug').text(child.currentAge);
    $('#child-age-display').text(Math.floor(child.currentAge));
    $('#child-notifications').text(child.notifsHistory);
  }, 10);
  function update(person) {
    person.currentAge += 0.01;
    rollEvent(person);
  }
  function rollEvent(person) {
    var newRandom = Math.random();
    if (newRandom < eventMultiplier) {
      triggerEvent(person);
    }
  }
  function triggerEvent(person) {
    person.onEvent = true;
    var randEventIndex = allowableEvents[Math.random() * person.allowableEvents.length];
    var newEvent = EventDB[randEventIndex];
    person.notifsHistory = person.notifsHistory + "\n\n" + newEvent.notif;
  }
  function createButtons(event, person) {
    var test = $('<button/>', {
      text: 'Test',
      click: function() {
        alert('hi');
      }
    });
    var parent = $('<div></div>').children().append(test).end();
    if (person.currentAge < 25) {
      $('#child-event-holder').append(parent);
    } else {}
  }
  function Event(index, notif, choices, reqs) {
    this.index = index;
    this.notif = notif;
    this.choices = choices;
    this.reqs = reqs;
  }
  function Person(name, currentAge, eventMultiplier, allowableEvents) {
    this.name = name;
    this.currentAge = currentAge;
    this.eventMultiplier = 0.1;
    if (allowableEvents.length == 0) {
      for (var i = 0; i < EventDB.length - 1; i++) {
        allowableEvents += [i];
      }
      ;
    }
    this.notifsHistory = "";
  }
  var EventDB = [new Event(0, "This is a sample event.", ["Default choice here"])];
  return {};
});
//# sourceURL=traceured.js
