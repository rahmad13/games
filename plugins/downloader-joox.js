import fs from "fs"
import scrap from "../lib/scrape.js"

let handler = async (m, { conn, args, isPrems, isOwner }) => {

if (args) throw 'where url??'

var nope = await scrap.joox(args)

m.reply(nope.hasil)

}
handler.help = ['joox <url>']
handler.tags = ['downloader']
handler.command = /^joox$/i

handler.exp = 0

export default handler