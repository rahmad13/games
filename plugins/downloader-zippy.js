let limit = 20

import { zippydl} from '../lib/scrape.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Use example ${usedPrefix}${command} https://www.tiktok.com/@omagadsus/video/7025456384175017243`
   const { hasil } = await zippydl(args[0])
    const done = hasil.link
   if (!done) throw 'cant download'
   conn.sendFile(m.chat, done, hasil.title, `🔗 *Url:* ${done}`, m)
   
handler.help = ['zippyshare'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^(zippy(share)?(ser)?(sher)?(sare)?)$/i

export default handler
