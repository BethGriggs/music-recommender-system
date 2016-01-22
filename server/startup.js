Meteor.startup(function() {
  var moods = ['Energentic', 'Dark', 'Positive', 'Calm'];
  var genres = ['Rock', 'Pop', 'Folk', 'Electro', 'R&B',
  'Hip-hop', 'Vocal Pop', 'Soundtrack', 'Classical', 'Latin', 'World', 'Reggae', 'Blues',
  'Jazz', 'Country', 'Metal'];
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
});
