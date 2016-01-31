Meteor.methods({
  joinRoom: function(roomId, data) {
    Room.update({_id: roomId}, {
      $push: {
        users: data
      }
    });
  },
  calculateAverage: function(roomId) {
    var moodValues = HTTP.get('http://localhost:3000/moodValues.json');
    moodValues = moodValues.data;
    var total = 0;
    var room = Room.findOne({_id: roomId});
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

    return nextMood;
  },

  getTracks: function(data) {
    var url = 'http://musicovery.com/api/V3/playlist.php';
    var params = {
      tag: data.mood,
      apikey: 'mz7v924x',
      fct: 'getfrommood',
      format: 'json'
    };

    var result = HTTP.get(url, {params: params});
    var tracks = result.data.root.tracks.track;
    Room.update({_id: data.roomId}, {
      "$set": {
        "playlist": tracks
      }
    });
  }
});
