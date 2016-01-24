Meteor.publish('moods', function() {
  return Mood.find();
});

Meteor.publish('genres', function() {
  return Genre.find();
});
