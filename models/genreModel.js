// Create a new database collection called genres. Bind this to a global variable so it can be used for queries on routes
// For example in the data option of a route
Genre = new Mongo.Collection('genres');

// This defines the permissions of a collection - A client is not allowed to insert, update or delete only read
// By default meteor publishes everything and allows any client to do anything through the packages insecure and autopublish
// As good practice these should be removed
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
