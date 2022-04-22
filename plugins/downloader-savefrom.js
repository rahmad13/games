import { aiovideodl, savefrom } from '@bochilteam/scraper'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Use example ${usedPrefix}${command} https://www.tiktok.com/@omagadsus/video/7025456384175017243`
   // const { result } = await tiktokvid(args[0]).catch(async _ => await musicaldown(args[0]))
   // const done = result.nowatermark || result.watermark || result.video || result.video_original
   // if (!done) throw 'Can\'t download video!'
   // conn.sendFile(m.chat, done, '', `🔗 *Url:* ${done}`, m)
   console.log(await savefrom(args[0]))
}
handler.help = ['savefrom'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^(save(from)?(dl)?(aio)?(video)?)$/i

export default handler
