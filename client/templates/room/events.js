Template.room.rendered = function() {
  // http://docs.meteor.com/#/full/templates_api - Explains how to bind to certain events within templates
  // Run this function on template load - Beth add your algorithm stuff here like AJAX Musicovery
  // Use HTTP.call - http://docs.meteor.com/#/full/http for AJAX
  var data = this.data; // Data available to template from router - Room Data
  console.log(data);
}
