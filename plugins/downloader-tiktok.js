import { tiktokvid } from '../lib/tiktokdl.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Use example ${usedPrefix}${command} https://www.tiktok.com/@omagadsus/video/7025456384175017243`
    const tt = await tiktokvid(args[0])
    if (!tt.result.status) throw 'Can\'t download video!'
    conn.sendFile(m.chat, tt.result.nowatermark, 'tiktok.mp4', `🔗 *Url:* ${tt.result.nowatermark}`, m)
}
handler.help = ['tiktok'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^(tik(tok)?(dl)?(no)?(wm)?)$/i

export default handler
