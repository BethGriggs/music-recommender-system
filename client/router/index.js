Router.route('/', function() {
  this.render('index', {
     loadingTemplate: 'loading',
    subscriptions: function() {
      return Meteor.subscribe('moods');
    },
    data: function() {
      return {moods: Mood.find()};
    }
  });
});

Tracker.autorun(function(){
  // Rerun sub to ensure data is available
   Meteor.subscribe("moods");
});
