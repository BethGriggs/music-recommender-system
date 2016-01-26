Meteor.startup(function() {
  // This function is run everytime meteor starts - It can be used to insert required data into
  // the database at first run. If any collections are empty populate them at startup with data
  var moods = ['Energentic', 'Dark', 'Positive', 'Calm'];
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
});
