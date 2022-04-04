import fs from 'fs'

let handler = async (m, { text, usedPrefix, command }) => {

var cuk = fs.readFileSync('../src/audio/nBWefmc.mp3')
let chat = global.db.data.chats[m.chat]

conn.sendFile(m.chat, cuk, null, null, m, null, {
    asDocument: chat.useDocument
  })
}
handler.customPrefix = /^(bot|hyung|seok)/i
handler.command = new RegExp
export default handler
