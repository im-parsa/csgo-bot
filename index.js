const Discord = require("discord.js");
const SourceQuery = require('sourcequery');
const prefix = "+";
const client = new Discord.Client();

let port = "19000";
let address = "S2.RGCSS.ir";



client.on ("ready", () => {

  console.log(`Logged in ${client.user.username}#${client.user.discriminator}`);

  client.user.setPresence ({
  status: 'idle',
  })

  function queryserver2(ip, port) {
    let sq = new SourceQuery(1000); // 1000ms timeout
    console.log(ip + "  " + port);
    sq.open(ip, port);
    sq.getInfo(function (err, info) {
        sq.getPlayers(function (err, players) {
            client.user.setActivity(`👤 ${info.maxplayers}/${info.players}`, { type: 'WATCHING' })
        });
    });
  }

  queryserver2(address, port);

}); 


client.on("message", async message => {
  function queryserver(ip, port) {
    let sq = new SourceQuery(1000); // 1000ms timeout
    console.log(ip + "  " + port);
    sq.open(ip, port);
    sq.getInfo(function (err, info) {
      if (!err) {
        sq.getPlayers(function (err, players) {
          if (!err) {
            console.log(sq.address);
            var counter = 0;
            playersname = "";
            for (i = 0; i < players.length; i++) {
              playersname = playersname + players[i].name + " - " || " 0 ";
              if (counter == players.length - 1) {
                console.log("Discord Message sent");
                message.channel.send({
                  embed: {
                    color: 9459760,
                    title: `${ip} CS:GO Server Status`,
                    fields: [{
                      name: "📦 Server Name",
                      value: info.name
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
                      name: "👥 Max Players",
                      value: info.maxplayers,
                      "inline": true
                    },
                    {
                      name: "👤 Current Players",
                      value: info.players,
                      "inline": true
                    },
                    {
                      name: "🎮 Following Players are online",
                      value: "```" + playersname + " \n```"
                    }
                    ],
                    timestamp: new Date(),
                    
                  }
                });
              }
              counter++;
            }
          }
          else {
            console.log("Error in Players query");
            message.channel.send("Error in Players query");
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

  if (message.content.indexOf(prefix) !== 0) return;

  const args = message.content.slice(prefix.length).trim().split(/ ss/g);
  var arguments = args.shift().toLowerCase();
  arguments = arguments.split(" ");
  const command = arguments[0];
  console.log(arguments);
  console.log(command);


  if (command == "status") {
    queryserver(address, port);
  }

});



process.on("unhandledRejection", (reason, promise) => {
  try {
      console.error("Unhandled Rejection at: ", promise, "reason: ", reason.stack || reason);
  } catch {
      console.error(reason);
  }
});


client.login("ODQwNDQ2MjI0MjA0NTYyNDUy.YJYUig.rXcGlAkmtKUP7simCYQNByTpP1k");
