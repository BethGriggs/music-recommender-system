// This file publishes data to clients which they can subscribe to. To access any data a publication must be
// made. Here the global variables from the models are used to return cursors of allowed data. The first parameter
// is the sub name which is used in subscribing

Meteor.publish('moods', function() {
  return Mood.find();
});

Meteor.publish('genres', function() {
  return Genre.find();
});

Meteor.publish('rooms', function() {
  return Room.find();
});

Meteor.publish('room', function(room) {
  return Room.find({_id: room});
});
