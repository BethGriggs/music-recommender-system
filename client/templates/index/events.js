Template.index.rendered = function() {
  // Once the template has been rendered init select2
  $('select').select2();
}


// This defines events on the template - The template name is used to show you want to bind an event to a specific template
Template.index.events({
  "submit #joinRoom": function(e) {
    // Specified the event and the element you wish to bind to - In this case submitting a form with the ID of joinRoom
    e.preventDefault();
    var controls = e.target.elements;
    var url = 'http://' + window.location.hostname + ':' + window.location.port + '/room/' + controls[2].value + '?mood=' + controls[0].value + '&genre=' + controls[1].value;
    window.location.href = url;
    return false;
  }
});
