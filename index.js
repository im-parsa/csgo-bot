const Discord = require("discord.js");
const SourceQuery = require('sourcequery');
const prefix = "+";
const client = new Discord.Client();

client.on ("ready", () => {

  console.log(`Logged in ${client.user.username}#${client.user.discriminator}`);

  client.user.setPresence ({
  status: 'idle',
  })

  setInterval(() => {
    
  function queryserver2(ip, port) {
    let sq = new SourceQuery(5000); // 1000ms timeout
    console.log(ip + "  " + port);
    sq.open(ip, port);
    sq.getInfo(function (err, info) {
      if (!err) {
        sq.getPlayers(function (err, players) {
          if (!err) {
            
            client.user.setActivity(`👤 ${info.maxplayers}/${info.players}`, { type: 'WATCHING' })

          }
          else {
            console.log("Error in Players query");
          }
        });
      }
      else {
        console.log("Error in info query");
      }
    });
  }

    queryserver2("S2.RGCSS.ir", "19000");

  }, 15000);

}); 

client.on("message", async message => {
  function queryserver(ip, port) {
    let sq = new SourceQuery(5000); // 1000ms timeout
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

  if (message.content.indexOf(prefix) !== 0) return;

  const args = message.content.slice(prefix.length).trim().split(/ ss/g);
  var arguments = args.shift().toLowerCase();
  arguments = arguments.split(" ");
  const command = arguments[0];
  console.log(arguments);
  console.log(command);


  if (command == "status") {
    queryserver("S2.RGCSS.ir", "19000");
  }

});

client.login("ODQwNDQ2MjI0MjA0NTYyNDUy.YJYUig.rXcGlAkmtKUP7simCYQNByTpP1k");
