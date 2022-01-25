var account_id_field = document.getElementById("account_id"),
  player_id_field = document.getElementById("player_id"),
  video_id_field = document.getElementById("video_id"),
  submit_button = document.getElementById("submit_data"),
  place_holder = document.getElementById("place_holder"),
  player_data = {},
  player_html;

submit_button.addEventListener("click", function (e) {
  if (account_id_field.value && video_id_field.value) {
    player_data.account_id = account_id_field.value;
    player_data.player_id = player_id_field.value
      ? player_id_field.value
      : "default";
    player_data.video_id = video_id_field.value;
  } else {
    player_data.account_id = "1752604059001";
    player_data.player_id = "default";
    player_data.video_id = "5325486425001";
  }
  addPlayer();
});

// +++ Build the player and place in HTML DOM +++
function addPlayer() {
  brightcovePlayerLoader({
    refNode: document.querySelector('#place_holder'),
    accountId: player_data.account_id,
    playerId: player_data.player_id,
    videoId: player_data.video_id,
    onSuccess: function(success) {
      var myPlayer = success.ref;
      console.log('success', success);
      myPlayer.on('loadedmetadata',function(){
        var highestQuality, mp4Sources;
        myPlayer.on("loadstart", function () {
          // +++ Get video name and the MP4 renditions +++
          mp4Sources = myPlayer.currentSources();
          // +++ Sort the renditions from highest to lowest on size+++
          mp4Sources.sort(function (a, b) {
            return b.size - a.size;
          });
          // +++ Extract the highest rendition +++
          highestQuality = mp4Sources[0];
          myPlayer.off("loadstart");
          myPlayer.src(highestQuality);
        });
          });
    },
    onFailure(error) {
      console.log('error', error);
    }
  });
}

