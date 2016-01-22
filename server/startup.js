Meteor.startup(function() {
  var moods = ['Energentic', 'Dark', 'Positive', 'Calm'];
  var genres = ['Rock', 'Pop', 'Folk', 'Electro', 'R&B',
  'Hip-hop', 'Vocal Pop', 'Soundtrack', 'Classical', 'Latin', 'World', 'Reggae', 'Blues',
  'Jazz', 'Country', 'Metal'];
  if(moodCollection.find().count() === 0) {
    for(var i=0; i<moods.length; i++) {
      console.log('Inserting Mood: ' + moods[i]);
      moodCollection.insert({
        name: moods[i]
      });
    }
  }

  if(genreCollection.find().count() === 0) {
    for(var i=0; i<genres.length; i++) {
      console.log('Inserting Genre: ' + genres[i]);
      genreCollection.insert({
        name: genres[i]
      });
    }
  }
});
