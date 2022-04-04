
let handler = async (m, { conn, args, isPrems, isOwner }) => {
const { joox } = require("../lib/scrape.js")

if (!args || args[0]) throw 'where url??'

var nope = await joox(args[0])
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
