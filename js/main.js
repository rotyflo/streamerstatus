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
let loading = document.getElementsByClassName("loading");
let online = document.getElementById("online");
let offline = document.getElementById("offline");
let error = document.getElementById("error");

for (let i = 0; i < channels.length; i++) {
  generateHTML(channels[i]);
}

//------FUNCTIONALITY------//
// $("#search-box").keyup(function (event) {
//   if (event.keyCode === 13) $("#search-btn").click();
// });

// $("#search-btn").on("click", function () {
//   generateHTML($("#search-box").val());
// });

function generateHTML(channel) {  
  let url = `https://twitch-proxy.freecodecamp.rocks/twitch-api/streams/${channel}`;

  $.getJSON(url, function (data) {
    let isOnline = (data.stream !== null);
    url = `https://twitch-proxy.freecodecamp.rocks/twitch-api/channels/${channel}`;;

    $.getJSON(url, function (data) {
      if (isOnline) printOnlineChannel(data);
      else printOfflineChannel(data);
    });
  })
  .fail( (jqXHR) => { printInvalidChannel(jqXHR.responseJSON, channel) });
}

function printInvalidChannel(err, channel) {
  loading[2].innerHTML = ""; // invalid channels loaded

  error.insertAdjacentHTML("afterbegin", `
    <hstack spacing=s align-y=top>
      <img>
      <p>${channel}: ${err.status} (${err.error})</p>
    </hstack>
  `);
}

function printOfflineChannel(data) {
  loading[1].innerHTML = ""; // offline channels loaded

  let streamer = data.display_name;
  let logo = data.logo;
  let followers = data.followers;
  let views = data.views;

  offline.insertAdjacentHTML("beforeend", `
      <hstack spacing=s align-y=top>
      <img src="${logo}">
      <p>
        <a href="https://www.twitch.tv/${streamer}" target="_blank">${streamer}</a><br>
        <span style="color: red;">Offline</span><br>
        <span>Followers: ${followers}</span><br>
        <span>Views: ${views}</span>
      </p>
      </hstack>
  `);
}

function printOnlineChannel(data) {
  loading[0].innerHTML = ""; // online channels loaded

  let streamer = data.display_name;
  let game = data.game;
  let status = data.status;
  let link = data.url;
  let logo = data.logo;
  let followers = data.followers;
  let views = data.views;

  online.insertAdjacentHTML("afterbegin", `
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