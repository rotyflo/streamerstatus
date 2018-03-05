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
  "invalidchannel1982",
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
function generateHTML(channel) {
  let url = `https://wind-bow.glitch.me/twitch-api/channels/${channel}`;

  $.getJSON(url, function (data) {
    if (data.hasOwnProperty("error")) invalidChannelHTML(data);
    else {
      url = `https://wind-bow.glitch.me/twitch-api/streams/${channel}`;

      $.getJSON(url, function (data) {
        if (data.stream === null) offlineChannelHTML(channel);
        else onlineChannelHTML(data);
      });
    }
  });
}

function invalidChannelHTML(data) {
  app.innerHTML += `
    <div class="card bg-dark border-secondary rounded-0">
      <p class="text-danger">${data.status}: ${data.error}</p>
      <p class="text-light">${data.message}</p>
    </div>
  `;
}

function offlineChannelHTML(channel) {
  app.innerHTML += `
    <a class="card bg-dark text-light border-secondary rounded-0" href="https://www.twitch.tv/${channel}" target="_blank">
      <div>
        <p class="text-warning">OFFLINE</p>
        <p>${channel}</p>
      </div>
    </a>
  `;
}

function onlineChannelHTML(data) {
  let streamer = data.stream.channel.display_name;
  let game = data.stream.game;
  let status = data.stream.channel.status;
  let link = data.stream.channel.url;

  app.innerHTML += `
    <a class="card bg-dark text-light border-secondary rounded-0" href="${link}" target="_blank">
      <div>
        <p class="text-success">ONLINE</p>
        <p>${streamer} is playing ${game}</p>
        <p>Description: <br>${status}</p>
      </div>
    </a>
  `;
}