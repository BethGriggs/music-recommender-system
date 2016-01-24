Router.route('index', {
  path: '/',
  waitOn: function() {
    return Meteor.subscribe('moods');
  },
  data: function() {
    return {moods: Mood.find()}
  }
});
