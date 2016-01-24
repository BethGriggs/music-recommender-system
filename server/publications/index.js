Meteor.publish('moods', function() {
  return Mood.find();
});
