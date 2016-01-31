Template.index.rendered = function() {
  // Once the template has been rendered init select2
  $('select').select2();
}


// This defines events on the template - The template name is used to show you want to bind an event to a specific template
Template.index.events({
  "submit #joinRoom": function(e) {
    // Specified the event and the element you wish to bind to - In this case submitting a form with the ID of joinRoom
    e.preventDefault(); // Prevent form redirection
    var controls = e.target.elements; // Get form elements
    var url = '/room/' + controls[2].value; // Build post URL
    var data = {
      // Data Object of moods and genre for joining user
      mood: controls[0].value,
      genre: controls[1].value,
      joinTime: new Date(),
      userId: Meteor.userId()
    };
    var params = jQuery.param(data);
    window.location.href = url + '?' + params;
    return false;
  }
});
