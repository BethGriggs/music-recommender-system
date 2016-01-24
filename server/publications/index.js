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
