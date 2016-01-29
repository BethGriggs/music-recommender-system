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

Router.route('joinRoom', {
  // Server side route - Only available on the server and will not load in the browser
  path: '/room/:_id/join',
  where: 'server',
  action: function() {
    var req = this.request; // Request Info
    var res = this.response; // Response Object
    var roomId = this.params._id; // Room ID
    var data = req.body; // Data

    Room.update({_id: roomId}, {$push: {users: data}}, function(err) {
      // Push new user of room to users array inside the room and issue responses
      if(err) {
        res.statusCode = 500;
        res.body = err;
      } else {
        res.statusCode = 200;
      }
      res.end();
    });
  }
});

Router.route('getTracks', {
  path: '/tracks',
  where: 'server',
  action: function() {
    var req = this.request;
    var res = this.response;
    var data = req.body;

    console.log(data);
  }
})


Router.route('room', {
  // Defines a route with an ID as a parameter - ID of the room you wish to join
  path: '/room/:_id',
  waitOn: function() {
    // Wait for only subscription to this room. Only makes one room available to the client. Least Privilege Approach!
    return Meteor.subscribe('room', this.params._id);
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
  data: function() {
    // This will make data available for use in templates. For example {{moods[0].name}} in a template would
    // display the name for 0 element in moods. See templates/index/index.html for uses
    return Room.findOne();
  }
});
