const Discord = require('discord.js');
const client = new Discord.Client();
const { playSong, skipSong } = require('./youtube/index');
require('dotenv').config();

client.login(process.env.CLIENT_LOGIN);

client.on('ready', () => {
    console.log('im ready');
});

const BeetSay = msg => {
    const playmusic = file => {
        file = './assets/mp3/' + file;
        msg.member.voice.channel
            .join()
            .then(VoiceConnection => {
                // Playing the music, and, on finish, disconnecting the bot.
                VoiceConnection.play(file).on('finish', () =>
                    VoiceConnection.disconnect()
                );
                msg.reply('Playing...');
            })
            .catch(e => console.log(e));
    };

    const cmd = msg.content.split(' ')[1];

    switch (cmd) {
        case 'spanish':
            playmusic('Beetlejuice Speaks Spanish.mp3');
            break;
        case 'carrots':
            playmusic('carrots.mp3');
            break;
        case 'height':
            playmusic('how tall are you.mp3');
            break;
        case '1-1':
            playmusic('oneminusone.mp3');
            break;
        case 'bmw':
            playmusic('bmw.mp3');
            break;
        case '6ft':
            playmusic('6ft hole.mp3');
            break;
        case 'brazil':
            playmusic('msg to brazil.mp3');
            break;
        case 'red':
            playmusic('spell red uncut.mp3');
            break;
        case 'liver':
            playmusic('liver.mp3');
            break;
        case 'ingerland':
            playmusic('ingerland.mp3');
            break;
        default:
            return;
    }
};
/*
const queue = new Map();

const playSong = async msg => {
    const link = msg.content.split(' ')[1];
    const songInfo = await ytdl.getInfo(link);
    //console.log(songInfo);
    const { title, videoId } = songInfo.player_response.videoDetails;
    const song = {
        title: songInfo.title,
        url: songInfo.video_url,
    };
    msg.reply(`playing ${title}`);
    //return;

    const { channel: voiceChannel } = msg.member.voice;

    try {
        const connection = await voiceChannel.join();
        connection.play(ytdl(videoId));
    } catch (e) {
        console.log(e);
    }
};
*/

client.on('message', msg => {
    // console.log(msg);
    // console.log('message');
    //msg.member.voice.channel.join()
    const cmdType = msg.content.split(' ')[0];

    switch (cmdType) {
        case '-spam':
            msg.reply('what? who?');
            break;
        case 'hows 6ft?':
            msg.reply('about 20 feet');
            break;
        case '-helpmebeet':
            msg.reply('help yourself bitch');
            msg.reply(`
            commands are:
            -spam,
            hows 6ft,
            -beetsay [carrots, liver, spanish, height, ingerland, bmw, 6ft, 1-1, brazil]           
            -bplay <link>
            -bskip
            `);
            break;
        case '-deadbeet':
            msg.reply(
                'https://tenor.com/view/shummer-slap-nuts-jeff-jarrett-guitar-bashing-over-the-head-gif-13052529'
            );
            break;
        case '-beetsay':
            BeetSay(msg);
            break;
        case '-byebeet':
            msg.member.voice.channel.leave();
            break;
        // case '-bplay':
        //     playSong(msg);
        //     break;
        // case '-bskip':
        //     skipSong(msg);
        //     break;
        default:
            return;
    }
});
