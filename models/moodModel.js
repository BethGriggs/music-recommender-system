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
