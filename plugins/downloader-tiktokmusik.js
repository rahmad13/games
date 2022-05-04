import { tiktokmusic } from '../lib/scrapes.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Use example ${usedPrefix}${command} https://www.tiktok.com/@omagadsus/video/7025456384175017243`
    const { meta } = await tiktokmusic(args[0])
    const done = meta.music.playUrl
    if (!done) throw 'Can\'t download audio!'
    m.reply(wait)
    conn.sendFile(m.chat, done, 'tiktok.mp3', null, m)
}
handler.help = ['tiktokmusik'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^(tiktokmusik)$/i

export default handler
