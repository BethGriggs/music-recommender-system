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

Router.route('/room/:_id/join', function() {
  var roomId = this.params._id;
  var joiningUser = this.request.body;
  Room.update({_id: this.data._id}, {$push: {users: joiningUser}}); // Push new user of room to users array inside the room
  this.response.statusCode = 200;
  this.response.end();
}, {where: 'server'})

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
