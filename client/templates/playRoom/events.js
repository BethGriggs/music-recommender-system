Template.playRoom.rendered = function() {
    // http://docs.meteor.com/#/full/templates_api - Explains how to bind to certain events within templates
    // Run this function on template load - Beth add your algorithm stuff here like AJAX Musicovery
    // Use HTTP.call - http://docs.meteor.com/#/full/http for AJAX
    var data = this.data; // Data available to template from router - Room Data
    console.log(data);

    var roomMoods = [];
    for (var user in data.users){
        roomMoods.push(data.users[user].mood);
    }
    console.log("Room Moods 0: " + roomMoods.length);
    var total= 0;


    $.get( "/moodValues.json", function( moodValues ) {
        console.log("moodvals: " + moodValues);
        for (var i=0; i< roomMoods.length; i++){
                    console.log(roomMoods[i]);
                    console.log(moodValues[roomMoods[i]]);
                  //  console.log(moodValues[mood]);
        }
    });
}