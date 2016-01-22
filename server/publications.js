Meteor.publish('moods', function() {
  return Moods.find();
});
