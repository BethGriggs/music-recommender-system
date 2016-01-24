Router.route('index', {
  path: '/',
  waitOn: function() {
    return [
      Meteor.subscribe('moods'),
      Meteor.subscribe('genres'),
      Meteor.subscribe('rooms')
    ]
  },
  data: function() {
    return {
      moods: Mood.find(),
      genres: Genre.find(),
      rooms: Room.find()
    }
  }
});
