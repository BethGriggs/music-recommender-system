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
    var url = '/room/' + controls[2].value + '/join'; // Build post URL
    var data = {
      // Data Object of moods and genre for joining user
      mood: controls[0].value,
      genre: controls[1].value,
      joinTime: new Date()
    };
    HTTP.put(url, {data: data}, function(err, result) {
      // AJAX put request to add user to room
      if(err) {
        // Error Handler - Need to do.
      }

      if(result.statusCode === 200){
        // Redirect to room on success with querystring parameters set for easy access
        window.location.href = '/room/' + controls[2].value + '?mood=' + data.mood + '&genre=' + data.genre;
      }
    });

    return false;
  }
});
