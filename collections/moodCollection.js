moodCollection = new Mongo.Collection('moodCollection');

moodCollection.allow({
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
