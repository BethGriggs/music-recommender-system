var getParams = function(key) {
  // Helper function for extracting querystring - http://stackoverflow.com/questions/9870512/how-to-obtaining-the-querystring-from-the-current-url-with-javascript
  return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

Template.room.rendered = function() {
  // Extract querystring params and build into an object
  var genre = getParams('genre');
  var mood = getParams('mood');
  var userParams = {
    mood: mood,
    genre: genre,
    joinTime: new Date()
  };
  Room.update({_id: this.data._id}, {$push: {users: userParams}}); // Push new user of room to users array inside the room
  // Must handle server reload and duplicating users! Should be done by checking if current user ID and params have already
  // been inserted in last two hours
}
