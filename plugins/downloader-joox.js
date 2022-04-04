import fs from "fs"
import scrap from "../lib/scrape.js"

let handler = async (m, { conn, args, isPrems, isOwner }) => {

if (!args[0]) throw 'where url??'

var nope = await scrap.joox(args[0])
var json = await nope.json()

m.reply(json.hasil.penyanyi)

}
handler.help = ['joox <url>']
handler.tags = ['downloader']
handler.command = /^joox$/i

handler.exp = 0

export default handler
