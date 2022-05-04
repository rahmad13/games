import qrcode = require('qrcode')
import { getAuthenticationCredsType } from "@adiwajshing/baileys"

if (global.conns instanceof Array) console.log()// for (let i of global.conns) global.conns[i] && global.conns[i].user ? global.conns[i].close().then(() => delete global.conns[id] && global.conns.splice(i, 1)).catch(global.conn.logger.error) : delete global.conns[i] && global.conns.splice(i, 1)
else global.conns = []

let handler  = async (m, { conn, args, usedPrefix, command }) => {
  m.reply('in development')
}
handler.help = ['jadibot']
handler.tags = ['jadibot']

handler.command = /^jadibot$/i

handler.limit = false

export default handler
