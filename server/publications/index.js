Meteor.publish('moods', function() {
  return Mood.find();
});

Meteor.publish('genres', function() {
  return Genre.find();
});

Meteor.publish('rooms', function() {
  return Room.find();
});
