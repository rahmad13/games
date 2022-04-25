import { randomTiktok } from '../lib/tiktoksearch.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Use example ${usedPrefix}${command} MoonLy`
    const { result } = await randomTiktok(args[0])
   const { username, caption, likes, comment, share, video} = result
   conn.sendFile(m.chat, video, '', `*👤 Username:* ${username}\n*👍Likes:* ${likes}\n*📨 comment:* ${comment}\n*🖇️ Share:* ${share}\n*📎Url:* ${video}`, m)
}
handler.help = ['randomtiktok'].map(v => v + ' <text>')
handler.tags = ['downloader']

handler.command = /^(randomtiktok)$/i

export default handler
