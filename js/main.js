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
  let request = new XMLHttpRequest();

  request.open("GET", url, true);
  request.send();

  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      let data = JSON.parse(request.responseText);

      if (data.hasOwnProperty("error")) invalidChannelHTML(data);
      else {
        url = `https://wind-bow.glitch.me/twitch-api/streams/${channel}`;
        request = new XMLHttpRequest();

        request.open("GET", url, true);
        request.send();

        request.onload = function () {
          if (request.status >= 200 && request.status < 400) {
            data = JSON.parse(request.responseText);

            if (data.stream === null) offlineChannelHTML(channel);
            else onlineChannelHTML(data);
          }
        }

        request.onerror = function () { };
      }
    }
  }

  request.onerror = function () { };
}

function invalidChannelHTML(data) {
  let status = data.status;
  let error = data.error;
  let message = data.message;

  app.innerHTML += `
    <a class="card span6">
    <div>  
    <p>${status}: ${error}</p><p>${message}</p>
    </div>
    </a>
  `;
}

function offlineChannelHTML(channel) {
  app.innerHTML += `
    <a class="card span6" href="https://www.twitch.tv/${channel}" target="_blank">
    <div>  
    <p>${channel} <span class="offline">(offline)</span></p>
    </div>
    </a>
  `;
}

function onlineChannelHTML(data) {
  let name = data.stream.channel.display_name;
  let game = data.stream.game;
  let status = data.stream.channel.status;
  let link = data.stream.channel.url;

  app.innerHTML += `
    <a class="card span6" href="${link}" target="_blank">
      <div>
        <p>${name} is playing ${game} <span class="online">(online)</span></p>
        <p>Description: <br>${status}</p>
      </div>
    </a>
  `;
}