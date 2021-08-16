const Discord = require("discord.js");
const SourceQuery = require('sourcequery');
const client = new Discord.Client();

let PREFIX;
let YOUR_TOKEN;
let SERVER_IP;
let SERVER_PORT;

client.on ("ready", () => {

  console.log(`Logged in ${client.user.username}#${client.user.discriminator}`);

  client.user.setPresence ({
  status: 'idle',
  })

});

client.on("message", async message => {

  function queryserver(ip, port) {
    let sq = new SourceQuery(5000);
    console.log(ip + "  " + port);
    sq.open(ip, port);
    sq.getInfo(function (err, info) {
      if (!err) {
                console.log("Discord Message sent");
                message.channel.send({
                  embed: {
                    color: 9459760,
                    title: `${ip} CS:GO Server Status`,
                    fields: [{
                      name: "📦 Server Name",
                      value: "***"+info.name+"***"+"  `" + info.game + "`"
                    },
                    {
                      name: "🌐 Server IP",
                      value: ip + ":" + port,
                      "inline": true
                    },
                    {
                      name: "🗺️ Current Map",
                      value: info.map,
                      "inline": true
                    },
                    {
                      name: "👥 Players",
                      value: info.maxplayers+"/"+info.players,
                      "inline": true
                    },
                    {
                      name: "🤖 Bots",
                      value: info.bots,
                      "inline": true
                    },
                    {
                      name: "🏷️ Version",
                      value: info.version,
                      "inline": true
                    },
                    {
                      name: "🪧 Protocol",
                      value: info.protocol,
                      "inline": true
                    }
                    ],
                    timestamp: new Date(),
                    
                  }
                });
      }
      else {
        console.log("Error in info query");
        message.channel.send("Error in info query");
      }
    });
  }

  if (message.author.bot) return;

  if (message.content.indexOf(PREFIX) !== 0) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ ss/g);
  let arguments = args.shift().toLowerCase();
  arguments = arguments.split(" ");
  const command = arguments[0];

  if (command === "status") {
    queryserver(SERVER_IP, SERVER_PORT);
  }

});

client.login(YOUR_TOKEN);
