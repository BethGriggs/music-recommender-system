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
    var url = '/room/' + controls[2].value + '/join';
    var data = {
      mood: controls[0].value,
      genre: controls[1].value
    };
    console.log(url);
    console.log(data);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.addEventListener('load', function(e) {
      if(xhr.status === 200) {
        window.location.href = '/room/' + controls[2].value + '?mood=' + data.mood + '&genre=' + data.genre;
      }
    });
    var json = JSON.stringify(data);
    xhr.send(json);
    return false;
  }
});
