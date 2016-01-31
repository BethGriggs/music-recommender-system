// Defines Meteor URL's - Router.route accepts a name and an array of options. If the name matches a template
// name defined in a HTML page that templated is rendered for the route. If not this needs to be explicitly
// stated in the route options

Router.route('index', {
  path: '/', // URL Structure
  waitOn: function() {
    return [
      // Subscribe to published data from Moods, Genres and Rooms. Subscriptions make data from
      // the server available on the client. Doing this inside the waitOn function will make the router
      // display loading until all the data has been subscribed to.
      Meteor.subscribe('moods'),
      Meteor.subscribe('genres'),
      Meteor.subscribe('rooms')
    ]
  },
  data: function() {
    // This will make data available for use in templates. For example {{moods[0].name}} in a template would
    // display the name for 0 element in moods. See templates/index/index.html for uses
    return {
      moods: Mood.find(),
      genres: Genre.find(),
      rooms: Room.find()
    }
  }
});

Router.route('room', {
  // Defines a route with an ID as a parameter - ID of the room you wish to join
  path: '/room/:_id',
  waitOn: function() {
    // Wait for only subscription to this room. Only makes one room available to the client. Least Privilege Approach!
    return Meteor.subscribe('room', this.params._id);
  },
  onBeforeAction: function(next) {
    var roomId = this.params._id;
    var data = this.params.query;
    var next = this.next;
    Meteor.call('joinRoom', roomId, data, function(err, result) {
      if(!err) {
        next();
      }
    });
  },
  data: function() {
    // Make Room Data available to given template. As this is being returned directly just using {{name}} would show name
    // of the room being subscribed to
    return Room.findOne(this.params._id);
  }
});

Router.route('playRoom', {
  path: '/room/:_id/play', // URL Structure
  waitOn: function() {
    return Meteor.subscribe('room', this.params._id);
  },
  onBeforeAction: function(next) {
    var next = this.next;
    var roomId = this.params._id;

    var playlist = Room.findOne({_id: roomId}).playlist.track;
    if(playlist) {
        // If playlist is empty on play populate
      if(playlist.length === 0) {
        Meteor.call('calculateAverage', roomId, function(err, result) {
          var data = {
            mood: result,
            roomId: roomId
          };

          Meteor.call('getTracks', data, function(err, result) {
            if(!err) {
              next();
            }
          });
        });
      } else {
        next();
      }
    } else {
      Meteor.call('calculateAverage', roomId, function(err, result) {
        var data = {
          mood: result,
          roomId: roomId
        };

        Meteor.call('getTracks', data, function(err, result) {
          if(!err) {
            next();
          }
        });
      });
    }
  },
  data: function() {
    // This will make data available for use in templates. For example {{moods[0].name}} in a template would
    // display the name for 0 element in moods. See templates/index/index.html for uses
    return Room.findOne();
  }
});
