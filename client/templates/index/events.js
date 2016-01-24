Template.index.rendered = function() {
  $('select').select2();
}

Template.index.events({
  "submit #joinRoom": function(e) {
    e.preventDefault();
    var controls = e.target.elements;
    var url = 'http://' + window.location.hostname + ':' + window.location.port + '/room/' + controls[2].value + '?mood=' + controls[0].value + '&genre=' + controls[1].value;
    window.location.href = url;
    return false;
  }
});
