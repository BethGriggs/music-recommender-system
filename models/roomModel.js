// See genreModel.js for full comments
Room = new Mongo.Collection('rooms');

Room.allow({
  insert: function() {
    return true;
  },

  update: function() {
    return true;
  },

  remove: function() {
    return false;
  }
});
