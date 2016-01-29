
Template.room.events({
  'click #getTracks': function(e) {
    e.preventDefault();
    var query = window.location.search;
    var temp = query.split('=')[1];
    var mood = temp.split('&')[0];
    temp = window.location.href.split('/')[4];
    var roomId = temp.split('?')[0];
    var data = {
      'roomId': roomId,
      'mood': mood
    };

    HTTP.put('/tracks', {data: data}, function(err, res) {
      if(err) {

      }

      if(res) {

      }
    });

    return false;
  }
});
