import { joox } from '../lib/scrapes.js'


let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Use example ${usedPrefix}${command} https://www.tiktok.com/@omagadsus/video/7025456384175017243`
    const { hasil } = await joox(args[0])
    const done = hasil.mp3
    if (!done) throw 'Can\'t download video!'
    conn.sendFile(m.chat, hasil.img, hasil.lagu + "jpg", `*🎧 Judul:* ${hasil.lagu}\n*💽 Album:* ${hasil.album}\n*👨‍🎤 Penyanyi:*{hasil.penyanyi}\n*📢 Upload:* {hasil.publish}\n🔗 *Audio:* ${done}`, m)
    conn.sendFile(m.chat, done, hasil.lagu + ".mp3", null, m)
}
handler.help = ['joox'].map(v => v + ' <judul>')
handler.tags = ['downloader']
handler.command = /^(j(oox)?(ox)?(ooc)?(oc)?)$/i

export default handler
