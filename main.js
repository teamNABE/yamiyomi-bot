const fetch = require("node-fetch");
const discord = require("discord.js");
const fs = require("fs");

const option = {ws: {intents: discord.Intents.ALL}, restTimeOffset: 10};
const client = new discord.Client(option);
const logger = require("./util/logger");

const BOT_DATA = require("./config/config.json");
let channelID = require("./config/channel.json");

client.on("ready", message => {
    logger.info(`{green}${BOT_DATA.NAME}{reset} is ready! ver. ${BOT_DATA.VERSION} \n        login: {cyan}${client.user.tag}\n`);
    client.user.setActivity(`${BOT_DATA.NAME} Ver ${BOT_DATA.VERSION}`, { type: 'PLAYING' })
});


client.on("message", async message => {

    if(channelID.indexOf(message.channel.id)>-1 && !message.author.bot && !message.content.startsWith("//")){
        bouyomiTalk(`${message.author.username}\n${message.content}`);
    }

    if(message.content.startsWith(BOT_DATA.PREFIX)){
    	const [command, ...args] = message.content.slice(BOT_DATA.PREFIX.length).split(' ');
        
        if(command == BOT_DATA.COMMAND){

            switch(args[0]){
                case "add" :
                    channelID.push(message.channel.id);
                    message.channel.send(`チャンネル(${message.channel.name})を、読み上げリストに追加しました。`);
                    fs.writeFileSync('./config/channel.json', JSON.stringify(channelID, null, "\t"),'utf8');
                    break;

                case "delete" :
                case "del" :
                    if(channelID.indexOf(message.channel.id)==-1){
                        message.channel.send(`そのチャンネル(${message.channel.name})は、読み上げリストに存在しません。`);
                        return;
                    }
                    delete channelID[channelID.indexOf(message.channel.id)];
                    channelID = channelID.filter(Boolean);
                    message.channel.send(`チャンネル(${message.channel.name})を、読み上げリストから削除しました。`);
                    fs.writeFileSync('./config/channel.json', JSON.stringify(channelID, null, "\t"),'utf8');
                    break;
            }
        }
  	};
})


function bouyomiTalk(text, voice, volume, speed, tone) {
    let url=new URL('http://localhost:50080/talk');
    
    let query = {
        text  : text,
        voice : voice,
        volume: volume,
        speed : speed,
        tone  : tone
    };
    
    Object.entries(query).map( e => {
      if(e[1] !== undefined) url.searchParams.set(e[0], e[1]);
    });
    
    fetch(url)
      .then(res => res.json())
      .then(dat => console.log(dat.taskId));
  }
  if(!BOT_DATA.NAME && !BOT_DATA.VERSION && !BOT_DATA.token){
      logger.error("Please set config data.")
      process.exit(0);
  }

  bouyomiTalk(`${BOT_DATA.NAME}を起動しました。`);
  client.login(BOT_DATA.token);