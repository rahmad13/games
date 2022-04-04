import fs from "fs"
import scrap from "../lib/scrape.js"

let handler = async (m, { conn, args, isPrems, isOwner }) => {

if (!args) throw 'where url??'

var res = await scrap.joox(args)
var json
/**conn.sendFile(m.chat, nope.hasil.img , null, `
🏷️Judul: ${nope.hasil.lagu}
👨‍🎤Penyanyi: ${nope.hasil.penyanyi}
📢Publish: ${nope.hasil.publish}
💽Album: ${nope.hasil.album}

📎Url mp3: ${nope.hasil.mp3}
`, m)
return conn.sendFile(m.chat, nope.hasil.mp3, null, null, m)
**/
m.reply(nope)
}
handler.help = ['joox <url>', 'jx <url>']
handler.tags = ['downloader']
handler.command = /^j(oox|x)$/i

handler.exp = 0

export default handler
