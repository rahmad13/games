import {
    aiovideodl
} from '@bochilteam/scraper'

let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) throw `Use example ${usedPrefix}${command} https://vt.tiktok.com/ZSdDyUHcR/https://www.tiktok.com/@kata__kasar/video/7088823247373946138'`

try {
const { title, medias } = await aiovideodl(args[0])

for (const { url, quality, formattedSize} of medias) await conn.sendFile(m.chat, url, 'save.mp4', `*AIOVIDEO DOWNLOADER*\n\n*🏷️Title*: ${title}\n*💽Format:* ${quality}\n*📨Size:* ${formattedSize}\n`, m)
} catch (e) {
m.reply("link yg diberikan bukan link tiktok")
}
}
handler.help = ['aiovideo'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^(aio(video)?(dl)?(aio)?(video)?)$/i

export default handler
