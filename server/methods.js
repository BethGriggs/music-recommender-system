Meteor.methods({
  calculateAverage: function(roomId) {
    console.log(roomId);
    HTTP.get('http://localhost:3000/moodValues.json', function(err, result) {
      if(err) {

      }

      if(result) {
          var total = 0;
          var room = Room.find({_id: roomId}).fetch();
          moodValues = JSON.parse(result.content);
          console.log(moodValues);

          for (var user in room.users){
            // Create a total accross all moods
              var mood = room.users[user].mood;
              total += moodValues[mood].index;
          }

          var avg = Math.round(total / room.users.length); // Get an average index for next mood
          var nextMood;

          for(var key in moodValues) {
            // Loop through moods and find average index of next mood
            if(moodValues.hasOwnProperty(key)) {
              var obj = moodValues[key];
              if(obj.index === avg) {
                nextMood = key; // Stop when next mood is found
                break
              }
            }
          }
          Meteor.call('getAverageTracks', nextMood, room._id); // Get tracks for next average mood
      }
    });
  },

  getAverageTracks: function(nextMood, roomId) {
    console.log(nextMood);
  }
});
