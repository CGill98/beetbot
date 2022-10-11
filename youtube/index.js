const ytdl = require('ytdl-core');
const queue = [];

const enqueue = ({ msg, connection, link }) => {
    queue.push({ msg, connection, link });
};

const play = async connection => {
    const { link } = queue[0];
    const songInfo = await ytdl.getInfo(link);

    //console.log(songInfo);
    const { title, videoId } = songInfo.player_response.videoDetails;
    connection.play(ytdl(videoId)).on('finish', () => {
        queue.shift();
        if (queue.length) play(connection);
    });
};

const playSong = async msg => {
    const link = msg.content.split(' ')[1];
    const songInfo = await ytdl.getInfo(link);
    //console.log(songInfo);
    const { title, videoId } = songInfo.player_response.videoDetails;
    const song = {
        title: songInfo.title,
        url: songInfo.video_url,
    };
    //enqueue(msg);
    msg.reply(`playing ${title}`);
    //return;

    const { channel: voiceChannel } = msg.member.voice;

    try {
        if (queue.length) {
            enqueue({ msg, link });
            return;
        }
        const connection = await voiceChannel.join();
        enqueue({ connection, msg, link });
        play(connection);
        /*
        connection.play(ytdl(videoId)).on('finish', () => {
            queue.shift();
            playSong(msg)
        });
        */
    } catch (e) {
        console.log(e);
    }
};

const skip = async msg => {
    if (!queue.length) return;

    queue[0].connection.dispatcher.end();
    const { connection } = queue[0];
    queue.shift();
    playSong(queue[0].msg);
};

module.exports.playSong = playSong;

module.exports.skipSong = skip;
