Meteor.startup(function() {
  // This function is run everytime meteor starts - It can be used to insert required data into
  // the database at first run. If any collections are empty populate them at startup with data
  var moods = ['depressed','sad','disappointed', 'anxious', 'distressed', 'uncomfortable', 'discontent',
  'frustrated', 'annoyed', 'angry', 'bored', 'embarrassed', 'apathetic', 'enraged',
  'afraid', 'worried', 'melancholy', 'tired', 'sleepy', 'pensive','impressed', 'peaceful', 'amused',
  'contemplative', 'hopeful', 'excited', 'relaxed', 'determined', 'satisfied', 'calm', 'content', 'pleased',
  'happy', 'good'];

  var genres = ['Rock', 'Pop', 'Folk', 'Electro', 'R&B',
  'Hip-hop', 'Vocal Pop', 'Soundtrack', 'Classical', 'Latin', 'World', 'Reggae', 'Blues',
  'Jazz', 'Country', 'Metal'];
  var rooms = [
    {
      name: 'Room 1',
      playlist: [],
      users: []
    },
    {
      name: 'Room 2',
      playlist: [],
      users: []
    },
    {
      name: 'Room 3',
      playlist: [],
      users: []
    }
  ];

  if(Mood.find().count() === 0) {
    for(var i=0; i<moods.length; i++) {
      console.log('Inserting Mood: ' + moods[i]);
      Mood.insert({
        name: moods[i]
      });
    }
  }

  if(Genre.find().count() === 0) {
    for(var i=0; i<genres.length; i++) {
      console.log('Inserting Genre: ' + genres[i]);
      Genre.insert({
        name: genres[i]
      });
    }
  }

  if(Room.find().count() === 0) {
    for(var i=0; i<rooms.length; i++) {
      console.log('Inserting Room: ' + rooms[i].name);
      Room.insert(rooms[i]);
    }
  }

  // Setup Guest Accounts
  console.log('Enabled Guest Accounts');
  AccountsGuest.anonymous = true;
  AccountsGuest.name = true;
  Meteor.setInterval(function() {
    // Check for expired accounts every X amount
    var before = new Date();
    before.setHours(before.getHours() - 2);
    Accounts.removeOldGuests(before);

    var rooms = Room.find({}).fetch();

    var users = Meteor.users.find({}, {
      // Get all user IDs
      fields: {
        '_id': 1
      }
    }).fetch();

    var userIds = [];
    for(var i=0; i<users.length; i++) {
      userIds.push(users[i]._id); // Flatten users to array of ids
    }


    for(var i=0; i<rooms.length; i++) {
      // Remove expired user records from room
      var id = rooms[i]._id;
      Room.update({_id: id}, {
        "$pull": {
          "users": {
            "_id": {
              "$nin": userIds
            }
          }
        }
      });
    }
  }, 120000);
});
