"use strict";

let channels = [
  "ESL_SC2",
  "OgamingSC2",
  "cretetion",
  "freecodecamp",
  "storbeck",
  "habathcx",
  "RobotCaleb",
  "noobs2ninjas",
  "invalid channel"
];
let app = document.getElementById("app");

for (let i = 0; i < channels.length; i++) {
  generateHTML(channels[i]);
}

//------FUNCTIONALITY------//
$("#search-box").keyup(function (event) {
  if (event.keyCode === 13) $("#search-btn").click();
});

$("#search-btn").on("click", function () {
  generateHTML($("#search-box").val());
});

function generateHTML(channel) {
  let url = `https://twitch-proxy.freecodecamp.rocks/twitch-api/streams/${channel}`;

  $.getJSON(url, function (data) {
    let isOnline = (data.stream !== null);

    if (data.hasOwnProperty("error")) invalidChannelHTML(data);
    else {
      url = `https://twitch-proxy.freecodecamp.rocks/twitch-api/channels/${channel}`;;

      $.getJSON(url, function (data) {
        console.log(JSON.stringify(data));
        if (isOnline) onlineChannelHTML(data);
        else offlineChannelHTML(data);
      });
    }
  });
}

function invalidChannelHTML(data) {
  app.insertAdjacentHTML("afterbegin", `
    <div>
      <p>${data.status}: ${data.error}</p>
      <p>${data.message}</p>
    </div>
  `);
}

function offlineChannelHTML(data) {
  console.log(JSON.stringify(data));
  let streamer = data.display_name;
  let logo = data.logo;

  app.insertAdjacentHTML("beforeend", `
      <hstack spacing=s align-y=top>
      <img src="${logo}">
      <p>
        <a href="https://www.twitch.tv/${streamer}" target="_blank">${streamer}</a><br>
        <span style="color: red;">Offline</span>
      </p>
      </hstack>
  `);
}

function onlineChannelHTML(data) {
  let streamer = data.display_name;
  let game = data.game;
  let status = data.status;
  let link = data.url;
  let logo = data.logo;
  let followers = data.followers;
  let views = data.views;

  app.insertAdjacentHTML("afterbegin", `
      <hstack spacing=s align-y=top>
      <img src="${logo}">
      <p>
        <a href="${link}" target="_blank">${streamer}</a><br>
        <u>${game}</u><br>
        <span>${status}</span><br>
        <span>Followers: ${followers}</span><br>
        <span>Views: ${views}</span>
      </p>
      </hstack>
  `);
}

// test = { "mature": true, "status": "It's a Divison kind of Day", "broadcaster_language": "en", "display_name": "cretetion", "game": "Tom Clancy's The Division", "language": "en", "_id": 90401618, "name": "cretetion", "created_at": "2015-05-06T15:57:39Z", "updated_at": "2016-10-10T22:00:45Z", "delay": null, "logo": "https://static-cdn.jtvnw.net/jtv_user_pictures/cretetion-profile_image-12bae34d9765f222-300x300.jpeg", "banner": null, "video_banner": "https://static-cdn.jtvnw.net/jtv_user_pictures/cretetion-channel_offline_image-0410bb4dec3a9991-1920x1080.jpeg", "background": null, "profile_banner": "https://static-cdn.jtvnw.net/jtv_user_pictures/cretetion-profile_banner-c50d8ffd97fc7ffa-480.png", "profile_banner_background_color": null, "partner": false, "url": "https://www.twitch.tv/cretetion", "views": 11631, "followers": 908, "_links": { "self": "https://api.twitch.tv/kraken/channels/cretetion", "follows": "https://api.twitch.tv/kraken/channels/cretetion/follows", "commercial": "https://api.twitch.tv/kraken/channels/cretetion/commercial", "stream_key": "https://api.twitch.tv/kraken/channels/cretetion/stream_key", "chat": "https://api.twitch.tv/kraken/chat/cretetion", "subscriptions": "https://api.twitch.tv/kraken/channels/cretetion/subscriptions", "editors": "https://api.twitch.tv/kraken/channels/cretetion/editors", "teams": "https://api.twitch.tv/kraken/channels/cretetion/teams", "videos": "https://api.twitch.tv/kraken/channels/cretetion/videos" } };