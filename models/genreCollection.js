Genre = new Mongo.Collection('genres');

Genre.allow({
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
