
let handler = async (m, { conn, args, usedPrefix, command, isOwner }) => {
 
m.reply(`Fitur ini belum tersedia`)
 }
handler.help = ['jadibot']
handler.tags = ['jadibot']

handler.command = /^jadibot$/i

handler.limit = true

export default handler
