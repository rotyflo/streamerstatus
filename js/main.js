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
  "invalid channel",
  "invalid-channel",
  "riotgames",
  "syndicate",
  "summit1g",
  "esl_csgo",
  "esltv_cs"
];
let app = document.getElementById("app");

for (let i = 0; i < channels.length; i++) {
  generateHTML(channels[i]);
}

//------FUNCTIONALITY------//
$("#search-box").keyup(function(event) {
  if (event.keyCode === 13) $("#search-btn").click();
});

$("#search-btn").on("click", function() {
  generateHTML($("#search-box").val());
});

function generateHTML(channel) {
  let url = `https://twitch-proxy.freecodecamp.rocks/twitch-api/channels/${channel}`;

  $.getJSON(url, function (data) {
    if (data.hasOwnProperty("error")) invalidChannelHTML(data);
    else {
      url = `https://twitch-proxy.freecodecamp.rocks/twitch-api/streams/${channel}`;

      $.getJSON(url, function (data) {
        if (data.stream === null) offlineChannelHTML(channel);
        else onlineChannelHTML(data);
      });
    }
  });
}

function invalidChannelHTML(data) {
  app.insertAdjacentHTML("afterbegin", `
    <div class="card bg-dark border-secondary rounded-0">
      <p class="text-danger">${data.status}: ${data.error}</p>
      <p class="text-light">${data.message}</p>
    </div>
  `);
}

function offlineChannelHTML(channel) {
  app.insertAdjacentHTML("afterbegin", `
    <a class="card bg-dark text-light border-secondary rounded-0" href="https://www.twitch.tv/${channel}" target="_blank">
      <div>
        <p class="text-warning">OFFLINE</p>
        <p>${channel}</p>
      </div>
    </a>
  `);
}

function onlineChannelHTML(data) {
  let streamer = data.stream.channel.display_name;
  let game = data.stream.game;
  let status = data.stream.channel.status;
  let link = data.stream.channel.url;

  app.insertAdjacentHTML("afterbegin", `
    <a class="card bg-dark text-light border-secondary rounded-0" href="${link}" target="_blank">
      <div>
        <p class="text-success">ONLINE</p>
        <p>${streamer} is playing ${game}</p>
        <p>Description: <br>${status}</p>
      </div>
    </a>
  `);
}