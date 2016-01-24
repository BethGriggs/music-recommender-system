// See genreModel.js for full comments
Mood = new Mongo.Collection('moods');

Mood.allow({
  insert: function() {
    return false;
  },

  update: function() {
    return false;
  },

  remove: function() {
    return false
  }
});
