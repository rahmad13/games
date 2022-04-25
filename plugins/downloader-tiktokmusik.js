import { musicaldown } from '../lib/tiktokdl.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Use example ${usedPrefix}${command} https://www.tiktok.com/@omagadsus/video/7025456384175017243`
    const { result } = await musicaldown(args[0])
    const done = result.audio || result.audio_original
    if (!done) throw 'Can\'t download audio!'
    conn.sendFile(m.chat, done, 'tiktok.mp3', null, m)
}
handler.help = ['tiktok'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^(tik(tok)?(music)?(mp3)?)$/i

export default handler
