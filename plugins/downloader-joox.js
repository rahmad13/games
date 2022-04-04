import fs from "fs"
import scrap from "../lib/scrape.js"

let handler = async (m, { conn, args, isPrems, isOwner }) => {

if (!args || args[0]) throw 'where url??'

var nope = await scrap.joox(args[0])
conn.sendFile(m.chat, nope.hasil.img,null, `
🏷️Judul: ${nope.hasil.lagu}
👨‍🎤Penyanyi: ${nope.hasil.penyanyi}
📢Publish: ${nope.hasil.publish}
💽Album: ${nope.hasil.album}

📎Url mp3: ${nope.hasil.mp3}
`, m)
return conn.sendFile(m.chat, nope.hasil.mp3, null, null, m)

}
handler.help = ['joox <url>', 'jx <url>']
handler.tags = ['downloader']
handler.command = /^j(oox|x)$/i

handler.exp = 0

export default handler
