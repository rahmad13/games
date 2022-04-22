import { aiovideodl, savefrom } from '@bochilteam/scraper'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Use example ${usedPrefix}${command} https://www.tiktok.com/@omagadsus/video/7025456384175017243`
const { meta, hd, sd} = await savefrom('https://www.facebook.com/100048678392753/posts/526563552309587/?app=fbl')

const done = hd.url || sd.url
 conn.sendFile(m.chat, done, `savefrom.mp4`, ` *👤 Profil:* ${meta.title}
*⌛ durasi:* ${meta.duration}
🔗 *Url:* ${done}`, m)

}
handler.help = ['savefrom'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^(save(from)?(dl)?(aio)?(video)?)$/i

export default handler
