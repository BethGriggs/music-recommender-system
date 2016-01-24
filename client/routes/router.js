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

Router.route('room', {
  path: '/room/:_id',
  waitOn: function() {
    return Meteor.subscribe('room', this.params._id);
  },
  data: function() {
    return Room.findOne(this.params._id);
  }
});
