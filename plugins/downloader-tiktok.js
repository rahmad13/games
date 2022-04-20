import { tiktok } from '../lib/tiktok.js'
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Use example ${usedPrefix}${command} https://www.tiktok.com/@omagadsus/video/7025456384175017243`

     try {
    const tt = await tiktok(args[0])
   conn.sendFile(m.chat, tt.result.nowm, 'tiktok.mp4, `Nama :* ${ttdata.meta.author.nickname}\n*Deskripsi :* ${ttdata.meta.desc}\n*Durasi* : ${ttdata.meta.video.duration}`, m )
   } catch (e) {
     m.reply("Server Down/Eror Please try again")
   }
}
handler.help = ['tiktok'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^(tik(tok)?(dl)?)$/i

export default handler
